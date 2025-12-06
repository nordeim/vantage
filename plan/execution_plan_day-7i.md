# Day 6: Deep Analysis & Implementation Plan

## Executive Summary

I've conducted a thorough analysis of the Day 6 requirements from PRD v4.2, cross-referenced with our Day 5 foundation. Day 6 focuses on the **Public Invoice View** — the client-facing, print-optimized invoice that clients receive via shareable links.

This is a critical deliverable because it's the **first impression clients have** of the invoice system. The "Neo-Editorial Precision" aesthetic must shine here with the signature oversized invoice number treatment.

---

## Pre-Implementation Analysis

### 🔍 Foundation Verification

Before proceeding, let me verify what exists from previous days:

| Component | Status | Location |
|-----------|--------|----------|
| PublicInvoicesController | ✅ Sketched in Day 5 | `app/controllers/public_invoices_controller.rb` |
| Route `/i/:token` | ✅ Configured | `config/routes.rb` |
| Invoice types | ✅ Complete | `app/frontend/lib/types.ts` |
| formatCurrency | ✅ Complete | `app/frontend/lib/utils.ts` |
| StatusBadge | ✅ Complete | `app/frontend/components/shared/StatusBadge.tsx` |
| Logo | ✅ Complete | `app/frontend/components/layout/Logo.tsx` |

### 🎯 Day 6 Objectives (from PRD)

1. **Build `PublicLayout`** — Minimal layout without sidebar/nav
2. **Implement Print Styles** — `@media print` CSS
3. **Build `PaymentModal`** — Mock Stripe payment form

### 📐 Design Requirements Analysis

From PRD Section 6.5 and Design System:

| Element | Specification | Implementation |
|---------|--------------|----------------|
| **Invoice Number (Hero)** | `text-6xl` to `text-8xl`, `font-mono`, `tracking-tighter` | Massive, editorial treatment |
| **Page Background** | Light only (for client trust) | `bg-white` or `bg-slate-50` |
| **Container** | Centered, max-width | `max-w-3xl mx-auto` |
| **Print** | Hide buttons, optimize for A4 | `print:hidden`, `page-break-inside: avoid` |
| **Status Display** | Show payment status | StatusBadge component |
| **Pay Button** | Full-width CTA | Primary button style |

---

## Day 6 Complete Implementation Plan

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DAY 6: COMPLETE EXECUTION PLAN                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 0 ──► Pre-Implementation Verification                               │
│              └── Verify Day 5 completion, controller, routes               │
│                                                                             │
│  PHASE 1 ──► Print Styles Setup                                            │
│              └── @media print CSS, Tailwind print utilities                │
│                                                                             │
│  PHASE 2 ──► Public Layout Component                                       │
│              └── Minimal wrapper, no sidebar, centered content             │
│                                                                             │
│  PHASE 3 ──► Public Invoice Components                                     │
│              └── Header, BilledTo, LineItems, Totals, Footer               │
│                                                                             │
│  PHASE 4 ──► Payment Modal Component                                       │
│              └── Mock Stripe form with Dialog                              │
│                                                                             │
│  PHASE 5 ──► Public Invoice Page                                           │
│              └── Full page assembly with all components                    │
│                                                                             │
│  PHASE 6 ──► Controller & Integration                                      │
│              └── Update controller, verify data flow                       │
│                                                                             │
│  PHASE 7 ──► Validation & QA                                               │
│              └── Print testing, responsive, accessibility                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 0: Pre-Implementation Verification

### 0.1 Verification Checklist

```markdown
## Day 6 Prerequisites Checklist
- [ ] PublicInvoicesController exists
- [ ] Route `/i/:token` configured in routes.rb
- [ ] Invoice interface includes token field
- [ ] formatCurrency utility exists
- [ ] Logo component exists
- [ ] StatusBadge component exists
- [ ] All Day 5 components compile without errors
```

### 0.2 Verification Script

```typescript
// scripts/verify-day6-prerequisites.ts
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

console.log('\n🔍 Day 6 Pre-Implementation Verification\n')
console.log('=' .repeat(60))

const checks = [
  { 
    name: 'PublicInvoicesController', 
    path: 'app/controllers/public_invoices_controller.rb',
    type: 'file'
  },
  { 
    name: 'Routes configuration', 
    path: 'config/routes.rb',
    type: 'file',
    contains: 'public_invoice'
  },
  { 
    name: 'Logo component', 
    path: 'app/frontend/components/layout/Logo.tsx',
    type: 'file'
  },
  { 
    name: 'StatusBadge component', 
    path: 'app/frontend/components/shared/StatusBadge.tsx',
    type: 'file'
  },
  { 
    name: 'Utils (formatCurrency)', 
    path: 'app/frontend/lib/utils.ts',
    type: 'file',
    contains: 'formatCurrency'
  },
  { 
    name: 'Types (Invoice)', 
    path: 'app/frontend/lib/types.ts',
    type: 'file',
    contains: 'interface Invoice'
  },
]

let passed = 0
let failed = 0

checks.forEach(check => {
  const fullPath = resolve(check.path)
  const exists = existsSync(fullPath)
  
  if (!exists) {
    console.log(`  ❌ ${check.name}: File not found at ${check.path}`)
    failed++
    return
  }
  
  if (check.contains) {
    const content = readFileSync(fullPath, 'utf-8')
    if (!content.includes(check.contains)) {
      console.log(`  ❌ ${check.name}: Missing "${check.contains}" in ${check.path}`)
      failed++
      return
    }
  }
  
  console.log(`  ✅ ${check.name}`)
  passed++
})

console.log('\n' + '=' .repeat(60))
console.log(`\n${failed === 0 ? '✅' : '❌'} Verification: ${passed}/${checks.length} checks passed\n`)

if (failed > 0) {
  console.log('⚠️  Please address failing checks before proceeding with Day 6.\n')
  process.exit(1)
} else {
  console.log('🎉 All prerequisites verified! Ready for Day 6 implementation.\n')
}
```

