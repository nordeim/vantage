DAY 6: Public Invoice View
Day 6 Execution Plan — Phased Breakdown

```markdown
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 6: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► Public Layout                                                  │
│              └── Minimal layout without navigation                          │
│                                                                             │
│  PHASE 2 ──► Public Invoice Components                                      │
│              └── InvoiceHeader, InvoiceLineItems, InvoiceTotals             │
│                                                                             │
│  PHASE 3 ──► Payment Modal                                                  │
│              └── Mock Stripe payment form                                   │
│                                                                             │
│  PHASE 4 ──► Public Invoice Page                                            │
│              └── Complete page with print optimization                      │
│                                                                             │
│  PHASE 5 ──► Print Styles                                                   │
│              └── CSS for print-ready output                                 │
│                                                                             │
│  PHASE 6 ──► Validation & QA                                                │
│              └── Print testing, responsive, accessibility                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Phase 1: Public Layout
1.1 Implementation

```tsx
// app/frontend/layouts/PublicLayout.tsx
import { cn } from "@/lib/utils"

interface PublicLayoutProps {
  children: React.ReactNode
  className?: string
}

/**
 * PublicLayout — Minimal layout for public-facing pages
 * 
 * Features:
 * - No navigation
 * - Centered content
 * - Print-optimized
 */
export function PublicLayout({ children, className }: PublicLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-slate-100 dark:bg-slate-950",
      "print:bg-white print:min-h-0",
      className
    )}>
      <main className="mx-auto max-w-4xl px-4 py-8 print:p-0 print:max-w-none">
        {children}
      </main>
    </div>
  )
}
```

---

Phase 2: Public Invoice Components
2.1 Implementation
Step 2.1.1: Create PublicInvoiceHeader Component

```tsx
// app/frontend/components/public-invoice/PublicInvoiceHeader.tsx
import { Logo } from "@/components/layout/Logo"
import { formatDate } from "@/lib/utils"
import type { Invoice } from "@/lib/types"

interface PublicInvoiceHeaderProps {
  invoice: Invoice
}

/**
 * PublicInvoiceHeader — Header section of public invoice
 * 
 * Layout:
 * - Logo on left
 * - "INVOICE" + number on right
 * - Billed to section below
 */
