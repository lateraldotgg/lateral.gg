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

const similarList = [
  { value: "similar1", label: "Similar 1" },
  { value: "similar2", label: "Similar 2" },
  { value: "similar3", label: "Similar 3" },
];

export default function SimilarFilter() {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    similarList.map((similar) => similar.value)
  );
  const toggleSelection = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  const removeSelection = (value: string) => {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  };

  // Define maxShownItems before using visibleItems
  const maxShownItems = 1;
  const visibleItems = expanded
    ? selectedValues
    : selectedValues.slice(0, maxShownItems);
  const hiddenCount = selectedValues.length - visibleItems.length;
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
            placeholder={selectedValues.length === 0}
            className="relative w-full px-1.5 py-1"
          >
            <div className="flex flex-wrap items-center gap-1 pe-2.5">
              {selectedValues.length > 0 ? (
                <>
                  {visibleItems.map((val) => {
                    const similar = similarList.find((s) => s.value === val);
                    return similar ? (
                      <Badge key={val} variant="outline">
                        {similar.label}
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
                <span className="px-2.5">Select similar</span>
              )}
            </div>
            <ButtonArrow className="absolute end-3 top-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
          <Command>
            <CommandInput placeholder="Search similar..." />
            <CommandList>
              <CommandEmpty>No similar found.</CommandEmpty>
              <CommandGroup>
                {similarList.map((similar) => (
                  <CommandItem
                    key={similar.value}
                    value={similar.value}
                    onSelect={() => toggleSelection(similar.value)}
                  >
                    <span className="truncate">{similar.label}</span>
                    {selectedValues.includes(similar.value) && <CommandCheck />}
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