---

## Phase 1: Print Styles Setup

### 1.1 Phase Objectives
- Add comprehensive print media queries
- Ensure invoice prints cleanly on A4
- Hide interactive elements in print
- Preserve critical styling for print

### 1.2 Phase Checklist

```markdown
## Phase 1 Checklist
- [ ] Add @media print rules to application.css
- [ ] Define print-specific utility classes
- [ ] Test print preview in browser
- [ ] Verify A4 page fitting
```

### 1.3 Implementation

#### Step 1.3.1: Update Application CSS with Print Styles

```css
/* app/assets/stylesheets/application.css */
@import "tailwindcss";

/* ─────────────────────────────────────────────────────────────
   Custom Theme Configuration (Tailwind v4)
   ───────────────────────────────────────────────────────────── */
@theme {
  /* Typography */
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
  
  /* Primary Action Colors */
  --color-accent: var(--color-blue-500);
  --color-accent-hover: var(--color-blue-600);
  --color-accent-subtle: var(--color-blue-50);
  
  /* Status Colors */
  --color-status-draft: var(--color-slate-400);
  --color-status-pending: var(--color-amber-500);
  --color-status-paid: var(--color-emerald-500);
  --color-status-overdue: var(--color-rose-500);
  
  /* Custom Brutalist Shadows */
  --shadow-brutal: 4px 4px 0px 0px var(--color-slate-900);
  --shadow-brutal-sm: 2px 2px 0px 0px var(--color-slate-900);
}

/* ─────────────────────────────────────────────────────────────
   Print Styles
   ───────────────────────────────────────────────────────────── */
@media print {
  /* Hide non-essential elements */
  .no-print,
  .print-hidden,
  nav,
  .sidebar,
  .mobile-nav,
  button:not(.print-show),
  .sticky-header,
  .sticky-footer {
    display: none !important;
  }
  
  /* Reset page background */
  html,
  body {
    background: white !important;
    color: black !important;
    font-size: 12pt !important;
    line-height: 1.4 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  /* Remove shadows and unnecessary styling */
  * {
    box-shadow: none !important;
    text-shadow: none !important;
  }
  
  /* Invoice container optimization */
  .invoice-container {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    page-break-inside: avoid;
  }
  
  /* Ensure proper page breaks */
  .page-break-before {
    page-break-before: always;
  }
  
  .page-break-after {
    page-break-after: always;
  }
  
  .page-break-avoid {
    page-break-inside: avoid;
  }
  
  /* Invoice header styling for print */
  .invoice-header-print {
    display: flex !important;
    justify-content: space-between;
    border-bottom: 2px solid #1e293b !important;
    padding-bottom: 1rem !important;
    margin-bottom: 1.5rem !important;
  }
  
  /* Invoice number hero for print */
  .invoice-number-hero {
    font-size: 2rem !important;
    font-weight: 700 !important;
    letter-spacing: -0.025em !important;
  }
  
  /* Line items table for print */
  .line-items-table {
    width: 100% !important;
    border-collapse: collapse !important;
  }
  
  .line-items-table th,
  .line-items-table td {
    border-bottom: 1px solid #e2e8f0 !important;
    padding: 0.5rem 0.25rem !important;
    text-align: left !important;
  }
  
  .line-items-table th {
    font-weight: 600 !important;
    font-size: 0.75rem !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
  }
  
  /* Totals section for print */
  .invoice-totals-print {
    margin-top: 1.5rem !important;
    padding-top: 1rem !important;
    border-top: 2px solid #1e293b !important;
  }
  
  /* Links - show URL */
  a[href]:after {
    content: none !important; /* Don't show URLs in invoice */
  }
  
  /* Status badge for print */
  .status-badge-print {
    display: inline-block !important;
    padding: 0.25rem 0.5rem !important;
    font-size: 0.75rem !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    border: 1px solid currentColor !important;
    border-radius: 0.25rem !important;
  }
  
  /* Paid status - green */
  .status-badge-print.status-paid {
    color: #059669 !important;
    border-color: #059669 !important;
  }
  
  /* Pending status - amber */
  .status-badge-print.status-pending {
    color: #d97706 !important;
    border-color: #d97706 !important;
  }
  
  /* Overdue status - red */
  .status-badge-print.status-overdue {
    color: #dc2626 !important;
    border-color: #dc2626 !important;
  }
}

/* ─────────────────────────────────────────────────────────────
   Custom Utility Classes
   ───────────────────────────────────────────────────────────── */

/* Safe area padding for mobile devices */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-top {
  padding-top: env(safe-area-inset-top);
}

/* Invoice number hero treatment */
.invoice-number-hero {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1;
}
```

---

## Phase 2: Public Layout Component

### 2.1 Phase Objectives
- Create minimal layout without sidebar/navigation
- Centered content container
- Optional header with logo
- Print-optimized structure

### 2.2 Phase Checklist

```markdown
## Phase 2 Checklist
- [ ] Create PublicLayout component
- [ ] No sidebar, no navigation
- [ ] Centered content area
- [ ] Minimal header with logo (optional)
- [ ] Print-friendly structure
- [ ] Dark mode consideration (light-only for trust)
```

### 2.3 Implementation

#### Step 2.3.1: Create PublicLayout Component

