"use client";
import { faker } from "@faker-js/faker";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/kibo-ui/kanban";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});
const Kanban = () => {
  const [columns, setColumns] = useState<
    Array<{ id: string; name: string; color: string }>
  >([]);
  const [, setUsers] = useState<
    Array<{ id: string; name: string; image: string }>
  >([]);
  const [features, setFeatures] = useState<
    Array<{
      id: string;
      name: string;
      startAt: Date;
      endAt: Date;
      column: string;
      owner: { id: string; name: string; image: string };
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate data only on client side to avoid hydration issues
  useEffect(() => {
    const generateData = () => {
      const generatedColumns = [
        // { id: faker.string.uuid(), name: "Monday", color: "var(--primary)" },
        // { id: faker.string.uuid(), name: "Tuesday", color: "var(--secondary)" },
        // {
        //   id: faker.string.uuid(),
        //   name: "Wednesday",
        //   color: "var(--secondary)",
        // },
        // {
        //   id: faker.string.uuid(),
        //   name: "Thursday",
        //   color: "var(--secondary)",
        // },
        { id: faker.string.uuid(), name: "Friday", color: "var(--secondary)" },
        {
          id: faker.string.uuid(),
          name: "Saturday",
          color: "var(--secondary)",
        },
        { id: faker.string.uuid(), name: "Sunday", color: "var(--secondary)" },
      ];

      const generatedUsers = Array.from({ length: 4 })
        .fill(null)
        .map(() => ({
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          image: faker.image.avatar(),
        }));

      const generatedFeatures = Array.from({ length: 20 })
        .fill(null)
        .map(() => ({
          id: faker.string.uuid(),
          name: capitalize(faker.company.buzzPhrase()),
          startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
          endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
          column: faker.helpers.arrayElement(generatedColumns).id,
          owner: faker.helpers.arrayElement(generatedUsers),
        }));

      setColumns(generatedColumns);
      setUsers(generatedUsers);
      setFeatures(generatedFeatures);
      setIsLoading(false);
    };

    generateData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }
  return (
    <div className="col-span-7 col-start-2 row-span-15">
      <KanbanProvider
        columns={columns}
        data={features}
        onDataChange={setFeatures}
      >
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
              {(feature: (typeof features)[number]) => (
                <KanbanCard
                  column={column.id}
                  id={feature.id}
                  key={feature.id}
                  name={feature.name}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-2">
                      <p className="m-0 flex-1 text-sm font-medium">
                        {feature.name}
                      </p>
                    </div>
                    {feature.owner && (
                      <Avatar className="h-4 w-4 shrink-0">
                        <AvatarImage src={feature.owner.image} />
                        <AvatarFallback>
                          {feature.owner.name?.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <p className="text-muted-foreground m-0 text-xs">
                    {shortDateFormatter.format(feature.startAt)} -{" "}
                    {dateFormatter.format(feature.endAt)}
                  </p>
                </KanbanCard>
              )}
            </KanbanCards>
          </KanbanBoard>
        )}
      </KanbanProvider>
    </div>
  );
};
export default Kanban;
