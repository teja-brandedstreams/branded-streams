
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        loader: 'custom',
        loaderFile: './my-loader.ts',
    },
    reactStrictMode: true,
};

export default nextConfig;
