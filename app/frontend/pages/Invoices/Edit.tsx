// app/frontend/pages/Invoices/Edit.tsx
import { useState, useMemo, useCallback } from "react"
import { router, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  ClientSelector, 
  DatePicker, 
  LineItemsEditor, 
  InvoiceSummary 
} from "@/components/invoices"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { mockClients, mockInvoices } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { calculateTotals } from "@/lib/invoice-utils"
import { ArrowLeft, Save, Send, Eye } from "lucide-react"
import type { LineItem, Invoice } from "@/lib/types"

interface EditInvoiceProps {
  id: string
}

/**
 * Edit Invoice Page — Edit existing invoice
 */
export default function InvoicesEdit({ id }: EditInvoiceProps) {
  // Find the invoice (in real app, would be passed as prop from controller)
  const existingInvoice = mockInvoices.find(inv => inv.id === id)
  
  if (!existingInvoice) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Invoice Not Found
          </h1>
          <p className="text-slate-500 mt-2">
            The invoice you're looking for doesn't exist.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/invoices">Back to Invoices</Link>
          </Button>
        </div>
      </div>
    )
  }

  return <InvoiceEditor invoice={existingInvoice} />
}

/**
 * InvoiceEditor — Actual editor component
 */
function InvoiceEditor({ invoice }: { invoice: Invoice }) {
  // Form state (initialized from existing invoice)
  const [clientId, setClientId] = useState<string | null>(invoice.clientId)
  const [issueDate, setIssueDate] = useState<Date | undefined>(
    new Date(invoice.issueDate)
  )
  const [dueDate, setDueDate] = useState<Date | undefined>(
    new Date(invoice.dueDate)
  )
  const [lineItems, setLineItems] = useState<LineItem[]>(invoice.lineItems)

  // Calculate totals
  const totals = useMemo(() => calculateTotals(lineItems), [lineItems])

  // Status-based permissions
  const isDraft = invoice.status === 'draft'
  const canEdit = isDraft || invoice.status === 'pending'
  const canSend = isDraft
  const hasPublicLink = !isDraft

  // Handle save
  const handleSave = useCallback((send: boolean = false) => {
    const invoiceData = {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      clientId,
      issueDate: issueDate?.toISOString(),
      dueDate: dueDate?.toISOString(),
      lineItems,
      ...totals,
      status: send ? 'pending' : invoice.status,
    }
    
    console.log('Updating invoice:', invoiceData)
    
    alert(`Invoice ${invoice.invoiceNumber} updated!`)
    router.visit('/invoices')
  }, [invoice, clientId, issueDate, dueDate, lineItems, totals])

  const handleViewPublic = () => {
    window.open(`/i/${invoice.token}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back + Title + Status */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/invoices" aria-label="Back to invoices">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="font-display text-xl tracking-tight text-slate-900 dark:text-slate-50">
                    Edit Invoice
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                    #{invoice.invoiceNumber}
                  </p>
                </div>
                <StatusBadge status={invoice.status} />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {hasPublicLink && (
                <Button variant="outline" onClick={handleViewPublic}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Public
                </Button>
              )}
              <Button variant="outline" onClick={() => handleSave(false)}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              {canSend && (
                <Button onClick={() => handleSave(true)}>
                  <Send className="h-4 w-4 mr-2" />
                  Save & Send
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 sm:pb-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
          {/* Client & Dates Section */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Client Selector */}
              <div className="sm:col-span-1">
                <Label htmlFor="client" className="mb-2 block">
                  Client <span className="text-rose-500">*</span>
                </Label>
                <ClientSelector
                  clients={mockClients}
                  selectedClientId={clientId}
                  onSelect={setClientId}
                  placeholder="Select client..."
                  disabled={!canEdit}
                />
              </div>

              {/* Issue Date */}
              <div>
                <Label htmlFor="issueDate" className="mb-2 block">
                  Issue Date
                </Label>
                <DatePicker
                  date={issueDate}
                  onSelect={setIssueDate}
                  placeholder="Select date"
                  disabled={!canEdit}
                />
              </div>

              {/* Due Date */}
              <div>
                <Label htmlFor="dueDate" className="mb-2 block">
                  Due Date
                </Label>
                <DatePicker
                  date={dueDate}
                  onSelect={setDueDate}
                  placeholder="Select date"
                  disabled={!canEdit}
                />
              </div>
            </div>
          </div>

          {/* Line Items Section */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <LineItemsEditor
              lineItems={lineItems}
              onChange={setLineItems}
              invoiceId={invoice.id}
              disabled={!canEdit}
            />
          </div>

          {/* Summary Section */}
          <div className="p-6">
            <InvoiceSummary
              subtotal={totals.subtotal}
              totalDiscount={totals.totalDiscount}
              total={totals.total}
            />
          </div>
        </div>
      </main>

      {/* Sticky Footer (Mobile) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
            <p className="font-mono text-lg font-bold text-slate-900 dark:text-slate-50">
              {formatCurrency(totals.total)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSave(false)}>
              Save
            </Button>
            {canSend && (
              <Button size="sm" onClick={() => handleSave(true)}>
                Send
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
