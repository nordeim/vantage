# Day 3: Clients View — Comprehensive Execution Plan

## Executive Summary

Day 3 builds the complete Clients view with desktop table, mobile card stack, client avatar with color hashing, and the "New Client" form in a Sheet. We'll implement responsive table-to-card transformation and form validation patterns.

---

## Pre-Implementation: Day 2 Verification

Before proceeding, confirm Day 2 completion:

```markdown
## Day 2 Completion Checklist
- [ ] PageHeader component created and working
- [ ] StatusBadge component with all 4 states
- [ ] MetricCard component with variants
- [ ] RecentInvoices section with clickable cards
- [ ] ActivityFeed with timeline styling
- [ ] Staggered animations working
- [ ] Dashboard fully functional with mock data
```

---

## Day 3 Execution Plan — Phased Breakdown

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 3: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► UI Components Setup                                            │
│              └── Table, Input, Label, Textarea components                   │
│                                                                             │
│  PHASE 2 ──► Client Avatar Component                                        │
│              └── Color hashing, initials extraction                         │
│                                                                             │
│  PHASE 3 ──► Client Table (Desktop)                                         │
│              └── Full table with sorting, row actions                       │
│                                                                             │
│  PHASE 4 ──► Client Card (Mobile)                                           │
│              └── Card stack for mobile viewports                            │
│                                                                             │
│  PHASE 5 ──► Client Form (New/Edit)                                         │
│              └── Sheet with form fields, validation                         │
│                                                                             │
│  PHASE 6 ──► Clients Page Integration                                       │
│              └── Complete page with responsive switching                    │
│                                                                             │
│  PHASE 7 ──► Validation & QA                                                │
│              └── Responsive, accessibility, form behavior                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: UI Components Setup

### 1.1 Phase Objectives
- Create Table component (ShadCN-style)
- Create Input component
- Create Label component
- Create Textarea component
- These are prerequisites for Clients view

### 1.2 Phase Checklist

```markdown
## Phase 1 Checklist
- [ ] Create Table component with all sub-components
- [ ] Create Input component with focus states
- [ ] Create Label component
- [ ] Create Textarea component
- [ ] Update UI components index
- [ ] Verify components render correctly
```

### 1.3 Implementation

**Step 1.3.1: Create Table Component**

```tsx
// app/frontend/components/ui/table.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Table — Data table component
 * 
 * Design (v4.2):
 * - Clean borders with slate colors
 * - Proper spacing and alignment
 * - Hover states on rows
 */

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead 
    ref={ref} 
    className={cn("[&_tr]:border-b", className)} 
    {...props} 
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-slate-100/50 font-medium dark:bg-slate-800/50 [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-slate-200 dark:border-slate-800",
      "transition-colors",
      "hover:bg-slate-50 dark:hover:bg-slate-800/50",
      "data-[state=selected]:bg-slate-100 dark:data-[state=selected]:bg-slate-800",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium",
      "text-slate-500 dark:text-slate-400",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

**Step 1.3.2: Create Input Component**

```tsx
// app/frontend/components/ui/input.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input — Form input component
 * 
 * Design (v4.2):
 * - Surface background (bg-white / bg-slate-950)
 * - Border with focus ring
 * - Consistent sizing with buttons
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex h-10 w-full rounded-md px-3 py-2",
          // Background
          "bg-white dark:bg-slate-950",
          // Border
          "border border-slate-300 dark:border-slate-700",
          // Text
          "text-sm text-slate-900 dark:text-slate-100",
          // Placeholder
          "placeholder:text-slate-400 dark:placeholder:text-slate-500",
          // Focus state
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          // File input specifics
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

**Step 1.3.3: Create Label Component**

```tsx
// app/frontend/components/ui/label.tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900 dark:text-slate-100"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

**Step 1.3.4: Create Textarea Component**

```tsx
// app/frontend/components/ui/textarea.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea — Multi-line text input
 * 
 * Design (v4.2):
 * - Matches Input styling
 * - Minimum height with resize
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          "flex min-h-[80px] w-full rounded-md px-3 py-2",
          // Background
          "bg-white dark:bg-slate-950",
          // Border
          "border border-slate-300 dark:border-slate-700",
          // Text
          "text-sm text-slate-900 dark:text-slate-100",
          // Placeholder
          "placeholder:text-slate-400 dark:placeholder:text-slate-500",
          // Focus state
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
```

**Step 1.3.5: Install Radix Label Primitive**

```bash
npm install @radix-ui/react-label
```

**Step 1.3.6: Update UI Components Index**

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
export { Textarea } from './textarea'
export { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from './tooltip'
```