```tsx
// app/frontend/layouts/PublicLayout.tsx
import * as React from "react"
import { Head } from "@inertiajs/react"
import { cn } from "@/lib/utils"

interface PublicLayoutProps {
  /** Page title for browser tab */
  title?: string
  /** Main content */
  children: React.ReactNode
  /** Additional CSS classes for main container */
  className?: string
  /** Show minimal header with logo */
  showHeader?: boolean
}

/**
 * PublicLayout — Minimal layout for public-facing pages
 * 
 * Features:
 * - No sidebar or navigation
 * - Centered content container
 * - Light theme only (for client trust)
 * - Print-optimized structure
 * 
 * Used for:
 * - Shareable invoice view (/i/:token)
 * - Future: Payment confirmation pages
 */
export function PublicLayout({
  title,
  children,
  className,
  showHeader = false,
}: PublicLayoutProps) {
  return (
    <>
      {title && <Head title={title} />}
      
      {/* Force light mode for public pages */}
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Optional minimal header */}
        {showHeader && (
          <header className="border-b border-slate-200 bg-white print:hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <PublicLogo />
            </div>
          </header>
        )}
        
        {/* Main content */}
        <main className={cn(
          "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
          "print:max-w-full print:px-0 print:py-0",
          className
        )}>
          {children}
        </main>
        
        {/* Minimal footer */}
        <footer className="border-t border-slate-200 bg-white mt-auto print:hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-slate-500">
              Powered by <span className="font-semibold">InvoiceForge</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

/**
 * Simplified logo for public pages
 */
function PublicLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <span className="font-display font-bold text-xl leading-none text-slate-900">
          INV
        </span>
        <div className="h-px bg-slate-900 w-full my-0.5" />
        <span className="font-mono text-sm leading-none tracking-widest text-slate-900">
          FORGE
        </span>
      </div>
    </div>
  )
}

export default PublicLayout
```

---

## Phase 3: Public Invoice Components

### 3.1 Phase Objectives
- Create modular components for public invoice display
- Editorial typography treatment for invoice number
- Clean line items display
- Professional totals section

### 3.2 Phase Checklist

```markdown
## Phase 3 Checklist
- [ ] Create PublicInvoiceHeader (Logo + Hero invoice number)
- [ ] Create PublicInvoiceMeta (Dates, status, client info)
- [ ] Create PublicInvoiceBilledTo (Client details)
- [ ] Create PublicInvoiceLineItems (Read-only line items)
- [ ] Create PublicInvoiceTotals (Subtotal, discount, total)
- [ ] Create PublicInvoiceFooter (Notes, payment info)
- [ ] Verify print styling for each component
```

### 3.3 Implementation

#### Step 3.3.1: Create PublicInvoiceHeader Component

```tsx
// app/frontend/components/public-invoice/PublicInvoiceHeader.tsx
import * as React from "react"
import { cn, formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/shared/StatusBadge"
import type { InvoiceStatus } from "@/lib/types"

interface PublicInvoiceHeaderProps {
  /** Invoice number (e.g., "2025-0001") */
  invoiceNumber: string
  /** Invoice status */
  status: InvoiceStatus
  /** Issue date (ISO string) */
  issueDate: string
  /** Due date (ISO string) */
  dueDate: string
  /** Additional CSS classes */
  className?: string
}

/**
 * PublicInvoiceHeader — Editorial invoice header
 * 
 * Features:
 * - Massive invoice number (Neo-Editorial treatment)
 * - Logo placement
 * - Status badge
 * - Issue/due dates
 * 
 * Design Notes (from PRD):
 * "The invoice number treatment — oversized, typographically distinctive,
 * positioned with editorial confidence."
 */
export function PublicInvoiceHeader({
  invoiceNumber,
  status,
  issueDate,
  dueDate,
  className,
}: PublicInvoiceHeaderProps) {
  return (
    <header className={cn(
      "invoice-header-print",
      "border-b-2 border-slate-900 pb-8 mb-8",
      className
    )}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        {/* Left: Logo + Label */}
        <div className="space-y-4">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl leading-none text-slate-900">
              INV
            </span>
            <div className="h-0.5 bg-slate-900 w-full my-1" />
            <span className="font-mono text-xs leading-none tracking-widest text-slate-900">
              FORGE
            </span>
          </div>
          
          {/* Invoice label */}
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Invoice
            </p>
            <StatusBadge status={status} className="print:hidden" />
            {/* Print-only status */}
            <span className={cn(
              "hidden print:inline-block status-badge-print",
              status === 'paid' && "status-paid",
              status === 'pending' && "status-pending",
              status === 'overdue' && "status-overdue"
            )}>
              {status}
            </span>
          </div>
        </div>
        
        {/* Right: Invoice Number (Hero) + Dates */}
        <div className="text-left sm:text-right space-y-4">
          {/* Invoice Number - Hero Treatment */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
              Invoice No.
            </p>
            <p className={cn(
              "invoice-number-hero",
              "text-4xl sm:text-5xl lg:text-6xl",
              "font-mono font-semibold tracking-tighter",
              "text-slate-900"
            )}>
              {invoiceNumber}
            </p>
          </div>
          
          {/* Dates */}
          <div className="flex flex-col sm:flex-row sm:gap-8 gap-2 text-sm">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Issue Date
              </p>
              <p className="font-medium text-slate-900">
                {formatDate(issueDate)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Due Date
              </p>
              <p className={cn(
                "font-medium",
                status === 'overdue' ? "text-rose-600" : "text-slate-900"
              )}>
                {formatDate(dueDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
```

#### Step 3.3.2: Create PublicInvoiceBilledTo Component

