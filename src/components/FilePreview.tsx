
export default function FilePreview(fileURL: string | undefined) {
    return (
        <div>
            <iframe src={fileURL} width="100%" height="600px" title="PDF preview" />
        </div>
    );
}