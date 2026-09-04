
function extractPlainText(node: unknown): string {
  if (!node) return '';

  if (typeof node === 'string') {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(extractPlainText).filter(Boolean).join(' ');
  }

  if (typeof node === 'object' && node !== null) {
    const obj = node as Record<string, unknown>;

    if (typeof obj.text === 'string') {
      return obj.text;
    }

    if (Array.isArray(obj.content)) {
      return extractPlainText(obj.content);
    }
  }

  return '';
}

export function getPostSummary(jsonContent: unknown, maxLength = 400): string {
  if (!jsonContent) return '';

  let parsed: unknown = jsonContent;

  if (typeof jsonContent === 'string') {
    try {
      parsed = JSON.parse(jsonContent);
    } catch {
      parsed = jsonContent;
    }
  }

  const rawText = extractPlainText(parsed);
  const cleanText = rawText.replace(/\s+/g, ' ').trim();

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return cleanText.slice(0, maxLength) + '...';
}
