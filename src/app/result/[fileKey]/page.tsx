"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ResultPage() {
  const { fileKey } = useParams();
  const [fileURL, setFileURL] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileURL = async () => {
      try {
        const res = await fetch(`/api/retrieve?key=${fileKey}`);
        const data = await res.json();

        if (!res.ok || !data.url) {
          throw new Error(data.error || "Failed to fetch file URL");
        }

        setFileURL(data.url);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    if (typeof fileKey === "string") {
      fetchFileURL();
    } else {
      setError("Invalid file key");
      setLoading(false);
    }
  }, [fileKey]);

  if (loading) return <p className="text-neutral-400">Loading file...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Uploaded PDF</h1>
      <iframe src={fileURL} width="100%" height="600px" title="PDF preview" />
    </div>
  );
}
