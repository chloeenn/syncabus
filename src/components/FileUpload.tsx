"use client"
import { useDropzone } from "react-dropzone"

export default function FileUpload() {
    const {getRootProps, getInputProps} = useDropzone()
    return(
        <div>
        <h1>file upload</h1>
        <div {...getRootProps()}>
           <input {...getInputProps()} />
           <p>Drag and Drop</p>
        </div>
        </div>
    )
}