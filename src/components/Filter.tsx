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
const topCities = [
  { value: "tokyo", label: "Tokyo" },
  { value: "new_york", label: "New York" },
  { value: "london", label: "London" },
  { value: "paris", label: "Paris" },
  { value: "dubai", label: "Dubai" },
  { value: "singapore", label: "Singapore" },
  { value: "hong_kong", label: "Hong Kong" },
  { value: "los_angeles", label: "Los Angeles" },
  { value: "seoul", label: "Seoul" },
  { value: "amsterdam", label: "Amsterdam" },
];
export default function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([
    "london",
    "tokyo",
  ]);
  const toggleSelection = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  const removeSelection = (value: string) => {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  };
  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            autoHeight={true}
            mode="input"
            placeholder={selectedValues.length === 0}
            className="relative w-full p-1"
          >
            <div className="flex flex-wrap items-center gap-1 pe-2.5">
              {selectedValues.length > 0 ? (
                selectedValues.map((val) => {
                  const city = topCities.find((c) => c.value === val);
                  return city ? (
                    <Badge key={val} variant="outline">
                      {city.label}
                      <BadgeButton
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelection(val);
                        }}
                      >
                        <X suppressHydrationWarning />
                      </BadgeButton>
                    </Badge>
                  ) : null;
                })
              ) : (
                <span className="px-2.5">Select cities</span>
              )}
            </div>
            <ButtonArrow className="absolute end-3 top-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
          <Command>
            <CommandInput placeholder="Search city..." />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {topCities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={() => toggleSelection(city.value)}
                  >
                    <span className="truncate">{city.label}</span>
                    {selectedValues.includes(city.value) && <CommandCheck />}
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
