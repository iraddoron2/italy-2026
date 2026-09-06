import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant
    title?: string
    icon?: ReactNode
}

const variantClasses: Record<AlertVariant, string> = {
    info: 'border-info/25 bg-blue-50 text-foreground',
    success: 'border-primary/25 bg-primary-subtle text-foreground',
    warning: 'border-warning/30 bg-amber-50 text-foreground',
    danger: 'border-secondary/25 bg-secondary-subtle text-foreground',
}

const titleClasses: Record<AlertVariant, string> = {
    info: 'text-info',
    success: 'text-primary',
    warning: 'text-amber-800',
    danger: 'text-secondary',
}

export function Alert({
    className,
    variant = 'info',
    title,
    icon,
    children,
    ...props
}: AlertProps) {
    return (
        <div
            role="status"
            className={cn(
                'flex gap-3 rounded-lg border px-4 py-3 text-sm',
                variantClasses[variant],
                className,
            )}
            {...props}
        >
            {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
            <div className="flex flex-col gap-1">
                {title && (
                    <p className={cn('font-semibold', titleClasses[variant])}>
                        {title}
                    </p>
                )}
                <div className="leading-relaxed text-muted-foreground">
                    {children}
                </div>
            </div>
        </div>
    )
}
