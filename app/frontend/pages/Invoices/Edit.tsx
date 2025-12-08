// app/frontend/pages/Invoices/Edit.tsx
import { useState, useMemo, useCallback, useEffect } from "react"
import { router, Link, Head } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import {
  ClientSelector,
  DatePicker,
  LineItemsEditor,
  InvoiceSummary,
  InvoiceSummaryCompact,
} from "@/components/invoices"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Save,
  Send,
  MoreHorizontal,
  Trash2,
  Copy,
  FileText,
  Loader2,
  AlertTriangle,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { calculateTotals } from "@/lib/invoice-utils"
import type { Client, LineItem, Invoice, InvoiceStatus } from "@/lib/types"

interface EditInvoiceProps {
  /** The invoice being edited */
  invoice: Invoice
  /** Available clients for selection */
  clients: Client[]
}

/**
 * Edit Invoice Page
 * 
 * Features:
 * - All features from New Invoice page
 * - Pre-populated with existing invoice data
 * - Status-based editing restrictions
 * - Additional actions (duplicate, delete, preview)
 * - Status change handling
 * 
 * Status-based permissions:
 * - Draft: Full editing allowed
 * - Pending: Limited editing (can add notes, mark as paid)
 * - Paid: Read-only with option to duplicate
 * - Overdue: Same as Pending
 * - Cancelled: Read-only
 */
