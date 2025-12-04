# Day 2: Dashboard — Comprehensive Execution Plan

## Executive Summary

Day 2 builds the complete Dashboard view with all specified components: MetricCard, RecentInvoiceCard, ActivityFeed, and supporting shared components. We'll integrate the full mock data set and ensure pixel-perfect adherence to the v4.2 Neo-Editorial design system.

---

## Pre-Implementation: Day 1 Verification

Before proceeding, confirm Day 1 completion:

```markdown
## Day 1 Completion Checklist
- [ ] Rails + Inertia + React environment running
- [ ] Tailwind v4 with @theme tokens configured
- [ ] AppLayout, Sidebar, MobileNav functional
- [ ] ThemeToggle persists preference
- [ ] All three routes accessible (/dashboard, /clients, /invoices)
- [ ] Typography (Instrument Serif, Geist, Geist Mono) loading
- [ ] Canvas/Surface depth hierarchy visible
```

---

## Day 2 Execution Plan — Phased Breakdown

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 2: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► Shared Components                                              │
│              └── PageHeader, StatusBadge                                    │
│                                                                             │
│  PHASE 2 ──► Dashboard Components                                           │
│              └── MetricCard (proper extraction + enhancement)               │
│                                                                             │
│  PHASE 3 ──► Recent Invoices Section                                        │
│              └── RecentInvoiceCard with status, navigation                  │
│                                                                             │
│  PHASE 4 ──► Activity Feed Section                                          │
│              └── ActivityFeed, ActivityItem with timeline                   │
│                                                                             │
│  PHASE 5 ──► Dashboard Page Integration                                     │
│              └── Complete layout with all components + mock data            │
│                                                                             │
│  PHASE 6 ──► Staggered Animations (Premium Feel)                            │
│              └── List animations, hover states                              │
│                                                                             │
│  PHASE 7 ──► Validation & QA                                                │
│              └── Responsive, accessibility, design fidelity                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Shared Components

### 1.1 Phase Objectives
- Create reusable PageHeader component
- Create StatusBadge component with all invoice states
- Establish shared component patterns

### 1.2 Phase Checklist

```markdown
## Phase 1 Checklist
- [ ] Create PageHeader component with title, subtitle, actions
- [ ] Create StatusBadge with draft, pending, paid, overdue variants
- [ ] Create shared components index
- [ ] Verify components render correctly in isolation
```

### 1.3 Implementation

**Step 1.3.1: Create PageHeader Component**

```tsx
// app/frontend/components/shared/PageHeader.tsx
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

/**
 * PageHeader — Consistent page title treatment
 * 
 * Typography (v4.2):
 * - Title: font-display text-4xl tracking-tight
 * - Subtitle: text-sm text-slate-600
 */
export function PageHeader({ 
  title, 
  subtitle, 
  actions,
  className 
}: PageHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8",
      className
    )}>
      <div>
        {/* Page Title — Instrument Serif, tight tracking */}
        <h1 className="font-display text-4xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
          {title}
        </h1>
        
        {/* Subtitle — Secondary information */}
        {subtitle && (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Action buttons slot */}
      {actions && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  )
}
```

**Step 1.3.2: Create StatusBadge Component**

```tsx
// app/frontend/components/shared/StatusBadge.tsx
import { cn } from "@/lib/utils"
import type { InvoiceStatus } from "@/lib/types"

interface StatusBadgeProps {
  status: InvoiceStatus
  className?: string
}

/**
 * StatusBadge — Invoice status indicator
 * 
 * Design (v4.2):
 * - Draft: Dashed border, slate colors
 * - Pending: Solid border, amber colors
 * - Paid: Solid border, emerald colors
 * - Overdue: Solid border, rose colors
 * - All: rounded-full, text-xs, font-medium
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        // Base styles
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        // Status-specific styles
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
      {/* Screen reader enhancement */}
      <span className="sr-only">
        {statusAriaLabels[status]}
      </span>
    </span>
  )
}

// Status display labels
const statusLabels: Record<InvoiceStatus, string> = {
  draft: "Draft",
  pending: "Pending",
  paid: "Paid",
  overdue: "Overdue",
}

// Screen reader descriptions
const statusAriaLabels: Record<InvoiceStatus, string> = {
  draft: "Invoice is in draft status and has not been sent",
  pending: "Invoice has been sent and is awaiting payment",
  paid: "Invoice has been paid",
  overdue: "Invoice payment is past due date",
}

// Tailwind classes for each status (v4.2 specification)
const statusStyles: Record<InvoiceStatus, string> = {
  draft: cn(
    // Light mode
    "bg-slate-100 text-slate-600 border-slate-300 border-dashed",
    // Dark mode
    "dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600"
  ),
  pending: cn(
    // Light mode
    "bg-amber-50 text-amber-700 border-amber-300",
    // Dark mode
    "dark:bg-amber-950 dark:text-amber-400 dark:border-amber-700"
  ),
  paid: cn(
    // Light mode
    "bg-emerald-50 text-emerald-700 border-emerald-300",
    // Dark mode
    "dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-700"
  ),
  overdue: cn(
    // Light mode
    "bg-rose-50 text-rose-700 border-rose-300",
    // Dark mode
    "dark:bg-rose-950 dark:text-rose-400 dark:border-rose-700"
  ),
}

// Export styles for use in other components if needed
export { statusStyles, statusLabels }
```

