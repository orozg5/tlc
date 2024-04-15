export function getExtension(text: string) {
  const parts = text.split(".");
  const extension = parts[parts.length - 1];
  return extension;
}
