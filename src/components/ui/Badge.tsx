import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type BadgeVariant =
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'outline'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
    neutral: 'bg-muted text-foreground',
    primary: 'bg-primary-subtle text-primary',
    secondary: 'bg-secondary-subtle text-secondary',
    success: 'bg-primary-subtle text-primary',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-secondary-subtle text-secondary',
    outline: 'border border-border-strong bg-surface text-foreground',
}

export function Badge({
    className,
    variant = 'neutral',
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                variantClasses[variant],
                className,
            )}
            {...props}
        >
            {children}
        </span>
    )
}
