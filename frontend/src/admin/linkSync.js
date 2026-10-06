export async function syncLinks(client, link, id, researcherIds) {
  if (!link || !Array.isArray(researcherIds)) return;

  const { data: rows, error: readError } = await client
    .from(link.junction)
    .select("researcher_id")
    .eq(link.fk, id);
  if (readError) throw new Error(readError.message);

  const current = new Set((rows || []).map((row) => String(row.researcher_id)));
  const requested = new Map(researcherIds.map((rid) => [String(rid), rid]));
  const missing = [...requested]
    .filter(([key]) => !current.has(key))
    .map(([, rid]) => ({ [link.fk]: id, researcher_id: rid }));
  const removed = (rows || [])
    .map((row) => row.researcher_id)
    .filter((rid) => !requested.has(String(rid)));

  if (missing.length) {
    const { error } = await client.from(link.junction).insert(missing);
    if (error) throw new Error(error.message);
  }
  if (removed.length) {
    const { error } = await client.from(link.junction)
      .delete()
      .eq(link.fk, id)
      .in("researcher_id", removed);
    if (error) throw new Error(error.message);
  }
}

export async function createWithLinks(client, table, payload, link, researcherIds) {
  const { data: row, error } = await client.from(table)
    .insert(payload)
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  try {
    await syncLinks(client, link, row.id, researcherIds);
  } catch (linkError) {
    try {
      const { error: rollbackError } = await client.from(table).delete().eq("id", row.id);
      if (rollbackError) console.error("Failed to roll back new record:", rollbackError);
    } catch (rollbackError) {
      console.error("Failed to roll back new record:", rollbackError);
    }
    throw linkError;
  }
}
