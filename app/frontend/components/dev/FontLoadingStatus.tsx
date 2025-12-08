// app/frontend/components/dev/FontLoadingStatus.tsx
import { useEffect, useState } from "react"

interface FontStatus {
    name: string
    loaded: boolean
    family: string
}

/**
 * FontLoadingStatus — Development tool to verify font loading
 */
export function FontLoadingStatus() {
    const [fonts, setFonts] = useState<FontStatus[]>([])

    useEffect(() => {
        const checkFonts = async () => {
            const fontChecks: FontStatus[] = [
                { name: 'Instrument Serif', family: 'Instrument Serif', loaded: false },
                { name: 'Geist', family: 'Geist', loaded: false },
                { name: 'Geist Mono', family: 'Geist Mono', loaded: false },
            ]

            // Use document.fonts API if available
            if ('fonts' in document) {
                await document.fonts.ready

                fontChecks.forEach(font => {
                    font.loaded = document.fonts.check(`16px "${font.family}"`)
                })
            }

            setFonts(fontChecks)
        }

        checkFonts()
    }, [])

    return (
        <div className="fixed bottom-4 left-4 z-50 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 p-3 text-xs">
            <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Font Status:</p>
            <ul className="space-y-1">
                {fonts.map(font => (
                    <li key={font.name} className="flex items-center gap-2">
                        <span className={font.loaded ? 'text-emerald-500' : 'text-rose-500'}>
                            {font.loaded ? '✓' : '✗'}
                        </span>
                        <span
                            className="text-slate-700 dark:text-slate-300"
                            style={{ fontFamily: font.family }}
                        >
                            {font.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
