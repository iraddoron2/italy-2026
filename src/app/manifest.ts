import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Italy 2026',
        short_name: 'Italy 2026',
        description: 'Italy 2026 trip companion — coming soon.',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#F4F5F0',
        theme_color: '#008C45',
        icons: [
            {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    }
}
