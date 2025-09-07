import SideBar from "@/components/SideBar";
import Kanban from "@/components/Kanban";

const EventsPage = () => {
  return (
    <main className="col-span-8 row-span-15 grid grid-cols-subgrid">
      <SideBar />
      <Kanban />
    </main>
  );
};

export default EventsPage;
