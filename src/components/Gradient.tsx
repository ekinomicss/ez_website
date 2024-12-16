"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Position {
    x: number
    y: number
}

export default function Gradient() {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
    const headerRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (headerRef.current) {
                const rect = headerRef.current.getBoundingClientRect()
                setPosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                })
            }
        }

        const header = headerRef.current
        header?.addEventListener('mousemove', handleMouseMove)

        return () => {
            header?.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <Link href="/">
            <h1
                ref={headerRef}
                className="text-4xl font-bold font-roboto mb-4 text-gray-800 transition-colors duration-300 relative overflow-hidden"
                style={{
                    backgroundImage: `radial-gradient(circle at ${position.x}px ${position.y}px, #60A5FA, #1E40AF)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                }}
            >
                Ekin's Blog
            </h1>
        </Link>
    )
}