```tsx
// app/frontend/components/public-invoice/PublicInvoiceBilledTo.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import type { Client } from "@/lib/types"

interface PublicInvoiceBilledToProps {
  /** Client information */
  client: {
    name: string
    company?: string
    email?: string
    address?: string
    phone?: string
  }
  /** Additional CSS classes */
  className?: string
}

/**
 * PublicInvoiceBilledTo — Client billing details
 * 
 * Displays:
 * - Client name and company
 * - Address
 * - Contact information
 */
export function PublicInvoiceBilledTo({
  client,
  className,
}: PublicInvoiceBilledToProps) {
  return (
    <section className={cn("mb-8", className)}>
      <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-3">
        Billed To
      </h2>
      <div className="space-y-1">
        {/* Company/Name */}
        <p className="text-lg font-semibold text-slate-900">
          {client.company || client.name}
        </p>
        
        {/* Name (if different from company) */}
        {client.company && client.name !== client.company && (
          <p className="text-slate-700">
            {client.name}
          </p>
        )}
        
        {/* Address */}
        {client.address && (
          <p className="text-slate-600 whitespace-pre-line">
            {client.address}
          </p>
        )}
        
        {/* Email */}
        {client.email && (
          <p className="text-slate-600">
            {client.email}
          </p>
        )}
        
        {/* Phone */}
        {client.phone && (
          <p className="text-slate-600">
            {client.phone}
          </p>
        )}
      </div>
    </section>
  )
}
```

#### Step 3.3.3: Create PublicInvoiceLineItems Component

```tsx
// app/frontend/components/public-invoice/PublicInvoiceLineItems.tsx
import * as React from "react"
import { cn, formatCurrency } from "@/lib/utils"
import { getUnitTypeLabel } from "@/lib/invoice-utils"
import type { LineItem } from "@/lib/types"

interface PublicInvoiceLineItemsProps {
  /** Array of line items */
  lineItems: LineItem[]
  /** Additional CSS classes */
  className?: string
}

/**
 * PublicInvoiceLineItems — Read-only line items display
 * 
 * Features:
 * - Section headers with distinct styling
 * - Regular items with quantity, unit, price, total
 * - Discount items with negative values
 * - Print-optimized table layout
 */
export function PublicInvoiceLineItems({
  lineItems,
  className,
}: PublicInvoiceLineItemsProps) {
  // Sort items by position
  const sortedItems = [...lineItems].sort((a, b) => a.position - b.position)

  return (
    <section className={cn("mb-8", className)}>
      <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">
        Line Items
      </h2>
      
      <div className="border border-slate-200 rounded-lg overflow-hidden print:border-0">
        <table className="line-items-table w-full">
          <thead className="bg-slate-50 print:bg-transparent">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Description
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 hidden sm:table-cell">
                Qty
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 hidden sm:table-cell">
                Rate
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sortedItems.map((item) => (
              <LineItemRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/**
 * Individual line item row
 */
function LineItemRow({ item }: { item: LineItem }) {
  // Section header
  if (item.type === 'section') {
    return (
      <tr className="bg-slate-100 print:bg-slate-50">
        <td 
          colSpan={4} 
          className="px-4 py-2 text-sm font-semibold text-slate-700 uppercase tracking-wide"
        >
          {item.description}
        </td>
      </tr>
    )
  }

  // Discount row
  if (item.type === 'discount') {
    const discountAmount = Math.abs(item.unitPrice ?? 0)
    return (
      <tr>
        <td className="px-4 py-3 text-sm text-slate-700" colSpan={3}>
          <span className="text-rose-600">Discount: </span>
          {item.description}
        </td>
        <td className="px-4 py-3 text-sm font-mono font-medium text-right text-rose-600">
          -{formatCurrency(discountAmount)}
        </td>
      </tr>
    )
  }

  // Regular item
  const quantity = item.quantity ?? 0
  const unitPrice = item.unitPrice ?? 0
  const lineTotal = quantity * unitPrice
  const unitLabel = item.unitType ? getUnitTypeLabel(item.unitType) : ''

  return (
    <tr>
      {/* Description */}
      <td className="px-4 py-3 text-sm text-slate-700">
        <span className="block">{item.description}</span>
        {/* Mobile: show qty x rate inline */}
        <span className="block sm:hidden text-xs text-slate-500 mt-1">
          {quantity} {unitLabel} × {formatCurrency(unitPrice)}
        </span>
      </td>
      
      {/* Quantity (hidden on mobile) */}
      <td className="px-4 py-3 text-sm font-mono text-right text-slate-600 hidden sm:table-cell">
        {quantity} {unitLabel}
      </td>
      
      {/* Rate (hidden on mobile) */}
      <td className="px-4 py-3 text-sm font-mono text-right text-slate-600 hidden sm:table-cell">
        {formatCurrency(unitPrice)}
      </td>
      
      {/* Amount */}
      <td className="px-4 py-3 text-sm font-mono font-medium text-right text-slate-900">
        {formatCurrency(lineTotal)}
      </td>
    </tr>
  )
}
```

#### Step 3.3.4: Create PublicInvoiceTotals Component

