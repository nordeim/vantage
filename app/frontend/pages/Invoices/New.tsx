// app/frontend/pages/Invoices/New.tsx
import { useState, useMemo, useCallback } from "react"
import { router, Link, Head } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  ClientSelector,
  DatePicker,
  LineItemsEditor,
  InvoiceSummary,
  InvoiceSummaryCompact,
  calculateDueDate,
} from "@/components/invoices"
import {
  ArrowLeft,
  Save,
  Send,
  FileText,
  Loader2,
} from "lucide-react"
import { cn, generateInvoiceNumber } from "@/lib/utils"
import { calculateTotals, createBlankItem } from "@/lib/invoice-utils"
import type { Client, LineItem } from "@/lib/types"

interface NewInvoiceProps {
  /** Available clients for selection */
  clients: Client[]
  /** Pre-generated invoice number (optional, will generate if not provided) */
  invoiceNumber?: string
}

/**
 * New Invoice Page
 * 
 * Features:
 * - Sticky header with back button and actions
 * - Auto-generated invoice number
 * - Client selector
 * - Issue date and due date pickers
 * - Line items editor
 * - Invoice summary with auto-calculated totals
 * - Notes field
 * - Sticky footer on mobile with total and actions
 * - Save Draft and Save & Send functionality
 */