**Step 1.3.3: Create Card Component (ShadCN-style)**

```tsx
// app/frontend/components/ui/card.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Card — Surface container component
 * 
 * Design (v4.2):
 * - Surface token: bg-white (light) / bg-slate-900 (dark)
 * - Border: border-slate-200 (light) / border-slate-800 (dark)
 * - Shadow: shadow-sm (subtle lift)
 * - Radius: rounded-lg
 */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Surface background
      "bg-white dark:bg-slate-900",
      // Border
      "border border-slate-200 dark:border-slate-800",
      // Radius & shadow
      "rounded-lg shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      // Card Title level (v4.2)
      "font-sans text-lg font-semibold leading-none tracking-tight",
      "text-slate-900 dark:text-slate-50",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-600 dark:text-slate-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

**Step 1.3.4: Create Shared Components Index**

```tsx
// app/frontend/components/shared/index.ts
export { PageHeader } from './PageHeader'
export { StatusBadge, statusStyles, statusLabels } from './StatusBadge'
```

**Step 1.3.5: Update UI Components Index**

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
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from './tooltip'
```

---

## Phase 2: Dashboard Components — MetricCard

### 2.1 Phase Objectives
- Create polished MetricCard component
- Support multiple variants (default, danger, success)
- Add trend indicators
- Implement proper typography per v4.2

### 2.2 Phase Checklist

```markdown
## Phase 2 Checklist
- [ ] Create MetricCard with label, value, subtext
- [ ] Add variant support (default, danger, success)
- [ ] Add optional trend indicator
- [ ] Add optional icon support
- [ ] Verify typography matches v4.2 spec
```

### 2.3 Implementation

**Step 2.3.1: Create MetricCard Component**

```tsx
// app/frontend/components/dashboard/MetricCard.tsx
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MetricCardProps {
  /** Uppercase label above the value */
  label: string
  /** Main metric value (pre-formatted) */
  value: string
  /** Optional subtext below value */
  subtext?: string
  /** Color variant for the value */
  variant?: 'default' | 'danger' | 'success'
  /** Optional trend indicator */
  trend?: {
    value: string
    direction: 'up' | 'down'
    /** Is the trend positive (green) or negative (red)? */
    positive: boolean
  }
  /** Optional icon to display */
  icon?: React.ComponentType<{ className?: string }>
  /** Additional class names */
  className?: string
}

/**
 * MetricCard — Dashboard metric display
 * 
 * Typography (v4.2):
 * - Label: text-xs uppercase tracking-wide
 * - Value: font-mono text-3xl font-medium
 * - Subtext: text-sm text-slate-500
 * 
 * Layout:
 * - Surface card with p-6
 * - Optional icon in top-right
 */
export function MetricCard({
  label,
  value,
  subtext,
  variant = 'default',
  trend,
  icon: Icon,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        // Surface styling (v4.2)
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "rounded-lg shadow-sm",
        "p-6",
        // Relative for icon positioning
        "relative",
        className
      )}
    >
      {/* Optional Icon */}
      {Icon && (
        <div className="absolute top-4 right-4">
          <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
        </div>
      )}

      {/* Label — Uppercase, tracking-wide */}
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>

      {/* Value — Monospace, large */}
      <p
        className={cn(
          "font-mono text-3xl font-medium mt-2",
          variantStyles[variant]
        )}
      >
        {value}
      </p>

      {/* Subtext & Trend Row */}
      <div className="flex items-center gap-2 mt-1">
        {/* Subtext */}
        {subtext && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtext}
          </p>
        )}

        {/* Trend Indicator */}
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.positive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            )}
          >
            {trend.direction === 'up' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Value color variants
const variantStyles = {
  default: "text-slate-900 dark:text-slate-50",
  danger: "text-rose-600 dark:text-rose-400",
  success: "text-emerald-600 dark:text-emerald-400",
}
```

**Step 2.3.2: Create Dashboard Components Index**

```tsx
// app/frontend/components/dashboard/index.ts
export { MetricCard } from './MetricCard'
```

---

## Phase 3: Recent Invoices Section

### 3.1 Phase Objectives
- Create RecentInvoiceCard component
- Display invoice number, client, amount, status
- Make cards clickable (navigate to edit)
- Add staggered animation support

### 3.2 Phase Checklist

```markdown
## Phase 3 Checklist
- [ ] Create RecentInvoiceCard component
- [ ] Include invoice number (monospace, prominent)
- [ ] Include client name, amount, due date
- [ ] Include StatusBadge
- [ ] Add hover state and click navigation
- [ ] Create RecentInvoices container component
```

### 3.3 Implementation

**Step 3.3.1: Create RecentInvoiceCard Component**

