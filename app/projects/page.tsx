'use client'
import ContactSection from "@/components/sections/contact-us";
import SectionHeader from "@/components/sections/headerSection";
import ProjectsSection, { Project } from "@/components/sections/project";
import { projectsList } from "@/lib/const";

function ProjectsPage() {

  return (
    <>
      <SectionHeader
        title="Our Projects"
        description="We deliver projects of all sizes — from local upgrades to multi-million Naira developments. Below are selected projects and photo highlights. Click any project for details, contract value and gallery."
      />
      <ProjectsSection
        title=""
        showButton={false}
        showOnLoad
        projects={projectsList as Project[]}
        className="min-h-screen"
      />
      <ContactSection />
    </>
  );
}

export default ProjectsPage;