```tsx
// app/frontend/components/public-invoice/PublicInvoiceTotals.tsx
import * as React from "react"
import { cn, formatCurrency } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface PublicInvoiceTotalsProps {
  /** Subtotal before discounts */
  subtotal: number
  /** Total discount amount (positive number) */
  totalDiscount: number
  /** Final total */
  total: number
  /** Invoice status */
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
  /** Additional CSS classes */
  className?: string
}

/**
 * PublicInvoiceTotals — Invoice totals display
 * 
 * Features:
 * - Subtotal, discount, total
 * - Large "Amount Due" or "Paid" display
 * - Print-optimized styling
 */
export function PublicInvoiceTotals({
  subtotal,
  totalDiscount,
  total,
  status,
  className,
}: PublicInvoiceTotalsProps) {
  const isPaid = status === 'paid'
  const hasDiscount = totalDiscount > 0

  return (
    <section className={cn(
      "invoice-totals-print",
      "border-t-2 border-slate-900 pt-6",
      className
    )}>
      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-3">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-mono font-medium text-slate-900">
              {formatCurrency(subtotal)}
            </span>
          </div>

          {/* Discount (only if applicable) */}
          {hasDiscount && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Discount</span>
              <span className="font-mono font-medium text-rose-600">
                -{formatCurrency(totalDiscount)}
              </span>
            </div>
          )}

          <Separator className="my-3" />

          {/* Total Due / Amount Paid */}
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-slate-900">
              {isPaid ? 'Amount Paid' : 'Total Due'}
            </span>
            <span className={cn(
              "font-mono text-2xl font-bold",
              isPaid ? "text-emerald-600" : "text-slate-900"
            )}>
              {formatCurrency(total)}
            </span>
          </div>

          {/* Status indicator */}
          {isPaid && (
            <div className="flex justify-end">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Paid in Full
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
```

#### Step 3.3.5: Create PublicInvoiceNotes Component

```tsx
// app/frontend/components/public-invoice/PublicInvoiceNotes.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface PublicInvoiceNotesProps {
  /** Invoice notes */
  notes?: string | null
  /** Additional CSS classes */
  className?: string
}

/**
 * PublicInvoiceNotes — Invoice notes/terms display
 */
export function PublicInvoiceNotes({
  notes,
  className,
}: PublicInvoiceNotesProps) {
  if (!notes?.trim()) return null

  return (
    <section className={cn("mt-8 pt-6 border-t border-slate-200", className)}>
      <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-3">
        Notes
      </h2>
      <p className="text-sm text-slate-600 whitespace-pre-line">
        {notes}
      </p>
    </section>
  )
}
```

#### Step 3.3.6: Create PublicInvoice Components Index

```typescript
// app/frontend/components/public-invoice/index.ts
export { PublicInvoiceHeader } from './PublicInvoiceHeader'
export { PublicInvoiceBilledTo } from './PublicInvoiceBilledTo'
export { PublicInvoiceLineItems } from './PublicInvoiceLineItems'
export { PublicInvoiceTotals } from './PublicInvoiceTotals'
export { PublicInvoiceNotes } from './PublicInvoiceNotes'
```

---

## Phase 4: Payment Modal Component

### 4.1 Phase Objectives
- Create mock Stripe payment form
- Dialog-based modal
- Responsive (full-screen on mobile)
- Clear payment flow UI

### 4.2 Phase Checklist

```markdown
## Phase 4 Checklist
- [ ] Create PaymentModal component
- [ ] Mock card number, expiry, CVC inputs
- [ ] "Secured by Stripe" visual
- [ ] Loading state during "payment"
- [ ] Success state after "payment"
- [ ] Full-screen on mobile
- [ ] Keyboard accessible
```

### 4.3 Implementation

#### Step 4.3.1: Create PaymentModal Component

```tsx
// app/frontend/components/public-invoice/PaymentModal.tsx
import * as React from "react"
import { useState, useCallback } from "react"
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
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, Check, Loader2 } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"

interface PaymentModalProps {
  /** Whether the modal is open */
  open: boolean
  /** Callback when modal should close */
  onOpenChange: (open: boolean) => void
  /** Invoice number for display */
  invoiceNumber: string
  /** Amount to pay */
  amount: number
  /** Callback when payment is complete (mock) */
  onPaymentComplete?: () => void
}

type PaymentState = 'idle' | 'processing' | 'success' | 'error'

/**
 * PaymentModal — Mock Stripe payment form
 * 
 * Features:
 * - Card number, expiry, CVC inputs
 * - "Secured by Stripe" branding
 * - Processing and success states
 * - Full-screen on mobile
 * 
 * Note: This is a mockup. In production, this would integrate
 * with Stripe Elements or Stripe Checkout.
 */
export function PaymentModal({
  open,
  onOpenChange,
  invoiceNumber,
  amount,
  onPaymentComplete,
}: PaymentModalProps) {
  const [paymentState, setPaymentState] = useState<PaymentState>('idle')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  // Format card number with spaces
  const handleCardNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16)
    const formatted = value.replace(/(.{4})/g, '$1 ').trim()
    setCardNumber(formatted)
  }, [])

  // Format expiry as MM/YY
  const handleExpiryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4)
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2)
    }
    setExpiry(value)
  }, [])

  // Limit CVC to 3-4 digits
  const handleCvcChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4)
    setCvc(value)
  }, [])

  // Mock payment processing
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (cardNumber.replace(/\s/g, '').length < 16) return
    if (expiry.length < 5) return
    if (cvc.length < 3) return

    setPaymentState('processing')

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setPaymentState('success')

    // Call completion callback after a delay
    setTimeout(() => {
      onPaymentComplete?.()
    }, 1500)
  }, [cardNumber, expiry, cvc, onPaymentComplete])

  // Reset state when modal closes
  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (!newOpen) {
      // Reset after close animation
      setTimeout(() => {
        setPaymentState('idle')
        setCardNumber('')
        setExpiry('')
        setCvc('')
      }, 300)
    }
    onOpenChange(newOpen)
  }, [onOpenChange])

  const isFormValid = 
    cardNumber.replace(/\s/g, '').length === 16 &&
    expiry.length === 5 &&
    cvc.length >= 3

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={cn(
        "sm:max-w-md",
        // Full-screen on mobile
        "max-sm:h-full max-sm:max-h-full max-sm:rounded-none max-sm:border-0"
      )}>
        {paymentState === 'success' ? (
          <SuccessState amount={amount} invoiceNumber={invoiceNumber} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Pay Invoice
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                Complete payment for Invoice #{invoiceNumber}
              </DialogDescription>
            </DialogHeader>

            {/* Amount Display */}
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-sm text-slate-600 mb-1">Amount Due</p>
              <p className="text-3xl font-mono font-bold text-slate-900">
                {formatCurrency(amount)}
              </p>
            </div>

            <Separator />

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="card-number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    disabled={paymentState === 'processing'}
                    className="pl-10 font-mono"
                    autoComplete="cc-number"
                  />
                </div>
              </div>

              {/* Expiry + CVC Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    disabled={paymentState === 'processing'}
                    className="font-mono"
                    autoComplete="cc-exp"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={handleCvcChange}
                    disabled={paymentState === 'processing'}
                    className="font-mono"
                    autoComplete="cc-csc"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={!isFormValid || paymentState === 'processing'}
              >
                {paymentState === 'processing' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay {formatCurrency(amount)}
                  </>
                )}
              </Button>

              {/* Stripe Branding (Mock) */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="h-3 w-3" />
                <span>Secured by</span>
                <span className="font-semibold text-slate-700">Stripe</span>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

/**
 * Success state after payment
 */
function SuccessState({ amount, invoiceNumber }: { amount: number; invoiceNumber: string }) {
  return (
    <div className="py-8 text-center">
      {/* Success Icon */}
      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
        <Check className="h-8 w-8 text-emerald-600" />
      </div>
      
      {/* Success Message */}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Payment Successful!
      </h3>
      <p className="text-slate-600 mb-4">
        Your payment of {formatCurrency(amount)} for Invoice #{invoiceNumber} has been received.
      </p>
      
      {/* Confirmation */}
      <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
        <p>A receipt has been sent to your email.</p>
      </div>
    </div>
  )
}
```

