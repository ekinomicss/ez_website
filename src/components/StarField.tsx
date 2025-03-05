"use client"

import { useEffect, useRef, useState } from "react"

interface Star {
    x: number
    y: number
    size: number
    originalX: number
    originalY: number
    vx: number
    vy: number
    color: string
}

interface StarFieldProps {
    count?: number
    speed?: number
    dispersionRadius?: number
    dispersionForce?: number
    returnSpeed?: number
}

export default function StarField({
    count = 200,
    speed = 0.05,
    dispersionRadius = 100,
    dispersionForce = 5,
    returnSpeed = 0.02,
}: StarFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [stars, setStars] = useState<Star[]>([])
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
    const animationRef = useRef<number>(0)

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const width = window.innerWidth
                const height = window.innerHeight
                canvasRef.current.width = width
                canvasRef.current.height = height
                setDimensions({ width, height })

                const newStars: Star[] = []
                for (let i = 0; i < count; i++) {
                    const x = Math.random() * width
                    const y = Math.random() * height
                    const size = Math.random() * 2 + 0.5

                    const colorChoice = Math.random()
                    let color
                    if (colorChoice > 0.8) {
                        color = "#8CBED6" 
                    } else if (colorChoice > 0.6) {
                        color = "#FFF8E7" 
                    } else {
                        color = "#FFFFFF" 
                    }

                    newStars.push({
                        x,
                        y,
                        size,
                        originalX: x,
                        originalY: y,
                        vx: 0,
                        vy: 0,
                        color,
                    })
                }
                setStars(newStars)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [count])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        if (!canvasRef.current || stars.length === 0) return

        const ctx = canvasRef.current.getContext("2d")
        if (!ctx) return

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height)

            const updatedStars = stars.map((star) => {
                let { x, y, vx, vy, originalX, originalY, size, color } = star

                // Dispersion effect if mouse is near
                if (mousePosition) {
                    const dx = mousePosition.x - x
                    const dy = mousePosition.y - y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < dispersionRadius) {
                        const force = ((dispersionRadius - distance) / dispersionRadius) * dispersionForce
                        vx -= (dx / distance) * force
                        vy -= (dy / distance) * force
                    }
                }

                vx += (originalX - x) * returnSpeed
                vy += (originalY - y) * returnSpeed

                vx *= 0.95
                vy *= 0.95

                x += vx
                y += vy

                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fillStyle = color
                ctx.fill()

                return { ...star, x, y, vx, vy }
            })

            setStars(updatedStars)
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationRef.current)
        }
    }, [stars, mousePosition, dimensions, dispersionRadius, dispersionForce, returnSpeed])

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

