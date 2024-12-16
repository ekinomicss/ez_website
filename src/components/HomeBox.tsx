'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Twitter, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import Gradient from './Gradient'

const BALL_SIZE = 20
const BALL_SPEED = 5
const MIN_SPEED = 3
const MAX_SPEED = 8

interface BallPosition {
    x: number
    y: number
    dx: number
    dy: number
}

export default function HomePage() {
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [ballPosition, setBallPosition] = useState<BallPosition>({ x: 0, y: 0, dx: BALL_SPEED, dy: BALL_SPEED })
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const [score, setScore] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (gameStarted && !gameOver) {
            const intervalId = setInterval(moveBall, 16)
            return () => clearInterval(intervalId)
        }
    }, [gameStarted, gameOver, ballPosition, windowSize])

    const startGame = () => {
        setGameStarted(true)
        setGameOver(false)
        setScore(0)
        setBallPosition({
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
            dx: (Math.random() > 0.5 ? 1 : -1) * BALL_SPEED,
            dy: -BALL_SPEED
        })
    }

    const moveBall = () => {
        let { x, y, dx, dy } = ballPosition
        let newScore = score

        // Left & right edges
        if (x + BALL_SIZE > windowSize.width || x < 0) {
            dx = -dx * 1.1
            newScore++
        }

        // Top edge
        if (y < 0) {
            dy = -dy * 1.1
            newScore++
        }

        x += dx
        y += dy

        // Bottom edge
        if (y + BALL_SIZE > windowSize.height) {
            setGameOver(true)
            setGameStarted(false)
        } else {
            // Clamp speed
            dx = Math.sign(dx) * Math.min(Math.max(Math.abs(dx), MIN_SPEED), MAX_SPEED)
            dy = Math.sign(dy) * Math.min(Math.max(Math.abs(dy), MIN_SPEED), MAX_SPEED)

            setBallPosition({ x, y, dx, dy })
            setScore(newScore)
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (gameStarted && !gameOver) {
            const mouseX = e.clientX
            const mouseY = e.clientY

            const ballCenterX = ballPosition.x + BALL_SIZE / 2
            const ballCenterY = ballPosition.y + BALL_SIZE / 2

            const distance = Math.sqrt(
                Math.pow(mouseX - ballCenterX, 2) + Math.pow(mouseY - ballCenterY, 2)
            )

            if (distance <= BALL_SIZE) {
                const angle = Math.atan2(mouseY - ballCenterY, mouseX - ballCenterX)
                const speed = Math.sqrt(ballPosition.dx ** 2 + ballPosition.dy ** 2)
                const newDx = -Math.cos(angle) * speed * 1.2
                const newDy = -Math.sin(angle) * speed * 1.2

                setBallPosition(prev => ({
                    ...prev,
                    dx: newDx,
                    dy: newDy
                }))
            }
        }
    }

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 overflow-hidden relative"
            onMouseMove={handleMouseMove}
        >
            <div className="z-10 text-center">
                <a href="/">
                    <Gradient />
                </a>
                <p className="text-xl mb-8 font-roboto text-gray-600">Under construction</p>

                <div className="flex justify-center space-x-4 mb-8">
                    <Link href="https://twitter.com/ekinomicss" target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-8 h-8 text-blue-400" />
                    </Link>
                    <Link href="https://github.com/ekinomicss" target="_blank" rel="noopener noreferrer">
                        <Github className="w-8 h-8 text-gray-800" />
                    </Link>
                    <Link href="https://linkedin.com/in/ekin-zorer" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-8 h-8 text-blue-700" />
                    </Link>
                </div>
            </div>

            <div className="fixed inset-0 pointer-events-none">
                {gameStarted && !gameOver && (
                    <div
                        className="absolute bg-pink-500 rounded-full"
                        style={{
                            width: BALL_SIZE,
                            height: BALL_SIZE,
                            left: ballPosition.x,
                            top: ballPosition.y,
                        }}
                    />
                )}
            </div>
            <button
                onClick={startGame}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors z-20"
            >
                {!gameStarted && !gameOver && 'Start Game'}
                {gameStarted && !gameOver && `Score: ${score}`}
                {gameOver && `Game Over!! Score: ${score}`}
            </button>
        </div>
    )
}

