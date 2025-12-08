// app/frontend/components/shared/SkipLink.tsx
import { cn } from "@/lib/utils"

interface SkipLinkProps {
    /** Target element ID to skip to */
    targetId?: string
    /** Link text */
    children?: React.ReactNode
}

/**
 * SkipLink — Accessibility skip navigation link
 * 
 * Allows keyboard users to skip directly to main content
 * Only visible when focused
 */
export function SkipLink({
    targetId = "main-content",
    children = "Skip to main content"
}: SkipLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const target = document.getElementById(targetId)
        if (target) {
            target.focus()
            target.scrollIntoView()
        }
    }

    return (
        <a
            href={`#${targetId}`}
            onClick={handleClick}
            className={cn(
                // Hidden by default
                "sr-only focus:not-sr-only",
                // Visible when focused
                "focus:fixed focus:top-4 focus:left-4 focus:z-[100]",
                "focus:px-4 focus:py-2 focus:rounded-md",
                "focus:bg-blue-500 focus:text-white",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "font-medium"
            )}
        >
            {children}
        </a>
    )
}