---

## Phase 5: Public Invoice Page

### 5.1 Phase Objectives
- Assemble all components into complete page
- Handle different invoice states
- Add print button
- Integrate payment modal

### 5.2 Phase Checklist

```markdown
## Phase 5 Checklist
- [ ] Create PublicInvoice/Show.tsx page
- [ ] Assemble all public invoice components
- [ ] Handle paid/pending/overdue states
- [ ] Add "Pay Now" button (for unpaid invoices)
- [ ] Add "Print" button
- [ ] Test print functionality
- [ ] Verify mobile layout
```

### 5.3 Implementation

#### Step 5.3.1: Create Public Invoice Show Page

```tsx
// app/frontend/pages/PublicInvoice/Show.tsx
import { useState, useCallback } from "react"
import { Head } from "@inertiajs/react"
import { PublicLayout } from "@/layouts/PublicLayout"
import {
  PublicInvoiceHeader,
  PublicInvoiceBilledTo,
  PublicInvoiceLineItems,
  PublicInvoiceTotals,
  PublicInvoiceNotes,
} from "@/components/public-invoice"
import { PaymentModal } from "@/components/public-invoice/PaymentModal"
import { Button } from "@/components/ui/button"
import { Printer, CreditCard, Download } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import type { Invoice, LineItem } from "@/lib/types"

interface PublicInvoiceShowProps {
  invoice: {
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
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  // Determine if payment is possible
  const canPay = ['pending', 'overdue'].includes(invoice.status)
  const isPaid = invoice.status === 'paid'

  // Handle print
  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  // Handle payment completion (would reload page in real app)
  const handlePaymentComplete = useCallback(() => {
    // In production, this would redirect or reload to show updated status
    setTimeout(() => {
      setPaymentModalOpen(false)
      // window.location.reload()
    }, 2000)
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
          {/* Pay Now Button (only for unpaid invoices) */}
          {canPay && (
            <Button
              size="lg"
              className="flex-1 sm:flex-none h-12 text-base gap-2"
              onClick={() => setPaymentModalOpen(true)}
            >
              <CreditCard className="h-5 w-5" />
              Pay {formatCurrency(invoice.total)}
            </Button>
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

          {/* Download PDF Button (placeholder) */}
          <Button
            size="lg"
            variant="outline"
            className="flex-1 sm:flex-none h-12 text-base gap-2"
            disabled
            title="Coming soon"
          >
            <Download className="h-5 w-5" />
            Download PDF
          </Button>
        </div>

        {/* Payment Modal */}
        <PaymentModal
          open={paymentModalOpen}
          onOpenChange={setPaymentModalOpen}
          invoiceNumber={invoice.invoiceNumber}
          amount={invoice.total}
          onPaymentComplete={handlePaymentComplete}
        />
      </PublicLayout>
    </>
  )
}
```

---

## Phase 6: Controller & Integration

### 6.1 Phase Objectives
- Update PublicInvoicesController
- Verify data serialization
- Handle not found cases
- Test end-to-end flow

### 6.2 Phase Checklist

```markdown
## Phase 6 Checklist
- [ ] Update PublicInvoicesController#show
- [ ] Serialize invoice with all required fields
- [ ] Handle invalid token (404)
- [ ] Handle cancelled invoices
- [ ] Test with different invoice statuses
```

### 6.3 Implementation

#### Step 6.3.1: Update PublicInvoicesController

