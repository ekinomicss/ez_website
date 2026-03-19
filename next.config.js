/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    async redirects() {
        return [{ source: '/resume', destination: '/about', permanent: true }]
    },
}

module.exports = nextConfig