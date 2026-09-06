import type { ReactNode } from 'react'

export function PageHeader({
    title,
    description,
}: {
    title: string
    description?: string
}) {
    return (
        <header className="border-b border-border bg-surface px-4 py-4">
            <div className="mx-auto w-full max-w-lg">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    {title}
                </h1>
                {description ? (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </div>
        </header>
    )
}

export function PageShell({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col">
            {children}
        </div>
    )
}
