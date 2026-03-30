'use client'

import React, {
    createContext,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { usePathname } from 'next/navigation'
import StarField from './StarField'
import PageTransition from './PageTransition'
import type { ViewportClearRect } from './star-clear-types'

interface StarBackgroundContextValue {
    triggerBurst: () => void
    registerStarClearZone: (el: HTMLElement | null) => void
}

const StarBackgroundContext = createContext<StarBackgroundContextValue | null>(null)

export function useStarBurst() {
    const context = useContext(StarBackgroundContext)
    if (!context) {
        throw new Error('useStarBurst must be used within StarBackgroundProvider')
    }
    return { triggerBurst: context.triggerBurst }
}

export function useRegisterStarClearZone() {
    const context = useContext(StarBackgroundContext)
    if (!context) {
        throw new Error('StarClearZone must be used within StarBackgroundProvider')
    }
    return context.registerStarClearZone
}

export default function StarBackgroundProvider({ children }: { children: React.ReactNode }) {
    const [burstSignal, setBurstSignal] = useState(0)
    const pathname = usePathname()
    const isHome = pathname === '/'

    const [clearZoneEl, setClearZoneEl] = useState<HTMLElement | null>(null)
    const clearViewportRectRef = useRef<ViewportClearRect | null>(null)
    const [clearZoneTick, setClearZoneTick] = useState(0)

    const registerStarClearZone = useCallback((el: HTMLElement | null) => {
        setClearZoneEl(el)
    }, [])

    useLayoutEffect(() => {
        if (!clearZoneEl) {
            clearViewportRectRef.current = null
            setClearZoneTick((t) => t + 1)
            return
        }

        const measure = () => {
            const r = clearZoneEl.getBoundingClientRect()
            clearViewportRectRef.current = {
                left: r.left,
                top: r.top,
                width: r.width,
                height: r.height,
            }
        }

        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(clearZoneEl)
        // Keep clear zone static during scroll; only recompute on layout/viewport changes.
        window.addEventListener('resize', measure)

        setClearZoneTick((t) => t + 1)

        return () => {
            ro.disconnect()
            window.removeEventListener('resize', measure)
        }
    }, [clearZoneEl])

    const triggerBurst = useCallback(() => {
        setBurstSignal((prev) => prev + 1)
    }, [])

    const value = useMemo(
        () => ({ triggerBurst, registerStarClearZone }),
        [triggerBurst, registerStarClearZone]
    )

    return (
        <StarBackgroundContext.Provider value={value}>
            <StarField
                count={300}
                dispersionRadius={120}
                dispersionForce={6}
                burstSignal={burstSignal}
                useContentClearZone={!isHome}
                clearViewportRectRef={clearViewportRectRef}
                clearPaddingPx={28}
                clearZoneTick={clearZoneTick}
                className="fixed inset-0 pointer-events-none z-30 opacity-80 max-md:opacity-45 max-sm:opacity-35"
            />
            <div className="relative z-20">
                <PageTransition>{children}</PageTransition>
            </div>
        </StarBackgroundContext.Provider>
    )
}
