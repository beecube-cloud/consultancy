import Image from "next/image";
import { notFound } from "next/navigation";
import { projectsList } from "@/lib/consts";
import ProjectGallery from "@/components/sections/projects/projectGallery";
import SectionHeader from "@/components/sections/headerSection";



export default async function ProjectDetailPage({ params }: { params: { slug: string } } ) {
    const { slug } = await params;
    const project = projectsList.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <>
    <SectionHeader title={project.title} description={project.description} />
    <div className="max-w-5xl mx-auto py-16 px-4">

      <ProjectGallery images={project.images} />

    </div>
    </>
  );
}
