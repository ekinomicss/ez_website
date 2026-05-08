import type { ElementType, ReactNode } from 'react'

type SectionHeadingProps<T extends ElementType = 'h2'> = {
    as?: T
    id?: string
    className?: string
    showCursor?: boolean
    children: ReactNode
}

/** Blinking terminal-style cursor after the heading (see `.heading-cursor` in globals.css). */
export default function SectionHeading<T extends ElementType = 'h2'>({
    as,
    id,
    className = '',
    showCursor = true,
    children,
}: SectionHeadingProps<T>) {
    const Tag = (as ?? 'h2') as ElementType
    return (
        <Tag id={id} className={`${showCursor ? 'heading-cursor' : ''} ${className}`.trim()}>
            {children}
        </Tag>
    )
}
