import type { ReactNode } from 'react'
import Image from 'next/image'
import { AppLogo } from '@/components/AppLogo'
import {
    Alert,
    Badge,
    Button,
    Card,
    Divider,
    Input,
    Stack,
    Surface,
    Textarea,
} from '@/components/ui'
import { illustrations } from '@/design-system/illustrations'

const brandColors = [
    { name: 'Primary', token: 'primary', hex: '#4FBA74', className: 'bg-primary' },
    {
        name: 'Primary hover',
        token: 'primary-hover',
        hex: '#3FA664',
        className: 'bg-primary-hover',
    },
    {
        name: 'Primary subtle',
        token: 'primary-subtle',
        hex: '#EAF8EF',
        className: 'bg-primary-subtle border border-border',
    },
    {
        name: 'Secondary',
        token: 'secondary',
        hex: '#E86B74',
        className: 'bg-secondary',
    },
    {
        name: 'Secondary hover',
        token: 'secondary-hover',
        hex: '#D85761',
        className: 'bg-secondary-hover',
    },
    {
        name: 'Secondary subtle',
        token: 'secondary-subtle',
        hex: '#FFEFF0',
        className: 'bg-secondary-subtle border border-border',
    },
]

const neutralColors = [
    { name: 'Background', token: 'background', hex: '#FFFFFF', className: 'bg-background border border-border' },
    { name: 'Foreground', token: 'foreground', hex: '#121212', className: 'bg-foreground' },
    { name: 'Muted', token: 'muted', hex: '#F5F5F5', className: 'bg-muted border border-border' },
    {
        name: 'Muted fg',
        token: 'muted-foreground',
        hex: '#667085',
        className: 'bg-muted-foreground',
    },
    { name: 'Border', token: 'border', hex: '#E5E5E5', className: 'bg-border border border-border-strong' },
    {
        name: 'Sunken',
        token: 'surface-sunken',
        hex: '#F7F7F7',
        className: 'bg-surface-sunken border border-border',
    },
]

function Section({
    id,
    title,
    description,
    children,
}: {
    id: string
    title: string
    description: string
    children: ReactNode
}) {
    return (
        <section id={id} className="scroll-mt-6">
            <Stack gap="md">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                </div>
                {children}
            </Stack>
        </section>
    )
}

