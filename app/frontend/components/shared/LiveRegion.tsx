// app/frontend/components/shared/LiveRegion.tsx
import { useEffect, useState, useCallback } from "react"

interface LiveRegionProps {
    /** Message to announce */
    message: string
    /** Priority level */
    priority?: 'polite' | 'assertive'
    /** Clear message after announcement */
    clearAfter?: number
}

/**
 * LiveRegion — Announce dynamic content changes to screen readers
 * 
 * Use for:
 * - Form submission results
 * - Filter changes
 * - Data loading states
 * - Toast notifications
 */
export function LiveRegion({
    message,
    priority = 'polite',
    clearAfter = 5000
}: LiveRegionProps) {
    const [currentMessage, setCurrentMessage] = useState(message)

    useEffect(() => {
        setCurrentMessage(message)

        if (clearAfter > 0) {
            const timer = setTimeout(() => {
                setCurrentMessage('')
            }, clearAfter)
            return () => clearTimeout(timer)
        }
    }, [message, clearAfter])

    return (
        <div
            role="status"
            aria-live={priority}
            aria-atomic="true"
            className="sr-only"
        >
            {currentMessage}
        </div>
    )
}

/**
 * Hook for programmatic announcements
 */
export function useAnnounce() {
    const [message, setMessage] = useState('')

    const announce = useCallback((text: string) => {
        setMessage(text)
        // Reset after a short delay to allow re-announcing same message
        setTimeout(() => setMessage(''), 100)
    }, [])

    return { message, announce }
}
