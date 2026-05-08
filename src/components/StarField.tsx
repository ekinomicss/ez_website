"use client"

import type { MutableRefObject } from "react"
import { useEffect, useRef, useState } from "react"
import type { ViewportClearRect } from "./star-clear-types"

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
    dispersionRadius?: number
    dispersionForce?: number
    returnSpeed?: number
    burstSignal?: number
    className?: string
    /** When true and `clearViewportRectRef` has a valid rect, stars avoid the content column (plus padding). */
    useContentClearZone?: boolean
    clearViewportRectRef?: MutableRefObject<ViewportClearRect | null>
    clearPaddingPx?: number
    /** Bumps when the registered clear-zone element changes so stars can be resampled. */
    clearZoneTick?: number
}

type ForbiddenZone = { left: number; right: number; top: number; bottom: number }

function buildForbiddenZone(
    width: number,
    height: number,
    useContentClearZone: boolean,
    measured: ViewportClearRect | null,
    clearPaddingPx: number
): ForbiddenZone | null {
    if (!useContentClearZone || width <= 0 || height <= 0) return null
    if (!measured || measured.width < 4 || measured.height < 4) return null

    return {
        left: measured.left - clearPaddingPx,
        right: measured.left + measured.width + clearPaddingPx,
        top: measured.top + 80,
        bottom: measured.top + measured.height + clearPaddingPx,
    }
}

function isInsideForbidden(x: number, y: number, zone: ForbiddenZone): boolean {
    return x > zone.left && x < zone.right && y > zone.top && y < zone.bottom
}

function pushToForbiddenBoundary(x: number, y: number, zone: ForbiddenZone): { x: number; y: number } {
    const dL = x - zone.left
    const dR = zone.right - x
    const dT = y - zone.top
    const dB = zone.bottom - y
    const min = Math.min(dL, dR, dT, dB)

    if (min === dL) return { x: zone.left, y }
    if (min === dR) return { x: zone.right, y }
    if (min === dT) return { x, y: zone.top }
    return { x, y: zone.bottom }
}

function samplePositionOutsideForbidden(
    width: number,
    height: number,
    forbidden: ForbiddenZone | null,
    maxAttempts = 100
): { x: number; y: number } {
    if (!forbidden) {
        return { x: Math.random() * width, y: Math.random() * height }
    }
    for (let i = 0; i < maxAttempts; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        if (!isInsideForbidden(x, y, forbidden)) return { x, y }
    }
    const side = Math.random() < 0.5 ? "left" : "right"
    const x =
        side === "left"
            ? Math.random() * Math.max(0, forbidden.left)
            : forbidden.right + Math.random() * Math.max(0, width - forbidden.right)
    const y = Math.random() * height
    return { x: Math.min(width, Math.max(0, x)), y }
}

export default function StarField({
    count = 200,
    dispersionRadius = 100,
    dispersionForce = 5,
    returnSpeed = 0.02,
    burstSignal = 0,
    className = "fixed inset-0 pointer-events-none z-0",
    useContentClearZone = false,
    clearViewportRectRef,
    clearPaddingPx = 24,
    clearZoneTick = 0,
}: StarFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const starsRef = useRef<Star[]>([])
    const mouseRef = useRef<{ x: number; y: number } | null>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const width = window.innerWidth
                const height = window.innerHeight
                canvasRef.current.width = width
                canvasRef.current.height = height
                setDimensions({ width, height })

                const measured = clearViewportRectRef?.current ?? null
                const forbidden = buildForbiddenZone(width, height, useContentClearZone, measured, clearPaddingPx)

                const effectiveCount =
                    width < 480
                        ? Math.max(50, Math.round(count * 0.22))
                        : width < 768
                          ? Math.max(80, Math.round(count * 0.38))
                          : count
                const sizeScale = width < 640 ? 0.65 : 1

                const newStars: Star[] = []
                for (let i = 0; i < effectiveCount; i++) {
                    const { x, y } = samplePositionOutsideForbidden(width, height, forbidden)
                    const size = (Math.random() * 2 + 0.5) * sizeScale

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
                starsRef.current = newStars
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [count, useContentClearZone, clearPaddingPx, clearZoneTick])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        if (!burstSignal || dimensions.width === 0 || dimensions.height === 0) return

        mouseRef.current = {
            x: dimensions.width / 2,
            y: dimensions.height / 2,
        }
        const timeoutId = window.setTimeout(() => {
            mouseRef.current = null
        }, 180)

        return () => window.clearTimeout(timeoutId)
    }, [burstSignal, dimensions.width, dimensions.height])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || dimensions.width === 0 || dimensions.height === 0) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId = 0

        const animate = () => {
            const w = dimensions.width
            const h = dimensions.height
            const measured = clearViewportRectRef?.current ?? null
            const forbidden = buildForbiddenZone(w, h, useContentClearZone, measured, clearPaddingPx)
            const mousePosition = mouseRef.current
            const stars = starsRef.current

            ctx.clearRect(0, 0, w, h)

            for (const star of stars) {
                let { x, y, vx, vy, originalX, originalY, size, color } = star

                if (mousePosition) {
                    const dx = mousePosition.x - x
                    const dy = mousePosition.y - y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < dispersionRadius && distance > 1e-6) {
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

                if (x < 0) {
                    x = 0
                    vx *= -0.35
                } else if (x > w) {
                    x = w
                    vx *= -0.35
                }

                if (y < 0) {
                    y = 0
                    vy *= -0.35
                } else if (y > h) {
                    y = h
                    vy *= -0.35
                }

                if (forbidden && isInsideForbidden(x, y, forbidden)) {
                    const out = pushToForbiddenBoundary(x, y, forbidden)
                    x = out.x
                    y = out.y
                    vx *= 0.55
                    vy *= 0.55
                }

                star.x = x
                star.y = y
                star.vx = vx
                star.vy = vy

                ctx.beginPath()
                ctx.arc(x, y, size, 0, Math.PI * 2)
                ctx.fillStyle = color
                ctx.fill()
            }

            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [
        dimensions.width,
        dimensions.height,
        dispersionRadius,
        dispersionForce,
        returnSpeed,
        useContentClearZone,
        clearPaddingPx,
    ])

    return <canvas ref={canvasRef} className={className} />
}
