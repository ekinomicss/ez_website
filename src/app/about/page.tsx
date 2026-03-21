'use client'

import { useRouter } from 'next/navigation'
import Gradient from '../../components/Gradient'
import SiteNav from '../../components/SiteNav'
import { useStarBurst } from '../../components/StarBackgroundProvider'

export default function AboutPage() {
    const router = useRouter()
    const { triggerBurst } = useStarBurst()

    const navigateWithBurst = (path: string) => {
        triggerBurst()
        window.setTimeout(() => {
            router.push(path)
        }, 180)
    }

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

    /* Order: 1. Booth 2. AQR summer 3. Group One 4. Citadel */
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
            date: '2017 - 2018',
        },
    ]

    return (
        <main className="relative min-h-screen bg-gray-800 px-6 pb-16 pt-56 text-gray-100 sm:pt-52 md:pt-44 lg:pt-36">
            <div className="absolute left-6 top-6 z-10">
                <Gradient />
                <div className="mt-1">
                    <SiteNav onNavigate={navigateWithBurst} />
                </div>
            </div>
            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10">
                <section className="border border-gray-700/70 bg-gray-900/40 p-6">
                    <h2 className="text-2xl font-semibold uppercase tracking-[0.12em] text-blue-200">Currently: Research Engineer @ UK AISI</h2>
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
                                A year ago, I discovered AI safety during a career break and quickly realized it aligned far better with both my
                                skills and values than my previous work in finance. It became clear to me that contributing to making these
                                systems safe and beneficial could be the most impactful path I could take so I went for it. 🚀
                            </span>
                        </li>
                        <li className="flex gap-2.5">
                            <span className="font-mono text-emerald-500/90" aria-hidden>
                                &gt;
                            </span>
                            <span className="min-w-0 leading-relaxed">
                                My current team, <i>The Cyber and Autonomous Systems Team (CAST)</i>, researches frontier AI capabilities and
                                propensities to inform high-stakes security decisions, especially around cyber risk and autonomous misuse. Current
                                focus includes evaluation infrastructure, cyber ranges, and model capability testing before release, with
                                collaboration across government, industry, and research partners.
                            </span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-4 text-2xl font-semibold uppercase tracking-[0.12em] text-blue-200">Education</h2>
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
                    <h2 className="mb-4 text-2xl font-semibold uppercase tracking-[0.12em] text-blue-200">Previous life</h2>
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
                    <h2 className="mb-4 text-2xl font-semibold uppercase tracking-[0.12em] text-blue-200">Internships</h2>
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
            </div>
        </main>
    )
}
