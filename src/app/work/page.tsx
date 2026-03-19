'use client'

import { useRouter } from 'next/navigation'
import Gradient from '../../components/Gradient'
import SiteNav from '../../components/SiteNav'
import { useStarBurst } from '../../components/StarBackgroundProvider'

export default function WorkPage() {
    const router = useRouter()
    const { triggerBurst } = useStarBurst()

    const navigateWithBurst = (path: string) => {
        triggerBurst()
        window.setTimeout(() => {
            router.push(path)
        }, 180)
    }

    const workBlocks = [
        {
            date: 'Mar 13, 2026',
            title: "Measuring AI Agents' Progress on Multi-Step Cyber Attack Scenarios",
            venue: 'arXiv (cs.AI)',
            role: 'Co-author',
            links: [
                { label: 'Paper', href: 'https://arxiv.org/html/2603.11214v2' },
            ],
            highlights: [
                'Evaluates autonomous cyber capability on two purpose-built multi-step ranges.',
                'Finds log-linear gains from inference-time compute scaling up to 100M tokens.',
                'Shows measurable model generation-over-generation performance improvements.',
            ],
            previewImage: '/work-previews/cyber-ranges-2026.png',
        },
        {
            date: 'Feb 25, 2026',
            title: 'Seven simple steps for log analysis in AI systems',
            venue: 'UK AISI Research',
            role: 'Co-author',
            links: [
                { label: 'AISI page', href: 'https://www.aisi.gov.uk/research/seven-simple-steps-for-log-analysis-in-ai-systems' },
                { label: 'TechRxiv', href: 'https://www.techrxiv.org/users/1032063/articles/1391870-seven-simple-steps-for-log-analysis-in-ai-systems' },
            ],
            highlights: [
                'Proposes a practical pipeline for analyzing agent logs and model behavior.',
                'Uses Inspect Scout examples to improve reproducibility and reduce analysis pitfalls.',
            ],
            previewImage: '/work-previews/log-analysis-2026.png',
        },
        {
            date: 'Jan 22, 2026',
            title: 'Improving Methodologies for Agentic Evaluations Across Domains',
            venue: 'arXiv (cs.AI)',
            role: 'Contributor',
            links: [
                { label: 'Paper', href: 'https://arxiv.org/abs/2601.15679' },
            ],
            highlights: [
                'International collaboration on agentic evaluation methods across cybersecurity, fraud, and data leakage.',
                'Focuses on improving methodology rather than leaderboard performance claims.',
            ],
            previewImage: '/work-previews/agentic-evals-2026.png',
        },
        {
            date: 'Q4 2022',
            title: 'Should Your Portfolio Protection Work Fast or Slow?',
            venue: 'AQR Alternative Thinking',
            role: 'Contributor',
            links: [
                { label: 'Article', href: 'https://www.aqr.com/Insights/Research/Alternative-Thinking/Should-Your-Portfolio-Protection-Work-Fast-or-Slow' },
            ],
            highlights: [
                'Research note on portfolio protection dynamics in fast-crash vs slow-burn drawdowns.',
                'Discusses practical implications for long-horizon portfolio construction.',
            ],
            previewImage: '/work-previews/aqr-2022.png',
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
            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6">
                <p className="text-sm uppercase tracking-[0.14em] text-blue-200">(...that is public enough to share)</p>

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

                                    <ul className="mt-4 space-y-1 text-sm text-gray-300">
                                        {item.highlights.map((point) => (
                                            <li key={point}>- {point}</li>
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
            </div>
        </main>
    )
}
