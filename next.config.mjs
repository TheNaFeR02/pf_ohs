/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'randomuser.me',
            },
            {
                hostname: 'pf-ohs.vercel.app',
            },
            {
                hostname: 'images.pexels.com'
            }
        ]
    },
};

export default nextConfig;

// https://randomuser.me/api/portraits