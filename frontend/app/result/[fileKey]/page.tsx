"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ExtractedEvent } from "@/lib/types";
import Analysis from "@/components/Analysis";
import { Calendar } from "lucide-react"; // Assuming lucide-react for icons
import EventTable from "@/components/EventTable";
export default function ResultPage() {
  const { fileKey } = useParams();
  const [fileURL, setFileURL] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [extractedEvents, setExtractedEvents] = useState<ExtractedEvent[] | null>(null);
  const [icsContent, setIcsContent] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    const regenerateICS = async () => {
      const res = await fetch(`${API_BASE_URL}/calendar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: extractedEvents }),
      });
      const text = await res.text();
      setIcsContent(text);
    };

    if (extractedEvents && extractedEvents.length > 0) regenerateICS();
  }, [extractedEvents]);

  useEffect(() => {
    const loadAndProcess = async () => {
      if (!fileKey) return;

      try {
        const retrieveRes = await fetch(`${API_BASE_URL}/retrieve?key=${fileKey}`);
        const retrieveData = await retrieveRes.json();
        setFileURL(retrieveData.url);

        const parseRes = await fetch(`${API_BASE_URL}/parse?key=${fileKey}`);
        const parsed = await parseRes.json();

        const extractRes = await fetch(`${API_BASE_URL}/extract`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: parsed.text }),
        });
        const { events } = await extractRes.json();
        setExtractedEvents(events.length ? events : null);

        if (events.length) {
          const icsRes = await fetch(`${API_BASE_URL}/calendar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ events }),
          });
          const icsText = await icsRes.text();
          setIcsContent(icsText || null);
        } else {
          setIcsContent(null);
        }
      } catch (error: unknown) {
        setError(typeof error === "string" ? error : "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadAndProcess();
  }, [fileKey]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="w-10 h-10 border-4 border-white border-b-transparent rounded-full animate-spin" />
        <p className="mt-6 text-base text-neutral-400">Processing your file…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <p className="text-red-500 text-xl font-medium mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 text-sm font-medium bg-white text-black rounded-md hover:bg-neutral-100 transition focus:outline-none focus:ring-2 focus:ring-neutral-500"
        >
          Retry
        </button>
      </div>
    );
  }
  const handleEventsUpdate = async (updatedEvents: ExtractedEvent[]) => {
    const validEvents = updatedEvents.filter(
      (e) => e.title && e.date && e.startTime && e.endTime
    );

    setExtractedEvents(validEvents);

    if (validEvents.length === 0) {
      setIcsContent(null);
      return;
    }

    const icsRes = await fetch(`${API_BASE_URL}/calendar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: validEvents }),
    });
    const icsText = await icsRes.text();
    setIcsContent(icsText || null);
  };


  return (
    <main className="bg-black text-white min-h-screen px-6 py-12 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-none rounded-2xl overflow-hidden border border-neutral-800 shadow-lg">
          {fileURL ? (
            <iframe
              src={fileURL}
              title="PDF Preview"
              className="w-full h-[650px] rounded-t-2xl"
              loading="lazy"
              aria-label="Document preview"
            />
          ) : (
            <div className="w-full h-[650px] flex items-center justify-center bg-[#0e0e0e] rounded-t-2xl">
              <p className="text-neutral-500">Unable to load preview.</p>
            </div>
          )}
        </section>

        <section className="border border-neutral-800 shadow-lg rounded-2xl px-6 py-5">
          <header className="sticky top-0 bg-black z-10 pb-4 flex justify-between items-center border-b border-neutral-800">
            <h2 className="text-2xl font-semibold text-white">Assessments</h2>
            {icsContent && (
              <a
                href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`}
                download="events.ics"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-neutral-100 transition focus:outline-none focus:ring-2 focus:ring-neutral-500"
                aria-label="Download events as iCalendar file"
              >
                <Calendar size={16} />
                Download .ics
              </a>
            )}
          </header>

         <EventTable extractedEvents={extractedEvents || []} onUpdate={handleEventsUpdate} />
        </section>

        {extractedEvents && extractedEvents.length > 0 && (
          <section className="lg:col-span-2">
            <Analysis events={extractedEvents} apiBaseUrl={API_BASE_URL!} />
          </section>
        )}
      </div>
    </main>
  );
}