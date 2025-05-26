import FileUpload from "@/components/FileUpload";
import {Line} from "@/components/SvgTechs";
export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-14 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <Line />
      </div>

      <div className="relative z-10 max-w-xl text-center mb-4 px-4">
        <h1 className="text-4xl font-extrabold text-neutral-100 mb-4">
          Turn Your Syllabus into a Smart Calendar
        </h1>
        <p className="text-lg text-neutral-400 mb-6">
          Upload your course syllabus and get a personalized <code>.ics</code> calendar file to keep your academic life organized.
        </p>
      </div>

      <div className="relative z-10 border border-neutral-800 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full max-w-md px-8 py-8">
        <div className="mb-5 text-center">
          <h2 className="text-xl font-semibold text-neutral-100">Upload Your Course Syllabus</h2>
          <p className="mt-1 text-xs text-neutral-500">One file only • Max 10MB</p>
        </div>
        <FileUpload />
      </div>
    </div>
  );
}
