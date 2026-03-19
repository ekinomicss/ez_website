'use client'

const navLinks: { path: string; label: string }[] = [
    { path: '/about', label: 'About' },
    { path: '/work', label: 'Work' },
    { path: '/fun', label: 'Fun' },
    { path: '/contact', label: 'Contact' },
]

/** Rounded gradient pills + monospace, chevron, emerald “terminal” accents */
const buttonClass =
    'group inline-flex items-center gap-1.5 rounded-xl border border-slate-500/25 border-l-2 border-l-emerald-500/40 bg-gradient-to-b from-slate-800/90 to-slate-900/90 py-2.5 pl-3 pr-4 font-mono text-[13px] font-medium tracking-tight text-slate-100 shadow-md shadow-black/25 ring-1 ring-white/[0.06] transition-all hover:-translate-y-0.5 hover:border-sky-500/25 hover:border-l-emerald-400/80 hover:from-slate-800 hover:to-emerald-950/45 hover:text-emerald-50 hover:shadow-lg hover:shadow-emerald-950/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/55 active:translate-y-0 disabled:pointer-events-none disabled:opacity-45'

const blogSoonClass =
    'inline-flex cursor-not-allowed items-center gap-1.5 rounded-xl border border-slate-600/25 border-l-2 border-l-slate-600/50 bg-slate-900/50 py-2.5 pl-3 pr-4 font-mono text-[13px] font-medium tracking-tight text-slate-500 ring-1 ring-white/[0.04]'

type SiteNavProps = {
    onNavigate: (path: string) => void
    disabled?: boolean
    className?: string
}

export default function SiteNav({ onNavigate, disabled, className }: SiteNavProps) {
    return (
        <nav className={className ?? 'flex flex-wrap items-center gap-2'} aria-label="Site">
            {navLinks.map(({ path, label }) => (
                <button key={path} type="button" onClick={() => onNavigate(path)} disabled={disabled} className={buttonClass}>
                    <span className="mb-px font-mono text-emerald-600/80 leading-none group-hover:text-emerald-400" aria-hidden>
                        &gt;
                    </span>
                    <span className="min-w-0">{label}</span>
                    <span
                        aria-hidden
                        className="pointer-events-none ml-0.5 inline-block h-[0.85em] w-[2px] shrink-0 translate-y-[0.06em] rounded-[1px] bg-current opacity-0 group-hover:animate-caret-blink motion-reduce:group-hover:animate-none motion-reduce:group-hover:opacity-100"
                    />
                </button>
            ))}
            <span className={blogSoonClass}>
                <span>Blog (soon)</span>
            </span>
        </nav>
    )
}