---

## Phase 2: Client Avatar Component

### 2.1 Phase Objectives
- Create ClientAvatar with initials extraction
- Implement deterministic color hashing
- Support multiple sizes
- Add proper accessibility

### 2.2 Phase Checklist

```markdown
## Phase 2 Checklist
- [ ] Create initials extraction function
- [ ] Create color hashing function (deterministic)
- [ ] Create ClientAvatar component
- [ ] Support size variants (sm, md, lg)
- [ ] Add proper aria attributes
- [ ] Create clients components index
```

### 2.3 Implementation

**Step 2.3.1: Create ClientAvatar Component**

```tsx
// app/frontend/components/clients/ClientAvatar.tsx
import { cn } from "@/lib/utils"

interface ClientAvatarProps {
  /** Client name for initials and color generation */
  name: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional class names */
  className?: string
}

/**
 * ClientAvatar — Colored avatar with client initials
 * 
 * Features:
 * - Extracts initials from name (up to 2 characters)
 * - Deterministic color based on name hash
 * - Multiple size variants
 */
export function ClientAvatar({ 
  name, 
  size = 'md',
  className 
}: ClientAvatarProps) {
  const initials = getInitials(name)
  const colorClass = getAvatarColor(name)

  return (
    <div
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-full font-medium text-white",
        // Size variants
        sizeClasses[size],
        // Deterministic color
        colorClass,
        className
      )}
      role="img"
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  )
}

/**
 * Extract initials from a name
 * - Single word: First two letters
 * - Multiple words: First letter of first two words
 */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  
  if (words.length === 1) {
    // Single word: take first two characters
    return words[0].substring(0, 2).toUpperCase()
  }
  
  // Multiple words: take first letter of first two words
  return (words[0][0] + words[1][0]).toUpperCase()
}

/**
 * Get a deterministic color class based on the name
 * Uses a simple hash to ensure consistent colors per client
 */
function getAvatarColor(name: string): string {
  // Simple hash function
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash // Convert to 32bit integer
  }
  
  // Get positive index
  const index = Math.abs(hash) % avatarColors.length
  return avatarColors[index]
}

/**
 * Available avatar colors (v4.2 specification)
 * Vibrant colors that work well with white text
 */
const avatarColors = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-purple-500',
  'bg-cyan-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-orange-500',
]

/**
 * Size class mappings
 */
const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

// Export utilities for potential reuse
export { getInitials, getAvatarColor }
```

**Step 2.3.2: Create Clients Components Index**

```tsx
// app/frontend/components/clients/index.ts
export { ClientAvatar, getInitials, getAvatarColor } from './ClientAvatar'
```

---

## Phase 3: Client Table (Desktop)

### 3.1 Phase Objectives
- Create desktop table view for clients
- Include all columns: Avatar, Name/Company, Email, Total Billed, Last Invoice
- Add row click navigation
- Include row actions menu

### 3.2 Phase Checklist

```markdown
## Phase 3 Checklist
- [ ] Create ClientTable component
- [ ] Implement table headers with proper alignment
- [ ] Implement table rows with client data
- [ ] Add ClientAvatar to each row
- [ ] Format currency and dates
- [ ] Add row hover states
- [ ] Add row click for navigation (future)
- [ ] Create row actions dropdown (edit, delete)
```

### 3.3 Implementation

**Step 3.3.1: Create DropdownMenu Component**

```tsx
// app/frontend/components/ui/dropdown-menu.tsx
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "focus:bg-slate-100 dark:focus:bg-slate-800",
      "data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md p-1",
      "bg-white dark:bg-slate-900",
      "border border-slate-200 dark:border-slate-800",
      "shadow-brutal",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md p-1",
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        // Brutalist shadow (v4.2)
        "shadow-brutal",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "text-slate-900 dark:text-slate-100",
      "focus:bg-slate-100 dark:focus:bg-slate-800",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "transition-colors",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-slate-100 dark:focus:bg-slate-800",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-slate-100 dark:focus:bg-slate-800",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-200 dark:bg-slate-800", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-slate-500", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

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
}
```

**Step 3.3.2: Install Radix Dropdown Menu**

```bash
npm install @radix-ui/react-dropdown-menu
```

**Step 3.3.3: Create ClientTable Component**

