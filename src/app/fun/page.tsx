'use client'

import { useEffect } from 'react'

export default function FunRedirectPage() {
    useEffect(() => {
        window.location.replace('/site#fun')
    }, [])
    return null
}
