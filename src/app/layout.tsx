import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: {
        default: 'Italy 2026',
        template: '%s · Italy 2026',
    },
    description: 'Italy 2026 trip companion — coming soon.',
    applicationName: 'Italy 2026',
    appleWebApp: {
        capable: true,
        title: 'Italy 2026',
        statusBarStyle: 'default',
    },
    formatDetection: {
        telephone: false,
    },
    icons: {
        icon: [
            { url: '/icons/icon-32.png', sizes: '32x32', type: 'image/png' },
            { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        ],
        apple: [
            {
                url: '/icons/icon-180.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },
    other: {
        'mobile-web-app-capable': 'yes',
    },
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#008C45' },
        { media: '(prefers-color-scheme: dark)', color: '#008C45' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    )
}
