"use client";

import { useState, useEffect } from "react";
import { getItem, setItem } from "@/utils/localStorage";
import { dayList } from "@/utils/filters";

export type Guest = {
  filters: {
    days: typeof dayList;
    hosts: string[];
    tags: string[];
    similar: string[];
  };
};

export const initialGuestTemplate: Guest = {
  filters: {
    days: dayList,
    hosts: [],
    tags: [],
    similar: [],
  },
};

export function useLocalGuest(initialGuest: Guest) {
  const [localGuest, setLocalGuest] = useState<Guest>(initialGuest);
  const [hasMounted, setHasMounted] = useState(false);

  // Load from localStorage after hydration
  useEffect(() => {
    setHasMounted(true);
    const guest = getItem("guest");
    if (guest) {
      // Ensure the guest object has the complete structure
      setLocalGuest({
        filters: {
          days: guest.filters?.days || initialGuest.filters.days,
          hosts: guest.filters?.hosts || initialGuest.filters.hosts,
          tags: guest.filters?.tags || initialGuest.filters.tags,
          similar: guest.filters?.similar || initialGuest.filters.similar,
        },
      });
    }
  }, [initialGuest]);

  // Save to localStorage when localGuest changes (but not on initial load)
  useEffect(() => {
    if (hasMounted) {
      setItem("guest", localGuest);
    }
  }, [localGuest, hasMounted]);

  return [localGuest, setLocalGuest] as const;
}