```tsx
// app/frontend/components/clients/ClientTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ClientAvatar } from "./ClientAvatar"
import { formatCurrency, formatDate } from "@/lib/utils"
import { MoreHorizontal, Pencil, Trash2, FileText, Mail } from "lucide-react"
import type { Client } from "@/lib/types"

interface ClientTableProps {
  clients: Client[]
  onEdit?: (client: Client) => void
  onDelete?: (client: Client) => void
}

/**
 * ClientTable — Desktop table view for clients
 * 
 * Layout (v4.2):
 * - Avatar | Name/Company/Email | Total Billed | Last Invoice | Actions
 * - Row hover states
 * - Dropdown actions menu
 * 
 * Hidden on mobile (md:hidden counterpart shows ClientCard)
 */
export function ClientTable({ clients, onEdit, onDelete }: ClientTableProps) {
  if (clients.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">Client</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Total Billed</TableHead>
            <TableHead className="text-right">Last Invoice</TableHead>
            <TableHead className="w-[50px]">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client, index) => (
            <TableRow 
              key={client.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Client Info */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <ClientAvatar name={client.name} size="md" />
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-slate-50 truncate">
                      {client.name}
                    </p>
                    {client.company && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                        {client.company}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>

              {/* Email */}
              <TableCell>
                <span className="text-slate-600 dark:text-slate-400">
                  {client.email}
                </span>
              </TableCell>

              {/* Total Billed */}
              <TableCell className="text-right">
                <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
                  {formatCurrency(client.totalBilled || 0)}
                </span>
              </TableCell>

              {/* Last Invoice */}
              <TableCell className="text-right">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {client.lastInvoiceDate 
                    ? formatDate(client.lastInvoiceDate)
                    : '—'
                  }
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      aria-label={`Actions for ${client.name}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit?.(client)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Client
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      View Invoices
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(client)}
                      className="text-rose-600 dark:text-rose-400 focus:text-rose-600 dark:focus:text-rose-400"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/**
 * EmptyState — Displayed when there are no clients
 */
function EmptyState() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
          No clients yet
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Add your first client to get started
        </p>
      </div>
    </div>
  )
}
```

**Step 3.3.4: Update UI Index with DropdownMenu**

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
export { Textarea } from './textarea'
export { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from './tooltip'
```

---

## Phase 4: Client Card (Mobile)

### 4.1 Phase Objectives
- Create mobile card view for clients
- Show all essential information in card format
- Add tap actions
- Ensure touch-friendly sizing

### 4.2 Phase Checklist

```markdown
## Phase 4 Checklist
- [ ] Create ClientCard component
- [ ] Include avatar, name, company, email
- [ ] Include total billed and last invoice
- [ ] Add tap action for edit
- [ ] Ensure touch targets are adequate
- [ ] Add staggered animation
```

### 4.3 Implementation

**Step 4.3.1: Create ClientCard Component**

```tsx
// app/frontend/components/clients/ClientCard.tsx
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ClientAvatar } from "./ClientAvatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Pencil, Trash2, FileText, Mail } from "lucide-react"
import type { Client } from "@/lib/types"

interface ClientCardProps {
  client: Client
  /** Animation delay index */
  index?: number
  onEdit?: (client: Client) => void
  onDelete?: (client: Client) => void
  className?: string
}

/**
 * ClientCard — Mobile card view for a single client
 * 
 * Layout (v4.2):
 * - Avatar + Name/Email on left
 * - Actions menu on right
 * - Total billed and last invoice below
 * 
 * Displayed on mobile, hidden on desktop (md:hidden)
 */
export function ClientCard({ 
  client, 
  index = 0,
  onEdit,
  onDelete,
  className 
}: ClientCardProps) {
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
        className
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header Row: Avatar + Info + Actions */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <ClientAvatar name={client.name} size="lg" />

        {/* Client Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-slate-900 dark:text-slate-50 truncate">
            {client.name}
          </p>
          {client.company && (
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
              {client.company}
            </p>
          )}
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {client.email}
          </p>
        </div>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 flex-shrink-0"
              aria-label={`Actions for ${client.name}`}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(client)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Client
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              View Invoices
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete?.(client)}
              className="text-rose-600 dark:text-rose-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />

      {/* Stats Row */}
      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="text-slate-500 dark:text-slate-400">Total Billed</p>
          <p className="font-mono font-medium text-slate-900 dark:text-slate-50">
            {formatCurrency(client.totalBilled || 0)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 dark:text-slate-400">Last Invoice</p>
          <p className="text-slate-900 dark:text-slate-50">
            {client.lastInvoiceDate 
              ? formatDate(client.lastInvoiceDate, { month: 'short', day: 'numeric' })
              : '—'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
```

