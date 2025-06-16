"use client";
import { useDropzone } from "react-dropzone";
import { FileUp } from "lucide-react";
import { redirect } from "next/navigation";

export default function FileUpload() {
    const handleDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        //Upload file to AWS S3
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            const { error } = await response.json();
            throw new Error(error || "Failed to upload file");
        }
        const data = await response.json();
        console.log("File uploaded:", data.fileName, data.fileKey);
        console.log(`File uri: ${encodeURIComponent(data.fileKey)}`)
        redirect(`result/${encodeURIComponent(data.fileKey)}`)
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
    });

    return (
        <div role="presentation"
            {...getRootProps()}
            className="border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors duration-300 text-white rounded-xl px-6 py-16 text-center shadow-lg cursor-pointer select-none"
        >
            <input {...getInputProps()} />
            <FileUp className="w-10 h-10 mx-auto text-neutral-400 mb-4 transition-transform duration-300 group-hover:scale-105" />
            <p className="text-lg font-medium text-neutral-100 mb-1">
                Drag & Drop your PDF
            </p>
            <p className="text-sm text-neutral-500">or click to browse</p>
        </div>
    );
}
