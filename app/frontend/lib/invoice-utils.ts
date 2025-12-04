// app/frontend/lib/invoice-utils.ts
import type { LineItem, LineItemType, UnitType } from './types'

/**
 * Calculate the total for a single line item
 */
export function calculateLineTotal(item: LineItem): number {
  if (item.type === 'section') {
    return 0
  }
  
  const quantity = item.quantity ?? 0
  const unitPrice = item.unitPrice ?? 0
  
  return quantity * unitPrice
}

/**
 * Calculate subtotal (sum of all item line totals, excluding discounts)
 */
export function calculateSubtotal(lineItems: LineItem[]): number {
  return lineItems
    .filter(item => item.type === 'item')
    .reduce((sum, item) => sum + calculateLineTotal(item), 0)
}

/**
 * Calculate total discount amount (absolute value)
 */
export function calculateTotalDiscount(lineItems: LineItem[]): number {
  return Math.abs(
    lineItems
      .filter(item => item.type === 'discount')
      .reduce((sum, item) => sum + (item.unitPrice ?? 0), 0)
  )
}

/**
 * Calculate final invoice total
 */
export function calculateInvoiceTotal(lineItems: LineItem[]): number {
  const subtotal = calculateSubtotal(lineItems)
  const discount = calculateTotalDiscount(lineItems)
  return subtotal - discount
}

/**
 * Calculate all totals at once
 */
export function calculateTotals(lineItems: LineItem[]): {
  subtotal: number
  totalDiscount: number
  total: number
} {
  const subtotal = calculateSubtotal(lineItems)
  const totalDiscount = calculateTotalDiscount(lineItems)
  const total = subtotal - totalDiscount
  
  return { subtotal, totalDiscount, total }
}

/**
 * Generate a unique ID for new line items
 */
export function generateLineItemId(): string {
  return `li_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Create a new blank item line
 */
export function createBlankItem(position: number, invoiceId: string = ''): LineItem {
  return {
    id: generateLineItemId(),
    invoiceId,
    type: 'item',
    description: '',
    quantity: 1,
    unitType: 'hours',
    unitPrice: 0,
    position,
  }
}

/**
 * Create a new section header
 */
export function createSectionHeader(description: string, position: number, invoiceId: string = ''): LineItem {
  return {
    id: generateLineItemId(),
    invoiceId,
    type: 'section',
    description,
    position,
  }
}

/**
 * Create a new discount line
 */
export function createDiscountLine(description: string, amount: number, position: number, invoiceId: string = ''): LineItem {
  return {
    id: generateLineItemId(),
    invoiceId,
    type: 'discount',
    description,
    quantity: 1,
    unitType: 'fixed',
    unitPrice: -Math.abs(amount), // Ensure negative
    position,
  }
}

/**
 * Get display label for unit type
 */
export function getUnitTypeLabel(unitType: UnitType): string {
  const labels: Record<UnitType, string> = {
    hours: 'hrs',
    days: 'days',
    items: 'items',
    units: 'units',
    fixed: '',
  }
  return labels[unitType] || ''
}

/**
 * Available unit type options
 */
export const unitTypeOptions: Array<{ value: UnitType; label: string }> = [
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'items', label: 'Items' },
  { value: 'units', label: 'Units' },
  { value: 'fixed', label: 'Fixed' },
]