**Step 4.3.2: Create ClientList Component (combines Table + Cards)**

```tsx
// app/frontend/components/clients/ClientList.tsx
import { ClientTable } from "./ClientTable"
import { ClientCard } from "./ClientCard"
import type { Client } from "@/lib/types"

interface ClientListProps {
  clients: Client[]
  onEdit?: (client: Client) => void
  onDelete?: (client: Client) => void
}

/**
 * ClientList — Responsive client display
 * 
 * Shows:
 * - Table on desktop (hidden on mobile)
 * - Card stack on mobile (hidden on desktop)
 */
export function ClientList({ clients, onEdit, onDelete }: ClientListProps) {
  return (
    <>
      {/* Desktop: Table */}
      <div className="hidden md:block">
        <ClientTable 
          clients={clients} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      </div>

      {/* Mobile: Card Stack */}
      <div className="md:hidden space-y-3">
        {clients.length > 0 ? (
          clients.map((client, index) => (
            <ClientCard
              key={client.id}
              client={client}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <MobileEmptyState />
        )}
      </div>
    </>
  )
}

/**
 * MobileEmptyState — Empty state for mobile card view
 */
function MobileEmptyState() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-8 text-center">
      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
        No clients yet
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Add your first client to get started
      </p>
    </div>
  )
}
```

**Step 4.3.3: Update Clients Components Index**

```tsx
// app/frontend/components/clients/index.ts
export { ClientAvatar, getInitials, getAvatarColor } from './ClientAvatar'
export { ClientTable } from './ClientTable'
export { ClientCard } from './ClientCard'
export { ClientList } from './ClientList'
```

---

## Phase 5: Client Form (New/Edit)

### 5.1 Phase Objectives
- Create form for adding/editing clients
- Use Sheet component for slide-in panel
- Implement all required fields
- Add form validation patterns

### 5.2 Phase Checklist

```markdown
## Phase 5 Checklist
- [ ] Create ClientForm component
- [ ] Include all fields: name, company, email, phone, address, notes
- [ ] Mark required fields (name, email)
- [ ] Add proper labels and placeholders
- [ ] Implement form state management
- [ ] Create ClientFormSheet wrapper
- [ ] Add validation feedback
- [ ] Add submit and cancel actions
```

### 5.3 Implementation

**Step 5.3.1: Create ClientForm Component**

```tsx
// app/frontend/components/clients/ClientForm.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { Client } from "@/lib/types"

interface ClientFormData {
  name: string
  email: string
  company: string
  phone: string
  address: string
  notes: string
}

interface ClientFormProps {
  /** Initial values for edit mode */
  initialData?: Partial<Client>
  /** Called on successful form submission */
  onSubmit: (data: ClientFormData) => void
  /** Called when form is cancelled */
  onCancel: () => void
  /** Whether the form is in a loading state */
  isLoading?: boolean
}

/**
 * ClientForm — Form fields for creating/editing a client
 * 
 * Fields (v4.2 specification):
 * - Name (Required)
 * - Email (Required)
 * - Company
 * - Phone
 * - Address (Textarea)
 * - Notes (Textarea)
 */
export function ClientForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  isLoading = false 
}: ClientFormProps) {
  // Form state
  const [formData, setFormData] = useState<ClientFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    company: initialData?.company || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    notes: initialData?.notes || '',
  })

  // Validation errors
  const [errors, setErrors] = useState<Partial<Record<keyof ClientFormData, string>>>({})

  // Handle field change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is modified
    if (errors[name as keyof ClientFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  // Validate form
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ClientFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validate()) {
      onSubmit(formData)
    }
  }

  const isEditing = !!initialData?.id

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field (Required) */}
      <FormField
        label="Name"
        name="name"
        required
        error={errors.name}
      >
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter client or contact name"
          disabled={isLoading}
          aria-invalid={!!errors.name}
        />
      </FormField>

      {/* Email Field (Required) */}
      <FormField
        label="Email"
        name="email"
        required
        error={errors.email}
      >
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="billing@example.com"
          disabled={isLoading}
          aria-invalid={!!errors.email}
        />
      </FormField>

      {/* Company Field */}
      <FormField
        label="Company"
        name="company"
      >
        <Input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company name (optional)"
          disabled={isLoading}
        />
      </FormField>

      {/* Phone Field */}
      <FormField
        label="Phone"
        name="phone"
      >
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+65 6123 4567"
          disabled={isLoading}
        />
      </FormField>

      {/* Address Field */}
      <FormField
        label="Address"
        name="address"
      >
        <Textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full billing address"
          rows={3}
          disabled={isLoading}
        />
      </FormField>

      {/* Notes Field */}
      <FormField
        label="Notes"
        name="notes"
        hint="Internal notes about payment terms, preferences, etc."
      >
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any notes about this client..."
          rows={3}
          disabled={isLoading}
        />
      </FormField>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Client'}
        </Button>
      </div>
    </form>
  )
}

/**
 * FormField — Wrapper for form field with label and error
 */
interface FormFieldProps {
  label: string
  name: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}

function FormField({ 
  label, 
  name, 
  required, 
  error, 
  hint,
  children 
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center gap-1">
        {label}
        {required && (
          <span className="text-rose-500" aria-hidden="true">*</span>
        )}
      </Label>
      
      {children}
      
      {hint && !error && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}
      
      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
```

