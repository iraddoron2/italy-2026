import Image from 'next/image'
import { cn } from '@/lib/cn'

/** Dedicated safe-inset logo asset (18% margin). */
const LOGO_SRC = '/logo-app.png'

export interface AppLogoProps {
    size?: number
    className?: string
    priority?: boolean
}

export function AppLogo({ size = 36, className, priority = false }: AppLogoProps) {
    return (
        <span
            className={cn(
                'relative inline-block shrink-0 overflow-hidden rounded-[22%] bg-[#FBF7F1]',
                className,
            )}
            style={{ width: size, height: size }}
        >
            <Image
                src={LOGO_SRC}
                alt="Italy 2026"
                width={size}
                height={size}
                priority={priority}
                className="h-full w-full object-contain"
            />
        </span>
    )
}
