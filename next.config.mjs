
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        loader: 'custom',
        loaderFile: './my-loader.ts',
    },
    reactStrictMode: false,
};

export default nextConfig;
