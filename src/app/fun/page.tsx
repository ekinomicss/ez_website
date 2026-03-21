'use client'

import { useRouter } from 'next/navigation'
import { GoodreadsIcon, InstagramIcon, LetterboxdIcon } from '../../components/BrandIcons'
import Gradient from '../../components/Gradient'
import SiteNav from '../../components/SiteNav'
import { useStarBurst } from '../../components/StarBackgroundProvider'

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

export default function FunPage() {
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

            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10">
                <p className="text-sm uppercase tracking-[0.14em] text-blue-200">Il faut cultiver notre jardin.</p>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-6 lg:items-stretch">
                <section className="flex min-h-0 min-w-0 flex-col border border-gray-700/70 bg-gray-900/40 p-6">
                    <h2 className="text-lg font-semibold uppercase tracking-[0.12em] text-blue-200">Favorite movies</h2>
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
                    <h2 className="text-lg font-semibold uppercase tracking-[0.12em] text-blue-200">Favorite books</h2>
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
                    <h2 className="text-lg font-semibold uppercase tracking-[0.12em] text-blue-200">Restaurants</h2>
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
                            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-200">London</h3>
                            <p className="text-xs text-gray-500">Lived ~1 year and still here!</p>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-200">
                                <li className="marker:text-blue-300">OMA</li>
                                <li className="marker:text-blue-300">Roti King</li>
                                <li className="marker:text-blue-300">Rogues.</li>
                                <li className="marker:text-blue-300">King Cook Daily</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-200">
                                New York City
                            </h3>
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
                            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-200">Istanbul</h3>
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
            </div>
        </main>
    )
}
