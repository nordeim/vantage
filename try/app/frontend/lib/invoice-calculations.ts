// app/frontend/lib/invoice-calculations.ts
import type { LineItem } from './types'

export interface InvoiceTotals {
  subtotal: number
  totalDiscount: number
  total: number
}

/**
 * Calculate invoice totals from line items
 */
export function calculateInvoiceTotals(lineItems: LineItem[]): InvoiceTotals {
  // Filter items and discounts
  const items = lineItems.filter(li => li.type === 'item')
  const discounts = lineItems.filter(li => li.type === 'discount')

  // Calculate subtotal (sum of item line totals)
  const subtotal = items.reduce((sum, item) => {
    const qty = item.quantity || 0
    const price = item.unitPrice || 0
    return sum + (qty * price)
  }, 0)

  // Calculate total discount (absolute value of negative prices)
  const totalDiscount = Math.abs(
    discounts.reduce((sum, d) => sum + (d.unitPrice || 0), 0)
  )

  // Calculate final total
  const total = subtotal - totalDiscount

  return { subtotal, totalDiscount, total }
}