function ColorSwatch({
    name,
    token,
    hex,
    className,
}: {
    name: string
    token: string
    hex: string
    className: string
}) {
    return (
        <div className="flex flex-col gap-2">
            <div className={`h-16 w-full rounded-lg ${className}`} />
            <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                    {token}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                    {hex}
                </span>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <div className="flex flex-1 flex-col bg-background">
            <header className="border-b border-border bg-surface">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <AppLogo size={40} priority />
                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                Italy 2026
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Design system
                            </p>
                        </div>
                    </div>
                    <Badge variant="primary">v0.1</Badge>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-12">
                <div className="flex flex-col gap-3">
                    <Badge variant="outline">Foundations</Badge>
                    <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Design system showcase
                    </h1>
                    <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                        Soft, cheerful green and coral-red on a white canvas,
                        with Heebo for Hebrew. These tokens and components are
                        the visual base for the Italy 2026 trip companion.
                    </p>
                </div>

                <nav className="flex flex-wrap gap-2">
                    {[
                        ['logo', 'Logo'],
                        ['illustrations', 'Illustrations'],
                        ['colors', 'Colors'],
                        ['typography', 'Typography'],
                        ['hebrew', 'Hebrew'],
                        ['surfaces', 'Surfaces'],
                        ['buttons', 'Buttons'],
                        ['badges', 'Badges'],
                        ['forms', 'Forms'],
                        ['cards', 'Cards'],
                        ['alerts', 'Alerts'],
                    ].map(([href, label]) => (
                        <a
                            key={href}
                            href={`#${href}`}
                            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <Divider />

                <Section
                    id="logo"
                    title="App logo"
                    description="Pasta-in-cheese logo for the iPhone home-screen icon and in-app branding. Black frame removed; cream corners match the artwork."
                >
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Surface variant="raised" padding="lg">
                            <Stack gap="sm" align="center">
                                <AppLogo size={96} />
                                <p className="text-sm text-muted-foreground">
                                    In-app · 96px
                                </p>
                            </Stack>
                        </Surface>
                        <Surface variant="raised" padding="lg">
                            <Stack gap="sm" align="center">
                                <AppLogo size={64} />
                                <p className="text-sm text-muted-foreground">
                                    Header · 64px
                                </p>
                            </Stack>
                        </Surface>
                        <Surface variant="sunken" padding="lg">
                            <Stack gap="sm" align="center">
                                <AppLogo size={180} className="shadow-md" />
                                <p className="text-sm text-muted-foreground">
                                    Home screen · 180px
                                </p>
                            </Stack>
                        </Surface>
                    </div>
                </Section>

                <Section
                    id="illustrations"
                    title="Illustrations"
                    description="Travel and food artwork split from the Italy items sheet. Use by id from the design-system registry."
                >
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {illustrations.map((item) => (
                            <Surface
                                key={item.id}
                                variant="raised"
                                padding="md"
                                className="flex flex-col items-center gap-3"
                            >
                                <div className="relative aspect-square w-full shrink-0">
                                    <Image
                                        src={item.src}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 640px) 45vw, 160px"
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex w-full flex-col items-center gap-0.5 text-center">
                                    <p className="text-sm font-medium text-foreground">
                                        {item.name}
                                    </p>
                                    <p className="font-mono text-[11px] text-muted-foreground">
                                        {item.id}
                                    </p>
                                </div>
                            </Surface>
                        ))}
                    </div>
                </Section>

                <Section
                    id="colors"
                    title="Color palette"
                    description="Cheerful Italian-inspired green and coral-red, white background. Neutrals handle text, borders, and quiet surfaces."
                >
                    <Stack gap="lg">
                        <div>
                            <p className="mb-3 text-sm font-medium text-foreground">
                                Brand
                            </p>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                {brandColors.map((color) => (
                                    <ColorSwatch key={color.token} {...color} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="mb-3 text-sm font-medium text-foreground">
                                Neutrals
                            </p>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                {neutralColors.map((color) => (
                                    <ColorSwatch key={color.token} {...color} />
                                ))}
                            </div>
                        </div>
                    </Stack>
                </Section>

                <Section
                    id="typography"
                    title="Typography"
                    description="Geist Sans for Latin UI. Keep hierarchy tight and readable on phone screens."
                >
                    <Surface variant="raised" padding="lg">
                        <Stack gap="md">
                            <p className="text-4xl font-semibold tracking-tight">
                                Display / H1
                            </p>
                            <p className="text-2xl font-semibold tracking-tight">
                                Heading / H2
                            </p>
                            <p className="text-xl font-semibold">Title / H3</p>
                            <p className="text-base text-foreground">
                                Body — plan days, pin places, and keep the trip
                                notes in one place.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Muted — supporting copy, captions, and helper
                                text.
                            </p>
                            <p className="font-mono text-sm text-foreground">
                                Mono — Roma · Firenze · Venezia
                            </p>
                        </Stack>
                    </Surface>
                </Section>

                <Section
                    id="hebrew"
                    title="Hebrew · Heebo"
                    description="Google Font Heebo for Hebrew UI. RTL samples for titles, body, and muted text."
                >
                    <Surface variant="raised" padding="lg">
                        <Stack gap="md" className="font-hebrew" dir="rtl">
                            <p className="text-4xl font-semibold tracking-tight">
                                איטליה 2026
                            </p>
                            <p className="text-2xl font-semibold tracking-tight">
                                יומן הטיול
                            </p>
                            <p className="text-xl font-medium">
                                לוח זמנים ליום הראשון ברומא
                            </p>
                            <p className="text-base font-normal leading-relaxed text-foreground">
                                תכננו ימים, שמרו מקומות חשובים, ורכזו את כל
                                הערות הטיול במקום אחד.
                            </p>
                            <p className="text-sm font-light text-muted-foreground">
                                טקסט משני — כיתובים, רמזים והנחיות קצרות.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                <Badge variant="primary">מתוכנן</Badge>
                                <Badge variant="secondary">תחבורה</Badge>
                                <Badge variant="outline">הערות</Badge>
                            </div>
                            <div className="flex flex-wrap gap-3 pt-1">
                                <Button>שמירה</Button>
                                <Button variant="secondary">מחיקה</Button>
                                <Button variant="outline">ביטול</Button>
                            </div>
                        </Stack>
                    </Surface>
                </Section>

                <Section
                    id="surfaces"
                    title="Surfaces"
                    description="Surfaces layer content on the white background without heavy chrome."
                >
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Surface variant="default">
                            <p className="text-sm font-medium">Default</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Border only
                            </p>
                        </Surface>
                        <Surface variant="raised">
                            <p className="text-sm font-medium">Raised</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Soft shadow
                            </p>
                        </Surface>
                        <Surface variant="sunken">
                            <p className="text-sm font-medium">Sunken</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Recessed panel
                            </p>
                        </Surface>
                        <Surface variant="muted">
                            <p className="text-sm font-medium">Muted</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Quiet fill
                            </p>
                        </Surface>
                        <Surface variant="primary">
                            <p className="text-sm font-medium text-primary">
                                Primary subtle
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Green tint
                            </p>
                        </Surface>
                        <Surface variant="secondary">
                            <p className="text-sm font-medium text-secondary">
                                Secondary subtle
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Red tint
                            </p>
                        </Surface>
                    </div>
                </Section>

                <Section
                    id="buttons"
                    title="Buttons"
                    description="Primary actions use green. Secondary / destructive emphasis uses red. Outline and ghost stay quiet."
                >
                    <Surface variant="raised" padding="lg">
                        <Stack gap="lg">
                            <div className="flex flex-wrap gap-3">
                                <Button>Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="soft">Soft</Button>
                                <Button variant="danger">Danger</Button>
                                <Button disabled>Disabled</Button>
                            </div>
                            <Divider label="Sizes" />
                            <div className="flex flex-wrap items-center gap-3">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </div>
                            <Button fullWidth>Full width CTA</Button>
                        </Stack>
                    </Surface>
                </Section>

                <Section
                    id="badges"
                    title="Badges"
                    description="Compact status and category labels."
                >
                    <div className="flex flex-wrap gap-2">
                        <Badge>Neutral</Badge>
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="danger">Danger</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </Section>

                <Section
                    id="forms"
                    title="Form controls"
                    description="Simple labeled inputs for trip notes and filters."
                >
                    <Surface variant="raised" padding="lg">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input
                                label="City"
                                placeholder="Florence"
                                hint="Where you are staying"
                            />
                            <Input
                                label="Date"
                                type="date"
                                defaultValue="2026-06-12"
                            />
                            <Input
                                label="Invalid example"
                                defaultValue="???"
                                error="Enter a valid place name"
                            />
                            <Textarea
                                label="Notes"
                                placeholder="Gelato stops, train times…"
                                hint="Shown on the day detail screen later"
                            />
                        </div>
                    </Surface>
                </Section>

                <Section
                    id="cards"
                    title="Cards"
                    description="Primary content containers for days, places, and lists."
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Card
                            title="Day 1 · Rome"
                            description="Colosseum morning, Trastevere dinner."
                            footer={
                                <>
                                    <Badge variant="primary">Planned</Badge>
                                    <Button size="sm" variant="outline">
                                        Open
                                    </Button>
                                </>
                            }
                        >
                            <Surface variant="sunken" padding="sm" radius="md">
                                <p className="text-sm text-muted-foreground">
                                    3 stops · 2 reservations
                                </p>
                            </Surface>
                        </Card>
                        <Card
                            title="Train · Roma → Firenze"
                            description="Morning Freccia. Keep tickets in wallet."
                            footer={
                                <>
                                    <Badge variant="secondary">Transport</Badge>
                                    <Button size="sm">Details</Button>
                                </>
                            }
                            media={
                                <div className="flex h-28 items-end bg-primary-subtle px-5 pb-4">
                                    <p className="text-sm font-semibold text-primary">
                                        1h 22m · platform TBD
                                    </p>
                                </div>
                            }
                        />
                    </div>
                </Section>

                <Section
                    id="alerts"
                    title="Alerts"
                    description="Inline feedback for plans, warnings, and errors."
                >
                    <Stack gap="sm">
                        <Alert variant="success" title="Synced">
                            Your itinerary draft is saved on this device.
                        </Alert>
                        <Alert variant="info" title="Tip">
                            Add the app to your iPhone home screen for the full
                            icon.
                        </Alert>
                        <Alert variant="warning" title="Check tickets">
                            Firenze museum booking closes 48 hours before entry.
                        </Alert>
                        <Alert variant="danger" title="Conflict">
                            Two dinner reservations overlap on Day 3.
                        </Alert>
                    </Stack>
                </Section>

                <Divider label="End of showcase" />

                <Surface variant="primary" padding="lg">
                    <Stack gap="sm">
                        <p className="text-sm font-semibold text-primary">
                            Next
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Product screens will compose these tokens and
                            components. Content for the Italy 2026 trip comes
                            next.
                        </p>
                    </Stack>
                </Surface>
            </main>
        </div>
    )
}
