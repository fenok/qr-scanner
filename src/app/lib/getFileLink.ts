export function getFileLink(filePath: string): string | undefined {
    return filePath ? encodeURI(`safe-file://${filePath}`) : undefined;
}
