import SectionHeader from "@/components/sections/headerSection";
import TabbedGallery from "@/components/sections/projects/tabbedGallery";
import { mtnAbujaRooms } from "@/lib/const";

export default function MtnAbujaRegionalOfficePage() {
  return (
    <>
      <SectionHeader
        title="MTN Abuja Regional Office"
        description="MTN Abuja Regional Office design proposal — featuring office design, conference room, and CEO office"
      />
      <div className="max-w-5xl mx-auto py-16 px-4">
        <TabbedGallery rooms={mtnAbujaRooms} />
      </div>
    </>
  );
}
