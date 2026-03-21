'use client'

import { usePathname } from 'next/navigation'

const navLinks: { path: string; label: string }[] = [
    { path: '/about', label: 'About' },
    { path: '/work', label: 'Work' },
    { path: '/fun', label: 'Fun' },
    { path: '/contact', label: 'Contact' },
]

/** Flat “shell line” — no shadows, no gradient box */
const buttonBase =
    'group inline-flex items-center gap-1.5 border-l-2 border-transparent bg-transparent py-1.5 pl-2 pr-3 font-mono text-[13px] font-normal tracking-tight text-slate-200 transition-[color,background-color,border-color] duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-emerald-500/60 disabled:pointer-events-none disabled:opacity-40'

const buttonHover =
    'hover:border-l-emerald-400/80 hover:bg-emerald-500/[0.07] hover:text-emerald-100'

/** Current page: same family as hover, slightly stronger bar + tint */
const buttonActive = 'border-l-emerald-400 bg-emerald-500/[0.1] text-emerald-50'

const blogSoonClass =
    'inline-flex cursor-not-allowed items-center gap-1.5 border-l-2 border-slate-600/40 bg-transparent py-1.5 pl-2 pr-3 font-mono text-[13px] font-normal tracking-tight text-slate-600'

const chevronClass =
    'mb-px select-none font-mono text-emerald-500 leading-none group-hover:text-emerald-400 group-data-[active=true]:text-emerald-400'

const caretClass =
    'pointer-events-none ml-0.5 inline-block h-[0.85em] w-[2px] shrink-0 translate-y-[0.06em] rounded-[1px] bg-current opacity-0 group-hover:animate-caret-blink group-data-[active=true]:animate-caret-blink motion-reduce:group-hover:animate-none motion-reduce:group-data-[active=true]:animate-none motion-reduce:group-hover:opacity-100 motion-reduce:group-data-[active=true]:opacity-100'

type SiteNavProps = {
    onNavigate: (path: string) => void
    disabled?: boolean
    className?: string
}

export default function SiteNav({ onNavigate, disabled, className }: SiteNavProps) {
    const pathname = usePathname()

    return (
        <nav
            className={className ?? 'flex flex-wrap items-stretch gap-x-1 gap-y-1'}
            aria-label="Site"
        >
            {navLinks.map(({ path, label }) => {
                const isActive = pathname === path
                return (
                    <button
                        key={path}
                        type="button"
                        onClick={() => onNavigate(path)}
                        disabled={disabled}
                        aria-current={isActive ? 'page' : undefined}
                        data-active={isActive ? 'true' : undefined}
                        className={`${buttonBase} ${buttonHover} ${isActive ? buttonActive : ''}`}
                    >
                        <span className={chevronClass} aria-hidden>
                            &gt;
                        </span>
                        <span className="min-w-0">{label}</span>
                        <span aria-hidden className={caretClass} />
                    </button>
                )
            })}
            <span className={blogSoonClass}>
                <span>Blog (soon)</span>
            </span>
        </nav>
    )
}
