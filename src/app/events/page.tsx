"use client";

import SideBar from "@/components/SideBar";
import EventKanban from "@/components/EventKanban";
import { useLocalGuest, initialGuestTemplate } from "@/hooks/useLocalGuest";

const EventsPage = () => {
  const [guest, setGuest] = useLocalGuest(initialGuestTemplate);

  return (
    <main className="col-span-8 row-span-15 grid grid-cols-subgrid">
      <SideBar guest={guest} setGuest={setGuest} />
      <EventKanban guest={guest} setGuest={setGuest} />
    </main>
  );
};

export default EventsPage;