```ruby
# app/controllers/public_invoices_controller.rb
class PublicInvoicesController < ApplicationController
  # Skip any authentication for public invoice views
  # skip_before_action :authenticate_user!, only: [:show]

  # GET /i/:token
  def show
    @invoice = Invoice.includes(:client, :line_items).find_by!(token: params[:token])

    # Optionally: Don't show draft or cancelled invoices publicly
    if @invoice.status == 'draft'
      render inertia: 'Errors/NotFound', props: {
        message: 'This invoice is not available for viewing.'
      }, status: :not_found
      return
    end

    render inertia: 'PublicInvoice/Show', props: {
      invoice: serialize_public_invoice(@invoice)
    }
  rescue ActiveRecord::RecordNotFound
    render inertia: 'Errors/NotFound', props: {
      message: 'Invoice not found. Please check the link and try again.'
    }, status: :not_found
  end

  private

  def serialize_public_invoice(invoice)
    {
      invoiceNumber: invoice.invoice_number,
      status: calculate_status(invoice),
      issueDate: invoice.issue_date.iso8601,
      dueDate: invoice.due_date.iso8601,
      subtotal: invoice.subtotal.to_f,
      totalDiscount: invoice.total_discount.to_f,
      total: invoice.total.to_f,
      notes: invoice.notes,
      # Client info (flattened for simplicity)
      clientName: invoice.client&.name || 'Unknown Client',
      clientCompany: invoice.client&.company,
      clientEmail: invoice.client&.email,
      clientAddress: invoice.client&.address,
      clientPhone: invoice.client&.phone,
      # Line items
      lineItems: serialize_line_items(invoice.line_items)
    }
  end

  def serialize_line_items(line_items)
    line_items.order(:position).map do |item|
      {
        id: item.id.to_s,
        type: item.item_type,
        description: item.description,
        quantity: item.quantity&.to_f,
        unitType: item.unit_type,
        unitPrice: item.unit_price&.to_f,
        position: item.position
      }
    end
  end

  # Calculate real-time status (handles overdue)
  def calculate_status(invoice)
    return invoice.status if ['paid', 'cancelled', 'draft'].include?(invoice.status)
    return 'overdue' if invoice.due_date < Date.today && invoice.status == 'pending'
    invoice.status
  end
end
```

#### Step 6.3.2: Create NotFound Error Page

```tsx
// app/frontend/pages/Errors/NotFound.tsx
import { Head, Link } from "@inertiajs/react"
import { PublicLayout } from "@/layouts/PublicLayout"
import { Button } from "@/components/ui/button"
import { FileQuestion, ArrowLeft } from "lucide-react"

interface NotFoundProps {
  message?: string
}

/**
 * NotFound Error Page
 * 
 * Used for:
 * - Invalid invoice tokens
 * - Draft invoices accessed publicly
 * - General 404 errors
 */
export default function NotFound({ message }: NotFoundProps) {
  return (
    <>
      <Head title="Not Found" />
      
      <PublicLayout>
        <div className="text-center py-16">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
            <FileQuestion className="h-10 w-10 text-slate-400" />
          </div>
          
          {/* Message */}
          <h1 className="text-2xl font-semibold text-slate-900 mb-3">
            Invoice Not Found
          </h1>
          <p className="text-slate-600 max-w-md mx-auto mb-8">
            {message || "The invoice you're looking for doesn't exist or may have been removed."}
          </p>
          
          {/* Action */}
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </PublicLayout>
    </>
  )
}
```

---

## Phase 7: Validation & QA

### 7.1 Comprehensive QA Checklist

```markdown
## Phase 7: Day 6 Validation & QA Checklist

### 7.1.1 Public Invoice Page
- [ ] Page loads without errors for valid token
- [ ] 404 page shows for invalid token
- [ ] Draft invoices show 404 (not publicly visible)
- [ ] Invoice number displays in hero style (large, mono font)
- [ ] All dates formatted correctly
- [ ] Client info displays correctly
- [ ] Line items display correctly
- [ ] Section headers styled distinctly
- [ ] Discounts show as negative (red)
- [ ] Totals calculate correctly
- [ ] Status badge displays correctly
- [ ] Notes section shows when present

### 7.1.2 Payment Modal
- [ ] Modal opens on "Pay Now" click
- [ ] Card number formats with spaces
- [ ] Expiry formats as MM/YY
- [ ] CVC limits to 3-4 digits
- [ ] Form validation works
- [ ] Submit button disabled when invalid
- [ ] Processing state shows spinner
- [ ] Success state shows after "payment"
- [ ] Modal can be closed
- [ ] Paid invoices don't show Pay button

### 7.1.3 Print Functionality
- [ ] Print button triggers browser print dialog
- [ ] Buttons hidden in print preview
- [ ] Footer hidden in print preview
- [ ] Invoice fits on A4 page
- [ ] Colors print correctly (if enabled)
- [ ] Invoice number readable in print
- [ ] Line items table prints correctly
- [ ] Totals section prints correctly

### 7.1.4 Responsive Design
- [ ] Desktop layout (≥1024px) displays correctly
- [ ] Tablet layout (768-1023px) displays correctly
- [ ] Mobile layout (<768px) displays correctly
- [ ] Payment modal full-screen on mobile
- [ ] Buttons stack on mobile
- [ ] Line items table scrolls if needed on mobile

### 7.1.5 Status-Based Behavior
- [ ] Pending: Shows "Pay Now" button
- [ ] Overdue: Shows "Pay Now" button, due date red
- [ ] Paid: Shows "Paid in Full" indicator, no pay button
- [ ] Cancelled: Not publicly visible (404)
- [ ] Draft: Not publicly visible (404)

### 7.1.6 Accessibility
- [ ] All form inputs have labels
- [ ] Focus visible on all interactive elements
- [ ] Modal traps focus
- [ ] Escape closes modal
- [ ] Screen reader announces status changes
```

