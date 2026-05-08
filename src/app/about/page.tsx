'use client'

import { useEffect } from 'react'

export default function AboutRedirectPage() {
    useEffect(() => {
        window.location.replace('/site#about')
    }, [])
    return null
}
