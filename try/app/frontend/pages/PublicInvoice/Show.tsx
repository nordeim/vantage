// app/frontend/pages/PublicInvoice/Show.tsx
import { useState } from "react"
import { PublicLayout } from "@/layouts/PublicLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  PublicInvoiceHeader,
  PublicInvoiceLineItems,
  PublicInvoiceTotals,
  PaymentModal,
} from "@/components/public-invoice"
import { mockInvoices, mockClients } from "@/lib/mock-data"
import { calculateInvoiceTotals } from "@/lib/invoice-calculations"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, Download, Printer } from "lucide-react"

interface PublicInvoiceShowProps {
  token: string
}

/**
 * Public Invoice Page — Client-facing shareable invoice
 * 
 * Features:
 * - Professional invoice presentation
 * - Pay Now button (mock)
 * - Print button
 * - Download button (future)
 * - Print-optimized layout
 */
export default function PublicInvoiceShow({ token }: PublicInvoiceShowProps) {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  // Find invoice by token
  const invoice = mockInvoices.find(inv => inv.token === token)
  
  if (!invoice) {
    return (
      <PublicLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Invoice Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            This invoice may have been deleted or the link is invalid.
          </p>
        </div>
      </PublicLayout>
    )
  }

  const client = mockClients.find(c => c.id === invoice.clientId)!
  const totals = calculateInvoiceTotals(invoice.lineItems)
  
  const isPaid = invoice.status === 'paid'
  const canPay = invoice.status === 'pending' || invoice.status === 'overdue'

  const handlePrint = () => {
    window.print()
  }

  return (
    <PublicLayout>
      {/* Action Buttons (hidden in print) */}
      <div className="flex justify-end gap-2 mb-4 no-print">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button variant="outline" size="sm" disabled>
          <Download className="h-4 w-4 mr-2" />
          Download 
