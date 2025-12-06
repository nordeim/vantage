# Day 4: Invoices View — Comprehensive Execution Plan

## Executive Summary

Day 4 builds the complete Invoices view with filter tabs, desktop table, mobile card stack, and contextual row actions. This view serves as the "command center" for all invoice management, with status-based filtering and appropriate actions per invoice state.

---

## Pre-Implementation: Day 3 Verification

Before proceeding, confirm Day 3 completion:

```markdown
## Day 3 Completion Checklist
- [ ] ClientAvatar with color hashing working
- [ ] ClientTable (desktop) with all columns
- [ ] ClientCard (mobile) with responsive switch
- [ ] ClientFormSheet for new/edit
- [ ] Search functionality working
- [ ] Dropdown menus with brutalist shadow
- [ ] Form validation working
- [ ] All components support dark mode
```

---

## Day 4 Execution Plan — Phased Breakdown

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 4: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► Tabs UI Component                                              │
│              └── ShadCN-style Tabs with Radix primitives                    │
│                                                                             │
│  PHASE 2 ──► Invoice Filter Tabs                                            │
│              └── Status-based filtering with counts                         │
│                                                                             │
│  PHASE 3 ──► Invoice Table (Desktop)                                        │
│              └── Full table with contextual row actions                     │
│                                                                             │
│  PHASE 4 ──► Invoice Card (Mobile)                                          │
│              └── Card stack for mobile viewports                            │
│                                                                             │
│  PHASE 5 ──► Invoice List Container                                         │
│              └── Combines table/cards with filter logic                     │
│                                                                             │
│  PHASE 6 ──► Invoices Page Integration                                      │
│              └── Complete page with all components + actions                │
│                                                                             │
│  PHASE 7 ──► Validation & QA                                                │
│              └── Responsive, accessibility, action flows                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Tabs UI Component

### 1.1 Phase Objectives
- Create ShadCN-style Tabs component
- Support keyboard navigation
- Implement proper accessibility

### 1.2 Phase Checklist

```markdown
## Phase 1 Checklist
- [ ] Install Radix Tabs primitive
- [ ] Create Tabs component with sub-components
- [ ] Style with Neo-Editorial aesthetic
- [ ] Verify keyboard navigation works
- [ ] Update UI components index
```

### 1.3 Implementation

**Step 1.3.1: Install Radix Tabs**

```bash
npm install @radix-ui/react-tabs
```

**Step 1.3.2: Create Tabs Component**

```tsx
// app/frontend/components/ui/tabs.tsx
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

/**
 * Tabs — Tab navigation component
 * 
 * Design (v4.2):
 * - Clean, minimal styling
 * - Active state with blue accent
 * - Keyboard accessible
 */

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md",
      "bg-slate-100 dark:bg-slate-800",
      "p-1 text-slate-500 dark:text-slate-400",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm",
      "px-3 py-1.5 text-sm font-medium",
      "ring-offset-white dark:ring-offset-slate-950",
      "transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      // Active state
      "data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900",
      "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
      "data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2",
      "ring-offset-white dark:ring-offset-slate-950",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

**Step 1.3.3: Update UI Components Index**

```tsx
// app/frontend/components/ui/index.ts
export { Button, buttonVariants } from './button'
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from './card'
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu'
export { Input } from './input'
export { Label } from './label'
export { Separator } from './separator'
export { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription,
  SheetClose 
} from './sheet'
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'
export { Textarea } from './textarea'
export { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from './tooltip'
```

---

## Phase 2: Invoice Filter Tabs

### 2.1 Phase Objectives
- Create filter tabs for invoice statuses
- Show count for each status
- Implement filter state management
- Style with status-appropriate colors

### 2.2 Phase Checklist

```markdown
## Phase 2 Checklist
- [ ] Create InvoiceFilterTabs component
- [ ] Calculate counts for each status
- [ ] Style tabs with subtle status indicators
- [ ] Implement controlled tab state
- [ ] Ensure responsive behavior
```

### 2.3 Implementation

**Step 2.3.1: Create InvoiceFilterTabs Component**

```tsx
// app/frontend/components/invoices/InvoiceFilterTabs.tsx
import { cn } from "@/lib/utils"
import type { InvoiceStatus, Invoice } from "@/lib/types"

type FilterValue = InvoiceStatus | 'all'

interface InvoiceFilterTabsProps {
  /** All invoices (for counting) */
  invoices: Invoice[]
  /** Currently active filter */
  activeFilter: FilterValue
  /** Called when filter changes */
  onFilterChange: (filter: FilterValue) => void
  /** Additional class names */
  className?: string
}

/**
 * InvoiceFilterTabs — Status-based filter tabs
 * 
 * Layout (v4.2):
 * - Horizontal tabs with counts
 * - "All" tab plus one per status
 * - Active state with solid background
 * - Subtle status color indicators
 */
export function InvoiceFilterTabs({
  invoices,
  activeFilter,
  onFilterChange,
  className,
}: InvoiceFilterTabsProps) {
  // Calculate counts
  const counts = {
    all: invoices.length,
    draft: invoices.filter(inv => inv.status === 'draft').length,
    pending: invoices.filter(inv => inv.status === 'pending').length,
    paid: invoices.filter(inv => inv.status === 'paid').length,
    overdue: invoices.filter(inv => inv.status === 'overdue').length,
  }

  return (
    <div 
      className={cn(
        "flex flex-wrap gap-2",
        className
      )}
      role="tablist"
      aria-label="Filter invoices by status"
    >
      {filterOptions.map(option => (
        <FilterTab
          key={option.value}
          value={option.value}
          label={option.label}
          count={counts[option.value]}
          isActive={activeFilter === option.value}
          onClick={() => onFilterChange(option.value)}
          colorClass={option.colorClass}
        />
      ))}
    </div>
  )
}

/**
 * Filter tab options configuration
 */
const filterOptions: Array<{
  value: FilterValue
  label: string
  colorClass?: string
}> = [
  { value: 'all', label: 'All' },
  { value: 'draft', label: 'Draft', colorClass: 'data-[active=true]:border-slate-400' },
  { value: 'pending', label: 'Pending', colorClass: 'data-[active=true]:border-amber-500' },
  { value: 'paid', label: 'Paid', colorClass: 'data-[active=true]:border-emerald-500' },
  { value: 'overdue', label: 'Overdue', colorClass: 'data-[active=true]:border-rose-500' },
]

/**
 * Individual filter tab button
 */
interface FilterTabProps {
  value: FilterValue
  label: string
  count: number
  isActive: boolean
  onClick: () => void
  colorClass?: string
}

function FilterTab({
  value,
  label,
  count,
  isActive,
  onClick,
  colorClass,
}: FilterTabProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`${value}-panel`}
      data-active={isActive}
      onClick={onClick}
      className={cn(
        // Base styles
        "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium",
        "border-2 transition-colors",
        // Inactive state
        "border-transparent",
        "text-slate-600 dark:text-slate-400",
        "hover:bg-slate-100 dark:hover:bg-slate-800",
        // Active state
        "data-[active=true]:bg-white dark:data-[active=true]:bg-slate-900",
        "data-[active=true]:text-slate-900 dark:data-[active=true]:text-slate-50",
        "data-[active=true]:border-blue-500",
        "data-[active=true]:shadow-sm",
        // Focus state
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        // Status-specific border color when active
        colorClass
      )}
    >
      <span>{label}</span>
      <span 
        className={cn(
          "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs",
          isActive
            ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
        )}
      >
        {count}
      </span>
    </button>
  )
}

