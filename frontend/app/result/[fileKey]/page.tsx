"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ExtractedEvent } from "@/lib/types";
import Analysis from "@/components/Analysis";
import { Calendar } from "lucide-react"; // Assuming lucide-react for icons

export default function ResultPage() {
  const { fileKey } = useParams();
  const [fileURL, setFileURL] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [extractedEvents, setExtractedEvents] = useState<ExtractedEvent[] | null>(null);
  const [icsContent, setIcsContent] = useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

          <div className="mt-4 max-h-[580px] overflow-y-auto pr-2">
            {extractedEvents && extractedEvents.length > 0 ? (
              <div className="space-y-4">
                {extractedEvents.map((event, index) => (
                  <article
                    key={index}
                    className="border border-neutral-700 rounded-xl px-5 py-4 bg-[#0e0e0e] hover:border-neutral-600 transition animate-fade-in focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    tabIndex={0}
                    role="region"
                    aria-label={`Event: ${event.title || "Untitled Event"}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-white leading-snug truncate max-w-[80%]">
                        {event.title || "Untitled Event"}
                      </h3>
                    </div>
                    <div className="text-sm text-neutral-400 space-y-1">
                      {event.date && (
                        <p>
                          <span className="text-white font-medium">Date:</span> {event.date}
                        </p>
                      )}
                      {event.startTime && event.endTime && (
                        <p>
                          <span className="text-white font-medium">Time:</span> {event.startTime} –{" "}
                          {event.endTime}
                        </p>
                      )}
                      {event.location && (
                        <p>
                          <span className="text-white font-medium">Location:</span> {event.location}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 text-center py-8">
                No events were extracted from your file.
              </p>
            )}
          </div>
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