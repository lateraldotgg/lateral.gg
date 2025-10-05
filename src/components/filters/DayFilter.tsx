"use client";
import * as React from "react";
import { Badge, BadgeButton } from "@/components/ui/badge";
import { Button, ButtonArrow } from "@/components/ui/button";
import {
  Command,
  CommandCheck,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { Guest } from "@/hooks/useLocalGuest";
import { dayList } from "@/utils/filters";

export default function DayFilter({
  guest,
  setGuest,
}: {
  guest: Guest;
  setGuest: (guest: Guest) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const toggleSelection = (value: (typeof dayList)[number]) => {
    setGuest({
      ...guest,
      filters: {
        ...guest.filters,
        days: guest.filters.days.some((day) => day.value === value.value)
          ? guest.filters.days.filter((v) => v.value !== value.value)
          : [...guest.filters.days, value],
      },
    });
  };
  const removeSelection = (value: (typeof dayList)[number]) => {
    setGuest({
      ...guest,
      filters: {
        ...guest.filters,
        days: guest.filters.days.filter((v) => v.value !== value.value),
      },
    });
  };

  // Define maxShownItems before using visibleItems
  const maxShownItems = 1;
  const visibleItems = expanded
    ? guest.filters.days
    : guest.filters.days.slice(0, maxShownItems);
  const hiddenCount = guest.filters.days.length - visibleItems.length;
  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            autoHeight={true}
            mode="input"
            placeholder={guest.filters.days.length === 0}
            className="relative w-full px-1.5 py-1"
          >
            <div className="flex flex-wrap items-center gap-1 pe-2.5">
              {guest.filters.days.length > 0 ? (
                <>
                  {visibleItems.map((val) => {
                    const day = dayList.find((d) => d.value === val.value);
                    return day ? (
                      <Badge key={val.value} variant="outline">
                        {day.label}
                        <BadgeButton
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSelection(val);
                          }}
                        >
                          <X />
                        </BadgeButton>
                      </Badge>
                    ) : null;
                  })}
                  {/* Always show "Less" button when expanded */}
                  {hiddenCount > 0 || expanded ? (
                    <Badge
                      className="text-muted-foreground hover:bg-accent
                        cursor-pointer px-1.5"
                      appearance="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpanded((prev) => !prev);
                      }}
                    >
                      {expanded ? "Show Less" : `+${hiddenCount} more`}
                    </Badge>
                  ) : null}
                </>
              ) : (
                <span className="px-2.5">Select days</span>
              )}
            </div>
            <ButtonArrow className="absolute end-3 top-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
          <Command>
            <CommandInput placeholder="Search day..." />
            <CommandList>
              <CommandEmpty>No day found.</CommandEmpty>
              <CommandGroup>
                {dayList.map((day) => (
                  <CommandItem
                    key={day.value}
                    value={day.value}
                    onSelect={() => toggleSelection(day)}
                  >
                    <span className="truncate">{day.label}</span>
                    {guest.filters.days.some(
                      (selectedDay) => selectedDay.value === day.value
                    ) && <CommandCheck />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
