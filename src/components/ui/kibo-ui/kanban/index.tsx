"use client";

import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
} from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Doc } from "../../../../../convex/_generated/dataModel";

// Simplified types for events and columns
type Event = Doc<"events"> & { column: string };
type Column = {
  id: string;
  name: string;
  color?: string;
};

type KanbanContextProps = {
  columns: Column[];
  events: Event[];
};

const KanbanContext = createContext<KanbanContextProps>({
  columns: [],
  events: [],
});

export type KanbanBoardProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const KanbanBoard = ({ id, children, className }: KanbanBoardProps) => {
  return (
    <div
      className={cn(
        `bg flex size-full h-full flex-col divide-y overflow-hidden rounded-md
        border text-xs shadow-sm`,
        className
      )}
    >
      {children}
    </div>
  );
};

export type KanbanCardProps = {
  id: string;
  name: string;
  children?: ReactNode;
  className?: string;
  column: string;
};

export const KanbanCard = ({
  id,
  name,
  children,
  className,
  column,
}: KanbanCardProps) => {
  return (
    <Card className={cn("gap-4 rounded-md p-2 shadow-sm", className)}>
      {children ?? <p className="m-0 text-sm font-medium">{name}</p>}
    </Card>
  );
};

export type KanbanCardsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "id"
> & {
  children: (item: Event) => ReactNode;
  id: string;
};

export const KanbanCards = ({
  children,
  className,
  ...props
}: KanbanCardsProps) => {
  const { events } = useContext(KanbanContext);
  const filteredEvents = events.filter((item) => item.column === props.id);

  return (
    <ScrollArea className="overflow-hidden">
      <div
        className={cn("flex flex-grow flex-col gap-1 p-1", className)}
        {...props}
      >
        {filteredEvents.map(children)}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export type KanbanHeaderProps = HTMLAttributes<HTMLDivElement>;

export const KanbanHeader = ({ className, ...props }: KanbanHeaderProps) => (
  <div className={cn("m-0 p-2 text-sm font-semibold", className)} {...props} />
);

export type KanbanProviderProps = {
  children: (column: Column) => ReactNode;
  className?: string;
  columns: Column[];
  events: Event[];
};

export const KanbanProvider = ({
  children,
  className,
  columns,
  events,
}: KanbanProviderProps) => {
  return (
    <KanbanContext.Provider value={{ columns, events }}>
      <div
        className={cn(
          "grid h-full w-full auto-cols-fr grid-flow-col gap-2",
          className
        )}
      >
        {columns.map((column) => children(column))}
      </div>
    </KanbanContext.Provider>
  );
};
