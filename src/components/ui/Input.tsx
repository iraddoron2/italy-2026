import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const fieldBase =
    'w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary disabled:opacity-50'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    hint?: string
    error?: string
}

export function Input({
    className,
    label,
    hint,
    error,
    id,
    ...props
}: InputProps) {
    const inputId = id ?? props.name

    return (
        <label className="flex w-full flex-col gap-1.5 text-sm">
            {label && (
                <span className="font-medium text-foreground">{label}</span>
            )}
            <input
                id={inputId}
                className={cn(
                    fieldBase,
                    'h-10',
                    error && 'border-danger focus-visible:ring-danger',
                    className,
                )}
                {...props}
            />
            {error ? (
                <span className="text-xs text-danger">{error}</span>
            ) : hint ? (
                <span className="text-xs text-muted-foreground">{hint}</span>
            ) : null}
        </label>
    )
}

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    hint?: string
}

export function Textarea({
    className,
    label,
    hint,
    id,
    ...props
}: TextareaProps) {
    const areaId = id ?? props.name

    return (
        <label className="flex w-full flex-col gap-1.5 text-sm">
            {label && (
                <span className="font-medium text-foreground">{label}</span>
            )}
            <textarea
                id={areaId}
                className={cn(fieldBase, 'min-h-24 py-2.5', className)}
                {...props}
            />
            {hint && (
                <span className="text-xs text-muted-foreground">{hint}</span>
            )}
        </label>
    )
}
