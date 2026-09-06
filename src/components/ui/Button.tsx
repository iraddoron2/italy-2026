import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'soft'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-sm',
    secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active shadow-sm',
    outline:
        'border border-border-strong bg-surface text-foreground hover:bg-muted',
    ghost: 'bg-transparent text-foreground hover:bg-muted',
    danger:
        'bg-danger text-white hover:bg-secondary-hover active:bg-secondary-active shadow-sm',
    soft: 'bg-primary-subtle text-primary hover:bg-primary/15',
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-8 gap-1.5 px-3 text-sm',
    md: 'h-10 gap-2 px-4 text-sm',
    lg: 'h-12 gap-2 px-5 text-base',
}

function buttonClassName({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
}: {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
    className?: string
}) {
    return cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-45',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
    )
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    href?: string
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    type = 'button',
    disabled,
    href,
    ...props
}: ButtonProps) {
    const classes = buttonClassName({ variant, size, fullWidth, className })

    if (href) {
        return (
            <Link href={href} className={classes}>
                {leftIcon}
                {children}
                {rightIcon}
            </Link>
        )
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={classes}
            {...props}
        >
            {leftIcon}
            {children}
            {rightIcon}
        </button>
    )
}
