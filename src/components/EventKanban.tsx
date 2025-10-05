"use client";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/kibo-ui/kanban";
import { useState, useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { Icon } from "@iconify/react";
import { Guest } from "@/hooks/useLocalGuest";
import { dayList } from "@/utils/filters";
import { format } from "date-fns";

const EventCard = ({
  event,
  column,
}: {
  event: Doc<"events">;
  column: string;
}) => {
  // Get club data from Convex
  const club = useQuery(api.queries.clubs.findById, {
    clubId: event.club,
  });

  if (!club) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <KanbanCard
      column={column}
      id={event._id}
      key={event._id}
      name={event.name}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-2">
          <p className="m-0 flex-1 text-sm font-medium">{event.name}</p>
        </div>
        {club && (
          <Avatar className="h-4 w-4 shrink-0">
            <Icon icon="ph:users-three-light" className="h-4 w-4" />
          </Avatar>
        )}
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="text-muted-foreground m-0 text-xs">
          {format(new Date(event.datetime || ""), "hh:mm a, EEEE")}
        </p>
        <p className="text-muted-foreground m-0 text-xs">{club.name}</p>
      </div>
    </KanbanCard>
  );
};

const Kanban = ({
  guest,
  setGuest,
}: {
  guest: Guest;
  setGuest: (guest: Guest) => void;
}) => {
  const [filteredColumns, setFilteredColumns] = useState<typeof columns>([]);
  const events = useQuery(api.queries.events.list100);

  const today = new Date();
  const currentDay = format(today, "EEEE");
  console.log("currentDay:", currentDay, "today:", today.toISOString());

  const columns = useMemo(
    () =>
      dayList.map((day) => ({
        id: day.value,
        name: day.label,
        color: day.label === currentDay ? "var(--primary)" : "var(--secondary)",
      })),
    [currentDay]
  );

  const days = guest.filters?.days || [];

  useEffect(() => {
    setFilteredColumns(
      columns.filter((column) =>
        days.map((day) => day.value).includes(column.id)
      )
    );
  }, [guest, columns]);

  if (!events) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Add column property to each event (for now, randomly assign to columns)
  const eventsWithColumns = events.map((event) => ({
    ...event,
    column:
      (filteredColumns.length > 0 &&
        filteredColumns.find((column) => column.name === currentDay)?.id) ||
      columns[0]?.id,
  }));

  return (
    <div className="col-span-7 col-start-2 row-span-15">
      <KanbanProvider columns={filteredColumns} events={eventsWithColumns}>
        {(column) => (
          <KanbanBoard id={column.id} key={column.id}>
            <KanbanHeader>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
                <span>{column.name}</span>
              </div>
            </KanbanHeader>
            <KanbanCards id={column.id}>
              {(event: Doc<"events">) => (
                <EventCard key={event._id} event={event} column={column.id} />
              )}
            </KanbanCards>
          </KanbanBoard>
        )}
      </KanbanProvider>
    </div>
  );
};
export default Kanban;
