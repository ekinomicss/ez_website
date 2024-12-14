'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { TwitterIcon, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

const BALL_SIZE = 20
const BALL_SPEED = 5

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
    const gameAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (gameStarted && !gameOver) {
            const intervalId = setInterval(moveBall, 30)
            return () => clearInterval(intervalId)
        }
    }, [gameStarted, gameOver, ballPosition])

    const startGame = () => {
        setGameStarted(true)
        setGameOver(false)
        setBallPosition({ x: 0, y: 0, dx: BALL_SPEED, dy: BALL_SPEED })
    }

    const moveBall = () => {
        if (gameAreaRef.current) {
            const { width, height } = gameAreaRef.current.getBoundingClientRect()
            let { x, y, dx, dy } = ballPosition

            if (x + BALL_SIZE > width || x < 0) dx = -dx
            if (y + BALL_SIZE > height || y < 0) dy = -dy

            x += dx
            y += dy

            if (x < 0 || x + BALL_SIZE > width || y < 0 || y + BALL_SIZE > height) {
                setGameOver(true)
                setGameStarted(false)
            } else {
                setBallPosition({ x, y, dx, dy })
            }
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (gameStarted && !gameOver && gameAreaRef.current) {
            const { left, top } = gameAreaRef.current.getBoundingClientRect()
            const mouseX = e.clientX - left
            const mouseY = e.clientY - top

            if (
                mouseX >= ballPosition.x &&
                mouseX <= ballPosition.x + BALL_SIZE &&
                mouseY >= ballPosition.y &&
                mouseY <= ballPosition.y + BALL_SIZE
            ) {
                // Ball is caught, change its direction
                setBallPosition(prev => ({
                    ...prev,
                    dx: -prev.dx,
                    dy: -prev.dy
                }))
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-4">Ekin's Blog</h1>
            <p className="text-xl mb-8">Under construction</p>

            <div className="flex space-x-4 mb-8">
                <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon className="w-8 h-8" />
                </Link>
                <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <Github className="w-8 h-8" />
                </Link>
                <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-8 h-8" />
                </Link>
            </div>

            <div
                ref={gameAreaRef}
                className="w-full max-w-2xl h-64 bg-white rounded-lg shadow-md relative overflow-hidden"
                onMouseMove={handleMouseMove}
            >
                {!gameStarted && !gameOver && (
                    <button
                        onClick={startGame}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Start Game
                    </button>
                )}
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
                {gameOver && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-red-500">
                        Game Over
                    </div>
                )}
            </div>
        </div>
    )
}

