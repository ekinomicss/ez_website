'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import StarField from './StarField'
import PageTransition from './PageTransition'

interface StarBurstContextValue {
    triggerBurst: () => void
}

const StarBurstContext = createContext<StarBurstContextValue | null>(null)

export function useStarBurst() {
    const context = useContext(StarBurstContext)
    if (!context) {
        throw new Error('useStarBurst must be used within StarBackgroundProvider')
    }
    return context
}

export default function StarBackgroundProvider({ children }: { children: React.ReactNode }) {
    const [burstSignal, setBurstSignal] = useState(0)

    const triggerBurst = useCallback(() => {
        setBurstSignal(prev => prev + 1)
    }, [])

    const value = useMemo(() => ({ triggerBurst }), [triggerBurst])

    return (
        <StarBurstContext.Provider value={value}>
            <StarField
                count={300}
                dispersionRadius={120}
                dispersionForce={6}
                burstSignal={burstSignal}
                className="fixed inset-0 pointer-events-none z-30 opacity-80 max-md:opacity-45 max-sm:opacity-35"
            />
            <div className="relative z-20">
                <PageTransition>{children}</PageTransition>
            </div>
        </StarBurstContext.Provider>
    )
}
