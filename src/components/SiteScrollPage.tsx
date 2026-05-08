'use client'

import { GoodreadsIcon, InstagramIcon, LetterboxdIcon } from './BrandIcons'
import Gradient from './Gradient'
import SectionHeading from './SectionHeading'
import SiteNav from './SiteNav'
import StarClearZone from './StarClearZone'
import { useStarBurst } from './StarBackgroundProvider'
import { workBlocks } from '../data/work-blocks'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const favoriteMovies = [
    '2001: A Space Odyssey (1968)',
    'The Matrix (1999)',
    'Before Sunset (2004)',
    "Pan's Labyrinth (2006)",
    'There Will Be Blood (2007)',
    'The Curious Case of Benjamin Button (2008)',
    'Burning (2018)',
    'The Worst Person in the World (2021)',
    'Aftersun (2022)',
    'La Chimera (2023)',
    'Perfect Days (2023)',
    'Crossing (2024)',
    'Bugonia (2025)',
] as const

const favoriteBooks: { title: string; author: string }[] = [
    { title: 'Permutation City', author: 'Greg Egan' },
    {
        title: 'Consolations: The Solace, Nourishment and Underlying Meaning of Everyday Words',
        author: 'David Whyte',
    },
    { title: 'The Hour of the Star', author: 'Clarice Lispector' },
    { title: 'Star Maker', author: 'Olaf Stapledon' },
    { title: 'The Paper Menagerie and Other Stories', author: 'Ken Liu' },
    { title: 'Constellations', author: 'Sinéad Gleeson' },
    { title: 'When We Cease to Understand the World', author: 'Benjamín Labatut' },
    { title: 'Mrs. Dalloway', author: 'Virginia Woolf' },
    { title: 'East of Eden', author: 'John Steinbeck' },
]

const education = [
    {
        title: 'The University of Chicago - B.S. Computational and Applied Mathematics',
        location: 'Chicago, IL',
        date: 'Sep 2016 - Jun 2020',
        bullets: [
            "Dean's List, Howell Murray Alumni Association Award, Financial Markets Program Fellow",
            'President (prev. Head of Research), Promontory Investment Research',
            'Events Lead (prev. Head of Finance), compileHer',
            'Part-time work across UChicago Med, Group One Trading, Citadel, and Booth',
        ],
    },
]

const previousLife = [
    {
        title: 'Walleye Capital - Analytics Developer, Central Platform Team',
        location: 'New York City, NY',
        date: 'Apr 2023 - Jun 2024',
    },
    {
        title: 'AQR Capital Management - Research Analyst, Portfolio Solutions Group',
        location: 'Greenwich, CT',
        date: 'Jul 2020 - Jan 2023',
    },
]

const internships = [
    {
        title: 'University of Chicago Booth - Research Assistant to Prof. Ralph Koijen',
        location: 'Chicago, IL',
        date: 'Jan 2020 - Jun 2020',
    },
    {
        title: 'AQR Capital Management - Summer Analyst, Portfolio Solutions Group',
        location: 'Greenwich, CT',
        date: 'Jun – Aug 2019',
    },
    {
        title: 'Group One Trading - Academic Year Trading Analyst Intern',
        location: 'Chicago, IL',
        date: 'Sep – Dec 2018',
    },
    {
        title: 'Citadel LLC - Data Analyst (Part-time & Summer Intern)',
        location: 'Chicago, IL',
        date: 'Feb - Aug 2018',
    },
]

const NAV_HASHES = ['#about', '#work', '#fun', '#contact'] as const

function normalizeNavHash(h: string): (typeof NAV_HASHES)[number] {
    if (NAV_HASHES.includes(h as (typeof NAV_HASHES)[number])) return h as (typeof NAV_HASHES)[number]
    return '#about'
}

function siteUrl(hash: string): string {
    return `/site${hash}`
}

