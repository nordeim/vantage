// app/frontend/pages/PublicInvoice/Show.tsx
import { useCallback } from "react"
import { Head } from "@inertiajs/react"
import { PublicLayout } from "@/layouts/PublicLayout"
import {
  PublicInvoiceHeader,
  PublicInvoiceBilledTo,
  PublicInvoiceLineItems,
  PublicInvoiceTotals,
  PublicInvoiceNotes,
} from "@/components/public-invoice"
import { Button } from "@/components/ui/button"
import { Printer, CreditCard, Download } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface PublicInvoiceShowProps {
  invoice: {
    token: string
    invoiceNumber: string
    status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
    issueDate: string
    dueDate: string
    subtotal: number
    totalDiscount: number
    total: number
    notes?: string | null
    clientName: string
    clientCompany?: string
    clientEmail?: string
    clientAddress?: string
    clientPhone?: string
    lineItems: Array<{
      id: string
      type: 'item' | 'section' | 'discount'
      description: string
      quantity?: number
      unitType?: string
      unitPrice?: number
      position: number
    }>
  }
}

/**
 * PublicInvoice/Show — Shareable invoice view
 * 
 * Route: /i/:token
 * 
 * Features:
 * - Editorial invoice design
 * - Print-optimized layout
 * - Payment modal (for unpaid invoices)
 * - Responsive design
 * 
 * Note: This page uses light theme only for professional appearance
 */
export default function PublicInvoiceShow({ invoice }: PublicInvoiceShowProps) {
  // Determine if payment is possible
  const canPay = ['pending', 'overdue'].includes(invoice.status)
  const isPaid = invoice.status === 'paid'

  // Handle print
  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  // Transform line items to expected format
  const lineItems: LineItem[] = invoice.lineItems.map(item => ({
    id: item.id,
    invoiceId: '',
    type: item.type,
    description: item.description,
    quantity: item.quantity,
    unitType: item.unitType as any,
    unitPrice: item.unitPrice,
    position: item.position,
  }))

  return (
    <>
      <Head title={`Invoice ${invoice.invoiceNumber}`} />

      <PublicLayout>
        {/* Invoice Container */}
        <div className="invoice-container bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8 lg:p-10 print:shadow-none print:border-0 print:p-0">
          {/* Header with Invoice Number Hero */}
          <PublicInvoiceHeader
            invoiceNumber={invoice.invoiceNumber}
            status={invoice.status}
            issueDate={invoice.issueDate}
            dueDate={invoice.dueDate}
          />

          {/* Billed To */}
          <PublicInvoiceBilledTo
            client={{
              name: invoice.clientName,
              company: invoice.clientCompany,
              email: invoice.clientEmail,
              address: invoice.clientAddress,
              phone: invoice.clientPhone,
            }}
          />

          {/* Line Items */}
          <PublicInvoiceLineItems lineItems={lineItems} />

          {/* Totals */}
          <PublicInvoiceTotals
            subtotal={invoice.subtotal}
            totalDiscount={invoice.totalDiscount}
            total={invoice.total}
            status={invoice.status}
          />

          {/* Notes */}
          <PublicInvoiceNotes notes={invoice.notes} />
        </div>

        {/* Action Buttons (hidden in print) */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 print:hidden">
          {/* Pay Now Button - redirects to Stripe Checkout */}
          {canPay && (
            <form action={`/pay/${invoice.token}`} method="POST">
              <Button
                type="submit"
                size="lg"
                className="flex-1 sm:flex-none h-12 text-base gap-2 w-full sm:w-auto"
              >
                <CreditCard className="h-5 w-5" />
                Pay {formatCurrency(invoice.total)}
              </Button>
            </form>
          )}

          {/* Paid Status Button (disabled, informational) */}
          {isPaid && (
            <Button
              size="lg"
              variant="outline"
              className="flex-1 sm:flex-none h-12 text-base gap-2 text-emerald-600 border-emerald-300 bg-emerald-50 cursor-default"
              disabled
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Paid in Full
            </Button>
          )}

          {/* Print Button */}
          <Button
            size="lg"
            variant="outline"
            className="flex-1 sm:flex-none h-12 text-base gap-2"
            onClick={handlePrint}
          >
            <Printer className="h-5 w-5" />
            Print Invoice
          </Button>

          {/* Download PDF Button */}
          <Button
            size="lg"
            variant="outline"
            className="flex-1 sm:flex-none h-12 text-base gap-2"
            asChild
          >
            <a href={`/i/${invoice.token}/download`} download>
              <Download className="h-5 w-5" />
              Download PDF
            </a>
          </Button>
        </div>
      </PublicLayout>
    </>
  )
}
