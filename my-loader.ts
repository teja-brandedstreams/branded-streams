export default function customLoader({
    src,
    width,
    quality,
}: {
    src: string
    width: number
    quality?: number
}) {
    if (src.startsWith('/')) {
        // Handle local images
        return src; // Returns local path for public folder images
    }

    // Cloudinary logic for external images
    const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
    return `https://res.cloudinary.com/demo/image/upload/${params.join(',')}${src}`;
}