export type { FilterValue }
```

**Step 2.3.2: Create Invoices Components Index**

```tsx
// app/frontend/components/invoices/index.ts
export { InvoiceFilterTabs, type FilterValue } from './InvoiceFilterTabs'
```

---

## Phase 3: Invoice Table (Desktop)

### 3.1 Phase Objectives
- Create desktop table view for invoices
- Include columns: Invoice #, Client, Amount, Due Date, Status, Actions
- Implement contextual row actions based on status
- Add row hover and click navigation

### 3.2 Phase Checklist

```markdown
## Phase 3 Checklist
- [ ] Create InvoiceTable component
- [ ] Include all required columns
- [ ] Display StatusBadge for each invoice
- [ ] Implement contextual actions menu
- [ ] Actions vary based on invoice status
- [ ] Add row hover states
- [ ] Add staggered animations
- [ ] Create empty state
```

### 3.3 Implementation

**Step 3.3.1: Create InvoiceRowActions Component**

```tsx
// app/frontend/components/invoices/InvoiceRowActions.tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Pencil,
  Eye,
  Send,
  CheckCircle,
  Trash2,
  ExternalLink,
  Copy,
} from "lucide-react"
import type { Invoice } from "@/lib/types"

interface InvoiceRowActionsProps {
  invoice: Invoice
  onEdit?: (invoice: Invoice) => void
  onView?: (invoice: Invoice) => void
  onSend?: (invoice: Invoice) => void
  onMarkPaid?: (invoice: Invoice) => void
  onDelete?: (invoice: Invoice) => void
  onCopyLink?: (invoice: Invoice) => void
}

/**
 * InvoiceRowActions — Contextual actions menu for invoice rows
 * 
 * Actions vary by status:
 * - Draft: Edit, Send, Delete
 * - Pending: Edit, View Public, Mark Paid, Copy Link
 * - Paid: Edit, View Public, Copy Link
 * - Overdue: Edit, View Public, Mark Paid, Copy Link
 */
