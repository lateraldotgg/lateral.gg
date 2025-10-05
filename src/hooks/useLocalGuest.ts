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
  const [localGuest, setLocalGuest] = useState<Guest>(() => {
    const guest = getItem("guest");
    if (!guest) {
      return initialGuest;
    }

    // Ensure the guest object has the complete structure
    return {
      filters: {
        days: guest.filters?.days || initialGuest.filters.days,
        hosts: guest.filters?.hosts || initialGuest.filters.hosts,
        tags: guest.filters?.tags || initialGuest.filters.tags,
        similar: guest.filters?.similar || initialGuest.filters.similar,
      },
    };
  });

  useEffect(() => {
    setItem("guest", localGuest);
  }, [localGuest]);

  return [localGuest, setLocalGuest] as const;
}