export default function SiteScrollPage() {
    const router = useRouter()
    const { triggerBurst } = useStarBurst()
    const [activeHash, setActiveHash] = useState('#about')
    const [navBusy, setNavBusy] = useState(false)

    useEffect(() => {
        const sync = () => {
            const raw = window.location.hash
            if (!raw || raw === '#') setActiveHash('#about')
            else setActiveHash(normalizeNavHash(raw))
        }
        sync()
        window.addEventListener('hashchange', sync)
        return () => window.removeEventListener('hashchange', sync)
    }, [])

    useEffect(() => {
        let raw = window.location.hash
        if (!raw || raw === '#') {
            window.history.replaceState(null, '', siteUrl('#about'))
            raw = '#about'
        }
        const id = normalizeNavHash(raw).slice(1)
        requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
    }, [])

    const goToLanding = useCallback(() => {
        if (navBusy) return
        setNavBusy(true)
        triggerBurst()
        window.setTimeout(() => {
            router.push('/')
            setNavBusy(false)
        }, 180)
    }, [navBusy, triggerBurst, router])

    const navigateToHash = useCallback(
        (hash: string) => {
            if (navBusy) return
            const target = normalizeNavHash(hash)
            setNavBusy(true)
            triggerBurst()
            window.setTimeout(() => {
                const id = target.slice(1)
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                window.history.replaceState(null, '', siteUrl(target))
                setActiveHash(target)
                setNavBusy(false)
            }, 180)
        },
        [navBusy, triggerBurst]
    )

    return (
        <main className="relative min-h-screen bg-gray-800 text-gray-100">
            <header className="sticky top-0 z-40 border-b border-gray-700/50 bg-gray-800/92 px-4 py-3 backdrop-blur-md sm:px-6">
                <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <Gradient onLogoClick={goToLanding} />
                    <SiteNav onNavigate={navigateToHash} activeHash={activeHash} disabled={navBusy} className="sm:pt-1" />
                </div>
            </header>

            <StarClearZone className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-20 pt-10 sm:pt-12">
                <section id="about" className="scroll-mt-36 flex flex-col gap-10 sm:scroll-mt-32">
                    <div className="border border-gray-700/70 bg-gray-900/40 p-6">
                        <SectionHeading className="text-2xl font-semibold uppercase tracking-[0.12em] text-blue-200">
                            Currently: Research Engineer @ UK AISI
                        </SectionHeading>
                        <p className="mt-3 text-sm italic text-blue-200">
                            Former quant hedge fund analytics person turned professional AI safety person. 🤖❤️🌎
                        </p>
                        <ul
                            className="mt-3 list-none space-y-2.5 border-l border-emerald-500/25 pl-4 text-sm text-gray-300 sm:pl-5"
                            role="list"
                        >
                            <li className="flex gap-2.5">
                                <span className="font-mono text-emerald-500/90" aria-hidden>
                                    &gt;
                                </span>
                                <span className="min-w-0 leading-relaxed">
                                    I discovered AI safety during a career break and realized it was the most impactful thing I could be doing given my
                                    existing skills and experience. It&apos;s a unique time in history to be a CS nerd. So I went for it. 🚀
                                </span>
                            </li>
                            <li className="flex gap-2.5">
                                <span className="font-mono text-emerald-500/90" aria-hidden>
                                    &gt;
                                </span>
                                <span className="min-w-0 leading-relaxed">
                                    My current team, <i>The Cyber and Autonomous Systems Team (CAST)</i>, researches frontier AI capabilities and
                                    propensities to inform high-stakes security decisions around cyber risk and autonomous misuse. Current focus includes
                                    evaluation infrastructure, cyber ranges, and model capability testing before release, with collaboration across
                                    government, industry, and research partners.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <section>
                        <SectionHeading className="mb-4 text-2xl font-semibold uppercase tracking-[0.12em] text-blue-200">
                            Education
                        </SectionHeading>
                        <div className="space-y-8 border-l border-blue-400/40 pl-6">
                            {education.map((item) => (
                                <article key={item.title} className="relative">
                                    <span className="absolute -left-[31px] top-1 h-3 w-3 bg-blue-300" />
                                    <p className="text-xs uppercase tracking-[0.14em] text-blue-200">{item.date}</p>
                                    <h3 className="mt-1 text-lg font-semibold text-gray-100">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.location}</p>
                                    <ul className="mt-3 list-none space-y-2.5 p-0 pl-0 text-sm text-gray-300" role="list">
                                        {item.bullets.map((point) => (
                                            <li key={point} className="flex gap-2.5">
                                                <span className="font-mono text-emerald-500/90" aria-hidden>
                                                    &gt;
                                                </span>
                                                <span className="min-w-0 leading-relaxed">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section>
                        <SectionHeading className="mb-4 text-2xl font-semibold uppercase tracking-[0.12em] text-blue-200">
                            Previous life
                        </SectionHeading>
                        <div className="space-y-8 border-l border-gray-400/40 pl-6">
                            {previousLife.map((item) => (
                                <article key={`${item.title}-${item.date}`} className="relative">
                                    <span className="absolute -left-[31px] top-1 h-3 w-3 bg-gray-300" />
                                    <p className="text-xs uppercase tracking-[0.14em] text-gray-300">{item.date}</p>
                                    <h3 className="mt-1 text-lg font-semibold text-gray-100">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.location}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section>
                        <SectionHeading className="mb-4 text-2xl font-semibold uppercase tracking-[0.12em] text-blue-200">
                            Internships
                        </SectionHeading>
                        <div className="space-y-8 border-l border-gray-400/40 pl-6">
                            {internships.map((item) => (
                                <article key={`${item.title}-${item.date}`} className="relative">
                                    <span className="absolute -left-[31px] top-1 h-3 w-3 bg-gray-300" />
                                    <p className="text-xs uppercase tracking-[0.14em] text-gray-300">{item.date}</p>
                                    <h3 className="mt-1 text-lg font-semibold text-gray-100">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.location}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                </section>

                <section id="work" className="scroll-mt-36 mt-16 flex flex-col gap-6 sm:scroll-mt-32">
                    <SectionHeading as="p" className="text-sm uppercase tracking-[0.14em] text-blue-200">
                        (...that is public enough to share)
                    </SectionHeading>

                    <div className="space-y-5">
                        {workBlocks.map((item) => (
                            <article key={item.title} className="border border-gray-700/70 bg-gray-900/45 p-5">
                                <div className="grid gap-5 md:grid-cols-[1fr_320px] md:items-start">
                                    <div>
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="text-xs uppercase tracking-[0.14em] text-blue-200">{item.date}</p>
                                            <p className="text-xs uppercase tracking-[0.12em] text-gray-400">{item.venue}</p>
                                        </div>
                                        <h2 className="mt-2 text-xl font-semibold text-gray-100">{item.title}</h2>
                                        <p className="mt-1 text-sm text-gray-400">{item.role}</p>

                                        <ul
                                            className="mt-4 list-none space-y-2.5 border-l border-emerald-500/25 pl-4 text-sm text-gray-300 sm:pl-5"
                                            role="list"
                                        >
                                            {item.highlights.map((point) => (
                                                <li key={point} className="flex gap-2.5">
                                                    <span className="font-mono text-emerald-500/90" aria-hidden>
                                                        &gt;
                                                    </span>
                                                    <span className="min-w-0 leading-relaxed">{point}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {item.links.map((link) => (
                                                <a
                                                    key={link.href}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-none border border-blue-400/70 bg-gray-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200 transition-colors hover:border-blue-300 hover:bg-blue-950/40"
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={item.links[0]?.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block border border-gray-700/80 bg-gray-950/70 p-3 transition-colors hover:border-blue-300/80"
                                    >
                                        <img
                                            src={item.previewImage}
                                            alt={`${item.title} preview`}
                                            className="h-44 w-full object-cover"
                                        />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="fun" className="scroll-mt-36 mt-16 flex flex-col gap-10 sm:scroll-mt-32">
                    <SectionHeading as="p" className="text-sm uppercase tracking-[0.14em] text-blue-200">
                        Il faut cultiver notre jardin.
                    </SectionHeading>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-6 lg:items-stretch">
                        <section className="flex min-h-0 min-w-0 flex-col border border-gray-700/70 bg-gray-900/40 p-6">
                            <SectionHeading className="text-lg font-semibold uppercase tracking-[0.12em] text-blue-200">
                                Favorite movies
                            </SectionHeading>
                            <a
                                href="https://letterboxd.com/eqeen/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 flex min-w-0 flex-wrap items-center gap-3 text-sm text-gray-300 transition-opacity hover:opacity-90"
                            >
                                <LetterboxdIcon className="h-8 w-8 shrink-0 text-[#00e054]" />
                                <span className="min-w-0">
                                    <span className="text-blue-300 underline decoration-blue-400/50 underline-offset-2 hover:text-blue-200">
                                        Letterboxd
                                    </span>{' '}
                                    - follow my film diary
                                </span>
                            </a>
                            <ul className="mt-4 list-disc space-y-2 break-words pl-5 text-sm text-gray-200">
                                {favoriteMovies.map((title) => (
                                    <li key={title} className="marker:text-blue-300">
                                        <span className="font-medium text-gray-100">{title}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="flex min-h-0 min-w-0 flex-col border border-gray-700/70 bg-gray-900/40 p-6">
                            <SectionHeading className="text-lg font-semibold uppercase tracking-[0.12em] text-blue-200">
                                Favorite books
                            </SectionHeading>
                            <a
                                href="https://www.goodreads.com/user/show/18083552-ekin-zorer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 flex min-w-0 flex-wrap items-center gap-3 text-sm text-gray-300 transition-opacity hover:opacity-90"
                            >
                                <GoodreadsIcon className="h-8 w-8 shrink-0 text-[#e9e5cd]" />
                                <span className="min-w-0">
                                    <span className="text-blue-300 underline decoration-blue-400/50 underline-offset-2 hover:text-blue-200">
                                        Goodreads
                                    </span>{' '}
                                    - follow my reading
                                </span>
                            </a>
                            <ul className="mt-4 list-disc space-y-3 break-words pl-5 text-sm text-gray-300">
                                {favoriteBooks.map((b) => (
                                    <li key={b.title} className="marker:text-blue-300">
                                        <span className="font-medium text-gray-100">{b.title}</span>
                                        <span className="mt-0.5 block text-xs text-gray-400">{b.author}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="flex min-h-0 min-w-0 flex-col border border-gray-700/70 bg-gray-900/40 p-6">
                            <SectionHeading className="text-lg font-semibold uppercase tracking-[0.12em] text-blue-200">
                                Restaurants
                            </SectionHeading>
                            <div className="mt-4 min-w-0 overflow-x-auto">
                                <a
                                    href="https://www.instagram.com/plsfixenyc/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-max max-w-none flex-nowrap items-center gap-3 text-sm text-gray-300 transition-opacity hover:opacity-90"
                                >
                                    <InstagramIcon className="h-8 w-8 shrink-0 text-[#E4405F]" />
                                    <span className="whitespace-nowrap">
                                        <span className="text-blue-300 underline decoration-blue-400/50 underline-offset-2 hover:text-blue-200">
                                            Instagram
                                        </span>{' '}
                                        - inactive NYC food blog
                                    </span>
                                </a>
                            </div>

                            <div className="mt-4 space-y-6">
                                <div>
                                    <SectionHeading
                                        as="h3"
                                        className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-200"
                                    >
                                        London
                                    </SectionHeading>
                                    <p className="text-xs text-gray-500">Lived ~1 year and still here!</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-200">
                                        <li className="marker:text-blue-300">OMA</li>
                                        <li className="marker:text-blue-300">Roti King</li>
                                        <li className="marker:text-blue-300">Rogues.</li>
                                        <li className="marker:text-blue-300">Speedboat Bar</li>
                                        <li className="marker:text-blue-300">King Cook Daily</li>
                                    </ul>
                                </div>
                                <div>
                                    <SectionHeading
                                        as="h3"
                                        className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-200"
                                    >
                                        New York City
                                    </SectionHeading>
                                    <p className="text-xs text-gray-500">Lived ~4 years</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-200">
                                        <li className="marker:text-blue-300">Birds of a Feather</li>
                                        <li className="marker:text-blue-300">Kopitiam</li>
                                        <li className="marker:text-blue-300">The Noortwyck</li>
                                        <li className="marker:text-blue-300">I Sodi</li>
                                        <li className="marker:text-blue-300">Kiki&apos;s</li>
                                    </ul>
                                </div>
                                <div>
                                    <SectionHeading
                                        as="h3"
                                        className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-200"
                                    >
                                        Istanbul
                                    </SectionHeading>
                                    <p className="text-xs text-gray-500">Born &amp; raised</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-200">
                                        <li className="marker:text-blue-300">Bayramoğlu</li>
                                        <li className="marker:text-blue-300">Karaköy Lokantası</li>
                                        <li className="marker:text-blue-300">Mükellef Karaköy</li>
                                        <li className="marker:text-blue-300">Mangerie</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                <section id="contact" className="scroll-mt-36 mt-16 sm:scroll-mt-32">
                    <div className="border border-gray-700/70 bg-gray-900/40 p-6">
                        <p className="text-sm text-gray-300">
                            You can reach out to me at{' '}
                            <a
                                href="mailto:zorerekin@gmail.com"
                                className="text-blue-300 underline decoration-blue-400/50 underline-offset-2 hover:text-blue-200"
                            >
                                zorerekin@gmail.com
                            </a>{' '}
                            <span className="font-medium text-gray-200">only about AI safety please. </span>
                        </p>
                        <div className="mt-4">
                            <SectionHeading as="h3" className="text-sm font-medium text-gray-400">
                                💬 Advice & mentoring
                            </SectionHeading>
                            <ul className="mt-2 list-none space-y-2.5 border-l border-emerald-500/25 pl-4 text-sm text-gray-300 sm:pl-5" role="list">
                                <li className="flex gap-2.5">
                                    <span className="font-mono text-emerald-500/90" aria-hidden>
                                        &gt;
                                    </span>
                                    <span className="min-w-0 leading-relaxed">
                                        Happy to offer informal advice and mentoring for people looking to move into AI safety (especially women /
                                        non-binary peeps!) I can&apos;t promise a reply to every email but will try my best. I&apos;m also working on a
                                        blogpost about my transition to AI safety.
                                    </span>
                                </li>
                                <li className="flex gap-2.5">
                                    <span className="font-mono text-emerald-500/90" aria-hidden>
                                        &gt;
                                    </span>
                                    <span className="min-w-0 leading-relaxed">
                                        I&apos;m no longer advising on quant recruiting as the field has changed a lot since I left, so my knowledge is
                                        outdated.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-5">
                            <SectionHeading as="h3" className="text-sm font-medium text-gray-400">
                                🤝 Collaboration
                            </SectionHeading>
                            <ul className="mt-2 list-none space-y-2.5 border-l border-emerald-500/25 pl-4 text-sm text-gray-300 sm:pl-5" role="list">
                                <li className="flex gap-2.5">
                                    <span className="font-mono text-emerald-500/90" aria-hidden>
                                        &gt;
                                    </span>
                                    <span className="min-w-0 leading-relaxed">
                                        Open to research collaborations when there&apos;s a good fit. See my{' '}
                                        <a
                                            href="https://twitter.com/ekinomicss"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-300 underline decoration-blue-400/50 underline-offset-2 hover:text-blue-200"
                                        >
                                            Twitter
                                        </a>{' '}
                                        for what I&apos;m thinking about lately.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </StarClearZone>
        </main>
    )
}
