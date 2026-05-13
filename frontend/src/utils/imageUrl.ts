/**
 * Resolves a profile or item image to a displayable URL.
 * - Full http/https URLs (Cloudinary) → returned as-is
 * - "default.jpg" or empty → returns the fallback
 * - Legacy filename → prefixed with the backend uploads path
 */
export function resolveImage(
    image: string | undefined | null,
    fallback: string,
    backendUrl?: string
): string {
    if (!image || image === "default.jpg") return fallback;
    if (image.startsWith("http")) return image;
    return `${backendUrl}/uploads/${image}`;
}
