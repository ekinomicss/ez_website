'use client'

import { useEffect } from 'react'

export default function WorkRedirectPage() {
    useEffect(() => {
        window.location.replace('/site#work')
    }, [])
    return null
}
