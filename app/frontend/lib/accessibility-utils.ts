// app/frontend/lib/accessibility-utils.ts
/**
 * Accessibility utilities for testing and runtime checks
 */

/**
 * Calculate contrast ratio between two colors
 * @param foreground - Foreground color in hex
 * @param background - Background color in hex
 * @returns Contrast ratio (1:1 to 21:1)
 */
export function getContrastRatio(foreground: string, background: string): number {
    const getLuminance = (hex: string): number => {
        const rgb = hexToRgb(hex)
        if (!rgb) return 0

        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
            v /= 255
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
        })

        return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    const l1 = getLuminance(foreground)
    const l2 = getLuminance(background)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)

    return (lighter + 0.05) / (darker + 0.05)
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

/**
 * Check if contrast meets WCAG AA for normal text (4.5:1)
 */
export function meetsWCAGAA(foreground: string, background: string): boolean {
    return getContrastRatio(foreground, background) >= 4.5
}

/**
 * Check if contrast meets WCAG AA for large text (3:1)
 */
export function meetsWCAGAALarge(foreground: string, background: string): boolean {
    return getContrastRatio(foreground, background) >= 3
}

/**
 * Focus trap utility for modals
 */
export function createFocusTrap(container: HTMLElement) {
    const focusableElements = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault()
                lastElement?.focus()
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault()
                firstElement?.focus()
            }
        }
    }

    container.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()

    return () => {
        container.removeEventListener('keydown', handleKeyDown)
    }
}

/**
 * Announce message to screen readers
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const region = document.createElement('div')
    region.setAttribute('role', 'status')
    region.setAttribute('aria-live', priority)
    region.setAttribute('aria-atomic', 'true')
    region.className = 'sr-only'
    region.textContent = message

    document.body.appendChild(region)

    setTimeout(() => {
        document.body.removeChild(region)
    }, 1000)
}