```tsx
// app/frontend/components/dashboard/RecentInvoiceCard.tsx
import { Link } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/shared/StatusBadge"
import type { Invoice } from "@/lib/types"
import { ChevronRight } from "lucide-react"

interface RecentInvoiceCardProps {
  invoice: Invoice
  /** Animation delay for staggered entrance */
  animationDelay?: number
  className?: string
}

/**
 * RecentInvoiceCard — Compact invoice display for dashboard
 * 
 * Layout:
 * - Invoice number (prominent, monospace)
 * - Client name
 * - Amount + Status on right
 * - Hover: border color change, chevron appears
 */
export function RecentInvoiceCard({
  invoice,
  animationDelay = 0,
  className,
}: RecentInvoiceCardProps) {
  return (
    <Link
      href={`/invoices/${invoice.id}/edit`}
      className={cn(
        // Surface styling
        "block bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "rounded-lg p-4",
        // Hover state — border color change (v4.2: no movement)
        "transition-colors duration-150",
        "hover:border-slate-300 dark:hover:border-slate-700",
        // Focus state
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "dark:focus:ring-offset-slate-950",
        // Group for hover effects
        "group",
        className
      )}
      style={{
        animationDelay: `${animationDelay}ms`,
      }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Invoice details */}
        <div className="min-w-0 flex-1">
          {/* Invoice Number — Prominent, monospace */}
          <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
            #{invoice.invoiceNumber}
          </p>
          
          {/* Client Name */}
          <p className="text-sm text-slate-600 dark:text-slate-400 truncate mt-0.5">
            {invoice.client?.name || 'Unknown Client'}
          </p>
        </div>

        {/* Right: Amount, Status, Chevron */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Amount */}
          <div className="text-right">
            <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
              {formatCurrency(invoice.total || 0)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Due {formatDate(invoice.dueDate, { month: 'short', day: 'numeric' })}
            </p>
          </div>

          {/* Status Badge */}
          <StatusBadge status={invoice.status} />

          {/* Chevron — Appears on hover */}
          <ChevronRight 
            className={cn(
              "h-4 w-4 text-slate-400",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-150"
            )} 
          />
        </div>
      </div>
    </Link>
  )
}
```

**Step 3.3.2: Create RecentInvoices Container Component**

```tsx
// app/frontend/components/dashboard/RecentInvoices.tsx
import { Link } from "@inertiajs/react"
import { RecentInvoiceCard } from "./RecentInvoiceCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ArrowRight } from "lucide-react"
import type { Invoice } from "@/lib/types"

interface RecentInvoicesProps {
  invoices: Invoice[]
  /** Maximum number of invoices to display */
  limit?: number
}

/**
 * RecentInvoices — Dashboard section showing latest invoices
 * 
 * Features:
 * - Section header with "View All" link
 * - Staggered animation on invoice cards
 * - Empty state if no invoices
 */
export function RecentInvoices({ invoices, limit = 5 }: RecentInvoicesProps) {
  const displayedInvoices = invoices.slice(0, limit)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-400" />
          Recent Invoices
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/invoices" className="gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {displayedInvoices.length > 0 ? (
          displayedInvoices.map((invoice, index) => (
            <RecentInvoiceCard
              key={invoice.id}
              invoice={invoice}
              animationDelay={index * 50}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  )
}

/**
 * EmptyState — Displayed when there are no invoices
 */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
        No invoices yet
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Create your first invoice to get started
      </p>
      <Button size="sm" className="mt-4" asChild>
        <Link href="/invoices/new">Create Invoice</Link>
      </Button>
    </div>
  )
}
```

**Step 3.3.3: Update Dashboard Components Index**

```tsx
// app/frontend/components/dashboard/index.ts
export { MetricCard } from './MetricCard'
export { RecentInvoiceCard } from './RecentInvoiceCard'
export { RecentInvoices } from './RecentInvoices'
```

---

## Phase 4: Activity Feed Section

### 4.1 Phase Objectives
- Create ActivityItem component with icon and timeline
- Create ActivityFeed container
- Support different activity types with appropriate icons
- Show relative timestamps

### 4.2 Phase Checklist

```markdown
## Phase 4 Checklist
- [ ] Create ActivityItem with icon, description, timestamp
- [ ] Create activity type icon mapping
- [ ] Create ActivityFeed container with timeline styling
- [ ] Implement relative time display
- [ ] Add empty state
```

### 4.3 Implementation

**Step 4.3.1: Create ActivityItem Component**

```tsx
// app/frontend/components/dashboard/ActivityItem.tsx
import { cn } from "@/lib/utils"
import { getRelativeTime } from "@/lib/utils"
import type { RecentActivity, ActivityType } from "@/lib/types"
import { 
  FileText, 
  Send, 
  CheckCircle, 
  UserPlus,
  Circle 
} from "lucide-react"

interface ActivityItemProps {
  activity: RecentActivity
  /** Is this the last item? (affects timeline styling) */
  isLast?: boolean
  /** Animation delay for staggered entrance */
  animationDelay?: number
}

/**
 * ActivityItem — Single activity entry in the feed
 * 
 * Layout:
 * - Left: Icon with colored background
 * - Center: Description text
 * - Right: Relative timestamp
 * - Vertical line connecting items (timeline)
 */
export function ActivityItem({ 
  activity, 
  isLast = false,
  animationDelay = 0 
}: ActivityItemProps) {
  const { icon: Icon, color } = activityConfig[activity.type]

  return (
    <div 
      className="relative flex gap-4"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Timeline connector line */}
      {!isLast && (
        <div 
          className={cn(
            "absolute left-[15px] top-8 w-px h-[calc(100%+8px)]",
            "bg-slate-200 dark:bg-slate-700"
          )} 
        />
      )}

      {/* Icon Container */}
      <div
        className={cn(
          "relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
          color
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-0.5">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {activity.description}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {getRelativeTime(activity.timestamp)}
        </p>
      </div>
    </div>
  )
}

/**
 * Activity type configuration
 * Maps activity types to icons and colors
 */
const activityConfig: Record<ActivityType, { 
  icon: React.ComponentType<{ className?: string }>
  color: string 
}> = {
  invoice_created: {
    icon: FileText,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  },
  invoice_sent: {
    icon: Send,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
  },
  invoice_paid: {
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400",
  },
  client_created: {
    icon: UserPlus,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  },
}
```

