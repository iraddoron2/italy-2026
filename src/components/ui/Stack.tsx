import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    label?: string
}

export function Divider({ className, label, ...props }: DividerProps) {
    if (!label) {
        return (
            <hr
                className={cn('border-0 border-t border-border', className)}
                {...props}
            />
        )
    }

    return (
        <div
            className={cn('flex items-center gap-3 text-xs text-muted-foreground', className)}
            role="separator"
        >
            <div className="h-px flex-1 bg-border" />
            <span>{label}</span>
            <div className="h-px flex-1 bg-border" />
        </div>
    )
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    direction?: 'row' | 'column'
    align?: 'start' | 'center' | 'end' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'between'
}

const gapClasses = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
}

export function Stack({
    className,
    gap = 'md',
    direction = 'column',
    align = 'stretch',
    justify = 'start',
    children,
    ...props
}: StackProps) {
    return (
        <div
            className={cn(
                'flex',
                direction === 'row' ? 'flex-row' : 'flex-col',
                gapClasses[gap],
                align === 'start' && 'items-start',
                align === 'center' && 'items-center',
                align === 'end' && 'items-end',
                align === 'stretch' && 'items-stretch',
                justify === 'start' && 'justify-start',
                justify === 'center' && 'justify-center',
                justify === 'end' && 'justify-end',
                justify === 'between' && 'justify-between',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}
