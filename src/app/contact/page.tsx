'use client'

import { useRouter } from 'next/navigation'
import Gradient from '../../components/Gradient'
import SiteNav from '../../components/SiteNav'
import { useStarBurst } from '../../components/StarBackgroundProvider'

export default function ContactPage() {
    const router = useRouter()
    const { triggerBurst } = useStarBurst()

    const navigateWithBurst = (path: string) => {
        triggerBurst()
        window.setTimeout(() => {
            router.push(path)
        }, 180)
    }

    return (
        <main className="relative min-h-screen bg-gray-800 px-6 pb-16 pt-56 text-gray-100 sm:pt-52 md:pt-44 lg:pt-36">
            <div className="absolute left-6 top-6 z-10">
                <Gradient />
                <div className="mt-1">
                    <SiteNav onNavigate={navigateWithBurst} />
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-5xl">
                <section className="border border-gray-700/70 bg-gray-900/40 p-6">
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
                        <h3 className="text-sm font-medium text-gray-400">💬 Advice & mentoring</h3>
                        <ul className="mt-2 list-none space-y-2.5 border-l border-emerald-500/25 pl-4 text-sm text-gray-300 sm:pl-5" role="list">
                            <li className="flex gap-2.5">
                                <span className="font-mono text-emerald-500/90" aria-hidden>
                                    &gt;
                                </span>
                                <span className="min-w-0 leading-relaxed">
                                    Happy to offer informal advice and mentoring for people looking to move into AI safety (especially women / non-binary
                                    peeps!) I can&apos;t promise a reply to every email but will try my best. I'm also working on a blogpost about my transition to AI safety.
                                </span>
                            </li>
                            <li className="flex gap-2.5">
                                <span className="font-mono text-emerald-500/90" aria-hidden>
                                    &gt;
                                </span>
                                <span className="min-w-0 leading-relaxed">
                                    I&apos;m no longer advising on quant recruiting as the field has changed a lot since I left, so my knowledge is outdated.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-5">
                        <h3 className="text-sm font-medium text-gray-400">🤝 Collaboration</h3>
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
                </section>
            </div>
        </main>
    )
}
