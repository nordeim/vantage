// app/frontend/components/shared/VisuallyHidden.tsx

interface VisuallyHiddenProps {
    children: React.ReactNode
    /** If true, the element is visible for everyone */
    visible?: boolean
}

/**
 * VisuallyHidden — Hide content visually but keep it accessible
 * 
 * Use for:
 * - Screen reader only text
 * - Icon button labels
 * - Status announcements
 */
export function VisuallyHidden({ children, visible = false }: VisuallyHiddenProps) {
    if (visible) {
        return <>{children}</>
    }

    return (
        <span className="sr-only">
            {children}
        </span>
    )
}

/**
 * Alias for semantic clarity
 */
export const SrOnly = VisuallyHidden
