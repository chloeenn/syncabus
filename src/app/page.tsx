import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#161b22] text-white flex items-center justify-center px-4">
      <div className="bg-[#1e242c] rounded-2xl p-8 shadow-2xl w-full max-w-md border border-[#30363d]">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Your PDF</h1>
        <FileUpload />
      </div>
    </div>
  );
}