**Step 4.3.2: Create ActivityFeed Container Component**

```tsx
// app/frontend/components/dashboard/ActivityFeed.tsx
import { ActivityItem } from "./ActivityItem"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Activity, Clock } from "lucide-react"
import type { RecentActivity } from "@/lib/types"

interface ActivityFeedProps {
  activities: RecentActivity[]
  /** Maximum number of activities to display */
  limit?: number
}

/**
 * ActivityFeed — Dashboard section showing recent activity
 * 
 * Features:
 * - Section header with activity icon
 * - Timeline-style layout with connecting lines
 * - Staggered animation on items
 * - Empty state if no activities
 */
export function ActivityFeed({ activities, limit = 5 }: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, limit)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-slate-400" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {displayedActivities.length > 0 ? (
          <div className="space-y-4">
            {displayedActivities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isLast={index === displayedActivities.length - 1}
                animationDelay={index * 50}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  )
}

/**
 * EmptyState — Displayed when there are no activities
 */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Clock className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
        No activity yet
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Your recent actions will appear here
      </p>
    </div>
  )
}
```

**Step 4.3.3: Update Dashboard Components Index**

```tsx
// app/frontend/components/dashboard/index.ts
export { MetricCard } from './MetricCard'
export { RecentInvoiceCard } from './RecentInvoiceCard'
export { RecentInvoices } from './RecentInvoices'
export { ActivityItem } from './ActivityItem'
export { ActivityFeed } from './ActivityFeed'
```

---

## Phase 5: Dashboard Page Integration

### 5.1 Phase Objectives
- Integrate all components into complete Dashboard
- Wire up mock data correctly
- Implement responsive grid layout
- Add "New Invoice" primary action

### 5.2 Phase Checklist

```markdown
## Phase 5 Checklist
- [ ] Import all dashboard components
- [ ] Wire PageHeader with dynamic date
- [ ] Wire MetricCard grid with mock data
- [ ] Wire RecentInvoices with mock invoices
- [ ] Wire ActivityFeed with mock activities
- [ ] Verify responsive grid behavior
- [ ] Add New Invoice button functionality
```

### 5.3 Implementation

**Step 5.3.1: Create Complete Dashboard Page**

```tsx
// app/frontend/pages/Dashboard.tsx
import { Link } from "@inertiajs/react"
import { AppLayout } from "@/layouts/AppLayout"
import { PageHeader } from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { 
  MetricCard, 
  RecentInvoices, 
  ActivityFeed 
} from "@/components/dashboard"
import { 
  mockDashboardMetrics, 
  mockInvoices, 
  mockRecentActivity 
} from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { 
  Plus, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  AlertTriangle 
} from "lucide-react"

/**
 * Dashboard Page — Financial pulse and quick actions
 * 
 * Layout (v4.2):
 * - PageHeader with date and "New Invoice" CTA
 * - Metrics Grid: 4 columns desktop, 2 tablet, 1 mobile
 * - Two-column layout: Recent Invoices | Activity Feed
 */
export default function Dashboard() {
  // Format today's date
  const today = new Date().toLocaleDateString('en-SG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Sort invoices by date (most recent first) for display
  const recentInvoices = [...mockInvoices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Count invoices by status for subtext
  const pendingCount = mockInvoices.filter(inv => inv.status === 'pending').length
  const overdueCount = mockInvoices.filter(inv => inv.status === 'overdue').length
  const outstandingCount = pendingCount + overdueCount

  return (
    <AppLayout>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        subtitle={today}
        actions={
          <Button asChild>
            <Link href="/invoices/new">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Link>
          </Button>
        }
      />

      {/* Metrics Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Outstanding */}
        <MetricCard
          label="Outstanding"
          value={formatCurrency(mockDashboardMetrics.totalOutstanding)}
          subtext={`${outstandingCount} invoice${outstandingCount !== 1 ? 's' : ''}`}
          icon={DollarSign}
        />

        {/* Paid This Month */}
        <MetricCard
          label="Paid (Month)"
          value={formatCurrency(mockDashboardMetrics.totalPaidThisMonth)}
          trend={{
            value: "12%",
            direction: "up",
            positive: true,
          }}
          icon={TrendingUp}
        />

        {/* Paid YTD */}
        <MetricCard
          label="Paid (YTD)"
          value={formatCurrency(mockDashboardMetrics.totalPaidYTD)}
          icon={DollarSign}
          variant="success"
        />

        {/* Overdue */}
        <MetricCard
          label="Overdue"
          value={formatCurrency(mockDashboardMetrics.overdueAmount)}
          subtext={`${mockDashboardMetrics.overdueCount} invoice${mockDashboardMetrics.overdueCount !== 1 ? 's' : ''}`}
          variant="danger"
          icon={AlertTriangle}
        />
      </div>

      {/* Two Column Layout: Recent Invoices | Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Invoices */}
        <RecentInvoices invoices={recentInvoices} limit={4} />

        {/* Activity Feed */}
        <ActivityFeed activities={mockRecentActivity} limit={5} />
      </div>
    </AppLayout>
  )
}
```

