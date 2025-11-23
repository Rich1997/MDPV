export interface Heading {
    level: number;
    text: string;
    id: string;
}

export function extractHeadings(markdown: string): Heading[] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = Array.from(markdown.matchAll(headingRegex));
    const idMap = new Map<string, number>();

    return matches.map((match) => {
        const level = match[1].length;
        const text = match[2].trim();
        const baseId = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        const count = idMap.get(baseId) ?? 0;
        idMap.set(baseId, count + 1);
        const id = count === 0 ? baseId : `${baseId}-${count}`;

        return { level, text, id };
    });
}
