"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ResultPage() {
  const { fileKey } = useParams();
  const [fileURL, setFileURL] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [extractedEvents, setExtractedEvents] = useState<any[] | null>(null);
  const [icsContent, setIcsContent] = useState<string | null>(null);

  useEffect(() => {
    const loadAndProcess = async () => {
      if (!fileKey) return;

      try {
        // Get PDF URL
        const retrieveRes = await fetch(`/api/retrieve?key=${fileKey}`);
        const retrieveData = await retrieveRes.json();
        setFileURL(retrieveData.url);

        // Parse PDF to text
        const parseRes = await fetch(`/api/parse?key=${fileKey}`);
        const parsed = await parseRes.json();

        // Extract events from text
        const extractRes = await fetch("/api/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: parsed.text }),
        });
        const { events } = await extractRes.json();

        setExtractedEvents(events.length ? events : null);

        // Generate ICS content from events (call server API)
        if (events.length) {
          const icsRes = await fetch("/api/calendar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ events }),
          });
          const icsJson = await icsRes.json();

          if (icsJson.ics) setIcsContent(icsJson.ics);
          else setIcsContent(null);
        } else {
          setIcsContent(null);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadAndProcess();
  }, [fileKey]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-xl font-semibold">Loading file...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-black text-red-500">
        <p className="text-xl font-semibold">Error: {error}</p>
      </div>
    );
  return (
    <main className=" bg-black text-white p-8 flex flex-row max-w-[1200px] mx-auto gap-10">
  
      <section className="flex-1 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
        <iframe
          src={fileURL}
          className="w-full h-[calc(100vh-4rem)]"
          title="PDF preview"
        />
      </section>

     
      <section className="flex-[0.6] flex flex-col bg-gray-800 rounded-xl p-6 shadow-md max-h-[calc(100vh-4rem)] overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">
          Extracted Events
        </h2>

        {extractedEvents && extractedEvents.length ? (
          <ul className="space-y-4 mb-6">
            {extractedEvents.map((event, i) => (
              <li
                key={i}
                className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-default select-none"
              >
                <p className="text-lg font-semibold">{event.title}</p>
                <p className="text-sm text-gray-300">
                  {event.date} — {event.startTime} to {event.endTime}
                  {event.location ? ` @ ${event.location}` : ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-400">No events found.</p>
        )}

       
        {icsContent && (
          <a
            href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`}
            download="events.ics"
            className="mt-auto inline-block bg-black text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors select-none"
          >
            Download .ics Calendar File
          </a>
        )}
      </section>
    </main>
  );
}