---

## Phase 6: Staggered Animations

### 6.1 Phase Objectives
- Add smooth entrance animations to list items
- Implement CSS keyframes for staggered effects
- Add hover micro-interactions

### 6.2 Phase Checklist

```markdown
## Phase 6 Checklist
- [ ] Define fadeInUp keyframe animation
- [ ] Apply to RecentInvoiceCard
- [ ] Apply to ActivityItem
- [ ] Verify animation timing feels premium
- [ ] Ensure animations respect reduced-motion preference
```

### 6.3 Implementation

**Step 6.3.1: Add Animation Keyframes to CSS**

```css
/* app/assets/stylesheets/application.css — Add to existing file */

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATIONS — Staggered list entrances for premium feel
   ═══════════════════════════════════════════════════════════════════════════ */

@layer utilities {
  /* Fade in from below animation */
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
    opacity: 0;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in-up {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
}
```

**Step 6.3.2: Update RecentInvoiceCard with Animation**

```tsx
// app/frontend/components/dashboard/RecentInvoiceCard.tsx
// Update the component to include the animation class

import { Link } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/shared/StatusBadge"
import type { Invoice } from "@/lib/types"
import { ChevronRight } from "lucide-react"

interface RecentInvoiceCardProps {
  invoice: Invoice
  /** Animation delay index (multiplied by 50ms) */
  index?: number
  className?: string
}

/**
 * RecentInvoiceCard — Compact invoice display for dashboard
 * Updated with staggered animation support
 */
export function RecentInvoiceCard({
  invoice,
  index = 0,
  className,
}: RecentInvoiceCardProps) {
  return (
    <Link
      href={`/invoices/${invoice.id}/edit`}
      className={cn(
        // Animation
        "animate-fade-in-up",
        // Surface styling
        "block bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "rounded-lg p-4",
        // Hover state — border color change (v4.2: no movement)
        "transition-colors duration-150",
        "hover:border-slate-300 dark:hover:border-slate-700",
        // Focus state
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "dark:focus:ring-offset-slate-950",
        // Group for hover effects
        "group",
        className
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Invoice details */}
        <div className="min-w-0 flex-1">
          {/* Invoice Number — Prominent, monospace */}
          <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
            #{invoice.invoiceNumber}
          </p>
          
          {/* Client Name */}
          <p className="text-sm text-slate-600 dark:text-slate-400 truncate mt-0.5">
            {invoice.client?.name || 'Unknown Client'}
          </p>
        </div>

        {/* Right: Amount, Status, Chevron */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Amount */}
          <div className="text-right hidden sm:block">
            <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
              {formatCurrency(invoice.total || 0)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Due {formatDate(invoice.dueDate, { month: 'short', day: 'numeric' })}
            </p>
          </div>

          {/* Mobile: Just show amount */}
          <p className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50 sm:hidden">
            {formatCurrency(invoice.total || 0)}
          </p>

          {/* Status Badge */}
          <StatusBadge status={invoice.status} />

          {/* Chevron — Appears on hover */}
          <ChevronRight 
            className={cn(
              "h-4 w-4 text-slate-400",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-150",
              "hidden sm:block"
            )} 
          />
        </div>
      </div>
    </Link>
  )
}
```

**Step 6.3.3: Update RecentInvoices to Pass Index**

```tsx
// app/frontend/components/dashboard/RecentInvoices.tsx
// Update the map to pass index

import { Link } from "@inertiajs/react"
import { RecentInvoiceCard } from "./RecentInvoiceCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ArrowRight } from "lucide-react"
import type { Invoice } from "@/lib/types"

interface RecentInvoicesProps {
  invoices: Invoice[]
  limit?: number
}

export function RecentInvoices({ invoices, limit = 5 }: RecentInvoicesProps) {
  const displayedInvoices = invoices.slice(0, limit)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-400" />
          Recent Invoices
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/invoices" className="gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {displayedInvoices.length > 0 ? (
          displayedInvoices.map((invoice, index) => (
            <RecentInvoiceCard
              key={invoice.id}
              invoice={invoice}
              index={index}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
        No invoices yet
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Create your first invoice to get started
      </p>
      <Button size="sm" className="mt-4" asChild>
        <Link href="/invoices/new">Create Invoice</Link>
      </Button>
    </div>
  )
}
```

**Step 6.3.4: Update ActivityItem with Animation**