export function InvoiceRowActions({
  invoice,
  onEdit,
  onView,
  onSend,
  onMarkPaid,
  onDelete,
  onCopyLink,
}: InvoiceRowActionsProps) {
  const { status } = invoice
  
  const isDraft = status === 'draft'
  const canMarkPaid = status === 'pending' || status === 'overdue'
  const hasPublicLink = status !== 'draft'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label={`Actions for invoice ${invoice.invoiceNumber}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {/* Edit — Available for all statuses */}
        <DropdownMenuItem onClick={() => onEdit?.(invoice)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Invoice
        </DropdownMenuItem>

        {/* View Public — Not available for drafts */}
        {hasPublicLink && (
          <DropdownMenuItem onClick={() => onView?.(invoice)}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Public
          </DropdownMenuItem>
        )}

        {/* Copy Link — Not available for drafts */}
        {hasPublicLink && (
          <DropdownMenuItem onClick={() => onCopyLink?.(invoice)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Send — Only for drafts */}
        {isDraft && (
          <DropdownMenuItem onClick={() => onSend?.(invoice)}>
            <Send className="mr-2 h-4 w-4" />
            Send Invoice
          </DropdownMenuItem>
        )}

        {/* Mark Paid — For pending and overdue */}
        {canMarkPaid && (
          <DropdownMenuItem onClick={() => onMarkPaid?.(invoice)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Paid
          </DropdownMenuItem>
        )}

        {/* Delete — Only for drafts */}
        {isDraft && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete?.(invoice)}
              className="text-rose-600 dark:text-rose-400 focus:text-rose-600 dark:focus:text-rose-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Invoice
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

**Step 3.3.2: Create InvoiceTable Component**

```tsx
// app/frontend/components/invoices/InvoiceTable.tsx
import { Link } from "@inertiajs/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { InvoiceRowActions } from "./InvoiceRowActions"
import { formatCurrency, formatDate } from "@/lib/utils"
import { FileText } from "lucide-react"
import type { Invoice } from "@/lib/types"

interface InvoiceTableProps {
  invoices: Invoice[]
  onEdit?: (invoice: Invoice) => void
  onView?: (invoice: Invoice) => void
  onSend?: (invoice: Invoice) => void
  onMarkPaid?: (invoice: Invoice) => void
  onDelete?: (invoice: Invoice) => void
  onCopyLink?: (invoice: Invoice) => void
}

/**
 * InvoiceTable — Desktop table view for invoices
 * 
 * Layout (v4.2):
 * - Invoice # | Client | Amount | Due Date | Status | Actions
 * - Row hover states
 * - Contextual actions per status
 * 
 * Hidden on mobile (md:hidden counterpart shows InvoiceCard)
 */
export function InvoiceTable({
  invoices,
  onEdit,
  onView,
  onSend,
  onMarkPaid,
  onDelete,
  onCopyLink,
}: InvoiceTableProps) {
  if (invoices.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[140px]">Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Due Date</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[50px]">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow
              key={invoice.id}
              className="animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 30}ms` }}
              onClick={() => onEdit?.(invoice)}
            >
              {/* Invoice Number — Monospace, prominent */}
              <TableCell>
                <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
                  {invoice.invoiceNumber}
                </span>
              </TableCell>

              {/* Client */}
              <TableCell>
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-50 truncate">
                    {invoice.client?.name || 'Unknown Client'}
                  </p>
                  {invoice.client?.company && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {invoice.client.company}
                    </p>
                  )}
                </div>
              </TableCell>

              {/* Amount */}
              <TableCell className="text-right">
                <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
                  {formatCurrency(invoice.total || 0)}
                </span>
              </TableCell>

              {/* Due Date */}
              <TableCell className="text-right">
                <span className={`text-sm ${
                  invoice.status === 'overdue' 
                    ? 'text-rose-600 dark:text-rose-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {formatDate(invoice.dueDate)}
                </span>
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusBadge status={invoice.status} />
              </TableCell>

              {/* Actions */}
              <TableCell onClick={(e) => e.stopPropagation()}>
                <InvoiceRowActions
                  invoice={invoice}
                  onEdit={onEdit}
                  onView={onView}
                  onSend={onSend}
                  onMarkPaid={onMarkPaid}
                  onDelete={onDelete}
                  onCopyLink={onCopyLink}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * EmptyState — Displayed when there are no invoices
 */
function EmptyState() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
          No invoices found
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Create your first invoice or adjust your filters
        </p>
      </div>
    </div>
  )
}
```

**Step 3.3.3: Update Invoices Components Index**

```tsx
// app/frontend/components/invoices/index.ts
export { InvoiceFilterTabs, type FilterValue } from './InvoiceFilterTabs'
export { InvoiceRowActions } from './InvoiceRowActions'
export { InvoiceTable } from './InvoiceTable'
```

---

## Phase 4: Invoice Card (Mobile)

### 4.1 Phase Objectives
- Create mobile card view for invoices
- Show all essential information
- Include contextual actions
- Ensure touch-friendly sizing

### 4.2 Phase Checklist

```markdown
## Phase 4 Checklist
- [ ] Create InvoiceCard component
- [ ] Include invoice number, client, amount, due date
- [ ] Include StatusBadge
- [ ] Include actions menu
- [ ] Add tap action for navigation
- [ ] Ensure touch targets are adequate
- [ ] Add staggered animation
```

### 4.3 Implementation

**Step 4.3.1: Create InvoiceCard Component**

```tsx
// app/frontend/components/invoices/InvoiceCard.tsx
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { InvoiceRowActions } from "./InvoiceRowActions"
import type { Invoice } from "@/lib/types"

interface InvoiceCardProps {
  invoice: Invoice
  /** Animation delay index */
  index?: number
  onEdit?: (invoice: Invoice) => void
  onView?: (invoice: Invoice) => void
  onSend?: (invoice: Invoice) => void
  onMarkPaid?: (invoice: Invoice) => void
  onDelete?: (invoice: Invoice) => void
  onCopyLink?: (invoice: Invoice) => void
  className?: string
}

/**
 * InvoiceCard — Mobile card view for a single invoice
 * 
 * Layout (v4.2):
 * - Invoice number prominent at top
 * - Client name and amount
 * - Due date and status badge
 * - Actions menu in corner
 * 
 * Displayed on mobile, hidden on desktop (md:hidden)
 */
export function InvoiceCard({
  invoice,
  index = 0,
  onEdit,
  onView,
  onSend,
  onMarkPaid,
  onDelete,
  onCopyLink,
  className,
}: InvoiceCardProps) {
  return (
    <div
      className={cn(
        // Animation
        "animate-fade-in-up",
        // Surface styling
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "rounded-lg shadow-sm",
        "p-4",
        // Clickable
        "cursor-pointer",
        "transition-colors hover:border-slate-300 dark:hover:border-slate-700",
        className
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onEdit?.(invoice)}
    >
      {/* Header Row: Invoice # + Actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          {/* Invoice Number — Prominent, monospace */}
          <p className="font-mono text-lg font-medium text-slate-900 dark:text-slate-50">
            #{invoice.invoiceNumber}
          </p>
          {/* Client Name */}
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            {invoice.client?.name || 'Unknown Client'}
          </p>
        </div>

        {/* Actions Menu */}
        <div onClick={(e) => e.stopPropagation()}>
          <InvoiceRowActions
            invoice={invoice}
            onEdit={onEdit}
            onView={onView}
            onSend={onSend}
            onMarkPaid={onMarkPaid}
            onDelete={onDelete}
            onCopyLink={onCopyLink}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />

      {/* Bottom Row: Amount, Due Date, Status */}
      <div className="flex items-center justify-between gap-3">
        {/* Amount */}
        <p className="font-mono text-lg font-medium text-slate-900 dark:text-slate-50">
          {formatCurrency(invoice.total || 0)}
        </p>

        {/* Right side: Due Date + Status */}
        <div className="flex items-center gap-3">
          {/* Due Date */}
          <span className={`text-sm ${
            invoice.status === 'overdue'
              ? 'text-rose-600 dark:text-rose-400 font-medium'
              : 'text-slate-500 dark:text-slate-400'
          }`}>
            {invoice.status === 'overdue' ? 'Overdue: ' : 'Due: '}
            {formatDate(invoice.dueDate, { month: 'short', day: 'numeric' })}
          </span>

          {/* Status Badge */}
          <StatusBadge status={invoice.status} />
        </div>
      </div>
    </div>
  )
}
```

**Step 4.3.2: Update Invoices Components Index**

```tsx
// app/frontend/components/invoices/index.ts
export { InvoiceFilterTabs, type FilterValue } from './InvoiceFilterTabs'
export { InvoiceRowActions } from './InvoiceRowActions'
export { InvoiceTable } from './InvoiceTable'
export { InvoiceCard } from './InvoiceCard'
```

---

## Phase 5: Invoice List Container

### 5.1 Phase Objectives
- Combine table and cards with responsive switching
- Centralize action handlers
- Handle filtered empty state

### 5.2 Phase Checklist

```markdown
## Phase 5 Checklist
- [ ] Create InvoiceList component
- [ ] Show table on desktop, cards on mobile
- [ ] Pass all action handlers through
- [ ] Handle empty state for filtered results
```

### 5.3 Implementation

**Step 5.3.1: Create InvoiceList Component**

```tsx
// app/frontend/components/invoices/InvoiceList.tsx
import { InvoiceTable } from "./InvoiceTable"
import { InvoiceCard } from "./InvoiceCard"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { FileText, Plus } from "lucide-react"
import type { Invoice } from "@/lib/types"

interface InvoiceListProps {
  invoices: Invoice[]
  /** Whether a filter is active (affects empty state message) */
  isFiltered?: boolean
  onEdit?: (invoice: Invoice) => void
  onView?: (invoice: Invoice) => void
  onSend?: (invoice: Invoice) => void
  onMarkPaid?: (invoice: Invoice) => void
  onDelete?: (invoice: Invoice) => void
  onCopyLink?: (invoice: Invoice) => void
}

/**
 * InvoiceList — Responsive invoice display
 * 
 * Shows:
 * - Table on desktop (hidden on mobile)
 * - Card stack on mobile (hidden on desktop)
 */
export function InvoiceList({
  invoices,
  isFiltered = false,
  onEdit,
  onView,
  onSend,
  onMarkPaid,
  onDelete,
  onCopyLink,
}: InvoiceListProps) {
  // Common action props
  const actionProps = {
    onEdit,
    onView,
    onSend,
    onMarkPaid,
    onDelete,
    onCopyLink,
  }

  if (invoices.length === 0) {
    return <EmptyState isFiltered={isFiltered} />
  }

  return (
    <>
      {/* Desktop: Table */}
      <div className="hidden md:block">
        <InvoiceTable invoices={invoices} {...actionProps} />
      </div>

      {/* Mobile: Card Stack */}
      <div className="md:hidden space-y-3">
        {invoices.map((invoice, index) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            index={index}
            {...actionProps}
          />
        ))}
      </div>
    </>
  )
}

/**
 * EmptyState — Displayed when there are no invoices
 */
interface EmptyStateProps {
  isFiltered: boolean
}

function EmptyState({ isFiltered }: EmptyStateProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>
        
        {isFiltered ? (
          <>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
              No invoices match your filter
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Try selecting a different status filter
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
              No invoices yet
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Create your first invoice to start tracking payments
            </p>
            <Button size="sm" className="mt-4" asChild>
              <Link href="/invoices/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
```

**Step 5.3.2: Update Invoices Components Index**

```tsx
// app/frontend/components/invoices/index.ts
export { InvoiceFilterTabs, type FilterValue } from './InvoiceFilterTabs'
export { InvoiceRowActions } from './InvoiceRowActions'
export { InvoiceTable } from './InvoiceTable'
export { InvoiceCard } from './InvoiceCard'
export { InvoiceList } from './InvoiceList'
```

---

## Phase 6: Invoices Page Integration

### 6.1 Phase Objectives
- Create complete Invoices page
- Wire up filter tabs with state
- Implement all action handlers
- Add navigation to editor

### 6.2 Phase Checklist

```markdown
## Phase 6 Checklist
- [ ] Import all invoice components
- [ ] Wire PageHeader with invoice count
- [ ] Implement filter state management
- [ ] Wire InvoiceFilterTabs
- [ ] Wire InvoiceList with filtered data
- [ ] Implement action handlers:
    - [ ] Edit: Navigate to editor
    - [ ] View: Open public link
    - [ ] Send: Update status (mock)
    - [ ] Mark Paid: Update status (mock)
    - [ ] Delete: Confirmation (mock)
    - [ ] Copy Link: Copy to clipboard
- [ ] Add "New Invoice" button functionality
```

### 6.3 Implementation

**Step 6.3.1: Create Complete Invoices Page**

```tsx
// app/frontend/pages/Invoices/Index.tsx
import { useState, useMemo, useCallback } from "react"
import { router } from "@inertiajs/react"
import { AppLayout } from "@/layouts/AppLayout"
import { PageHeader } from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { 
  InvoiceFilterTabs, 
  InvoiceList,
  type FilterValue 
} from "@/components/invoices"
import { mockInvoices } from "@/lib/mock-data"
import { Plus } from "lucide-react"
import type { Invoice } from "@/lib/types"

/**
 * Invoices Page — Command center for all invoices
 * 
 * Features:
 * - PageHeader with count and "New Invoice" button
 * - Filter tabs by status
 * - Responsive table (desktop) / cards (mobile)
 * - Contextual row actions
 */
export default function InvoicesIndex() {
  // Filter state
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')

  // Filter invoices based on active filter
  const filteredInvoices = useMemo(() => {
    if (activeFilter === 'all') {
      return mockInvoices
    }
    return mockInvoices.filter(invoice => invoice.status === activeFilter)
  }, [activeFilter])

  // Sort by most recent first
  const sortedInvoices = useMemo(() => {
    return [...filteredInvoices].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [filteredInvoices])

  // ─────────────────────────────────────────────────────────────────────────
  // Action Handlers
  // ─────────────────────────────────────────────────────────────────────────

  const handleEdit = useCallback((invoice: Invoice) => {
    // Navigate to invoice editor
    router.visit(`/invoices/${invoice.id}/edit`)
  }, [])

  const handleView = useCallback((invoice: Invoice) => {
    // Open public invoice in new tab
    window.open(`/i/${invoice.token}`, '_blank')
  }, [])

  const handleSend = useCallback((invoice: Invoice) => {
    // In a real app, this would call an API to send the invoice
    console.log('Send invoice:', invoice.invoiceNumber)
    alert(`Invoice ${invoice.invoiceNumber} would be sent to ${invoice.client?.email}`)
    // After sending, status would change to 'pending'
  }, [])

  const handleMarkPaid = useCallback((invoice: Invoice) => {
    // In a real app, this would call an API to mark as paid
    console.log('Mark paid:', invoice.invoiceNumber)
    alert(`Invoice ${invoice.invoiceNumber} marked as paid`)
    // After marking paid, status would change to 'paid'
  }, [])

  const handleDelete = useCallback((invoice: Invoice) => {
    // In a real app, this would show a confirmation dialog then call API
    console.log('Delete invoice:', invoice.invoiceNumber)
    const confirmed = window.confirm(
      `Delete invoice ${invoice.invoiceNumber}? This action cannot be undone.`
    )
    if (confirmed) {
      console.log('Confirmed delete')
      // Would refresh the list after deletion
    }
  }, [])

  const handleCopyLink = useCallback((invoice: Invoice) => {
    const url = `${window.location.origin}/i/${invoice.token}`
    navigator.clipboard.writeText(url).then(() => {
      alert('Invoice link copied to clipboard!')
    }).catch(() => {
      // Fallback for older browsers
      prompt('Copy this link:', url)
    })
  }, [])

  const handleNewInvoice = useCallback(() => {
    router.visit('/invoices/new')
  }, [])

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <AppLayout>
      {/* Page Header */}
      <PageHeader
        title="Invoices"
        subtitle={`${mockInvoices.length} total invoice${mockInvoices.length !== 1 ? 's' : ''}`}
        actions={
          <Button onClick={handleNewInvoice}>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        }
      />

      {/* Filter Tabs */}
      <div className="mb-6">
        <InvoiceFilterTabs
          invoices={mockInvoices}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Invoice List (responsive table/cards) */}
      <InvoiceList
        invoices={sortedInvoices}
        isFiltered={activeFilter !== 'all'}
        onEdit={handleEdit}
        onView={handleView}
        onSend={handleSend}
        onMarkPaid={handleMarkPaid}
        onDelete={handleDelete}
        onCopyLink={handleCopyLink}
      />

      {/* Filter Result Count */}
      {activeFilter !== 'all' && filteredInvoices.length > 0 && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Showing {filteredInvoices.length} of {mockInvoices.length} invoices
        </p>
      )}
    </AppLayout>
  )
}
```

**Step 6.3.2: Create Invoice Editor Placeholder**

```tsx
// app/frontend/pages/Invoices/New.tsx
import { AppLayout } from "@/layouts/AppLayout"
import { PageHeader } from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"

/**
 * New Invoice Page — Placeholder for Day 5
 */
export default function InvoicesNew() {
  return (
    <AppLayout>
      <PageHeader
        title="New Invoice"
        subtitle="Create a new invoice"
        actions={
          <Button variant="outline" asChild>
            <Link href="/invoices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Link>
          </Button>
        }
      />

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          Invoice editor will be implemented on Day 5
        </p>
      </div>
    </AppLayout>
  )
}
```

```tsx
// app/frontend/pages/Invoices/Edit.tsx
import { AppLayout } from "@/layouts/AppLayout"
import { PageHeader } from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"

interface EditInvoiceProps {
  id: string
}

/**
 * Edit Invoice Page — Placeholder for Day 5
 */
export default function InvoicesEdit({ id }: EditInvoiceProps) {
  return (
    <AppLayout>
      <PageHeader
        title="Edit Invoice"
        subtitle={`Editing invoice ${id}`}
        actions={
          <Button variant="outline" asChild>
            <Link href="/invoices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Link>
          </Button>
        }
      />

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          Invoice editor will be implemented on Day 5
        </p>
      </div>
    </AppLayout>
  )
}
```

**Step 6.3.3: Update Rails Controllers**

```ruby
# app/controllers/invoices_controller.rb
class InvoicesController < ApplicationController
  def index
    render inertia: 'Invoices/Index'
  end

  def new
    render inertia: 'Invoices/New'
  end

  def edit
    render inertia: 'Invoices/Edit', props: {
      id: params[:id]
    }
  end
end
```

**Step 6.3.4: Update Routes**

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root "dashboard#index"
  
  get "dashboard", to: "dashboard#index"
  
  resources :clients, only: [:index]
  resources :invoices, only: [:index, :new, :edit]
  
  # Public shareable invoice (for Day 6)
  get "i/:token", to: "public_invoices#show", as: :public_invoice
end
```

---

## Phase 7: Validation & QA

### 7.1 Validation Checklist

```markdown
## Day 4 Final Validation Checklist

### Page Header
- [ ] Title "Invoices" uses font-display text-4xl tracking-tight
- [ ] Subtitle shows "4 total invoices"
- [ ] "New Invoice" button positioned right on desktop
- [ ] Header stacks vertically on mobile

### Filter Tabs
- [ ] All tabs visible: All, Draft, Pending, Paid, Overdue
- [ ] Each tab shows correct count
- [ ] "All" tab shows (4)
- [ ] "Draft" tab shows (1)
- [ ] "Pending" tab shows (1)
- [ ] "Paid" tab shows (1)
- [ ] "Overdue" tab shows (1)
- [ ] Active tab has solid background and border
- [ ] Clicking tab filters the list
- [ ] Keyboard navigation works (arrow keys, enter)
- [ ] Tabs wrap on mobile if needed

### Invoice Table (Desktop - md:block)
- [ ] Visible only on md: breakpoint and above
- [ ] Headers: Invoice #, Client, Amount, Due Date, Status, Actions
- [ ] Invoice number in monospace font
- [ ] Client name and company displayed
- [ ] Amount in monospace font
- [ ] Due date formatted correctly
- [ ] Overdue dates shown in red
- [ ] StatusBadge displays correct variant
- [ ] Row hover state changes background
- [ ] Clicking row navigates to edit (placeholder)
- [ ] Actions dropdown opens with brutalist shadow
- [ ] Staggered animation on page load

### Invoice Cards (Mobile - md:hidden)
- [ ] Visible only below md: breakpoint
- [ ] Invoice number prominent at top
- [ ] Client name visible
- [ ] Amount in large monospace font
- [ ] Due date with status badge
- [ ] Actions menu works
- [ ] Touch targets adequate size
- [ ] Card tap navigates to edit
- [ ] Staggered animation on page load

### Status Badges
- [ ] Draft: slate colors, dashed border
- [ ] Pending: amber colors, solid border
- [ ] Paid: emerald colors, solid border
- [ ] Overdue: rose colors, solid border

### Contextual Row Actions
- [ ] Draft invoices show: Edit, Send, Delete
- [ ] Pending invoices show: Edit, View Public, Copy Link, Mark Paid
- [ ] Paid invoices show: Edit, View Public, Copy Link
- [ ] Overdue invoices show: Edit, View Public, Copy Link, Mark Paid
- [ ] Delete option only on draft
- [ ] Send option only on draft
- [ ] Delete shown in red

### Action Functionality
- [ ] Edit: Navigates to /invoices/:id/edit
- [ ] View Public: Opens new tab (will 404 for now)
- [ ] Send: Shows alert (mock)
- [ ] Mark Paid: Shows alert (mock)
- [ ] Delete: Shows confirmation dialog
- [ ] Copy Link: Copies to clipboard

### Filtering Behavior
- [ ] Selecting "Draft" shows only draft invoice
- [ ] Selecting "Pending" shows only pending invoice
- [ ] Selecting "Paid" shows only paid invoice
- [ ] Selecting "Overdue" shows only overdue invoice
- [ ] Selecting "All" shows all invoices
- [ ] Filter count message shows when filtered
- [ ] Empty state shows when no matches

### Responsive Behavior
- [ ] No horizontal scroll at 375px
- [ ] Table hidden, cards shown on mobile
- [ ] Cards hidden, table shown on desktop
- [ ] Filter tabs wrap if needed on mobile

### Accessibility
- [ ] Filter tabs have proper ARIA roles
- [ ] Active tab announced correctly
- [ ] Action buttons have aria-labels
- [ ] Keyboard navigation through table rows
- [ ] Focus visible on all interactive elements

### Dark Mode
- [ ] All components adapt to dark mode
- [ ] Table rows have correct hover color
- [ ] Filter tabs have correct colors
- [ ] Status badges remain visible
- [ ] Action menus have dark backgrounds
```

### 7.2 Manual Testing Procedure

```markdown
## Testing Steps

### 1. Start Development Servers
```bash
# Terminal 1
bin/rails server

# Terminal 2
bin/vite dev
```

### 2. Invoices Page Load
1. Navigate to http://localhost:3000/invoices
2. Verify page header shows "Invoices" and "4 total invoices"
3. Verify filter tabs are visible with counts
4. Verify 4 invoices are displayed

### 3. Filter Tabs Testing
1. Click "Draft" tab
2. Verify only 1 invoice shown (2025-0002)
3. Verify message "Showing 1 of 4 invoices"
4. Click "Pending" tab
5. Verify only 1 invoice shown (2025-0001)
6. Click "Paid" tab
7. Verify only 1 invoice shown (2024-0012)
8. Click "Overdue" tab
9. Verify only 1 invoice shown (2024-0010)
10. Click "All" tab
11. Verify all 4 invoices shown

### 4. Desktop Table Testing (>= 768px)
1. Ensure viewport is at least 768px wide
2. Verify table is visible with all columns
3. Verify each row shows:
   - Invoice number in monospace
   - Client name and company
   - Amount in monospace
   - Due date
   - Status badge
4. Verify overdue invoice (2024-0010) has red due date
5. Hover over a row, verify background changes
6. Click on a row
7. Verify navigation to /invoices/:id/edit

### 5. Row Actions Testing
1. Open actions for draft invoice (2025-0002)
2. Verify options: Edit, Send, Delete (in red)
3. Close menu
4. Open actions for pending invoice (2025-0001)
5. Verify options: Edit, View Public, Copy Link, Mark Paid
6. Click "Copy Link"
7. Verify alert shows "copied to clipboard"
8. Open actions for paid invoice (2024-0012)
9. Verify options: Edit, View Public, Copy Link (no Mark Paid)
10. Open actions for overdue invoice (2024-0010)
11. Verify options: Edit, View Public, Copy Link, Mark Paid

### 6. Mobile Card Testing (< 768px)
1. Set viewport to 375px
2. Verify table is hidden
3. Verify card stack is visible
4. Verify each card shows:
   - Invoice number at top
   - Client name
   - Amount in large font
   - Due date with status
5. Verify overdue invoice has red date
6. Tap actions button
7. Verify dropdown opens
8. Tap on card (not actions)
9. Verify navigation to edit page

### 7. Status Badge Verification
1. Find invoice 2025-0002 (Draft)
2. Verify badge has dashed border, slate colors
3. Find invoice 2025-0001 (Pending)
4. Verify badge has amber colors
5. Find invoice 2024-0012 (Paid)
6. Verify badge has emerald colors
7. Find invoice 2024-0010 (Overdue)
8. Verify badge has rose colors

### 8. New Invoice Button
1. Click "New Invoice" button
2. Verify navigation to /invoices/new
3. Verify placeholder page shows
4. Click "Back to Invoices"
5. Verify return to invoices list

### 9. Dark Mode Testing
1. Toggle to dark mode
2. Verify table has dark background
3. Verify filter tabs adapt
4. Verify cards have dark background
5. Verify status badges remain visible
6. Verify action menus have dark backgrounds

### 10. Accessibility Testing
1. Tab through the page
2. Verify focus on filter tabs
3. Use arrow keys between tabs
4. Press Enter to select tab
5. Continue tabbing to table rows
6. Verify focus visible on action buttons
7. Press Enter on action button
8. Verify dropdown opens
9. Arrow through dropdown items
10. Press Escape to close
```

---

## File Structure Summary (Day 4 Complete)

```
app/frontend/
├── components/
│   ├── clients/
│   │   ├── index.ts
│   │   ├── ClientAvatar.tsx
│   │   ├── ClientTable.tsx
│   │   ├── ClientCard.tsx
│   │   ├── ClientList.tsx
│   │   ├── ClientForm.tsx
│   │   └── ClientFormSheet.tsx
│   ├── dashboard/
│   │   ├── index.ts
│   │   ├── MetricCard.tsx
│   │   ├── RecentInvoiceCard.tsx
│   │   ├── RecentInvoices.tsx
│   │   ├── ActivityItem.tsx
│   │   └── ActivityFeed.tsx
│   ├── invoices/
│   │   ├── index.ts                  # NEW
│   │   ├── InvoiceFilterTabs.tsx     # NEW
│   │   ├── InvoiceRowActions.tsx     # NEW
│   │   ├── InvoiceTable.tsx          # NEW
│   │   ├── InvoiceCard.tsx           # NEW
│   │   └── InvoiceList.tsx           # NEW
│   ├── layout/
│   │   ├── index.ts
│   │   ├── Logo.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── NavItem.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   ├── shared/
│   │   ├── index.ts
│   │   ├── PageHeader.tsx
│   │   └── StatusBadge.tsx
│   └── ui/
│       ├── index.ts                  # UPDATED
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── table.tsx
│       ├── tabs.tsx                  # NEW
│       ├── textarea.tsx
│       └── tooltip.tsx
├── hooks/
│   └── useTheme.ts
├── layouts/
│   └── AppLayout.tsx
├── lib/
│   ├── utils.ts
│   ├── types.ts
│   └── mock-data.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Clients/
│   │   └── Index.tsx
│   └── Invoices/
│       ├── Index.tsx                 # UPDATED
│       ├── New.tsx                   # NEW (placeholder)
│       └── Edit.tsx                  # NEW (placeholder)
└── entrypoints/
    ├── inertia.tsx
    └── application.css
```

---

## Day 4 Success Criteria

| Criterion | Validation Method | Status |
|-----------|-------------------|--------|
| PageHeader shows invoice count | Visual inspection | ⬜ |
| All 5 filter tabs visible | Check UI | ⬜ |
| Filter tabs show correct counts | Verify All(4), Draft(1), etc. | ⬜ |
| Clicking tab filters list | Click each tab | ⬜ |
| InvoiceTable visible on desktop | Check at 1024px+ | ⬜ |
| InvoiceCards visible on mobile | Check at 375px | ⬜ |
| Invoice numbers in monospace | Visual inspection | ⬜ |
| Status badges correct per status | Check all 4 invoices | ⬜ |
| Overdue dates shown in red | Check overdue invoice | ⬜ |
| Dropdown has brutalist shadow | Open actions menu | ⬜ |
| Draft actions: Edit, Send, Delete | Check draft invoice | ⬜ |
| Pending actions: Edit, View, Copy, Mark Paid | Check pending | ⬜ |
| Paid actions: Edit, View, Copy | Check paid invoice | ⬜ |
| Overdue actions: Edit, View, Copy, Mark Paid | Check overdue | ⬜ |
| Edit navigates to editor | Click edit | ⬜ |
| Copy Link copies to clipboard | Click copy link | ⬜ |
| Empty state shows when filtered | Filter with no results | ⬜ |
| Responsive switching works | Resize viewport | ⬜ |
| Dark mode adapts | Toggle theme | ⬜ |
| Accessibility passes | Tab navigation, SR | ⬜ |

---

## Invoices View Preview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  DESKTOP VIEW (≥ 768px)                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Invoices                                                   [+ New Invoice]│
│   4 total invoices                                                          │
│                                                                             │
│   ┌─────────┐ ┌─────────┐ ┌───────────┐ ┌────────┐ ┌───────────┐            │
│   │ All (4) │ │Draft (1)│ │Pending (1)│ │Paid (1)│ │Overdue (1)│            │
│   └─────────┘ └─────────┘ └───────────┘ └────────┘ └───────────┘            │
│        ▲ Active                                                             │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │ Invoice #   │ Client              │ Amount       │ Due Date  │Status │  │
│   ├─────────────┼─────────────────────┼──────────────┼───────────┼───────┤  │
│   │ 2025-0002   │ Startup Labs        │  S$2,400.00  │ 19 Feb 25 │[Draft]│  │
│   │             │ Startup Labs Pte    │              │           │       │  │
│   ├─────────────┼─────────────────────┼──────────────┼───────────┼───────┤  │
│   │ 2025-0001   │ Acme Corporation    │  S$6,080.00  │ 14 Feb 25 │[Pend] │  │
│   │             │ Acme Corp Pte Ltd   │              │           │       │  │
│   ├─────────────┼─────────────────────┼──────────────┼───────────┼───────┤  │
│   │ 2024-0012   │ Global Ventures     │  S$8,000.00  │ 19 Jan 25 │[Paid] │  │
│   │             │ Global Holdings     │              │           │       │  │
│   ├─────────────┼─────────────────────┼──────────────┼───────────┼───────┤  │
│   │ 2024-0010   │ Acme Corporation    │  S$1,200.00  │ 15 Dec 24 │[Over] │  │
│   │             │ Acme Corp Pte Ltd   │              │ (RED)     │       │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  MOBILE VIEW (< 768px)                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Invoices                                                                  │
│   4 total invoices                                       [+ New Invoice]    │
│                                                                             │
│   ┌───────┐ ┌───────┐ ┌─────────┐ ┌──────┐ ┌─────────┐                      │
│   │All (4)│ │Dft (1)│ │Pend (1) │ │Pd (1)│ │Over (1) │                      │
│   └───────┘ └───────┘ └─────────┘ └──────┘ └─────────┘                      │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────┐              │
│   │ #2025-0002                                         [⋮]  │              │
│   │ Startup Labs                                             │              │
│   │ ─────────────────────────────────────────────────────── │              │
│   │ S$2,400.00              Due: 19 Feb    [Draft]          │              │
│   └──────────────────────────────────────────────────────────┘              │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────┐              │
│   │ #2025-0001                                         [⋮]  │              │
│   │ Acme Corporation                                         │              │
│   │ ─────────────────────────────────────────────────────── │              │
│   │ S$6,080.00              Due: 14 Feb   [Pending]         │              │
│   └──────────────────────────────────────────────────────────┘              │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────┐              │
│   │ #2024-0010                                         [⋮]  │              │
│   │ Acme Corporation                                         │              │
│   │ ─────────────────────────────────────────────────────── │              │
│   │ S$1,200.00         Overdue: 15 Dec   [Overdue]          │              │
│   └──────────────────────────────────────────────────────────┘              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  ACTIONS DROPDOWN — Contextual per Status                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   DRAFT Invoice:           PENDING Invoice:         OVERDUE Invoice:        │
│   ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐     │
│   │ ✏️ Edit Invoice │      │ ✏️ Edit Invoice │      │ ✏️ Edit Invoice │     │
│   │ ✉️ Send Invoice │      │ 🔗 View Public  │      │ 🔗 View Public  │     │
│   │ ─────────────── │      │ 📋 Copy Link    │      │ 📋 Copy Link    │     │
│   │ 🗑️ Delete (red) │      │ ─────────────── │      │ ─────────────── │     │
│   └─────────────────┘      │ ✅ Mark as Paid │      │ ✅ Mark as Paid │     │
│                            └─────────────────┘      └─────────────────┘     │
│                                                                             │
│   PAID Invoice:                                                             │
│   ┌─────────────────┐                                                       │
│   │ ✏️ Edit Invoice │                                                       │
│   │ 🔗 View Public  │                                                       │
│   │ 📋 Copy Link    │                                                       │
│   └─────────────────┘                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Ready for Implementation

This comprehensive Day 4 plan includes:

1. ✅ **7 detailed phases** with clear objectives
2. ✅ **Complete code** for all new components
3. ✅ **v4.2 design tokens** strictly followed
4. ✅ **Filter tabs** with status counts
5. ✅ **Responsive table → card** transformation
6. ✅ **Contextual row actions** per invoice status
7. ✅ **Brutalist shadows** on dropdowns
8. ✅ **Accessibility** requirements met
9. ✅ **Validation checklists** for thorough QA

**All files are ready to be created. The Invoices view will include:**
- Filter tabs for All, Draft, Pending, Paid, Overdue
- Desktop table with all columns
- Mobile card stack
- Status-appropriate row actions
- Navigation to editor (placeholder)
- Full dark mode support
- Staggered animations

Shall I proceed with creating these files, or would you like any adjustments to the implementation plan?
