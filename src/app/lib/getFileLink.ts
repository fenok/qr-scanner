export function getFileLink(filePath: string): string | undefined {
    return filePath ? `safe-file://${filePath}` : undefined;
}
