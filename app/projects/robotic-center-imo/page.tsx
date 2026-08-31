import SectionHeader from "@/components/sections/headerSection";
import ProjectGallery from "@/components/sections/projects/projectGallery";
import { roboticCenterGroups } from "@/lib/const";

export default function RoboticCenterImoPage() {
  return (
    <>
      <SectionHeader
        title="Robotic Centre, Imo State"
        description="A modern two-storey robotic and technology centre in Imo State — featuring a contemporary marble-and-glass facade, illuminated entrance, landscaped forecourt, and fully finished interior spaces including a robotic surgery theatre."
      />
      <div className="max-w-5xl mx-auto py-16 px-4 space-y-16">
        {roboticCenterGroups.map((group) => (
          <section key={group.id}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">
              {group.label}
            </h2>
            <ProjectGallery images={group.images} />
          </section>
        ))}
      </div>
    </>
  );
}