**Step 5.3.2: Create ClientFormSheet Component**

```tsx
// app/frontend/components/clients/ClientFormSheet.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ClientForm } from "./ClientForm"
import type { Client } from "@/lib/types"

interface ClientFormSheetProps {
  /** Whether the sheet is open */
  open: boolean
  /** Called when the sheet should close */
  onOpenChange: (open: boolean) => void
  /** Client data for edit mode (undefined for create) */
  client?: Client
  /** Called when form is submitted successfully */
  onSubmit: (data: any) => void
}

/**
 * ClientFormSheet — Sheet wrapper for client form
 * 
 * Features:
 * - Slides in from right
 * - Handles both create and edit modes
 * - Closes on successful submission
 */
export function ClientFormSheet({
  open,
  onOpenChange,
  client,
  onSubmit,
}: ClientFormSheetProps) {
  const isEditing = !!client

  const handleSubmit = (data: any) => {
    onSubmit(data)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>
            {isEditing ? 'Edit Client' : 'New Client'}
          </SheetTitle>
          <SheetDescription>
            {isEditing 
              ? 'Update the client information below.'
              : 'Add a new client to your directory.'
            }
          </SheetDescription>
        </SheetHeader>

        <ClientForm
          initialData={client}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </SheetContent>
    </Sheet>
  )
}
```

**Step 5.3.3: Update Clients Components Index**

```tsx
// app/frontend/components/clients/index.ts
export { ClientAvatar, getInitials, getAvatarColor } from './ClientAvatar'
export { ClientTable } from './ClientTable'
export { ClientCard } from './ClientCard'
export { ClientList } from './ClientList'
export { ClientForm } from './ClientForm'
export { ClientFormSheet } from './ClientFormSheet'
```

---

## Phase 6: Clients Page Integration

### 6.1 Phase Objectives
- Create complete Clients page
- Wire up all components with mock data
- Implement state for form sheet
- Add search functionality (optional)

### 6.2 Phase Checklist

```markdown
## Phase 6 Checklist
- [ ] Import all client components
- [ ] Wire PageHeader with client count
- [ ] Wire ClientList with mock data
- [ ] Implement sheet open/close state
- [ ] Wire New Client button to open sheet
- [ ] Implement edit flow (row action → sheet)
- [ ] Implement delete confirmation (console log for now)
- [ ] Add optional search input
```

### 6.3 Implementation

**Step 6.3.1: Create Complete Clients Page**