```tsx
// app/frontend/components/dashboard/ActivityItem.tsx
// Update to include animation class

import { cn } from "@/lib/utils"
import { getRelativeTime } from "@/lib/utils"
import type { RecentActivity, ActivityType } from "@/lib/types"
import { 
  FileText, 
  Send, 
  CheckCircle, 
  UserPlus 
} from "lucide-react"

interface ActivityItemProps {
  activity: RecentActivity
  isLast?: boolean
  index?: number
}

export function ActivityItem({ 
  activity, 
  isLast = false,
  index = 0
}: ActivityItemProps) {
  const { icon: Icon, color } = activityConfig[activity.type]

  return (
    <div 
      className={cn(
        "relative flex gap-4",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Timeline connector line */}
      {!isLast && (
        <div 
          className={cn(
            "absolute left-[15px] top-8 w-px h-[calc(100%+8px)]",
            "bg-slate-200 dark:bg-slate-700"
          )} 
        />
      )}

      {/* Icon Container */}
      <div
        className={cn(
          "relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
          color
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-0.5">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {activity.description}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {getRelativeTime(activity.timestamp)}
        </p>
      </div>
    </div>
  )
}

const activityConfig: Record<ActivityType, { 
  icon: React.ComponentType<{ className?: string }>
  color: string 
}> = {
  invoice_created: {
    icon: FileText,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  },
  invoice_sent: {
    icon: Send,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
  },
  invoice_paid: {
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400",
  },
  client_created: {
    icon: UserPlus,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
  },
}
```

**Step 6.3.5: Update ActivityFeed to Pass Index**

```tsx
// app/frontend/components/dashboard/ActivityFeed.tsx

import { ActivityItem } from "./ActivityItem"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Activity, Clock } from "lucide-react"
import type { RecentActivity } from "@/lib/types"

interface ActivityFeedProps {
  activities: RecentActivity[]
  limit?: number
}

export function ActivityFeed({ activities, limit = 5 }: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, limit)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-slate-400" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {displayedActivities.length > 0 ? (
          <div className="space-y-4">
            {displayedActivities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isLast={index === displayedActivities.length - 1}
                index={index}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Clock className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
        No activity yet
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Your recent actions will appear here
      </p>
    </div>
  )
}
```

---

## Phase 7: Validation & QA

### 7.1 Validation Checklist

```markdown
## Day 2 Final Validation Checklist

### Page Header
- [ ] Title "Dashboard" uses font-display text-4xl tracking-tight
- [ ] Date subtitle displays correctly
- [ ] "New Invoice" button positioned right on desktop
- [ ] Header stacks vertically on mobile

### Metrics Grid
- [ ] 4 columns on desktop (lg:grid-cols-4)
- [ ] 2 columns on tablet (sm:grid-cols-2)
- [ ] 1 column on mobile (grid-cols-1)
- [ ] All 4 metrics display with correct data
- [ ] Outstanding: S$7,280.00, "2 invoices"
- [ ] Paid (Month): S$8,000.00 with up trend
- [ ] Paid (YTD): S$56,150.00 in success green
- [ ] Overdue: S$1,200.00 in danger red

### MetricCard Component
- [ ] Label: uppercase, tracking-wide, text-xs
- [ ] Value: font-mono, text-3xl
- [ ] Subtext: text-sm, slate-500
- [ ] Icon positioned top-right
- [ ] Danger variant shows rose color
- [ ] Success variant shows emerald color

### Recent Invoices
- [ ] Card header shows "Recent Invoices" with icon
- [ ] "View All" button links to /invoices
- [ ] 4 invoices displayed (as per limit)
- [ ] Each invoice shows: #number, client, amount, due date, status
- [ ] StatusBadge displays correct variant per status
- [ ] Draft badge has dashed border
- [ ] Cards have hover border color change
- [ ] Chevron appears on hover (desktop)
- [ ] Staggered animation on page load

### Activity Feed
- [ ] Card header shows "Recent Activity" with icon
- [ ] Timeline vertical line connects items
- [ ] Each activity has colored icon circle
- [ ] Correct icons per activity type
- [ ] Relative timestamps display ("X hours ago")
- [ ] Staggered animation on page load

### Status Badges
- [ ] Draft: slate colors, dashed border
- [ ] Pending: amber colors, solid border
- [ ] Paid: emerald colors, solid border
- [ ] Overdue: rose colors, solid border

### Responsive Behavior
- [ ] No horizontal scroll at 375px
- [ ] Metrics stack appropriately
- [ ] Two-column layout stacks on mobile
- [ ] Touch targets are adequate size

### Accessibility
- [ ] All links are keyboard accessible
- [ ] Focus rings visible on interactive elements
- [ ] Status badges have sr-only descriptions
- [ ] Reduced motion preference respected

### Dark Mode
- [ ] All cards use bg-slate-900
- [ ] Canvas remains bg-slate-950
- [ ] Text colors invert correctly
- [ ] Status badge colors adapt
- [ ] Activity icons colors adapt
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

### 2. Dashboard Data Verification
1. Open http://localhost:3000/dashboard
2. Verify all 4 metric cards show correct values:
   - Outstanding: S$7,280.00
   - Paid (Month): S$8,000.00
   - Paid (YTD): S$56,150.00
   - Overdue: S$1,200.00
3. Verify Recent Invoices shows 4 entries
4. Verify Activity Feed shows 4 entries

### 3. Animation Testing
1. Refresh the page
2. Watch for staggered fade-in on invoice cards
3. Watch for staggered fade-in on activity items
4. Verify animations feel smooth (not jarring)

### 4. Interaction Testing
1. Hover over each invoice card
2. Verify border color changes
3. Verify chevron appears (desktop)
4. Click an invoice card
5. Verify navigation occurs (will 404 for now - that's OK)
6. Click "View All" in Recent Invoices
7. Verify navigation to /invoices
8. Click "New Invoice" button
9. Verify navigation to /invoices/new (will 404 - OK)

### 5. Status Badge Testing
1. Find a Draft invoice (2025-0002)
2. Verify badge has dashed border
3. Find a Pending invoice (2025-0001)
4. Verify badge has amber colors
5. Find a Paid invoice (2024-0012)
6. Verify badge has emerald colors
7. Find an Overdue invoice (2024-0010)
8. Verify badge has rose colors

### 6. Responsive Testing
1. Open Chrome DevTools
2. Set viewport to 375px (mobile)
3. Verify:
   - Metrics stack in single column
   - Two-column layout stacks
   - Invoice cards remain readable
   - Amount/date may be simplified
4. Set viewport to 768px (tablet)
5. Verify:
   - Metrics show 2 columns
   - Two-column layout may stack
6. Set viewport to 1280px (desktop)
7. Verify:
   - Metrics show 4 columns
   - Two-column layout side by side

### 7. Dark Mode Testing
1. Click theme toggle (or ensure dark mode)
2. Verify:
   - Canvas is very dark (slate-950)
   - Cards are slightly lighter (slate-900)
   - All text readable
   - Status badges adapt colors
   - Activity icons adapt colors
3. Refresh page
4. Verify dark mode persists

### 8. Accessibility Testing
1. Tab through the page
2. Verify focus rings on all interactive elements
3. Use screen reader (or browser a11y tools)
4. Verify status badges announce their meaning
5. Open DevTools > Rendering > Emulate prefers-reduced-motion
6. Verify animations are disabled
```

