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
