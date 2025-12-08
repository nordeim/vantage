// app/frontend/components/dev/AccessibilityChecklist.tsx
import { useState, useEffect } from "react"
import { Check, X, AlertTriangle } from "lucide-react"

interface CheckResult {
    id: string
    name: string
    status: 'pass' | 'fail' | 'warning'
    details?: string
}

/**
 * AccessibilityChecklist — Development tool for a11y testing
 * 
 * Only render in development mode
 */
export function AccessibilityChecklist() {
    const [results, setResults] = useState<CheckResult[]>([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        runAccessibilityChecks().then(setResults)
    }, [])

    const passCount = results.filter(r => r.status === 'pass').length
    const failCount = results.filter(r => r.status === 'fail').length
    const warnCount = results.filter(r => r.status === 'warning').length

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium"
            >
                A11y: {passCount}✓ {failCount}✗ {warnCount}⚠
            </button>

            {/* Results panel */}
            {isOpen && (
                <div className="absolute bottom-12 right-0 w-80 bg-white rounded-lg shadow-xl border border-slate-200 p-4 max-h-96 overflow-auto">
                    <h3 className="font-semibold text-slate-900 mb-3">Accessibility Checks</h3>
                    <ul className="space-y-2">
                        {results.map(result => (
                            <li key={result.id} className="flex items-start gap-2 text-sm">
                                {result.status === 'pass' && <Check className="h-4 w-4 text-emerald-500 mt-0.5" />}
                                {result.status === 'fail' && <X className="h-4 w-4 text-rose-500 mt-0.5" />}
                                {result.status === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />}
                                <div>
                                    <p className="text-slate-700">{result.name}</p>
                                    {result.details && (
                                        <p className="text-slate-500 text-xs">{result.details}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

async function runAccessibilityChecks(): Promise<CheckResult[]> {
    const results: CheckResult[] = []

    // Check for images without alt text
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])')
    results.push({
        id: 'images-alt',
        name: 'Images have alt text',
        status: imagesWithoutAlt.length === 0 ? 'pass' : 'fail',
        details: imagesWithoutAlt.length > 0 ? `${imagesWithoutAlt.length} images missing alt` : undefined
    })

    // Check for buttons without accessible names
    const buttonsWithoutName = document.querySelectorAll('button:not([aria-label]):not(:has(*))')
    results.push({
        id: 'buttons-name',
        name: 'Buttons have accessible names',
        status: buttonsWithoutName.length === 0 ? 'pass' : 'fail',
        details: buttonsWithoutName.length > 0 ? `${buttonsWithoutName.length} buttons need labels` : undefined
    })

    // Check for form inputs without labels
    const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([id])')
    results.push({
        id: 'inputs-labels',
        name: 'Form inputs have labels',
        status: inputsWithoutLabels.length === 0 ? 'pass' : 'warning',
        details: inputsWithoutLabels.length > 0 ? `${inputsWithoutLabels.length} inputs may need labels` : undefined
    })

    // Check for focus visible
    const hasFocusStyles = document.styleSheets.length > 0
    results.push({
        id: 'focus-visible',
        name: 'Focus styles present',
        status: hasFocusStyles ? 'pass' : 'warning',
        details: 'Manually verify focus rings are visible'
    })

    // Check for skip link
    const hasSkipLink = document.querySelector('[href="#main-content"]')
    results.push({
        id: 'skip-link',
        name: 'Skip link present',
        status: hasSkipLink ? 'pass' : 'warning',
        details: !hasSkipLink ? 'Consider adding skip link' : undefined
    })

    // Check for landmark regions
    const hasMain = document.querySelector('main')
    const hasNav = document.querySelector('nav')
    results.push({
        id: 'landmarks',
        name: 'Landmark regions present',
        status: hasMain && hasNav ? 'pass' : 'warning',
        details: !hasMain ? 'Missing <main> element' : undefined
    })

    return results
}
