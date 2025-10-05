"use client";

import { Card } from "@/components/ui/card";
import DayFilter from "@/components/filters/DayFilter";
import HostFilter from "@/components/filters/HostFilter";
import TagFilter from "@/components/filters/TagFilter";
import SimilarFilter from "@/components/filters/SimilarFilter";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { Guest } from "@/hooks/useLocalGuest";

export default function SideBar({
  guest,
  setGuest,
}: {
  guest: Guest;
  setGuest: (guest: Guest) => void;
}) {
  const user = useQuery(api.queries.users.findByAuthWhole);

  return (
    <div className="col-span-1 row-span-15">
      <Card
        className="bg flex size-full h-full flex-col gap-4 overflow-hidden
          rounded-md border p-2 shadow-sm"
      >
        <div>
          Days
          <DayFilter guest={guest} setGuest={setGuest} />
        </div>
        <div>
          Hosts
          <HostFilter />
        </div>
        <div>
          Tags
          <TagFilter />
        </div>
        <div>
          Similar
          <SimilarFilter />
        </div>
      </Card>
    </div>
  );
}
