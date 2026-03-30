/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [{ source: '/resume', destination: '/about', permanent: true }]
    },
}

module.exports = nextConfig