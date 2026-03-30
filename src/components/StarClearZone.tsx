'use client'

import type { ReactNode } from 'react'
import { useCallback } from 'react'
import { useRegisterStarClearZone } from './StarBackgroundProvider'

/** Wraps the main text column so the starfield clear ellipse tracks this box in viewport space (scroll + resize). */
export default function StarClearZone({
    className,
    children,
}: {
    className?: string
    children: ReactNode
}) {
    const register = useRegisterStarClearZone()
    const setRef = useCallback(
        (node: HTMLDivElement | null) => {
            register(node)
        },
        [register]
    )

    return (
        <div ref={setRef} className={className}>
            {children}
        </div>
    )
}
