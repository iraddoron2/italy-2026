'use client'

import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { Badge, Surface } from '@/components/ui'

const sections = [
    {
        id: 'flights',
        title: 'טיסות',
        subtitle: 'כרטיסים ואישורי הזמנה',
        placeholder: 'כאן יופיעו כרטיסי הטיסה ומסמכי ההזמנה.',
    },
    {
        id: 'stays',
        title: 'לינה',
        subtitle: 'מלונות ודירות',
        placeholder: 'כאן יופיעו אישורי הזמנה ללינה.',
    },
    {
        id: 'transport',
        title: 'תחבורה',
        subtitle: 'רכבות, אוטובוסים והשכרת רכב',
        placeholder: 'כאן יופיעו כרטיסי רכבת ומסמכי תחבורה.',
    },
    {
        id: 'insurance',
        title: 'ביטוח',
        subtitle: 'ביטוח נסיעות ובריאות',
        placeholder: 'כאן יופיעו פוליסות הביטוח.',
    },
    {
        id: 'personal',
        title: 'מסמכים אישיים',
        subtitle: 'דרכונים, ויזות וזהות',
        placeholder: 'כאן יופיעו מסמכים אישיים חשובים.',
    },
    {
        id: 'bookings',
        title: 'הזמנות ואטרקציות',
        subtitle: 'מוזיאונים, סיורים ומסעדות',
        placeholder: 'כאן יופיעו אישורי הזמנה לאטרקציות.',
    },
    {
        id: 'other',
        title: 'אחר',
        subtitle: 'מסמכים נוספים',
        placeholder: 'כאן יופיעו מסמכים שלא נכנסו לקטגוריות האחרות.',
    },
] as const

export function DocumentsAccordion() {
    return (
        <Accordion>
            {sections.map((section) => (
                <AccordionItem
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    subtitle={section.subtitle}
                >
                    <Surface variant="sunken" padding="md" radius="md">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-sm text-muted-foreground">
                                    {section.placeholder}
                                </p>
                                <Badge variant="outline">בקרוב</Badge>
                            </div>
                            <div className="grid gap-2">
                                <PlaceholderRow label="מסמך לדוגמה 1" />
                                <PlaceholderRow label="מסמך לדוגמה 2" />
                            </div>
                        </div>
                    </Surface>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

function PlaceholderRow({ label }: { label: string }) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-border-strong bg-surface px-3 py-2.5">
            <span className="text-sm text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground">PDF</span>
        </div>
    )
}
