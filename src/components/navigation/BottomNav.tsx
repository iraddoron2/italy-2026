'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppLogo } from '@/components/AppLogo'
import { cn } from '@/lib/cn'

const tabs = [
    {
        href: '/documents',
        label: 'מסמכים',
        icon: DocumentsIcon,
    },
    {
        href: '/',
        label: 'בית',
        icon: HomeIcon,
        isHome: true,
    },
    {
        href: '/trip-plan',
        label: 'תוכנית טיול',
        icon: TripPlanIcon,
    },
] as const

function DocumentsIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 3.75h7.5L19 8.25v12A1.75 1.75 0 0 1 17.25 22h-10.5A1.75 1.75 0 0 1 5 20.25v-14.5A1.75 1.75 0 0 1 7 3.75Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.5 3.75V8.5H19M8.5 12.5h7M8.5 16.5h7"
            />
        </svg>
    )
}

function HomeIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 4l7.5 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-4.5v-5.25h-3V21.5H6A1.5 1.5 0 0 1 4.5 20v-9.5Z"
            />
        </svg>
    )
}

function TripPlanIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 3.5v3M16 3.5v3M5.5 8.5h13M6.75 5.5h10.5A1.75 1.75 0 0 1 19 7.25v11.5A1.75 1.75 0 0 1 17.25 20.5H6.75A1.75 1.75 0 0 1 5 18.75V7.25A1.75 1.75 0 0 1 6.75 5.5Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.5 12.5h3M8.5 16h7"
            />
        </svg>
    )
}

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav
            aria-label="ניווט ראשי"
            className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur-md"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="mx-auto grid h-14 max-w-lg grid-cols-3 items-center px-2">
                {tabs.map((tab) => {
                    const active =
                        tab.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(tab.href)
                    const Icon = tab.icon

                    if ('isHome' in tab && tab.isHome) {
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                aria-label={tab.label}
                                aria-current={active ? 'page' : undefined}
                                className="flex items-center justify-center"
                            >
                                <span
                                    className={cn(
                                        'flex h-11 w-11 items-center justify-center rounded-full border-2 bg-surface shadow-md transition-colors',
                                        active
                                            ? 'border-primary'
                                            : 'border-border',
                                    )}
                                >
                                    <AppLogo size={32} />
                                </span>
                            </Link>
                        )
                    }

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            aria-label={tab.label}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                                'flex items-center justify-center transition-colors',
                                active
                                    ? 'text-primary'
                                    : 'text-muted-foreground',
                            )}
                        >
                            <Icon className="h-6 w-6" />
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