---

## File Structure Summary (Day 2 Complete)

```
app/frontend/
├── components/
│   ├── dashboard/
│   │   ├── index.ts                  # NEW
│   │   ├── MetricCard.tsx            # NEW
│   │   ├── RecentInvoiceCard.tsx     # NEW
│   │   ├── RecentInvoices.tsx        # NEW
│   │   ├── ActivityItem.tsx          # NEW
│   │   └── ActivityFeed.tsx          # NEW
│   ├── layout/
│   │   ├── index.ts
│   │   ├── Logo.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── NavItem.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   ├── shared/
│   │   ├── index.ts                  # NEW
│   │   ├── PageHeader.tsx            # NEW
│   │   └── StatusBadge.tsx           # NEW
│   └── ui/
│       ├── index.ts                  # UPDATED
│       ├── button.tsx
│       ├── card.tsx                  # NEW
│       ├── separator.tsx
│       ├── sheet.tsx
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
│   ├── Dashboard.tsx                 # UPDATED
│   ├── Clients/
│   │   └── Index.tsx
│   └── Invoices/
│       └── Index.tsx
└── entrypoints/
    ├── inertia.tsx
    └── application.css
```

---

## Complete CSS File (Updated with Animations)

```css
/* app/assets/stylesheets/application.css — Complete Day 2 Version */

/* ═══════════════════════════════════════════════════════════════════════════
   INVOICEFORGE DESIGN SYSTEM — v4.2 Neo-Editorial Precision
   ═══════════════════════════════════════════════════════════════════════════ */

@import "tailwindcss";

/* ═══════════════════════════════════════════════════════════════════════════
   THEME TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */

@theme {
  /* ─────────────────────────────────────────────────────────────────────────
     TYPOGRAPHY
     ───────────────────────────────────────────────────────────────────────── */
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  /* ─────────────────────────────────────────────────────────────────────────
     PRIMARY ACTION COLORS
     ───────────────────────────────────────────────────────────────────────── */
  --color-accent: var(--color-blue-500);
  --color-accent-hover: var(--color-blue-600);
  --color-accent-subtle: var(--color-blue-50);

  /* ─────────────────────────────────────────────────────────────────────────
     STATUS COLORS
     ───────────────────────────────────────────────────────────────────────── */
  --color-status-draft: var(--color-slate-400);
  --color-status-pending: var(--color-amber-500);
  --color-status-paid: var(--color-emerald-500);
  --color-status-overdue: var(--color-rose-500);

  /* ─────────────────────────────────────────────────────────────────────────
     BRUTALIST SHADOWS
     ───────────────────────────────────────────────────────────────────────── */
  --shadow-brutal: 4px 4px 0px 0px var(--color-slate-900);
  --shadow-brutal-sm: 2px 2px 0px 0px var(--color-slate-900);
}

/* ═══════════════════════════════════════════════════════════════════════════
   DARK MODE SHADOW OVERRIDES
   ═══════════════════════════════════════════════════════════════════════════ */

.dark {
  --shadow-brutal: 4px 4px 0px 0px var(--color-slate-100);
  --shadow-brutal-sm: 2px 2px 0px 0px var(--color-slate-100);
}

/* ═══════════════════════════════════════════════════════════════════════════
   BASE STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

@layer base {
  html {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    @apply transition-colors duration-200;
  }

  html.no-transitions * {
    transition: none !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATIONS — Staggered list entrances for premium feel
   ═══════════════════════════════════════════════════════════════════════════ */

@layer utilities {
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
    opacity: 0;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in-up {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRINT STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

@media print {
  .no-print,
  nav,
  footer,
  button,
  .sidebar {
    display: none !important;
  }

  body {
    background: white !important;
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .invoice-container {
    box-shadow: none !important;
    border: 1px solid #e2e8f0 !important;
    width: 100% !important;
    page-break-inside: avoid;
  }
}
```

