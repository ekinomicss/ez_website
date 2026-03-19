'use client'

import { useRouter } from 'next/navigation'
import Gradient from '../../components/Gradient'
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
        <main className="min-h-screen bg-gray-800 px-6 py-16 pt-36 text-gray-100 relative">
            <div className="absolute left-6 top-6 z-10">
                <Gradient />
                <div className="mt-1 flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => navigateWithBurst('/about')}
                        className="rounded-none border border-blue-400/70 bg-gray-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200 transition-colors hover:border-blue-300 hover:bg-blue-950/40"
                    >
                        About
                    </button>
                    <button
                        type="button"
                        onClick={() => navigateWithBurst('/work')}
                        className="rounded-none border border-blue-400/70 bg-gray-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200 transition-colors hover:border-blue-300 hover:bg-blue-950/40"
                    >
                        Work
                    </button>
                    <button
                        type="button"
                        onClick={() => navigateWithBurst('/contact')}
                        className="rounded-none border border-blue-400/70 bg-gray-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200 transition-colors hover:border-blue-300 hover:bg-blue-950/40"
                    >
                        Contact
                    </button>
                    <span className="cursor-not-allowed rounded-none border border-gray-600/60 bg-gray-900/50 px-4 py-2 text-xs font-semibold italic uppercase tracking-[0.18em] text-gray-500">
                        Blog (soon)
                    </span>
                </div>
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col gap-8">
                <h1 className="text-3xl font-semibold uppercase tracking-[0.08em] text-blue-200">Contact</h1>

                <section className="border border-gray-700/70 bg-gray-900/40 p-6">
                    <p className="text-sm text-gray-300">
                        Hey 👋, reach out at{' '}
                        <a
                            href="mailto:zorerekin@gmail.com"
                            className="text-blue-300 underline decoration-blue-400/50 underline-offset-2 hover:text-blue-200"
                        >
                            zorerekin@gmail.com
                        </a>{' '}
                        <span className="font-medium text-gray-200">only about AI safety</span> (career pivots, the
                        field, related stuff).
                    </p>
                    <p className="mt-4 text-sm text-gray-300">
                        I&apos;m happy to offer informal advice and mentoring for people trying to move into AI safety
                        (especially women/non binary!) Though I can&apos;t promise I&apos;ll get back to every email.
                    </p>
                    <p className="mt-4 text-sm text-gray-300">
                        I&apos;m also open to research collaborations when there&apos;s a good fit. To see what
                        I&apos;m into lately, check my{' '}
                        <a
                            href="https://twitter.com/ekinomicss"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 underline decoration-blue-400/50 underline-offset-2 hover:text-blue-200"
                        >
                            Twitter
                        </a>
                        .
                    </p>
                </section>
            </div>
        </main>
    )
}
