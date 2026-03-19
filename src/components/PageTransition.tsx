'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const prevPathRef = useRef<string | null>(null)

    const isFirstPaint = prevPathRef.current === null
    const shouldFade = !isFirstPaint && prevPathRef.current !== pathname

    useEffect(() => {
        prevPathRef.current = pathname
    }, [pathname])

    return (
        <div key={pathname} className={`min-h-full ${shouldFade ? 'page-fade-in' : ''}`}>
            {children}
        </div>
    )
}