---

## Day 2 Success Criteria

| Criterion | Validation Method | Status |
|-----------|-------------------|--------|
| PageHeader component works | Title, subtitle, actions render | ⬜ |
| StatusBadge shows all 4 states | Visual inspection of each state | ⬜ |
| MetricCard renders correctly | All 4 metrics with correct data | ⬜ |
| MetricCard variants work | Danger=red, Success=green | ⬜ |
| RecentInvoices shows invoices | 4 invoices with all details | ⬜ |
| Invoice cards are clickable | Navigation works | ⬜ |
| ActivityFeed shows timeline | Connecting lines visible | ⬜ |
| Activity icons are correct | Type-specific icons | ⬜ |
| Relative times display | "X hours ago" format | ⬜ |
| Staggered animations work | Items fade in sequentially | ⬜ |
| Responsive grid works | 4 → 2 → 1 columns | ⬜ |
| Dark mode works | All components adapt | ⬜ |
| Accessibility passes | Focus, SR text, reduced motion | ⬜ |

---

## Dashboard View Preview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌──────────┐                                                               │
│  │ INV      │                                              [Theme Toggle]   │
│  │ ─────    │  Dashboard          Clients          Invoices                │
│  │ FORGE    │                                                               │
│  └──────────┘                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Dashboard                                                 [+ New Invoice] │
│   Monday, 20 January 2025                                                   │
│                                                                             │
│   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌───────────┐ │
│   │ OUTSTANDING     │ │ PAID (MONTH)    │ │ PAID (YTD)      │ │ OVERDUE   │ │
│   │                 │ │                 │ │                 │ │           │ │
│   │ S$7,280.00      │ │ S$8,000.00      │ │ S$56,150.00     │ │ S$1,200.00│ │
│   │ 2 invoices      │ │ ↑ 12%           │ │                 │ │ 1 invoice │ │
│   └─────────────────┘ └─────────────────┘ └─────────────────┘ └───────────┘ │
│                                                                             │
│   ┌────────────────────────────────┐  ┌────────────────────────────────────┐│
│   │ 📄 Recent Invoices    View All │  │ ⚡ Recent Activity                  ││
│   │ ────────────────────────────── │  │ ────────────────────────────────── ││
│   │ ┌────────────────────────────┐ │  │ ┌──────────────────────────────┐   ││
│   │ │ #2025-0002   S$2,400.00    │ │  │ │ 📄 Invoice #2025-0002 created │   ││
│   │ │ Startup Labs    [Draft]    │ │  │ │    for Startup Labs          │   ││
│   │ └────────────────────────────┘ │  │ │    2 hours ago               │   ││
│   │ ┌────────────────────────────┐ │  │ └──────────────────────────────┘   ││
│   │ │ #2025-0001   S$6,080.00    │ │  │ ┌──────────────────────────────┐   ││
│   │ │ Acme Corp     [Pending]    │ │  │ │ ✉️ Invoice #2025-0001 sent    │   ││
│   │ └────────────────────────────┘ │  │ │    to Acme Corporation       │   ││
│   │ ┌────────────────────────────┐ │  │ │    5 days ago                │   ││
│   │ │ #2024-0012   S$8,000.00    │ │  │ └──────────────────────────────┘   ││
│   │ │ Global        [Paid]       │ │  │ ┌──────────────────────────────┐   ││
│   │ └────────────────────────────┘ │  │ │ ✅ Invoice #2024-0012 paid   │   ││
│   │ ┌────────────────────────────┐ │  │ │    by Global Ventures        │   ││
│   │ │ #2024-0010   S$1,200.00    │ │  │ │    15 days ago               │   ││
│   │ │ Acme Corp    [Overdue]     │ │  │ └──────────────────────────────┘   ││
│   │ └────────────────────────────┘ │  │                                    ││
│   └────────────────────────────────┘  └────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Ready for Implementation

This comprehensive Day 2 plan includes:

1. ✅ **7 detailed phases** with clear objectives
2. ✅ **Complete code** for all new components
3. ✅ **v4.2 design tokens** strictly followed
4. ✅ **Staggered animations** for premium feel
5. ✅ **Accessibility** requirements met
6. ✅ **Validation checklists** for thorough QA

**All files are ready to be created. The Dashboard will be fully functional with:**
- 4 metric cards showing financial summary
- Recent invoices list with status badges
- Activity feed with timeline
- Responsive layout for all screen sizes
- Dark mode support
- Smooth staggered animations

Shall I proceed with creating these files, or would you like any adjustments to the implementation plan?
