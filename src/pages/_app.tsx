import React from 'react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import '../styles/globals.css'

// Initialize font
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Ekin's Blog</title>
                <meta name="description" content="Your app description" />
                {/* Add any other meta tags you need */}
            </Head>

            <main className={inter.className}>
                <Component {...pageProps} />
            </main>
        </>
    )
}