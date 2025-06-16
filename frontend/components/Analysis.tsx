"use client";

import { useEffect, useState } from "react";
import { ExtractedEvent } from "@/lib/types";
import { RefreshCw } from "lucide-react"; 

interface WeeklyDeadline {
  week: number;
  deadline_count: number;
}

interface AnalysisProps {
  events: ExtractedEvent[];
  apiBaseUrl: string;
}

export default function Analysis({ events, apiBaseUrl }: AnalysisProps) {
  const [weeklyDeadlines, setWeeklyDeadlines] = useState<WeeklyDeadline[]>([]);
  const [chartBase64, setChartBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBaseUrl}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events }),
      });
      if (!res.ok) throw new Error("Failed to fetch analysis");
      const data = await res.json();
      setWeeklyDeadlines(data.weekly_deadlines);
      setChartBase64(data.deadlines_per_week_chart_base64);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (events && events.length > 0) {
      fetchAnalysis();
    }
  }, [events, apiBaseUrl]);

  if (loading) {
    return (
      <section className="mt-10 bg-[#111111] p-6 rounded-2xl border border-neutral-800 shadow-lg">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-white border-b-transparent rounded-full animate-spin" />
          <p className="mt-4 text-lg text-neutral-400 animate-pulse">
            Analyzing deadlines<span className="inline-block animate-bounce">.</span>
            <span className="inline-block animate-bounce delay-100">.</span>
            <span className="inline-block animate-bounce delay-200">.</span>
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-10 bg-black p-6 rounded-2xl border border-neutral-800 shadow-lg">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-500 text-xl font-medium mb-4">Error: {error}</p>
          <button
            onClick={fetchAnalysis}
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-white text-black rounded-md hover:bg-neutral-100 transition focus:outline-none focus:ring-2 focus:ring-neutral-500"
            aria-label="Retry fetching analysis"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (!weeklyDeadlines.length) {
    return (
      <section className="mt-10 bg-black p-6 rounded-2xl border border-neutral-800 shadow-lg">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-neutral-500 text-lg text-center">
            No deadline data available. Try uploading a different file.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 bg-black p-6 rounded-2xl border border-neutral-800 shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-white">Weekly Deadlines Analysis</h2>

      {chartBase64 ? (
        <img
          src={`data:image/png;base64,${chartBase64}`}
          alt="Bar chart showing deadlines per week"
          className="max-w-full h-auto mb-6 rounded animate-fade-in"
          loading="lazy"
          aria-label="Bar chart displaying the number of deadlines per week"
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-[#0e0e0e] rounded mb-6">
          <p className="text-neutral-500">Unable to load chart.</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table
          className="w-full text-sm border-collapse border border-neutral-700 text-white"
          role="grid"
          aria-label="Weekly deadlines table"
        >
          <caption className="sr-only">Weekly Deadlines</caption>
          <thead>
            <tr className="sticky top-0 bg-black z-10">
              <th
                scope="col"
                className="border border-neutral-700 px-4 py-3 text-left font-semibold"
              >
                Week Number
              </th>
              <th
                scope="col"
                className="border border-neutral-700 px-4 py-3 text-left font-semibold"
              >
                Deadline Count
              </th>
            </tr>
          </thead>
          <tbody>
            {weeklyDeadlines.map(({ week, deadline_count }, index) => (
              <tr
                key={week}
                className={`${
                  index % 2 === 0 ? "bg-[#0e0e0e]" : "bg-[#1a1a1a]"
                } hover:bg-neutral-800 transition focus:outline-none focus:ring-2 focus:ring-neutral-500`}
                tabIndex={0}
                role="row"
              >
                <td className="border border-neutral-700 px-4 py-2">{week}</td>
                <td className="border border-neutral-700 px-4 py-2">
                  {deadline_count}
                  {deadline_count > 5 && (
                    <span className="ml-2 text-yellow-400" aria-label="High deadline count">
                      ⚠️
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}