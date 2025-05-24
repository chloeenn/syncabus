import pdf from "pdf-parse";
import { downloadFromS3 } from "./s3";
export default async function parseDocument(fileKey:string) {
   console.log("parseDocument received key:", fileKey);
    try {
    const pdfBuffer = await downloadFromS3(fileKey);
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF document');
  }
}