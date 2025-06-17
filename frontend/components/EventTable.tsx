import { ExtractedEvent } from "@/lib/types";
interface Props {
    extractedEvents: ExtractedEvent[];
    onUpdate: (events: ExtractedEvent[]) => void;
}

export default function EventTable({ extractedEvents, onUpdate }: Props) {
    const handleFieldChange = (index: number, field: keyof ExtractedEvent, value: string) => {
        const updated = [...extractedEvents];
        updated[index] = { ...updated[index], [field]: value };
        onUpdate(updated);
    };

    const handleAddEvent = () => {
        const newEvent: ExtractedEvent = {
            title: "New Event",
            date: "",
            startTime: "",
            endTime: "",
            location: "",
        };
        onUpdate([...extractedEvents, newEvent]);
    };

    return (
        <div className="mt-4 max-h-[580px] overflow-y-auto pr-2 space-y-4">
            {/* <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition focus:outline-none focus:ring-2 focus:ring-neutral-500"
            >
                + Add Event
            </button> */}

            {extractedEvents && extractedEvents.length > 0 ? (
                <div className="space-y-4">
                    {extractedEvents.map((event, index) => (
                        <article
                            key={index}
                            className="border border-neutral-700 rounded-xl px-5 py-4 bg-[#0e0e0e] hover:border-neutral-600 transition animate-fade-in"
                        >
                            <div className="space-y-2 text-sm text-neutral-400">
                                <div>
                                    <label className="block text-white font-medium">Title:</label>
                                    <input
                                        type="text"
                                        value={event.title || ""}
                                        onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                                        className="w-full rounded-md bg-neutral-900 text-white px-2 py-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white font-medium">Date:</label>
                                    <input
                                        type="date"
                                        value={event.date || ""}
                                        onChange={(e) => handleFieldChange(index, "date", e.target.value)}
                                        className="w-full rounded-md bg-neutral-900 text-white px-2 py-1"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/2">
                                        <label className="block text-white font-medium">Start Time:</label>
                                        <input
                                            type="time"
                                            value={event.startTime || ""}
                                            onChange={(e) => handleFieldChange(index, "startTime", e.target.value)}
                                            className="w-full rounded-md bg-neutral-900 text-white px-2 py-1"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-white font-medium">End Time:</label>
                                        <input
                                            type="time"
                                            value={event.endTime || ""}
                                            onChange={(e) => handleFieldChange(index, "endTime", e.target.value)}
                                            className="w-full rounded-md bg-neutral-900 text-white px-2 py-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-white font-medium">Location:</label>
                                    <input
                                        type="text"
                                        value={event.location || ""}
                                        onChange={(e) => handleFieldChange(index, "location", e.target.value)}
                                        className="w-full rounded-md bg-neutral-900 text-white px-2 py-1"
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-neutral-500 text-center py-8">No events yet. Click “+ Add Event” to add one.</p>
            )}
        </div>
    );
}
