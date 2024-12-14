'use client'

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { TwitterIcon, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

const BALL_SIZE = 25
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

            // Left and right edges
            if (x + BALL_SIZE > width || x < 0) dx = -dx

            // Top edge
            if (y < 0) dy = -dy

            x += dx
            y += dy

            // Bottom edge 
            if (y + BALL_SIZE > height) {
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

            const ballCenterX = ballPosition.x + BALL_SIZE / 2
            const ballCenterY = ballPosition.y + BALL_SIZE / 2

            const distance = Math.sqrt(
                Math.pow(mouseX - ballCenterX, 2) + Math.pow(mouseY - ballCenterY, 2)
            )

            if (distance <= BALL_SIZE) {
                // Ball is touched, change its direction more dramatically
                const angle = Math.atan2(mouseY - ballCenterY, mouseX - ballCenterX)
                const speed = Math.sqrt(ballPosition.dx ** 2 + ballPosition.dy ** 2)
                const newDx = -Math.cos(angle) * speed  
                const newDy = -Math.sin(angle) * speed 

                setBallPosition(prev => ({
                    ...prev,
                    dx: newDx,
                    dy: newDy
                }))
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <a href="/"><h1 className="text-4xl font-bold mb-4 text-gray">Ekin's Blog</h1></a>
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
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-gray px-4 py-2 rounded"
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
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-red-800">
                        game over!!
                    </div>
                )}
            </div>
        </div>
    )
}

