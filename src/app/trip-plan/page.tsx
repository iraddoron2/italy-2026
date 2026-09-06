import { cn } from '@/lib/cn'

export const metadata = {
    title: 'תוכנית טיול',
}

const days = [
    {
        day: 1,
        date: 'יום א׳ · 12.6.2026',
        city: 'רומא',
        summary: 'הגעה והתארגנות',
        items: ['נחיתה בפיאומיצ׳ינו', 'צ׳ק־אין במלון', 'טיול ערב בטרסטוורה'],
    },
    {
        day: 2,
        date: 'יום ב׳ · 13.6.2026',
        city: 'רומא',
        summary: 'עתיקות העיר',
        items: ['קולוסיאום', 'פורום רומאנום', 'גלידה בפיהצה נבונה'],
    },
    {
        day: 3,
        date: 'יום ג׳ · 14.6.2026',
        city: 'רומא',
        summary: 'ותיקן ואמנות',
        items: ['מוזיאוני הוותיקן', 'כיכר סנט פטרוס', 'ערב חופשי'],
    },
    {
        day: 4,
        date: 'יום ד׳ · 15.6.2026',
        city: 'פירנצה',
        summary: 'מעבר לצפון',
        items: ['רכבת לפירנצה', 'צ׳ק־אין', 'גשר הווקיאו'],
    },
    {
        day: 5,
        date: 'יום ה׳ · 16.6.2026',
        city: 'פירנצה',
        summary: 'רנסנס',
        items: ['דואומו', 'גאלריית האופיצי', 'גני בובולי'],
    },
    {
        day: 6,
        date: 'יום ו׳ · 17.6.2026',
        city: 'פירנצה / פיזה',
        summary: 'יום מחוץ לעיר',
        items: ['נסיעה לפיזה', 'המגדל הנטוי', 'חזרה לפירנצה'],
    },
    {
        day: 7,
        date: 'יום ש׳ · 18.6.2026',
        city: 'ונציה',
        summary: 'תעלות וגשרים',
        items: ['רכבת לוונציה', 'גונדולה', 'כיכר סן מרקו'],
    },
    {
        day: 8,
        date: 'יום א׳ · 19.6.2026',
        city: 'ונציה',
        summary: 'סיום וחזרה',
        items: ['איי הלגונה', 'קניות אחרונות', 'יציאה לשדה התעופה'],
    },
] as const

export default function TripPlanPage() {
    return (
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 flex-col">
                {days.map((day) => {
                    const isEven = day.day % 2 === 0
                    return (
                        <section
                            key={day.day}
                            id={`day-${day.day}`}
                            className={cn(
                                'px-4 py-10',
                                isEven
                                    ? 'bg-secondary-deep text-secondary-foreground'
                                    : 'bg-primary-deep text-primary-foreground',
                            )}
                        >
                            <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
                                <header className="flex flex-col items-center gap-3 text-center">
                                    <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
                                        {day.city}
                                    </h2>
                                    <div
                                        aria-hidden
                                        className={cn(
                                            'h-0.5 w-16 rounded-full',
                                            isEven
                                                ? 'bg-secondary-foreground/70'
                                                : 'bg-primary-foreground/70',
                                        )}
                                    />
                                    <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                        יום {day.day}
                                    </p>
                                    <p
                                        className={cn(
                                            'text-sm',
                                            isEven
                                                ? 'text-secondary-foreground/85'
                                                : 'text-primary-foreground/85',
                                        )}
                                    >
                                        {day.date} · {day.summary}
                                    </p>
                                </header>

                                <ul className="flex flex-col gap-2">
                                    {day.items.map((item) => (
                                        <li
                                            key={item}
                                            className={cn(
                                                'rounded-xl px-4 py-3 text-center text-sm font-medium',
                                                isEven
                                                    ? 'bg-secondary-foreground/15'
                                                    : 'bg-primary-foreground/15',
                                            )}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <p
                                    className={cn(
                                        'text-center text-xs',
                                        isEven
                                            ? 'text-secondary-foreground/70'
                                            : 'text-primary-foreground/70',
                                    )}
                                >
                                    תוכן מלא ליום זה יתווסף בהמשך.
                                </p>
                            </div>
                        </section>
                    )
                })}
            </main>
        </div>
    )
}
