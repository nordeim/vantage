// app/frontend/components/public-invoice/PublicInvoiceTotals.tsx
import { formatCurrency } from "@/lib/utils"
import { calculateTotals } from "@/components/invoices/InvoiceSummary"
import type { LineItem } from "@/lib/types"

interface PublicInvoiceTotalsProps {
  lineItems: LineItem[]
}

/**
 * PublicInvoiceTotals — Total section for public invoice
 * 
 * Layout:
 * - Right-aligned
 * - Subtotal, discounts, total
 * - Large total with emphasis
 */
export function PublicInvoiceTotals({ lineItems }: PublicInvoiceTotalsProps) {
  const { subtotal, totalDiscount, total } = calculateTotals(lineItems)

  return (
    <div className="flex justify-end mb-8">
      <div className="w-full max-w-xs space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
          <span className="font-mono text-slate-900 dark:text-slate-100">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Discount */}
        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Discount</span>
            <span className="font-mono text-rose-600 dark:text-rose-400">
              -{formatCurrency(totalDiscount)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-slate-300 dark:bg-slate-700" />

        {/* Total Due */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Total Due
          </span>
          <span className="font-mono text-3xl font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  )
}