export default function NewInvoice({ clients, invoiceNumber }: NewInvoiceProps) {
  // ─────────────────────────────────────────────────────────────
  // State Management
  // ─────────────────────────────────────────────────────────────

  // Generate invoice number if not provided
  const [generatedInvoiceNumber] = useState(() =>
    invoiceNumber || generateInvoiceNumber()
  )

  // Form state
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [issueDate, setIssueDate] = useState<Date>(new Date())
  const [dueDate, setDueDate] = useState<Date>(() => calculateDueDate(new Date(), 30))
  const [lineItems, setLineItems] = useState<LineItem[]>(() => [
    createBlankItem(1),
  ])
  const [notes, setNotes] = useState("")

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitAction, setSubmitAction] = useState<'draft' | 'send' | null>(null)

  // ─────────────────────────────────────────────────────────────
  // Computed Values
  // ─────────────────────────────────────────────────────────────

  // Calculate totals whenever line items change
  const totals = useMemo(() => calculateTotals(lineItems), [lineItems])

  // Form validation
  const isFormValid = useMemo(() => {
    return (
      selectedClientId !== null &&
      issueDate !== undefined &&
      dueDate !== undefined &&
      lineItems.some(item => item.type === 'item' && item.description.trim())
    )
  }, [selectedClientId, issueDate, dueDate, lineItems])

  // ─────────────────────────────────────────────────────────────
  // Event Handlers
  // ─────────────────────────────────────────────────────────────

  // Handle issue date change - auto-update due date
  const handleIssueDateChange = useCallback((date: Date | undefined) => {
    if (date) {
      setIssueDate(date)
      // Auto-calculate due date (Net 30 by default)
      setDueDate(calculateDueDate(date, 30))
    }
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(async (action: 'draft' | 'send') => {
    if (!isFormValid) return

    setIsSubmitting(true)
    setSubmitAction(action)

    try {
      // Prepare invoice data
      const invoiceData = {
        invoice_number: generatedInvoiceNumber,
        client_id: selectedClientId,
        issue_date: issueDate.toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0],
        status: action === 'send' ? 'pending' : 'draft',
        notes: notes.trim() || null,
        subtotal: totals.subtotal,
        total_discount: totals.totalDiscount,
        total: totals.total,
        line_items: lineItems
          .filter(item => item.description.trim() || item.type !== 'item')
          .map(item => ({
            type: item.type,
            description: item.description,
            quantity: item.quantity,
            unit_type: item.unitType,
            unit_price: item.unitPrice,
            position: item.position,
          })),
      }

      // Submit to Rails backend
      router.post('/invoices', { invoice: invoiceData }, {
        onSuccess: () => {
          // Redirect handled by controller
        },
        onError: (errors) => {
          console.error('Failed to create invoice:', errors)
          setIsSubmitting(false)
          setSubmitAction(null)
        },
        onFinish: () => {
          // Note: Don't reset isSubmitting here if successful
          // as we'll be redirecting
        },
      })
    } catch (error) {
      console.error('Error submitting invoice:', error)
      setIsSubmitting(false)
      setSubmitAction(null)
    }
  }, [
    isFormValid,
    generatedInvoiceNumber,
    selectedClientId,
    issueDate,
    dueDate,
    notes,
    totals,
    lineItems,
  ])

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────

  return (
    <>
      <Head title={`New Invoice ${generatedInvoiceNumber}`} />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 lg:pb-8">
        {/* Sticky Header */}
        <header className={cn(
          "sticky top-0 z-40",
          "bg-white dark:bg-slate-900",
          "border-b border-slate-200 dark:border-slate-800",
          "shadow-sm"
        )}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Back button + Title */}
              <div className="flex items-center gap-4">
                <Link
                  href="/invoices"
                  className={cn(
                    "p-2 -ml-2 rounded-lg transition-colors",
                    "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100",
                    "hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                  aria-label="Back to invoices"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>

                <div>
                  <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    New Invoice
                  </h1>
                  <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
                    {generatedInvoiceNumber}
                  </p>
                </div>
              </div>

              {/* Right: Actions (hidden on mobile, shown in footer) */}
              <div className="hidden sm:flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSubmit('draft')}
                  disabled={!isFormValid || isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting && submitAction === 'draft' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Draft
                </Button>
                <Button
                  onClick={() => handleSubmit('send')}
                  disabled={!isFormValid || isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting && submitAction === 'send' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Save & Send
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Client & Dates Section */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Client Selector */}
              <div className="space-y-2">
                <Label htmlFor="client" className="text-sm font-medium">
                  Client <span className="text-rose-500">*</span>
                </Label>
                <ClientSelector
                  clients={clients}
                  selectedClientId={selectedClientId}
                  onSelect={setSelectedClientId}
                  placeholder="Select a client..."
                />
              </div>

              {/* Dates Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Issue Date */}
                <div className="space-y-2">
                  <Label htmlFor="issue-date" className="text-sm font-medium">
                    Issue Date <span className="text-rose-500">*</span>
                  </Label>
                  <DatePicker
                    date={issueDate}
                    onSelect={handleIssueDateChange}
                    placeholder="Select issue date"
                  />
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label htmlFor="due-date" className="text-sm font-medium">
                    Due Date <span className="text-rose-500">*</span>
                  </Label>
                  <DatePicker
                    date={dueDate}
                    onSelect={(date) => date && setDueDate(date)}
                    placeholder="Select due date"
                    minDate={issueDate}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items Section */}
          <Card>
            <CardContent className="pt-6">
              <LineItemsEditor
                lineItems={lineItems}
                onChange={setLineItems}
              />
            </CardContent>
          </Card>

          {/* Notes & Summary Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes or payment instructions..."
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    These notes will appear on the invoice.
                  </p>
                </div>

                {/* Summary */}
                <div className="lg:pt-6">
                  <InvoiceSummary
                    subtotal={totals.subtotal}
                    totalDiscount={totals.totalDiscount}
                    total={totals.total}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation Message */}
          {!isFormValid && (
            <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
              <FileText className="h-4 w-4" />
              <span>
                Please select a client and add at least one line item to save this invoice.
              </span>
            </div>
          )}
        </main>

        {/* Sticky Footer (Mobile) */}
        <footer className={cn(
          "fixed bottom-0 left-0 right-0 z-40 sm:hidden",
          "bg-white dark:bg-slate-900",
          "border-t border-slate-200 dark:border-slate-800",
          "shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]",
          "safe-area-bottom"
        )}>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Total Display */}
              <InvoiceSummaryCompact total={totals.total} />

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSubmit('draft')}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting && submitAction === 'draft' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span className="sr-only sm:not-sr-only sm:ml-2">Draft</span>
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSubmit('send')}
                  disabled={!isFormValid || isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting && submitAction === 'send' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
