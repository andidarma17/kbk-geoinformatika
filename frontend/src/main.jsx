import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Research from "./pages/Research.jsx";
import AdminApp from "./admin/AdminApp.jsx";
import People from "./pages/People.jsx";
import PersonDetail from "./pages/PersonDetail.jsx";
import Projects from "./pages/Projects.jsx";
import Publications from "./pages/Publications.jsx";
import News from "./pages/News.jsx";
import Facilities from "./pages/Facilities.jsx";
import Contact from "./pages/Contact.jsx";
import ResearchAreaDetail from "./pages/ResearchAreaDetail.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import PublicationDetail from "./pages/PublicationDetail.jsx";
import WorkDirectory from "./pages/WorkDirectory";
import WorkDetail from "./pages/WorkDetail";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="research" element={<Research />} />
          <Route path="research/:slug" element={<ResearchAreaDetail />} />
          <Route path="people" element={<People />} />
          <Route path="people/:id" element={<PersonDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="publications" element={<Publications />} />
          <Route path="publications/:id" element={<PublicationDetail />} />
          <Route path="intellectual-property" element={<WorkDirectory key="ip" kind="intellectual-property" />} />
          <Route path="intellectual-property/:id" element={<WorkDetail key="ip" kind="intellectual-property" />} />
          <Route path="community-services" element={<WorkDirectory key="community" kind="community-services" />} />
          <Route path="community-services/:id" element={<WorkDetail key="community" kind="community-services" />} />
          <Route path="news" element={<News />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);