export default function EditInvoice({ invoice, clients }: EditInvoiceProps) {
  // ─────────────────────────────────────────────────────────────
  // State Management
  // ─────────────────────────────────────────────────────────────

  // Determine if invoice is editable based on status
  const isFullyEditable = invoice.status === 'draft'
  const isPartiallyEditable = ['pending', 'overdue'].includes(invoice.status)
  const isReadOnly = ['paid', 'cancelled'].includes(invoice.status)

  // Form state - initialize from invoice
  const [selectedClientId, setSelectedClientId] = useState<string | null>(
    invoice.clientId
  )
  const [issueDate, setIssueDate] = useState<Date>(
    new Date(invoice.issueDate)
  )
  const [dueDate, setDueDate] = useState<Date>(
    new Date(invoice.dueDate)
  )
  const [lineItems, setLineItems] = useState<LineItem[]>(
    invoice.lineItems || []
  )
  const [notes, setNotes] = useState(invoice.notes || "")

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitAction, setSubmitAction] = useState<'save' | 'send' | 'delete' | null>(null)

  // Track if form has changes
  const [hasChanges, setHasChanges] = useState(false)

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
  // Effects
  // ─────────────────────────────────────────────────────────────

  // Track changes for unsaved changes warning
  useEffect(() => {
    const hasFormChanges =
      selectedClientId !== invoice.clientId ||
      issueDate.toISOString() !== new Date(invoice.issueDate).toISOString() ||
      dueDate.toISOString() !== new Date(invoice.dueDate).toISOString() ||
      notes !== (invoice.notes || "") ||
      JSON.stringify(lineItems) !== JSON.stringify(invoice.lineItems)

    setHasChanges(hasFormChanges)
  }, [selectedClientId, issueDate, dueDate, notes, lineItems, invoice])

  // ─────────────────────────────────────────────────────────────
  // Event Handlers
  // ─────────────────────────────────────────────────────────────

  // Handle form submission
  const handleSubmit = useCallback(async (action: 'save' | 'send') => {
    if (!isFormValid) return

    setIsSubmitting(true)
    setSubmitAction(action)

    try {
      // Determine new status
      let newStatus: InvoiceStatus = invoice.status
      if (action === 'send' && invoice.status === 'draft') {
        newStatus = 'pending'
      }

      // Prepare invoice data
      const invoiceData = {
        client_id: selectedClientId,
        issue_date: issueDate.toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0],
        status: newStatus,
        notes: notes.trim() || null,
        subtotal: totals.subtotal,
        total_discount: totals.totalDiscount,
        total: totals.total,
        line_items: lineItems
          .filter(item => item.description.trim() || item.type !== 'item')
          .map(item => ({
            id: item.id.startsWith('li_') ? null : item.id,
            type: item.type,
            description: item.description,
            quantity: item.quantity,
            unit_type: item.unitType,
            unit_price: item.unitPrice,
            position: item.position,
          })),
      }

      // Submit to Rails backend
      router.put(`/invoices/${invoice.id}`, { invoice: invoiceData }, {
        onSuccess: () => {
          setHasChanges(false)
        },
        onError: (errors) => {
          console.error('Failed to update invoice:', errors)
        },
        onFinish: () => {
          setIsSubmitting(false)
          setSubmitAction(null)
        },
      })
    } catch (error) {
      console.error('Error updating invoice:', error)
      setIsSubmitting(false)
      setSubmitAction(null)
    }
  }, [
    isFormValid,
    invoice,
    selectedClientId,
    issueDate,
    dueDate,
    notes,
    totals,
    lineItems,
  ])

  // Handle delete
  const handleDelete = useCallback(() => {
    if (!confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
      return
    }

    setIsSubmitting(true)
    setSubmitAction('delete')

    router.delete(`/invoices/${invoice.id}`, {
      onSuccess: () => {
        // Redirect handled by controller
      },
      onError: (errors) => {
        console.error('Failed to delete invoice:', errors)
        setIsSubmitting(false)
        setSubmitAction(null)
      },
    })
  }, [invoice.id])

  // Handle duplicate
  const handleDuplicate = useCallback(() => {
    router.post(`/invoices/${invoice.id}/duplicate`, {}, {
      onSuccess: () => {
        // Redirect to new invoice handled by controller
      },
      onError: (errors) => {
        console.error('Failed to duplicate invoice:', errors)
      },
    })
  }, [invoice.id])

  // Handle mark as paid
  const handleMarkAsPaid = useCallback(() => {
    router.put(`/invoices/${invoice.id}/mark_paid`, {}, {
      onSuccess: () => {
        // Page will refresh with updated status
      },
      onError: (errors) => {
        console.error('Failed to mark invoice as paid:', errors)
      },
    })
  }, [invoice.id])

  // Handle preview
  const handlePreview = useCallback(() => {
    window.open(`/i/${invoice.token}`, '_blank')
  }, [invoice.token])

  // ─────────────────────────────────────────────────────────────
  // Render Helpers
  // ─────────────────────────────────────────────────────────────

  // Render status-specific banner
  const renderStatusBanner = () => {
    if (isReadOnly) {
      return (
        <div className={cn(
          "px-4 py-3 rounded-lg mb-6 flex items-center gap-3",
          invoice.status === 'paid'
            ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"
            : "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        )}>
          <AlertTriangle className={cn(
            "h-5 w-5 flex-shrink-0",
            invoice.status === 'paid'
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-slate-600 dark:text-slate-400"
          )} />
          <div className="flex-1">
            <p className={cn(
              "text-sm font-medium",
              invoice.status === 'paid'
                ? "text-emerald-800 dark:text-emerald-200"
                : "text-slate-700 dark:text-slate-300"
            )}>
              {invoice.status === 'paid'
                ? "This invoice has been paid and cannot be edited."
                : "This invoice has been cancelled and cannot be edited."
              }
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDuplicate}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
        </div>
      )
    }

    if (isPartiallyEditable) {
      return (
        <div className={cn(
          "px-4 py-3 rounded-lg mb-6 flex items-center gap-3",
          "bg-amber-50 dark:bg-amber-950/30",
          "border border-amber-200 dark:border-amber-800"
        )}>
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-200 flex-1">
            This invoice has been sent. Only notes can be edited.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAsPaid}
            className="gap-2"
          >
            Mark as Paid
          </Button>
        </div>
      )
    }

    return null
  }

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────

  return (
    <>
      <Head title={`Edit Invoice ${invoice.invoiceNumber}`} />

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
              {/* Left: Back button + Title + Status */}
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

                <div className="flex items-center gap-3">
                  <div>
                    <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      Edit Invoice
                    </h1>
                    <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
                      {invoice.invoiceNumber}
                    </p>
                  </div>
                  <StatusBadge status={invoice.status} />
                </div>
              </div>

              {/* Right: Actions */}
              <div className="hidden sm:flex items-center gap-3">
                {/* Preview Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreview}
                  title="Preview invoice"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                {/* More Actions Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleDuplicate}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate Invoice
                    </DropdownMenuItem>
                    {isPartiallyEditable && (
                      <DropdownMenuItem onClick={handleMarkAsPaid}>
                        <FileText className="mr-2 h-4 w-4" />
                        Mark as Paid
                      </DropdownMenuItem>
                    )}
                    {isFullyEditable && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleDelete}
                          className="text-rose-600 dark:text-rose-400 focus:text-rose-600 dark:focus:text-rose-400"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Invoice
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Save/Send Buttons */}
                {!isReadOnly && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleSubmit('save')}
                      disabled={!isFormValid || isSubmitting || !hasChanges}
                      className="gap-2"
                    >
                      {isSubmitting && submitAction === 'save' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Save
                    </Button>

                    {isFullyEditable && (
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
                        Send Invoice
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Status Banner */}
          {renderStatusBanner()}

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
                  disabled={!isFullyEditable}
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
                    onSelect={(date) => date && setIssueDate(date)}
                    placeholder="Select issue date"
                    disabled={!isFullyEditable}
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
                    disabled={!isFullyEditable}
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
                invoiceId={invoice.id}
                disabled={!isFullyEditable}
              />
            </CardContent>
          </Card>

          {/* Notes & Summary Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Notes - always editable for pending/overdue */}
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
                    disabled={isReadOnly}
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

          {/* Validation/Status Messages */}
          {!isFormValid && isFullyEditable && (
            <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
              <FileText className="h-4 w-4" />
              <span>
                Please select a client and add at least one line item to save this invoice.
              </span>
            </div>
          )}

          {hasChanges && !isReadOnly && (
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
              <FileText className="h-4 w-4" />
              <span>You have unsaved changes.</span>
            </div>
          )}
        </main>

        {/* Sticky Footer (Mobile) */}
        {!isReadOnly && (
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
                    onClick={() => handleSubmit('save')}
                    disabled={!isFormValid || isSubmitting || !hasChanges}
                  >
                    {isSubmitting && submitAction === 'save' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>

                  {isFullyEditable && (
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
                  )}
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  )
}
