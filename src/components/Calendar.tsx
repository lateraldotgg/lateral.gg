"use client";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
} from "@/components/ui/kibo-ui/calendar";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type Status = {
  id: string;
  name: string;
  color: string;
};

type Feature = {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: Status;
};
const Calendar = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [earliestYear, setEarliestYear] = useState(new Date().getFullYear());
  const [latestYear, setLatestYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const statuses: Status[] = [
      { id: faker.string.uuid(), name: "Planned", color: "#6B7280" },
      { id: faker.string.uuid(), name: "In Progress", color: "#F59E0B" },
      { id: faker.string.uuid(), name: "Done", color: "#10B981" },
    ];

    const generatedFeatures = Array.from({ length: 20 })
      .fill(null)
      .map(() => ({
        id: faker.string.uuid(),
        name: capitalize(faker.company.buzzPhrase()),
        startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
        endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
        status: faker.helpers.arrayElement(statuses),
      }));

    setFeatures(generatedFeatures);

    const years = generatedFeatures
      .flatMap((feature) => [
        feature.startAt.getFullYear(),
        feature.endAt.getFullYear(),
      ])
      .sort();

    setEarliestYear(years[0] ?? new Date().getFullYear());
    setLatestYear(years[years.length - 1] ?? new Date().getFullYear());
  }, []);

  if (features.length === 0) {
    return <div>Loading calendar...</div>;
  }

  return (
    <CalendarProvider>
      <CalendarDate>
        <CalendarDatePicker>
          <CalendarMonthPicker />
          <CalendarYearPicker end={latestYear} start={earliestYear} />
        </CalendarDatePicker>
        <CalendarDatePagination />
      </CalendarDate>
      <CalendarHeader />
      <CalendarBody features={features}>
        {({ feature }) => <CalendarItem feature={feature} key={feature.id} />}
      </CalendarBody>
    </CalendarProvider>
  );
};

export default Calendar;
