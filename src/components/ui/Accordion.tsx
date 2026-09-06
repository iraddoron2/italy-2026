'use client'

import {
    createContext,
    useCallback,
    useContext,
    useId,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'

interface AccordionContextValue {
    openId: string | null
    toggle: (id: string) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordion() {
    const ctx = useContext(AccordionContext)
    if (!ctx) {
        throw new Error('Accordion components must be used within Accordion')
    }
    return ctx
}

export interface AccordionProps {
    children: ReactNode
    className?: string
    defaultOpenId?: string | null
}

export function Accordion({
    children,
    className,
    defaultOpenId = null,
}: AccordionProps) {
    const [openId, setOpenId] = useState<string | null>(defaultOpenId)

    const toggle = useCallback((id: string) => {
        setOpenId((current) => (current === id ? null : id))
    }, [])

    const value = useMemo(() => ({ openId, toggle }), [openId, toggle])

    return (
        <AccordionContext.Provider value={value}>
            <div className={cn('flex flex-col gap-2', className)}>{children}</div>
        </AccordionContext.Provider>
    )
}

export interface AccordionItemProps {
    id: string
    title: string
    subtitle?: string
    children: ReactNode
    className?: string
}

export function AccordionItem({
    id,
    title,
    subtitle,
    children,
    className,
}: AccordionItemProps) {
    const { openId, toggle } = useAccordion()
    const open = openId === id
    const panelId = useId()
    const buttonId = useId()

    return (
        <div
            className={cn(
                'overflow-hidden rounded-xl border border-border bg-surface shadow-sm',
                className,
            )}
        >
            <h2>
                <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(id)}
                    className={cn(
                        'flex w-full items-center gap-3 px-4 py-3.5 text-right transition-colors duration-200',
                        'hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                    )}
                >
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="text-sm font-semibold text-foreground">
                            {title}
                        </span>
                        {subtitle ? (
                            <span className="text-xs text-muted-foreground">
                                {subtitle}
                            </span>
                        ) : null}
                    </span>
                    <span
                        aria-hidden
                        className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 ease-out',
                            open && 'rotate-180 bg-primary-subtle text-primary',
                        )}
                    >
                        <ChevronIcon className="h-4 w-4" />
                    </span>
                </button>
            </h2>
            <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                    open
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0',
                )}
            >
                <div className="min-h-0 overflow-hidden">
                    <div
                        className={cn(
                            'border-t border-border px-4 py-4 transition-transform duration-300 ease-out',
                            open ? 'translate-y-0' : '-translate-y-1',
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChevronIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.5 7.5 10 12l4.5-4.5"
            />
        </svg>
    )
}
