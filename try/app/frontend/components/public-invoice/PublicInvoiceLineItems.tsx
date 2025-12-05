// app/frontend/components/public-invoice/PublicInvoiceLineItems.tsx
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface PublicInvoiceLineItemsProps {
  lineItems: LineItem[]
}

/**
 * PublicInvoiceLineItems — Line items table for public invoice
 */
export function PublicInvoiceLineItems({ lineItems }: PublicInvoiceLineItemsProps) {
  return (
    <div className="mb-8">
      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-100 dark:bg-slate-800 print:bg-slate-100 rounded-t-lg text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 print:text-slate-700">
        <div className="col-span-6">Description</div>
        <div className="col-span-2 text-right">Qty</div>
        <div className="col-span-2 text-right">Rate</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      {/* Line Items */}
      <div className="border border-slate-200 dark:border-slate-700 print:border-slate-300 rounded-lg sm:rounded-t-none overflow-hidden divide-y divide-slate-200 dark:divide-slate-700 print:divide-slate-300">
        {lineItems.map((item, index) => (
          <LineItemRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}

/**
 * Individual line item row
 */
function LineItemRow({ item, index }: { item: LineItem; index: number }) {
  // Section header
  if (item.type === 'section') {
    return (
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 print:bg-slate-50">
        <p className="font-semibold text-sm text-slate-900 dark:text-slate-50 print:text-black uppercase tracking-wide">
          {item.description}
        </p>
      </div>
    )
  }

  const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
  const isDiscount = item.type === 'discount'

  return (
    <div className={cn(
      "px-4 py-4",
      isDiscount && "bg-rose-50 dark:bg-rose-950/20 print:bg-rose-50"
    )}>
      {/* Mobile Layout */}
      <div className="sm:hidden space-y-2">
        <p className={cn(
          "font-medium text-sm",
          isDiscount 
            ? "text-rose-700 dark:text-rose-400 print:text-rose-700"
            : "text-slate-900 dark:text-slate-50 print:text-black"
        )}>
          {item.description}
        </p>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400 print:text-slate-600">
            {item.quantity} {item.unitType} × {formatCurrency(Math.abs(item.unitPrice || 0))}
          </span>
          <span className={cn(
            "font-mono font-medium",
            isDiscount 
              ? "text-rose-600 dark:text-rose-400 print:text-rose-700"
              : "text-slate-900 dark:text-slate-50 print:text-black"
          )}>
            {formatCurrency(lineTotal)}
          </span>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6">
          <p className={cn(
            "text-sm",
            isDiscount 
              ? "text-rose-700 dark:text-rose-400 print:text-rose-700"
              : "text-slate-900 dark:text-slate-50 print:text-black"
          )}>
            {item.description}
          </p>
        </div>
        <div className="col-span-2 text-right text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
          {item.quantity} {item.unitType}
        </div>
        <div className="col-span-2 text-right font-mono text-sm text-slate-600 dark:text-slate-400 print:text-slate-700">
          {formatCurrency(Math.abs(item.unitPrice || 0))}
        </div>
        <div className={cn(
          "col-span-2 text-right font-mono text-sm font-medium",
          isDiscount 
            ? "text-rose-600 dark:text-rose-400 print:text-rose-700"
            : "text-slate-900 dark:text-slate-50 print:text-black"
        )}>
          {formatCurrency(lineTotal)}
        </div>
      </div>
    </div>
  )
}
