/**
 * Escapes unescaped control characters inside JSON string literals.
 * LLMs sometimes return JSON with raw newlines/tabs in strings, which is invalid.
 */
export function sanitizeJsonForParse(jsonStr: string): string {
  let result = '';
  let inString = false;
  let i = 0;
  while (i < jsonStr.length) {
    const c = jsonStr[i];
    if (inString) {
      if (c === '\\') {
        result += c;
        if (i + 1 < jsonStr.length) {
          result += jsonStr[i + 1];
          i++;
        }
        i++;
        continue;
      }
      if (c === '"') {
        inString = false;
        result += c;
        i++;
        continue;
      }
      if (c === '\n') {
        result += '\\n';
      } else if (c === '\r') {
        result += '\\r';
      } else if (c === '\t') {
        result += '\\t';
      } else if (c.charCodeAt(0) < 32) {
        result += `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`;
      } else {
        result += c;
      }
      i++;
      continue;
    }
    if (c === '"') {
      inString = true;
    }
    result += c;
    i++;
  }
  return result;
}