### 7.2 Manual Testing Script

```typescript
// scripts/day6-manual-test-guide.ts
console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                        DAY 6 MANUAL TESTING GUIDE                            ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  TEST 1: Public Invoice Access                                               ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  1. Navigate to /i/{valid_token}                                             ║
║     □ Page loads with invoice details                                        ║
║     □ Invoice number is large and prominent                                  ║
║     □ Client information displays correctly                                  ║
║     □ Line items show with proper formatting                                 ║
║                                                                              ║
║  2. Navigate to /i/invalid_token                                             ║
║     □ 404 page displays                                                      ║
║     □ Error message is user-friendly                                         ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  TEST 2: Invoice States                                                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  1. View PENDING invoice                                                     ║
║     □ Status badge shows "Pending"                                           ║
║     □ "Pay Now" button is visible                                            ║
║     □ Amount shown in button                                                 ║
║                                                                              ║
║  2. View OVERDUE invoice                                                     ║
║     □ Status badge shows "Overdue"                                           ║
║     □ Due date in red                                                        ║
║     □ "Pay Now" button still visible                                         ║
║                                                                              ║
║  3. View PAID invoice                                                        ║
║     □ Status badge shows "Paid"                                              ║
║     □ "Paid in Full" indicator visible                                       ║
║     □ No "Pay Now" button                                                    ║
║     □ Green checkmark or indicator                                           ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  TEST 3: Payment Modal                                                       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  1. Click "Pay Now" button                                                   ║
║     □ Modal opens                                                            ║
║     □ Invoice number displayed                                               ║
║     □ Amount displayed prominently                                           ║
║                                                                              ║
║  2. Enter card details                                                       ║
║     □ Card number formats as #### #### #### ####                             ║
║     □ Expiry formats as MM/YY                                                ║
║     □ CVC accepts 3-4 digits                                                 ║
║                                                                              ║
║  3. Submit payment                                                           ║
║     □ Button shows "Processing..."                                           ║
║     □ Spinner animation visible                                              ║
║     □ After ~2 seconds, success state shows                                  ║
║     □ Green checkmark and confirmation message                               ║
║                                                                              ║
║  4. Close modal                                                              ║
║     □ Click X or outside modal                                               ║
║     □ Modal closes                                                           ║
║     □ Press Escape                                                           ║
║     □ Modal closes                                                           ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  TEST 4: Print Functionality                                                 ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  1. Click "Print Invoice" button                                             ║
║     □ Browser print dialog opens                                             ║
║                                                                              ║
║  2. Check print preview                                                      ║
║     □ Buttons are hidden                                                     ║
║     □ Footer is hidden                                                       ║
║     □ Invoice number is readable                                             ║
║     □ Line items table formatted correctly                                   ║
║     □ Fits on single A4 page (for typical invoice)                           ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  TEST 5: Responsive Design                                                   ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  1. Desktop (≥1024px)                                                        ║
║     □ Invoice header side-by-side layout                                     ║
║     □ Line items table shows all columns                                     ║
║     □ Buttons in row                                                         ║
║                                                                              ║
║  2. Mobile (<768px)                                                          ║
║     □ Invoice header stacks vertically                                       ║
║     □ Line items show qty/rate inline                                        ║
║     □ Buttons stack vertically                                               ║
║     □ Payment modal is full-screen                                           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`)
```

---

## Day 6 Files Summary

```
app/frontend/
├── layouts/
│   └── PublicLayout.tsx                    ✅ Created
├── components/
│   └── public-invoice/
│       ├── index.ts                        ✅ Created
│       ├── PublicInvoiceHeader.tsx         ✅ Created
│       ├── PublicInvoiceBilledTo.tsx       ✅ Created
│       ├── PublicInvoiceLineItems.tsx      ✅ Created
│       ├── PublicInvoiceTotals.tsx         ✅ Created
│       ├── PublicInvoiceNotes.tsx          ✅ Created
│       └── PaymentModal.tsx                ✅ Created
├── pages/
│   ├── PublicInvoice/
│   │   └── Show.tsx                        ✅ Created
│   └── Errors/
│       └── NotFound.tsx                    ✅ Created

app/assets/stylesheets/
└── application.css                         ✅ Updated (print styles)

app/controllers/
└── public_invoices_controller.rb           ✅ Updated

scripts/
├── verify-day6-prerequisites.ts            ✅ Created
└── day6-manual-test-guide.ts               ✅ Created
```

---

## Day 6 Key Achievements

| Feature | Description | PRD Reference |
|---------|-------------|---------------|
| **Public Layout** | Minimal, no-sidebar layout for client-facing pages | Section 5.1 |
| **Invoice Hero** | Editorial invoice number treatment (`text-6xl`, `font-mono`, `tracking-tighter`) | Section 1.3, 2.1 |
| **Print Styles** | Comprehensive `@media print` CSS | Section 11 |
| **Payment Modal** | Mock Stripe payment form with success states | Section 6.5 |
| **Status Handling** | Different UI for paid/pending/overdue invoices | Section 2.2 |

---

## Next Steps (Day 7 Preview)

According to the PRD, Day 7 is **Polish & QA**:

1. **Accessibility Audit** — Tab order, ARIA, focus management
2. **Dark Mode Verification** — Contrast checks across all views
3. **Responsive Final Check** — 375px viewport testing
4. **Cross-Browser Testing** — Chrome, Firefox, Safari
5. **Performance Audit** — Bundle size, render performance

---

**Day 6 Implementation Plan: Complete** ✅
