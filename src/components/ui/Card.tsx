import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SurfaceVariant = 'default' | 'raised' | 'sunken' | 'muted' | 'primary' | 'secondary'

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
    variant?: SurfaceVariant
    padding?: 'none' | 'sm' | 'md' | 'lg'
    radius?: 'sm' | 'md' | 'lg' | 'xl'
}

const variantClasses: Record<SurfaceVariant, string> = {
    default: 'bg-surface border border-border',
    raised: 'bg-surface-raised border border-border shadow-md',
    sunken: 'bg-surface-sunken border border-border',
    muted: 'bg-muted border border-transparent',
    primary: 'bg-primary-subtle border border-primary/20',
    secondary: 'bg-secondary-subtle border border-secondary/20',
}

const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
}

const radiusClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
}

export function Surface({
    className,
    variant = 'default',
    padding = 'md',
    radius = 'lg',
    children,
    ...props
}: SurfaceProps) {
    return (
        <div
            className={cn(
                variantClasses[variant],
                paddingClasses[padding],
                radiusClasses[radius],
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string
    description?: string
    footer?: ReactNode
    media?: ReactNode
}

export function Card({
    className,
    title,
    description,
    footer,
    media,
    children,
    ...props
}: CardProps) {
    return (
        <Surface
            variant="raised"
            padding="none"
            radius="xl"
            className={cn('overflow-hidden', className)}
            {...props}
        >
            {media}
            <div className="flex flex-col gap-3 p-5">
                {(title || description) && (
                    <div className="flex flex-col gap-1">
                        {title && (
                            <h3 className="text-base font-semibold text-foreground">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                {children}
                {footer && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        {footer}
                    </div>
                )}
            </div>
        </Surface>
    )
}
