import Link from 'next/link'
import { AppLogo } from '@/components/AppLogo'
import { Badge, Button, Stack, Surface } from '@/components/ui'

export default function HomePage() {
    return (
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-8">
            <Stack gap="md" align="center" className="pt-4 text-center">
                <AppLogo size={96} priority />
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                        Italy 2026
                    </h1>
                    <p className="text-base leading-relaxed text-muted-foreground">
                        הטיול שלנו לאיטליה — מסמכים, תוכנית וכל מה שצריך במקום
                        אחד.
                    </p>
                </div>
                <Badge variant="primary">בקרוב</Badge>
            </Stack>

            <div className="grid gap-3">
                <Surface variant="raised" padding="lg">
                    <Stack gap="sm">
                        <h2 className="text-base font-semibold text-foreground">
                            מסמכים
                        </h2>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            כרטיסים, הזמנות וקבצים חשובים לטיול.
                        </p>
                        <Button href="/documents" className="mt-1">
                            למסמכים
                        </Button>
                    </Stack>
                </Surface>
                <Surface variant="raised" padding="lg">
                    <Stack gap="sm">
                        <h2 className="text-base font-semibold text-foreground">
                            תוכנית טיול
                        </h2>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            ימים, מקומות ולוח זמנים.
                        </p>
                        <Button href="/trip-plan" variant="secondary" className="mt-1">
                            לתוכנית
                        </Button>
                    </Stack>
                </Surface>
            </div>

            <p className="text-center text-xs text-muted-foreground">
                <Link
                    href="/design-system"
                    className="underline underline-offset-2"
                >
                    Design system
                </Link>
            </p>
        </main>
    )
}
