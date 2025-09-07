import { Card } from "@/components/ui/card";
import Filter from "@/components/Filter";

export default function SideBar() {
  return (
    <div className="col-span-1 row-span-15">
      <Card
        className="bg flex size-full h-full flex-col overflow-hidden rounded-md
          border p-2 shadow-sm"
      >
        <div>Toggles</div>
        <div>
          Days
          <Filter />
        </div>
        <div>
          Hosts
          <Filter />
        </div>
        <div>
          Tags
          <Filter />
        </div>
        <div>
          Similar
          <Filter />
        </div>
      </Card>
    </div>
  );
}
