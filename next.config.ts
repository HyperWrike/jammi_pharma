import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    async redirects() {
        return [
            {
                source: '/legacy',
                destination: '/heritage',
                permanent: false,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
