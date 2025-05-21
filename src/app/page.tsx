import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#161b22] text-white flex items-center justify-center px-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full max-w-md px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-neutral-100">Upload PDF</h1>
          <p className="mt-2 text-sm text-neutral-500">One file only • Max 10MB</p>
        </div>
        <FileUpload />
      </div>
    </div>
  );
}
