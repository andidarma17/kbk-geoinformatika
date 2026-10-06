-- Apply in the Supabase SQL Editor after 20261005_ontology_epistemology_outputs.sql.
-- This combines the inquiry limits prepared in S12 with the indexes from S31.
-- Codex has not run this migration.
begin;

do $$
declare t text;
begin
  foreach t in array array['researchers', 'projects', 'publications', 'intellectual_properties', 'community_services'] loop
    execute format('create index if not exists %I on public.%I (research_area_id)', t || '_research_area_id_idx', t);
    execute format('create index if not exists %I on public.%I (epistemology_id, research_area_id)', t || '_epistemology_idx', t);
  end loop;
end $$;

create index if not exists epistemologies_research_area_id_idx on public.epistemologies (research_area_id);

create index if not exists project_researchers_researcher_id_idx on public.project_researchers (researcher_id);
create index if not exists publication_researchers_researcher_id_idx on public.publication_researchers (researcher_id);
create index if not exists intellectual_property_researchers_researcher_id_idx on public.intellectual_property_researchers (researcher_id);
create index if not exists community_service_researchers_researcher_id_idx on public.community_service_researchers (researcher_id);

-- NOT VALID checks new writes immediately while allowing older rows to be reviewed later.
do $$
begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.inquiries'::regclass and conname = 'inquiries_name_len') then
    alter table public.inquiries add constraint inquiries_name_len check (char_length(name) between 1 and 200) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.inquiries'::regclass and conname = 'inquiries_email_len') then
    alter table public.inquiries add constraint inquiries_email_len check (char_length(email) between 3 and 320) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.inquiries'::regclass and conname = 'inquiries_message_len') then
    alter table public.inquiries add constraint inquiries_message_len check (char_length(message) between 1 and 5000) not valid;
  end if;
end $$;

commit;
