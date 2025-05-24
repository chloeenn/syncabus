"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ResultPage() {
  const { fileKey } = useParams();
  const [fileURL, setFileURL] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [extractedEvents, setExtractedEvents] = useState<any[] | null>(null); // adjust type as needed

  useEffect(() => {
    const loadAndProcess = async () => {
      if (!fileKey) return;

      try {
        //Get PDF URL
        const retrieveRes = await fetch(`/api/retrieve?key=${fileKey}`);
        const retrieveData = await retrieveRes.json();
        setFileURL(retrieveData.url);

        //Parse PDF to text
        const parseRes = await fetch(`/api/parse?key=${fileKey}`);
        const parsed = await parseRes.json();
        console.log("Parsed PDF text:", parsed.text.slice(0, 200));

        //Extract events from text
        const extractRes = await fetch("/api/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: parsed.text }),
        });
        const { events } = await extractRes.json();
        console.log("Extracted events:", events);

        setExtractedEvents(events);
      } catch (err: any) {
        console.error("Error in PDF -> extract flow:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadAndProcess();
  }, [fileKey]);

  if (loading) return <p className="text-xl font-bold mb-4">Loading file...</p>;
  if (error) return <p className="text-xl font-bold mb-4">Error in /result: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Uploaded PDF</h1>
      <iframe src={fileURL} width="100%" height="600px" title="PDF preview" />

      {extractedEvents && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Extracted Events:</h2>
          <ul className="list-disc pl-6">
            {extractedEvents.map((event, i) => (
              <li key={i}>
                <strong>{event.title}</strong> — {event.start} to {event.end}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
