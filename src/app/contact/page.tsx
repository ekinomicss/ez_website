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

            <div className="relative z-10 mx-auto w-full max-w-2xl">
                <section className="border border-gray-700/70 bg-gray-900/40 p-6">
                    <p className="text-sm text-gray-300">
                        Hey 👋, reach out at{' '}
                        <a
                            href="mailto:zorerekin@gmail.com"
                            className="text-blue-300 underline decoration-blue-400/50 underline-offset-2 hover:text-blue-200"
                        >
                            zorerekin@gmail.com
                        </a>{' '}
                        <span className="font-medium text-gray-200">only about AI safety please. </span>
                    </p>
                    <p className="mt-4 text-sm text-gray-300">
                        <span className="font-medium text-gray-400">💬 Advice & mentoring:</span> I&apos;m happy to offer informal advice and mentoring for people trying to move into AI safety
                        (especially for women/non binary peeps!) Though I can&apos;t promise I&apos;ll get back to every email.
                    </p>
                    <p className="mt-4 text-sm text-gray-300">
                        <span className="font-medium text-gray-400">🤝 Collaboration:</span> I&apos;m also open to research collaborations when there&apos;s a good fit. To see what
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