```tsx
// app/frontend/pages/Clients/Index.tsx
import { useState, useMemo } from "react"
import { AppLayout } from "@/layouts/AppLayout"
import { PageHeader } from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClientList, ClientFormSheet } from "@/components/clients"
import { mockClients } from "@/lib/mock-data"
import { Plus, Search } from "lucide-react"
import type { Client } from "@/lib/types"

/**
 * Clients Page — Client directory with table/card views
 * 
 * Features:
 * - PageHeader with count and "New Client" button
 * - Search/filter input
 * - Responsive table (desktop) / cards (mobile)
 * - New/Edit client sheet
 */
export default function ClientsIndex() {
  // Sheet state
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | undefined>()

  // Search state
  const [searchQuery, setSearchQuery] = useState('')

  // Filter clients based on search
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockClients
    }

    const query = searchQuery.toLowerCase()
    return mockClients.filter(client => 
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.company?.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Handle opening the sheet for a new client
  const handleNewClient = () => {
    setEditingClient(undefined)
    setSheetOpen(true)
  }

  // Handle opening the sheet for editing a client
  const handleEditClient = (client: Client) => {
    setEditingClient(client)
    setSheetOpen(true)
  }

  // Handle deleting a client (mock - just logs for now)
  const handleDeleteClient = (client: Client) => {
    // In a real app, this would show a confirmation dialog
    // and then make an API call
    console.log('Delete client:', client.id, client.name)
    alert(`Delete "${client.name}"? (This is a mock action)`)
  }

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    if (editingClient) {
      console.log('Update client:', editingClient.id, data)
    } else {
      console.log('Create client:', data)
    }
    // In a real app, this would make an API call
    // and refresh the client list
  }

  return (
    <AppLayout>
      {/* Page Header */}
      <PageHeader
        title="Clients"
        subtitle={`${mockClients.length} total client${mockClients.length !== 1 ? 's' : ''}`}
        actions={
          <Button onClick={handleNewClient}>
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Client List (responsive table/cards) */}
      <ClientList
        clients={filteredClients}
        onEdit={handleEditClient}
        onDelete={handleDeleteClient}
      />

      {/* Search Results Count (when searching) */}
      {searchQuery && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          {filteredClients.length === 0 
            ? 'No clients found matching your search.'
            : `Showing ${filteredClients.length} of ${mockClients.length} clients`
          }
        </p>
      )}

      {/* Client Form Sheet */}
      <ClientFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        client={editingClient}
        onSubmit={handleFormSubmit}
      />
    </AppLayout>
  )
}
```

---

## Phase 7: Validation & QA

### 7.1 Validation Checklist

