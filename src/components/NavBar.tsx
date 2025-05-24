// components/NavBar.tsx
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-neutral-800">
      <div className="mx-12 h-16 flex items-center justify-between">
        <Link
          href="/home"
          className="text-white text-2xl font-semibold hover:opacity-80 transition-opacity"
        >
          Syncabus
        </Link>
      </div>
    </header>
  );
}
