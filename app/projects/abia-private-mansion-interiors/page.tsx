import SectionHeader from "@/components/sections/headerSection";
import TabbedGallery from "@/components/sections/projects/tabbedGallery";
import { abiaInteriorsRooms } from "@/lib/const";

export default function AbiaPrivateMansionInteriorsPage() {
  return (
    <>
      <SectionHeader
        title="Abia Private Mansion Interiors"
        description="Interior design for Abia private mansion — featuring the great room, kitchen, dining room, bedrooms, and bathrooms"
      />
      <div className="max-w-5xl mx-auto py-16 px-4">
        <TabbedGallery rooms={abiaInteriorsRooms} />
      </div>
    </>
  );
}
