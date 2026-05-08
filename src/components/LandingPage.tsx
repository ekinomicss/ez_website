'use client'

import Gradient from './Gradient'
import SiteNav from './SiteNav'
import { useStarBurst } from './StarBackgroundProvider'
import { default as NextLink } from 'next/link'
import { Twitter, Github, Linkedin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export default function LandingPage() {
    const router = useRouter()
    const { triggerBurst } = useStarBurst()
    const [navBusy, setNavBusy] = useState(false)

    const navigateToSite = useCallback(
        (hash: string) => {
            if (navBusy) return
            setNavBusy(true)
            triggerBurst()
            window.setTimeout(() => {
                router.push(`/site${hash}`)
                setNavBusy(false)
            }, 180)
        },
        [navBusy, triggerBurst, router]
    )

    const onLogoClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-800 p-4">
            <div className="z-10 w-full min-w-0 max-w-full px-2 text-center">
                <div className="flex justify-center">
                    <Gradient onLogoClick={onLogoClick} />
                </div>
                <p className="mx-auto mb-4 max-w-xl text-balance text-lg font-normal leading-snug tracking-wide text-gray-300 sm:max-w-2xl lg:max-w-none lg:whitespace-nowrap">
                    Research Engineer, Cyber and Autonomous Systems Team @UK AISI
                </p>

                <div className="mb-6 flex justify-center">
                    <SiteNav onNavigate={navigateToSite} activeHash="" disabled={navBusy} className="flex flex-wrap items-center justify-center gap-2" />
                </div>

                <div className="flex justify-center space-x-4">
                    <NextLink href="https://twitter.com/ekinomicss" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-8 w-8 text-blue-400" />
                    </NextLink>
                    <NextLink href="https://github.com/ekinomicss" target="_blank" rel="noopener noreferrer">
                        <Github className="h-8 w-8 text-gray-200" />
                    </NextLink>
                    <NextLink href="https://linkedin.com/in/ekin-zorer" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-8 w-8 text-blue-700" />
                    </NextLink>
                </div>
            </div>
        </div>
    )
}
