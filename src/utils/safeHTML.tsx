import DOMPurify from "dompurify";

export function SafeHTML({ html }: { html: string }) {
	const cleanHTML = DOMPurify.sanitize(html);

	return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}
