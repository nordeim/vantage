// app/frontend/components/invoices/InvoiceSummary.tsx
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { InvoiceTotals } from "@/lib/invoice-calculations"

interface InvoiceSummaryProps {
  totals: InvoiceTotals
  className?: string
}

/**
 * InvoiceSummary — Displays subtotal, discount, and total
 * 
 * Layout (v4.2):
 * - Right-aligned values
 * - Monospace numbers
 * - Total emphasized
 */
export function InvoiceSummary({ totals, className }: InvoiceSummaryProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
        <span className="font-mono font-medium text-slate-900 dark:text-slate-50">
          {formatCurrency(totals.subtotal)}
        </span>
      </div>

      {/* Discount (only show if there is one) */}
      {totals.totalDiscount > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Discount</span>
          <span className="font-mono font-medium text-rose-600 dark:text-rose-400">
            -{formatCurrency(totals.totalDiscount)}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900 dark:text-slate-50">
          Total
        </span>
        <span className="font-mono text-2xl font-bold text-slate-900 dark:text-slate-50">
          {formatCurrency(totals.total)}
        </span>
      </div>
    </div>
  )
}
