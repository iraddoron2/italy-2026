import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Heebo } from 'next/font/google'
import { BottomNav } from '@/components/navigation/BottomNav'
import './globals.css'

const heebo = Heebo({
    variable: '--font-heebo',
    subsets: ['hebrew', 'latin'],
    weight: ['300', '400', '500', '600', '700'],
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
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'none',
            'max-snippet': -1,
        },
    },
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
        { media: '(prefers-color-scheme: light)', color: '#4FBA74' },
        { media: '(prefers-color-scheme: dark)', color: '#4FBA74' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="he"
            dir="rtl"
            className={`${heebo.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="flex min-h-full flex-col font-hebrew">
                <div className="flex flex-1 flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
                    {children}
                </div>
                <BottomNav />
            </body>
        </html>
    )
}
