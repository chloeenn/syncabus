import { createEvents } from "ics";

export function generateICSFile(events: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
}[]) {
  const icsEvents = events.map(event => {
    const [year, month, day] = event.date.split("-").map(Number);
    const [startHour, startMinute] = event.startTime.split(":").map(Number);
    const [endHour, endMinute] = event.endTime.split(":").map(Number);
    return {
      title: event.title,
      start: [year, month, day, startHour, startMinute] as [number, number, number, number, number],
      end: [year, month, day, endHour, endMinute] as [number, number, number, number, number],
      location: event.location || "",
    };
  });

  const { error, value } = createEvents(icsEvents);
  console.log("ICS file generated successfully");
    console.log("ICS file content:", value);
  if (error) throw error;
  return value; //.ics file content as a string
}