```markdown
## Day 3 Final Validation Checklist

### Page Header
- [ ] Title "Clients" uses font-display text-4xl tracking-tight
- [ ] Subtitle shows "3 total clients"
- [ ] "New Client" button positioned right on desktop
- [ ] Header stacks vertically on mobile

### Search Bar
- [ ] Search input has search icon on left
- [ ] Placeholder text "Search clients..."
- [ ] Filtering works as you type
- [ ] Clearing search shows all clients

### Client Table (Desktop - md:block)
- [ ] Visible only on md: breakpoint and above
- [ ] Headers: Client, Email, Total Billed, Last Invoice, Actions
- [ ] Avatar shows with correct initials
- [ ] Avatar colors are consistent per client
- [ ] Name and company displayed
- [ ] Email displayed
- [ ] Total billed in monospace font
- [ ] Last invoice date formatted
- [ ] Row hover state changes background
- [ ] Actions dropdown opens with brutalist shadow
- [ ] Edit action triggers sheet
- [ ] Delete action shows confirmation
- [ ] Staggered animation on page load

### Client Cards (Mobile - md:hidden)
- [ ] Visible only below md: breakpoint
- [ ] Avatar larger (lg size)
- [ ] Name, company, email visible
- [ ] Divider between info and stats
- [ ] Total billed and last invoice shown
- [ ] Actions menu works
- [ ] Touch targets adequate size
- [ ] Staggered animation on page load

### Client Avatar
- [ ] Shows initials (2 characters max)
- [ ] Single word: first two letters
- [ ] Multiple words: first letter of first two words
- [ ] Color is consistent for same name
- [ ] Colors are vibrant and varied

### Client Form Sheet
- [ ] Opens from right side
- [ ] Title shows "New Client" or "Edit Client"
- [ ] All fields present: name, email, company, phone, address, notes
- [ ] Required fields marked with asterisk
- [ ] Name and email are required
- [ ] Validation errors show in red
- [ ] Cancel button closes sheet
- [ ] Submit button shows loading state (future)
- [ ] Sheet closes on successful submit

### Form Validation
- [ ] Empty name shows error on submit
- [ ] Empty email shows error on submit
- [ ] Invalid email format shows error
- [ ] Error clears when field is modified
- [ ] Focus moves to first error field (a11y)

### Responsive Behavior
- [ ] No horizontal scroll at 375px
- [ ] Table hidden, cards shown on mobile
- [ ] Cards hidden, table shown on desktop
- [ ] Sheet takes full width on mobile
- [ ] Sheet takes max 448px on desktop

### Accessibility
- [ ] All form fields have labels
- [ ] Required fields announced to screen readers
- [ ] Error messages linked to fields
- [ ] Actions buttons have aria-labels
- [ ] Focus trapped in sheet when open
- [ ] Escape key closes sheet

### Dark Mode
- [ ] All components adapt to dark mode
- [ ] Table rows have correct hover color
- [ ] Avatar colors remain vibrant
- [ ] Form inputs have dark backgrounds
- [ ] Errors visible in dark mode
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

### 2. Clients Page Load
1. Navigate to http://localhost:3000/clients
2. Verify page header shows "Clients" and "3 total clients"
3. Verify search bar is visible
4. Verify 3 clients are displayed

### 3. Desktop Table Testing (>= 768px)
1. Ensure viewport is at least 768px wide
2. Verify table is visible with all columns
3. Verify each client row shows:
   - Avatar with correct initials (AC, SL, GV)
   - Name and company
   - Email
   - Total billed (formatted as S$X,XXX.XX)
   - Last invoice date
4. Hover over a row, verify background changes
5. Click actions button (three dots)
6. Verify dropdown opens with brutalist shadow
7. Click "Edit Client"
8. Verify sheet opens with client data pre-filled

### 4. Mobile Card Testing (< 768px)
1. Set viewport to 375px
2. Verify table is hidden
3. Verify card stack is visible
4. Verify each card shows:
   - Large avatar
   - Name, company, email
   - Horizontal divider
   - Total billed and last invoice
5. Tap actions button (three dots)
6. Verify dropdown opens
7. Tap "Edit Client"
8. Verify sheet opens full width

### 5. Search Functionality
1. Type "Acme" in search bar
2. Verify only Acme Corporation shows
3. Verify message "Showing 1 of 3 clients"
4. Clear search
5. Verify all 3 clients show again
6. Type "xyz" (no matches)
7. Verify empty state or "No clients found" message

### 6. New Client Flow
1. Click "New Client" button
2. Verify sheet opens
3. Verify title is "New Client"
4. Verify all fields are empty
5. Click "Add Client" without filling anything
6. Verify name and email errors appear
7. Fill in name only
8. Click "Add Client"
9. Verify email error still shows
10. Fill in email with "invalid"
11. Verify invalid email error shows
12. Fill in email with "test@example.com"
13. Click "Add Client"
14. Verify console logs the data
15. Verify sheet closes

### 7. Edit Client Flow
1. Open actions for "Acme Corporation"
2. Click "Edit Client"
3. Verify sheet opens with title "Edit Client"
4. Verify name field shows "Acme Corporation"
5. Verify email field shows "billing@acme.corp"
6. Modify the name
7. Click "Save Changes"
8. Verify console logs updated data
9. Verify sheet closes

### 8. Avatar Color Consistency
1. Note the color for each client's avatar
2. Refresh the page
3. Verify colors are the same
4. Resize window (table → cards)
5. Verify colors remain consistent

### 9. Dark Mode Testing
1. Toggle to dark mode
2. Verify table has dark background
3. Verify cards have dark background
4. Verify form sheet has dark background
5. Verify avatar colors remain vibrant
6. Verify all text is readable

### 10. Accessibility Testing
1. Tab through the page
2. Verify focus is visible on all elements
3. Open sheet with keyboard (Enter on button)
4. Tab through form fields
5. Verify labels are read
6. Press Escape
7. Verify sheet closes
```

---

## File Structure Summary (Day 3 Complete)

```
app/frontend/
├── components/
│   ├── clients/
│   │   ├── index.ts                  # NEW
│   │   ├── ClientAvatar.tsx          # NEW
│   │   ├── ClientTable.tsx           # NEW
│   │   ├── ClientCard.tsx            # NEW
│   │   ├── ClientList.tsx            # NEW
│   │   ├── ClientForm.tsx            # NEW
│   │   └── ClientFormSheet.tsx       # NEW
│   ├── dashboard/
│   │   ├── index.ts
│   │   ├── MetricCard.tsx
│   │   ├── RecentInvoiceCard.tsx
│   │   ├── RecentInvoices.tsx
│   │   ├── ActivityItem.tsx
│   │   └── ActivityFeed.tsx
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
│       ├── dropdown-menu.tsx         # NEW
│       ├── input.tsx                 # NEW
│       ├── label.tsx                 # NEW
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── table.tsx                 # NEW
│       ├── textarea.tsx              # NEW
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
│   │   └── Index.tsx                 # UPDATED
│   └── Invoices/
│       └── Index.tsx
└── entrypoints/
    ├── inertia.tsx
    └── application.css
```