export function PublicInvoiceHeader({ invoice }: PublicInvoiceHeaderProps) {
  return (
    <div className="mb-8">
      {/* Top Row: Logo and Invoice Info */}
      <div className="flex justify-between items-start mb-8">
        {/* Left: Logo and Sender Info */}
        <div>
          <Logo />
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            <p>Your Company Name</p>
            <p>123 Business Street</p>
            <p>Singapore 123456</p>
          </div>
        </div>

        {/* Right: Invoice Title and Number */}
        <div className="text-right">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Invoice
          </p>
          <p className="font-mono text-4xl md:text-6xl tracking-tighter font-medium text-slate-900 dark:text-slate-50 mt-1">
            {invoice.invoiceNumber}
          </p>
        </div>
      </div>

      {/* Invoice Details Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-200 dark:border-slate-800">
        {/* Billed To */}
        <div className="col-span-2">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Billed To
          </p>
          <p className="font-medium text-slate-900 dark:text-slate-50">
            {invoice.client?.name}
          </p>
          {invoice.client?.company && (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {invoice.client.company}
            </p>
          )}
          {invoice.client?.address && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 whitespace-pre-line">
              {invoice.client.address}
            </p>
          )}
        </div>

        {/* Issue Date */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Issue Date
          </p>
          <p className="text-slate-900 dark:text-slate-50">
            {formatDate(invoice.issueDate)}
          </p>
        </div>

        {/* Due Date */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Due Date
          </p>
          <p className={`${
            invoice.status === 'overdue' 
              ? 'text-rose-600 dark:text-rose-400 font-medium' 
              : 'text-slate-900 dark:text-slate-50'
          }`}>
            {formatDate(invoice.dueDate)}
          </p>
        </div>
      </div>
    </div>
  )
}
```

Step 2.1.2: Create PublicInvoiceLineItems Component

```tsx
// app/frontend/components/public-invoice/PublicInvoiceLineItems.tsx
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface PublicInvoiceLineItemsProps {
  lineItems: LineItem[]
}

/**
 * PublicInvoiceLineItems — Line items table for public invoice
 * 
 * Layout:
 * - Section headers span full width
 * - Items show description, quantity, rate, amount
 * - Discounts shown in red
 */
export function PublicInvoiceLineItems({ lineItems }: PublicInvoiceLineItemsProps) {
  return (
    <div className="mb-8">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 border-b-2 border-slate-900 dark:border-slate-100 text-sm font-medium text-slate-900 dark:text-slate-100">
        <div className="col-span-6">Description</div>
        <div className="col-span-2 text-right">Quantity</div>
        <div className="col-span-2 text-right">Rate</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      {/* Line Items */}
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {lineItems.map((item) => (
          <LineItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

/**
 * LineItemRow — Single line item display
 */
function LineItemRow({ item }: { item: LineItem }) {
  // Section Header
  if (item.type === 'section') {
    return (
      <div className="py-4 bg-slate-50 dark:bg-slate-800/50 -mx-4 px-4 md:mx-0 md:px-0">
        <p className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide text-sm">
          {item.description}
        </p>
      </div>
    )
  }

  // Discount Row
  if (item.type === 'discount') {
    const amount = Math.abs(item.unitPrice || 0)
    return (
      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
        <div className="md:col-span-6">
          <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
        </div>
        <div className="md:col-span-2" />
        <div className="md:col-span-2" />
        <div className="md:col-span-2 text-right">
          <span className="font-mono text-rose-600 dark:text-rose-400">
            -{formatCurrency(amount)}
          </span>
        </div>
      </div>
    )
  }

  // Regular Item Row
  const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
  const unitLabel = item.unitType === 'fixed' ? '' : ` ${item.unitType}`

  return (
    <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
      {/* Description */}
      <div className="md:col-span-6">
        <p className="text-slate-900 dark:text-slate-100">{item.description}</p>
      </div>

      {/* Quantity */}
      <div className="md:col-span-2 md:text-right">
        <span className="md:hidden text-sm text-slate-500">Qty: </span>
        <span className="text-slate-600 dark:text-slate-400">
          {item.quantity}{unitLabel}
        </span>
      </div>

      {/* Rate */}
      <div className="md:col-span-2 md:text-right">
        <span className="md:hidden text-sm text-slate-500">Rate: </span>
        <span className="font-mono text-slate-600 dark:text-slate-400">
          {formatCurrency(item.unitPrice || 0)}
        </span>
      </div>

      {/* Amount */}
      <div className="md:col-span-2 md:text-right">
        <span className="md:hidden text-sm text-slate-500">Amount: </span>
        <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
          {formatCurrency(lineTotal)}
        </span>
      </div>
    </div>
  )
}
```

Step 2.1.3: Create PublicInvoiceTotals Component

```tsx
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
```

Step 2.1.4: Create Public Invoice Components Index

```ts
// app/frontend/components/public-invoice/index.ts
export { PublicInvoiceHeader } from './PublicInvoiceHeader'
export { PublicInvoiceLineItems } from './PublicInvoiceLineItems'
export { PublicInvoiceTotals } from './PublicInvoiceTotals'
```

---

Phase 3: Payment Modal
3.1 Implementation

```tsx
// app/frontend/components/public-invoice/PaymentModal.tsx
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, Lock } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
  invoiceNumber: string
}

/**
 * PaymentModal — Mock Stripe payment form
 * 
 * Features:
 * - Card number, expiry, CVC fields
 * - Mock "Secured by Stripe" branding
 * - Pay Now button with amount
 */
export function PaymentModal({
  open,
  onOpenChange,
  amount,
  invoiceNumber,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    alert('Payment successful! (This is a mock payment)')
    onOpenChange(false)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    const groups = numbers.match(/.{1,4}/g) || []
    return groups.join(' ').substr(0, 19)
  }

  // Format expiry as MM/YY
  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length >= 2) {
      return `${numbers.substr(0, 2)}/${numbers.substr(2, 2)}`
    }
    return numbers
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pay Invoice {invoiceNumber}
          </DialogTitle>
          <DialogDescription>
            Enter your card details to pay {formatCurrency(amount)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              disabled={isProcessing}
            />
          </div>

          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substr(0, 4))}
                maxLength={4}
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Secured by Stripe */}
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 py-2">
            <Lock className="h-4 w-4" />
            <span>Secured by Stripe</span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              'Processing...'
            ) : (
              `Pay ${formatCurrency(amount)}`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

Step 3.1.2: Update Public Invoice Components Index

```ts
// app/frontend/components/public-invoice/index.ts
export { PublicInvoiceHeader } from './PublicInvoiceHeader'
export { PublicInvoiceLineItems } from './PublicInvoiceLineItems'
export { PublicInvoiceTotals } from './PublicInvoiceTotals'
export { PaymentModal } from './PaymentModal'
```

---

Phase 4: Public Invoice Page
4.1 Implementation

```tsx
// app/frontend/pages/PublicInvoice/Show.tsx
import { useState, useMemo } from "react"
import { PublicLayout } from "@/layouts/PublicLayout"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/shared/StatusBadge"
import {
  PublicInvoiceHeader,
  PublicInvoiceLineItems,
  PublicInvoiceTotals,
  PaymentModal,
} from "@/components/public-invoice"
import { calculateTotals } from "@/components/invoices/InvoiceSummary"
import { mockInvoices } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, Printer, Download } from "lucide-react"

interface PublicInvoiceShowProps {
  token: string
}

/**
 * Public Invoice Page — Client-facing shareable invoice
 * 
 * Features:
 * - Professional invoice layout
 * - Print-optimized styling
 * - Pay Now button (mock)
 * - Print and download options
 */
export default function PublicInvoiceShow({ token }: PublicInvoiceShowProps) {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  // Find invoice by token (in real app, this would come from API)
  const invoice = useMemo(
    () => mockInvoices.find(inv => inv.token === token),
    [token]
  )

  if (!invoice) {
    return (
      <PublicLayout>
        <div className="text-center py-12">
          <p className="text-slate-500">Invoice not found</p>
        </div>
      </PublicLayout>
    )
  }

  const { total } = calculateTotals(invoice.lineItems)
  const isPaid = invoice.status === 'paid'
  const canPay = invoice.status === 'pending' || invoice.status === 'overdue'

  const handlePrint = () => {
    window.print()
  }

  return (
    <PublicLayout>
      {/* Action Bar (hidden in print) */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <StatusBadge status={invoice.status} />
        <div className="flex 
```