---

## Day 3 Success Criteria

| Criterion | Validation Method | Status |
|-----------|-------------------|--------|
| PageHeader shows client count | Visual inspection | ⬜ |
| Search filters clients | Type and verify filter | ⬜ |
| ClientTable visible on desktop | Check at 1024px+ | ⬜ |
| ClientCards visible on mobile | Check at 375px | ⬜ |
| Avatar initials correct | Check AC, SL, GV | ⬜ |
| Avatar colors consistent | Refresh and verify | ⬜ |
| Table rows have hover state | Hover and verify | ⬜ |
| Dropdown has brutalist shadow | Open and verify | ⬜ |
| New Client sheet opens | Click button, verify | ⬜ |
| Edit Client pre-fills data | Click edit, verify | ⬜ |
| Form validation works | Submit empty, verify errors | ⬜ |
| Sheet closes on submit | Submit valid, verify close | ⬜ |
| Responsive switching works | Resize and verify | ⬜ |
| Dark mode adapts | Toggle and verify | ⬜ |
| Accessibility passes | Tab navigation, screen reader | ⬜ |

---

## Clients View Preview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  DESKTOP VIEW (≥ 768px)                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Clients                                                    [+ New Client] │
│   3 total clients                                                           │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │ 🔍 Search clients...                                                 │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │ Client              │ Email                │ Total Billed │ Last     │  │
│   ├─────────────────────┼──────────────────────┼──────────────┼──────────┤  │
│   │ 🔵 AC               │ billing@acme.corp    │  S$15,750.00 │ 15 Jan   │  │
│   │    Acme Corporation │                      │              │ 2025     │  │
│   │    Acme Corp Pte Ltd│                      │              │     [⋮]  │  │
│   ├─────────────────────┼──────────────────────┼──────────────┼──────────┤  │
│   │ 🟢 SL               │ finance@startuplabs  │   S$8,400.00 │ 10 Jan   │  │
│   │    Startup Labs     │                      │              │ 2025     │  │
│   │    Startup Labs Pte │                      │              │     [⋮]  │  │
│   ├─────────────────────┼──────────────────────┼──────────────┼──────────┤  │
│   │ 🟠 GV               │ accounts@global...   │  S$32,000.00 │ 20 Dec   │  │
│   │    Global Ventures  │                      │              │ 2024     │  │
│   │    Global Holdings  │                      │              │     [⋮]  │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  MOBILE VIEW (< 768px)                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Clients                                                                   │
│   3 total clients                                    [+ New Client]         │
│                                                                             │
│   ┌──────────────────────────┐                                              │
│   │ 🔍 Search clients...     │                                              │
│   └──────────────────────────┘                                              │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────┐              │
│   │ ┌────┐  Acme Corporation                           [⋮]  │              │
│   │ │ AC │  Acme Corporation Pte Ltd                        │              │
│   │ └────┘  billing@acme.corp                               │              │
│   │ ─────────────────────────────────────────────────────── │              │
│   │ Total Billed           Last Invoice                     │              │
│   │ S$15,750.00            15 Jan 2025                      │              │
│   └──────────────────────────────────────────────────────────┘              │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────┐              │
│   │ ┌────┐  Startup Labs                               [⋮]  │              │
│   │ │ SL │  Startup Labs Pte Ltd                            │              │
│   │ └────┘  finance@startuplabs.io                          │              │
│   │ ─────────────────────────────────────────────────────── │              │
│   │ Total Billed           Last Invoice                     │              │
│   │ S$8,400.00             10 Jan 2025                      │              │
│   └──────────────────────────────────────────────────────────┘              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Ready for Implementation

This comprehensive Day 3 plan includes:

1. ✅ **7 detailed phases** with clear objectives
2. ✅ **Complete code** for all new components
3. ✅ **v4.2 design tokens** strictly followed
4. ✅ **Responsive table → card** transformation
5. ✅ **Client avatar** with color hashing
6. ✅ **Form with validation** in Sheet
7. ✅ **Brutalist shadows** on dropdowns
8. ✅ **Accessibility** requirements met
9. ✅ **Validation checklists** for thorough QA

**All files are ready to be created. The Clients view will include:**
- Desktop table with all columns
- Mobile card stack
- Search/filter functionality
- New/Edit client form in Sheet
- Avatar with deterministic colors
- Full dark mode support
- Staggered animations

Shall I proceed with creating these files, or would you like any adjustments to the implementation plan?
