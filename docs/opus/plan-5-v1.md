Day 5: Invoice Editor — Comprehensive Execution Plan
Executive Summary
Day 5 builds the complete Invoice Editor, the most complex view in the application. This includes the line item editor with sections, items, and discounts, real-time calculation logic, client selector combobox, date pickers, and the sticky header/footer pattern. This is the core functionality that enables invoice creation.

Pre-Implementation: Day 4 Verification
Before proceeding, confirm Day 4 completion:

```markdown
## Day 4 Completion Checklist
- [ ] InvoiceFilterTabs with status counts
- [ ] InvoiceTable (desktop) with all columns
- [ ] InvoiceCard (mobile) with responsive switch
- [ ] Contextual row actions per status
- [ ] Filter functionality working
- [ ] Navigation to editor placeholders working
- [ ] All components support dark mode
```

Day 5 Execution Plan — Phased Breakdown

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 5: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► UI Components Setup                                            │
│              └── Popover, Select, Command (Combobox), Calendar              │
│                                                                             │
│  PHASE 2 ──► Invoice Calculation Utilities                                  │
│              └── calculateTotals, line item math                            │
│                                                                             │
│  PHASE 3 ──► Client Selector Component                                      │
│              └── Searchable combobox for client selection                   │
│                                                                             │
│  PHASE 4 ──► Date Picker Component                                          │
│              └── Issue date and due date selection                          │
│                                                                             │
│  PHASE 5 ──► Line Item Components                                           │
│              └── ItemRow, SectionRow, DiscountRow                           │
│                                                                             │
│  PHASE 6 ──► Line Items Editor Container                                    │
│              └── Full editor with add/remove/update logic                   │
│                                                                             │
│  PHASE 7 ──► Invoice Summary Component                                      │
│              └── Subtotal, discount, total display                          │
│                                                                             │
│  PHASE 8 ──► Invoice Editor Page                                            │
│              └── Complete page with sticky header/footer                    │
│                                                                             │
│  PHASE 9 ──► Validation & QA                                                │
│              └── Calculations, responsive, accessibility                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Phase 1: UI Components Setup
1.1 Phase Objectives
Create Popover component
Create Select component
Create Command (Combobox) component
Install required Radix primitives
1.2 Phase Checklist

```markdown
## Phase 1 Checklist
- [ ] Install Radix primitives (popover, select, cmdk)
- [ ] Create Popover component
- [ ] Create Select component
- [ ] Create Command component (combobox)
- [ ] Update UI components index
```

1.3 Implementation
Step 1.3.1: Install Dependencies

```bash
npm install @radix-ui/react-popover @radix-ui/react-select cmdk date-fns
```

Step 1.3.2: Create Popover Component

```tsx
// app/frontend/components/ui/popover.tsx
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md p-4",
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        // Brutalist shadow (v4.2)
        "shadow-brutal",
        "outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
```

Step 1.3.3: Create Select Component

```tsx
// app/frontend/components/ui/select.tsx
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md px-3 py-2",
      "bg-white dark:bg-slate-950",
      "border border-slate-300 dark:border-slate-700",
      "text-sm text-slate-900 dark:text-slate-100",
      "placeholder:text-slate-400",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md",
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "shadow-brutal",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "text-slate-900 dark:text-slate-100",
      "focus:bg-slate-100 dark:focus:bg-slate-800",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-200 dark:bg-slate-800", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

Step 1.3.4: Create Command (Combobox) Component

```tsx
// app/frontend/components/ui/command.tsx
import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md",
      "bg-white dark:bg-slate-900",
      "text-slate-900 dark:text-slate-100",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none",
        "placeholder:text-slate-400 dark:placeholder:text-slate-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm text-slate-500 dark:text-slate-400"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
      "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      "[&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-slate-200 dark:bg-slate-800", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800",
      "data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-slate-100",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-slate-500",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
```

Step 1.3.5: Create Calendar Component

```tsx
// app/frontend/components/ui/calendar.tsx
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-slate-900 dark:text-slate-100",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-slate-500 dark:text-slate-400 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 [&:has([aria-selected])]:bg-slate-100 dark:[&:has([aria-selected])]:bg-slate-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white",
        day_today: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100",
        day_outside:
          "day-outside text-slate-400 dark:text-slate-500 opacity-50 aria-selected:bg-slate-100/50 dark:aria-selected:bg-slate-800/50 aria-selected:text-slate-400 dark:aria-selected:text-slate-500 aria-selected:opacity-30",
        day_disabled: "text-slate-400 dark:text-slate-500 opacity-50",
        day_range_middle:
          "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 aria-selected:text-slate-900 dark:aria-selected:text-slate-100",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
```

Step 1.3.6: Install react-day-picker

```ts
// app/frontend/components/ui/index.ts
export { Button, buttonVariants } from './button'
export { Calendar } from './calendar'
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from './card'
export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command'
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
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './popover'
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './select'
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

Phase 2: Invoice Calculation Utilities
2.1 Phase Objectives
Create calculation functions for invoice totals
Handle line item subtotals
Handle discount calculations
Ensure precision for currency
2.2 Phase Checklist

```markdown
## Phase 2 Checklist
- [ ] Create calculateLineTotal function
- [ ] Create calculateSubtotal function
- [ ] Create calculateTotalDiscount function
- [ ] Create calculateTotal function
- [ ] Add to utils.ts or create invoice-utils.ts
```

2.3 Implementation
Step 2.3.1: Create Invoice Calculation Utilities

```ts
// app/frontend/lib/invoice-utils.ts
import type { LineItem, LineItemType, UnitType } from './types'

/**
 * Calculate the total for a single line item
 */
export function calculateLineTotal(item: LineItem): number {
  if (item.type === 'section') {
    return 0
  }
  
  const quantity = item.quantity ?? 0
  const unitPrice = item.unitPrice ?? 0
  
  return quantity * unitPrice
}

/**
 * Calculate subtotal (sum of all item line totals, excluding discounts)
 */
export function calculateSubtotal(lineItems: LineItem[]): number {
  return lineItems
    .filter(item => item.type === 'item')
    .reduce((sum, item) => sum + calculateLineTotal(item), 0)
}

/**
 * Calculate total discount amount (absolute value)
 */
export function calculateTotalDiscount(lineItems: LineItem[]): number {
  return Math.abs(
    lineItems
      .filter(item => item.type === 'discount')
      .reduce((sum, item) => sum + (item.unitPrice ?? 0), 0)
  )
}

/**
 * Calculate final invoice total
 */
export function calculateInvoiceTotal(lineItems: LineItem[]): number {
  const subtotal = calculateSubtotal(lineItems)
  const discount = calculateTotalDiscount(lineItems)
  return subtotal - discount
}

/**
 * Calculate all totals at once
 */
export function calculateTotals(lineItems: LineItem[]): {
  subtotal: number
  totalDiscount: number
  total: number
} {
  const subtotal = calculateSubtotal(lineItems)
  const totalDiscount = calculateTotalDiscount(lineItems)
  const total = subtotal - totalDiscount
  
  return { subtotal, totalDiscount, total }
}

/**
 * Generate a unique ID for new line items
 */
export function generateLineItemId(): string {
  return `li_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Create a new blank item line
 */
export function createBlankItem(position: number, invoiceId: string = ''): LineItem {
  return {
    id: generateLineItemId(),
    invoiceId,
    type: 'item',
    description: '',
    quantity: 1,
    unitType: 'hours',
    unitPrice: 0,
    position,
  }
}

/**
 * Create a new section header
 */
export function createSectionHeader(description: string, position: number, invoiceId: string = ''): LineItem {
  return {
    id: generateLineItemId(),
    invoiceId,
    type: 'section',
    description,
    position,
  }
}

/**
 * Create a new discount line
 */
export function createDiscountLine(description: string, amount: number, position: number, invoiceId: string = ''): LineItem {
  return {
    id: generateLineItemId(),
    invoiceId,
    type: 'discount',
    description,
    quantity: 1,
    unitType: 'fixed',
    unitPrice: -Math.abs(amount), // Ensure negative
    position,
  }
}

/**
 * Get display label for unit type
 */
export function getUnitTypeLabel(unitType: UnitType): string {
  const labels: Record<UnitType, string> = {
    hours: 'hrs',
    days: 'days',
    items: 'items',
    units: 'units',
    fixed: '',
  }
  return labels[unitType] || ''
}

/**
 * Available unit type options
 */
export const unitTypeOptions: Array<{ value: UnitType; label: string }> = [
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'items', label: 'Items' },
  { value: 'units', label: 'Units' },
  { value: 'fixed', label: 'Fixed' },
]
```

---


Phase 3: Client Selector Component
3.1 Phase Objectives
Create searchable client selector combobox
Display selected client info
Allow clearing selection
3.2 Phase Checklist

```markdown
## Phase 3 Checklist
- [ ] Create ClientSelector component using Command + Popover
- [ ] Implement search functionality
- [ ] Show client name and company in dropdown
- [ ] Display selected client
- [ ] Allow clearing selection
```

3.3 Implementation
Step 3.3.1: Create ClientSelector Component

```tsx
// app/frontend/components/invoices/ClientSelector.tsx
import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ClientAvatar } from "@/components/clients/ClientAvatar"
import type { Client } from "@/lib/types"

interface ClientSelectorProps {
  clients: Client[]
  selectedClientId: string | null
  onSelect: (clientId: string | null) => void
  placeholder?: string
  disabled?: boolean
}

/**
 * ClientSelector — Searchable combobox for selecting a client
 * 
 * Features:
 * - Search by name, company, or email
 * - Shows avatar, name, and company in dropdown
 * - Displays selected client info
 * - Clear button to deselect
 */
export function ClientSelector({
  clients,
  selectedClientId,
  onSelect,
  placeholder = "Select a client...",
  disabled = false,
}: ClientSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  // Find selected client
  const selectedClient = clients.find(c => c.id === selectedClientId)

  // Filter clients based on search
  const filteredClients = React.useMemo(() => {
    if (!search) return clients
    
    const query = search.toLowerCase()
    return clients.filter(client =>
      client.name.toLowerCase().includes(query) ||
      client.company?.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    )
  }, [clients, search])

  const handleSelect = (clientId: string) => {
    onSelect(clientId === selectedClientId ? null : clientId)
    setOpen(false)
    setSearch("")
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(null)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select client"
          disabled={disabled}
          className={cn(
            "w-full justify-between h-auto min-h-10 py-2",
            !selectedClient && "text-slate-400"
          )}
        >
          {selectedClient ? (
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <ClientAvatar name={selectedClient.name} size="sm" />
              <div className="flex flex-col items-start min-w-0">
                <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
                  {selectedClient.name}
                </span>
                {selectedClient.company && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {selectedClient.company}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
          
          <div className="flex items-center gap-1 flex-shrink-0">
            {selectedClient && (
              <button
                onClick={handleClear}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                aria-label="Clear selection"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search clients..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No clients found.</CommandEmpty>
            <CommandGroup>
              {filteredClients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.id}
                  onSelect={() => handleSelect(client.id)}
                  className="flex items-center gap-3 py-2"
                >
                  <ClientAvatar name={client.name} size="sm" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium truncate">
                      {client.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {client.company || client.email}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4 flex-shrink-0",
                      selectedClientId === client.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

---

Phase 4: Date Picker Component
4.1 Phase Objectives
Create reusable date picker
Use Popover + Calendar
Format dates for display
4.2 Phase Checklist

```markdown
## Phase 4 Checklist
- [ ] Create DatePicker component
- [ ] Format selected date for display
- [ ] Allow clearing date
- [ ] Support disabled state
```

4.3 Implementation
Step 4.3.1: Create DatePicker Component

```tsx
// app/frontend/components/invoices/DatePicker.tsx
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  onSelect: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

/**
 * DatePicker — Calendar date selector
 * 
 * Features:
 * - Opens calendar in popover
 * - Displays formatted date
 * - Supports placeholder when empty
 */
export function DatePicker({
  date,
  onSelect,
  placeholder = "Select date",
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (selectedDate: Date | undefined) => {
    onSelect(selectedDate)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-slate-400",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd MMM yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
```

---

Phase 5: Line Item Components
5.1 Phase Objectives
Create LineItemRow for regular items
Create SectionHeaderRow for sections
Create DiscountRow for discounts
Support editing all fields
5.2 Phase Checklist

```markdown
## Phase 5 Checklist
- [ ] Create LineItemRow component
- [ ] Create SectionHeaderRow component
- [ ] Create DiscountRow component
- [ ] Handle field changes
- [ ] Handle delete action
- [ ] Calculate and display line totals
```

5.3 Implementation
Step 5.3.1: Create LineItemRow Component

```tsx
// app/frontend/components/invoices/LineItemRow.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GripVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import { calculateLineTotal, unitTypeOptions } from "@/lib/invoice-utils"
import type { LineItem, UnitType } from "@/lib/types"

interface LineItemRowProps {
  item: LineItem
  onChange: (item: LineItem) => void
  onDelete: () => void
  disabled?: boolean
}

/**
 * LineItemRow — Editable row for regular line items
 * 
 * Layout:
 * - Drag handle | Description | Quantity | Unit Type | Unit Price | Line Total | Delete
 */
export function LineItemRow({
  item,
  onChange,
  onDelete,
  disabled = false,
}: LineItemRowProps) {
  const lineTotal = calculateLineTotal(item)

  const handleChange = <K extends keyof LineItem>(field: K, value: LineItem[K]) => {
    onChange({ ...item, [field]: value })
  }

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-slate-50 dark:bg-slate-800/50",
      "border border-slate-200 dark:border-slate-700"
    )}>
      {/* Drag Handle */}
      <div className="flex-shrink-0 cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <Input
          value={item.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Item description"
          disabled={disabled}
          className="bg-white dark:bg-slate-900"
        />
      </div>

      {/* Quantity */}
      <div className="w-20 flex-shrink-0">
        <Input
          type="number"
          min="0"
          step="0.5"
          value={item.quantity ?? ''}
          onChange={(e) => handleChange('quantity', parseFloat(e.target.value) || 0)}
          placeholder="Qty"
          disabled={disabled}
          className="bg-white dark:bg-slate-900 text-right"
        />
      </div>

      {/* Unit Type */}
      <div className="w-24 flex-shrink-0">
        <Select
          value={item.unitType}
          onValueChange={(value) => handleChange('unitType', value as UnitType)}
          disabled={disabled}
        >
          <SelectTrigger className="bg-white dark:bg-slate-900">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {unitTypeOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Unit Price */}
      <div className="w-28 flex-shrink-0">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={item.unitPrice ?? ''}
          onChange={(e) => handleChange('unitPrice', parseFloat(e.target.value) || 0)}
          placeholder="Price"
          disabled={disabled}
          className="bg-white dark:bg-slate-900 text-right"
        />
      </div>

      {/* Line Total */}
      <div className="w-28 flex-shrink-0 text-right">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
          {formatCurrency(lineTotal)}
        </span>
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={disabled}
        className="flex-shrink-0 h-8 w-8 text-slate-400 hover:text-rose-500"
        aria-label="Remove item"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
```

Step 5.3.2: Create SectionHeaderRow Component

```tsx
// app/frontend/components/invoices/SectionHeaderRow.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GripVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface SectionHeaderRowProps {
  item: LineItem
  onChange: (item: LineItem) => void
  onDelete: () => void
  disabled?: boolean
}

/**
 * SectionHeaderRow — Editable row for section headers
 * 
 * Layout:
 * - Drag handle | Section title spanning full width | Delete
 */
export function SectionHeaderRow({
  item,
  onChange,
  onDelete,
  disabled = false,
}: SectionHeaderRowProps) {
  const handleChange = (description: string) => {
    onChange({ ...item, description })
  }

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-slate-100 dark:bg-slate-800",
      "border border-slate-300 dark:border-slate-600"
    )}>
      {/* Drag Handle */}
      <div className="flex-shrink-0 cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Section Label */}
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 flex-shrink-0">
        Section:
      </span>

      {/* Section Title */}
      <div className="flex-1 min-w-0">
        <Input
          value={item.description}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Section title"
          disabled={disabled}
          className="bg-white dark:bg-slate-900 font-semibold"
        />
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={disabled}
        className="flex-shrink-0 h-8 w-8 text-slate-400 hover:text-rose-500"
        aria-label="Remove section"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
```

Step 5.3.3: Create DiscountRow Component

```tsx
// app/frontend/components/invoices/DiscountRow.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GripVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface DiscountRowProps {
  item: LineItem
  onChange: (item: LineItem) => void
  onDelete: () => void
  disabled?: boolean
}

/**
 * DiscountRow — Editable row for discount line items
 * 
 * Layout:
 * - Drag handle | Description | Amount (always negative display) | Delete
 */
export function DiscountRow({
  item,
  onChange,
  onDelete,
  disabled = false,
}: DiscountRowProps) {
  const discountAmount = Math.abs(item.unitPrice ?? 0)

  const handleDescriptionChange = (description: string) => {
    onChange({ ...item, description })
  }

  const handleAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0
    // Store as negative value
    onChange({ ...item, unitPrice: -Math.abs(amount) })
  }

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-rose-50 dark:bg-rose-950/30",
      "border border-rose-200 dark:border-rose-800"
    )}>
      {/* Drag Handle */}
      <div className="flex-shrink-0 cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Discount Label */}
      <span className="text-xs font-medium uppercase tracking-wide text-rose-600 dark:text-rose-400 flex-shrink-0">
        Discount:
      </span>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <Input
          value={item.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Discount description"
          disabled={disabled}
          className="bg-white dark:bg-slate-900"
        />
      </div>

      {/* Amount Input */}
      <div className="w-28 flex-shrink-0">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={discountAmount || ''}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder="Amount"
          disabled={disabled}
          className="bg-white dark:bg-slate-900 text-right"
        />
      </div>

      {/* Discount Display (negative) */}
      <div className="w-28 flex-shrink-0 text-right">
        <span className="font-mono text-sm font-medium text-rose-600 dark:text-rose-400">
          -{formatCurrency(discountAmount)}
        </span>
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={disabled}
        className="flex-shrink-0 h-8 w-8 text-slate-400 hover:text-rose-500"
        aria-label="Remove discount"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
```

---

Phase 6: Line Items Editor Container
6.1 Phase Objectives
Create container for all line items
Manage adding/removing/updating items
Handle position ordering
Render correct row type per item
6.2 Phase Checklist

```markdown
## Phase 6 Checklist
- [ ] Create LineItemsEditor component
- [ ] Render correct component per item type
- [ ] Handle add item/section/discount
- [ ] Handle delete item
- [ ] Handle update item
- [ ] Maintain position ordering
- [ ] Add action buttons at bottom
```

6.3 Implementation
Step 6.3.1: Create LineItemsEditor Component

```tsx
// app/frontend/components/invoices/LineItemsEditor.tsx
import { Button } from "@/components/ui/button"
import { LineItemRow } from "./LineItemRow"
import { SectionHeaderRow } from "./SectionHeaderRow"
import { DiscountRow } from "./DiscountRow"
import { Plus, FolderPlus, Percent } from "lucide-react"
import { 
  createBlankItem, 
  createSectionHeader, 
  createDiscountLine 
} from "@/lib/invoice-utils"
import type { LineItem } from "@/lib/types"

interface LineItemsEditorProps {
  lineItems: LineItem[]
  onChange: (lineItems: LineItem[]) => void
  invoiceId?: string
  disabled?: boolean
}

/**
 * LineItemsEditor — Full editor for invoice line items
 * 
 * Features:
 * - Renders correct component for each item type
 * - Add buttons for items, sections, discounts
 * - Handles all CRUD operations
 * - Maintains position ordering
 */
export function LineItemsEditor({
  lineItems,
  onChange,
  invoiceId = '',
  disabled = false,
}: LineItemsEditorProps) {
  // Sort by position
  const sortedItems = [...lineItems].sort((a, b) => a.position - b.position)

  // Get next position number
  const getNextPosition = () => {
    if (lineItems.length === 0) return 1
    return Math.max(...lineItems.map(item => item.position)) + 1
  }

  // Handle adding a new item
  const handleAddItem = () => {
    const newItem = createBlankItem(getNextPosition(), invoiceId)
    onChange([...lineItems, newItem])
  }

  // Handle adding a new section
  const handleAddSection = () => {
    const newSection = createSectionHeader('', getNextPosition(), invoiceId)
    onChange([...lineItems, newSection])
  }

  // Handle adding a new discount
  const handleAddDiscount = () => {
    const newDiscount = createDiscountLine('', 0, getNextPosition(), invoiceId)
    onChange([...lineItems, newDiscount])
  }

  // Handle updating an item
  const handleUpdateItem = (updatedItem: LineItem) => {
    onChange(lineItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ))
  }

  // Handle deleting an item
  const handleDeleteItem = (itemId: string) => {
    onChange(lineItems.filter(item => item.id !== itemId))
  }

  // Render the appropriate component for each item type
  const renderLineItem = (item: LineItem) => {
    const commonProps = {
      key: item.id,
      item,
      onChange: handleUpdateItem,
      onDelete: () => handleDeleteItem(item.id),
      disabled,
    }

    switch (item.type) {
      case 'section':
        return <SectionHeaderRow {...commonProps} />
      case 'discount':
        return <DiscountRow {...commonProps} />
      case 'item':
      default:
        return <LineItemRow {...commonProps} />
    }
  }

  return (
    <div className="space-y-4">
      {/* Line Items Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-lg font-semibold text-slate-900 dark:text-slate-50">
          Line Items
        </h3>
      </div>

      {/* Line Items List */}
      <div className="space-y-2">
        {sortedItems.length === 0 ? (
          <EmptyState onAddItem={handleAddItem} />
        ) : (
          sortedItems.map(renderLineItem)
        )}
      </div>

      {/* Add Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddItem}
          disabled={disabled}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddSection}
          disabled={disabled}
        >
          <FolderPlus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddDiscount}
          disabled={disabled}
        >
          <Percent className="h-4 w-4 mr-2" />
          Add Discount
        </Button>
      </div>
    </div>
  )
}

/**
 * EmptyState — Displayed when there are no line items
 */
function EmptyState({ onAddItem }: { onAddItem: () => void }) {
  return (
    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        No line items yet. Add your first item to get started.
      </p>
      <Button variant="outline" onClick={onAddItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add First Item
      </Button>
    </div>
  )
}
```

---

Phase 7: Invoice Summary Component
7.1 Phase Objectives
Display subtotal, discount, and total
Right-aligned layout
Proper typography per v4.2
7.2 Phase Checklist

```markdown
## Phase 7 Checklist
- [ ] Create InvoiceSummary component
- [ ] Show subtotal
- [ ] Show total discount (if any)
- [ ] Show final total (prominent)
- [ ] Right-align values
- [ ] Use monospace font for numbers
```

7.3 Implementation
Step 7.3.1: Create InvoiceSummary Component

```tsx
// app/frontend/components/invoices/InvoiceSummary.tsx
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface InvoiceSummaryProps {
  subtotal: number
  totalDiscount: number
  total: number
  className?: string
}

/**
 * InvoiceSummary — Displays invoice totals
 * 
 * Layout (v4.2):
 * - Right-aligned values
 * - Subtotal, Discount (if any), Total
 * - Total is prominent with larger font
 */
export function InvoiceSummary({
  subtotal,
  totalDiscount,
  total,
  className,
}: InvoiceSummaryProps) {
  return (
    <div className={cn("flex justify-end", className)}>
      <div className="w-full max-w-xs space-y-2">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
          <span className="font-mono font-medium text-slate-900 dark:text-slate-50">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Discount (only show if there is one) */}
        {totalDiscount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Discount</span>
            <span className="font-mono font-medium text-rose-600 dark:text-rose-400">
              -{formatCurrency(totalDiscount)}
            </span>
          </div>
        )}

        <Separator className="my-2" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Total
          </span>
          <span className="font-mono text-2xl font-bold text-slate-900 dark:text-slate-50">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  )
}
```

Step 7.3.2: Update Invoices Components Index

```ts
// app/frontend/components/invoices/index.ts
export { InvoiceFilterTabs, type FilterValue } from './InvoiceFilterTabs'
export { InvoiceRowActions } from './InvoiceRowActions'
export { InvoiceTable } from './InvoiceTable'
export { InvoiceCard } from './InvoiceCard'
export { InvoiceList } from './InvoiceList'
export { ClientSelector } from './ClientSelector'
export { DatePicker } from './DatePicker'
export { LineItemRow } from './LineItemRow'
export { SectionHeaderRow } from './SectionHeaderRow'
export { DiscountRow } from './DiscountRow'
export { LineItemsEditor } from './LineItemsEditor'
export { InvoiceSummary } from './InvoiceSummary'
```

---

Phase 8: Invoice Editor Page
8.1 Phase Objectives
Create complete invoice editor page
Implement sticky header with actions
Implement form state management
Handle New vs Edit modes
Implement sticky footer on mobile
8.2 Phase Checklist

```markdown
## Phase 8 Checklist
- [ ] Create InvoiceEditorPage component
- [ ] Implement sticky header with back button
- [ ] Display auto-generated invoice number
- [ ] Add Save Draft and Save & Send buttons
- [ ] Wire ClientSelector
- [ ] Wire DatePickers for issue/due dates
- [ ] Wire LineItemsEditor
- [ ] Wire InvoiceSummary with calculated totals
- [ ] Implement sticky footer on mobile
- [ ] Handle form submission
- [ ] Support Edit mode with existing data
```

8.3 Implementation
Step 8.3.1: Create Invoice Editor Page

```tsx
// app/frontend/pages/Invoices/New.tsx
import { useState, useMemo, useCallback } from "react"
import { router, Link } from "@inertiajs/react"
import { AppLayout } from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  ClientSelector, 
  DatePicker, 
  LineItemsEditor, 
  InvoiceSummary 
} from "@/components/invoices"
import { mockClients } from "@/lib/mock-data"
import { generateInvoiceNumber, formatCurrency } from "@/lib/utils"
import { calculateTotals, createBlankItem } from "@/lib/invoice-utils"
import { ArrowLeft, Save, Send } from "lucide-react"
import type { LineItem } from "@/lib/types"

/**
 * New Invoice Page — Full invoice editor
 * 
 * Layout (v4.2):
 * - Sticky header with back button and actions
 * - Client selector + date pickers
 * - Line items editor
 * - Invoice summary (right-aligned)
 * - Sticky footer on mobile
 */
export default function InvoicesNew() {
  // Generate invoice number
  const invoiceNumber = useMemo(() => {
    const year = new Date().getFullYear()
    const sequence = 3 // Would come from backend in real app
    return generateInvoiceNumber(year, sequence)
  }, [])

  // Form state
  const [clientId, setClientId] = useState<string | null>(null)
  const [issueDate, setIssueDate] = useState<Date | undefined>(new Date())
  const [dueDate, setDueDate] = useState<Date | undefined>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30) // Default to 30 days from now
    return date
  })
  const [lineItems, setLineItems] = useState<LineItem[]>([
    createBlankItem(1, ''),
  ])

  // Calculate totals
  const totals = useMemo(() => calculateTotals(lineItems), [lineItems])

  // Find selected client
  const selectedClient = clientId ? mockClients.find(c => c.id === clientId) : null

  // Handle save
  const handleSave = useCallback((send: boolean = false) => {
    const invoiceData = {
      invoiceNumber,
      clientId,
      issueDate: issueDate?.toISOString(),
      dueDate: dueDate?.toISOString(),
      lineItems,
      ...totals,
      status: send ? 'pending' : 'draft',
    }
    
    console.log('Saving invoice:', invoiceData)
    
    // In real app, would POST to server
    alert(`Invoice ${invoiceNumber} ${send ? 'sent' : 'saved as draft'}!`)
    
    // Navigate back to invoices list
    router.visit('/invoices')
  }, [invoiceNumber, clientId, issueDate, dueDate, lineItems, totals])

  const handleSaveDraft = () => handleSave(false)
  const handleSaveAndSend = () => handleSave(true)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/invoices" aria-label="Back to invoices">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="font-display text-xl tracking-tight text-slate-900 dark:text-slate-50">
                  New Invoice
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                  #{invoiceNumber}
                </p>
              </div>
            </div>

            {/* Right: Actions (hidden on mobile, shown in footer) */}
            <div className="hidden sm:flex items-center gap-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSaveAndSend}>
                <Send className="h-4 w-4 mr-2" />
                Save & Send
              </Button>
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
                />
              </div>
            </div>
          </div>

          {/* Line Items Section */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <LineItemsEditor
              lineItems={lineItems}
              onChange={setLineItems}
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
            <Button variant="outline" size="sm" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button size="sm" onClick={handleSaveAndSend}>
              Save & Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

Step 8.3.2: Create Edit Invoice Page

```tsx
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
```

---

Phase 9: Validation & QA
9.1 Validation Checklist

```markdown
## Day 5 Final Validation Checklist

### Sticky Header
- [ ] Header sticks to top on scroll
- [ ] Back button navigates to /invoices
- [ ] Invoice number displayed in monospace
- [ ] "Save Draft" and "Save & Send" buttons visible on desktop
- [ ] Buttons hidden on mobile (shown in footer)

### Client Selector
- [ ] Opens searchable dropdown
- [ ] Shows client avatar, name, company
- [ ] Search filters by name, company, email
- [ ] Selected client displays in button
- [ ] Clear button removes selection
- [ ] Has proper label with required indicator

### Date Pickers
- [ ] Issue date picker opens calendar
- [ ] Due date picker opens calendar
- [ ] Selected dates display formatted
- [ ] Default issue date is today
- [ ] Default due date is 30 days from now

### Line Items Editor
- [ ] Empty state shows when no items
- [ ] "Add Item" creates new item row
- [ ] "Add Section" creates section header row
- [ ] "Add Discount" creates discount row
- [ ] Item row has: description, quantity, unit type, price, total
- [ ] Section row has: description (spans width)
- [ ] Discount row has: description, amount (shows negative)
- [ ] Delete button removes item
- [ ] Line totals calculate correctly

### Line Item Types
- [ ] Regular items: gray background
- [ ] Section headers: darker background with "Section:" label
- [ ] Discounts: rose background with "Discount:" label

### Invoice Summary
- [ ] Subtotal calculates correctly
- [ ] Discount shows (only if > 0)
- [ ] Total = Subtotal - Discount
- [ ] Values in monospace font
- [ ] Right-aligned layout

### Calculations
- [ ] Adding item updates totals
- [ ] Changing quantity updates line total and invoice total
- [ ] Changing price updates line total and invoice total
- [ ] Adding discount reduces total
- [ ] Removing items updates totals

### Mobile Sticky Footer
- [ ] Footer shows total on mobile
- [ ] Save and Send buttons in footer
- [ ] Footer has shadow and border

### Form Submission
- [ ] "Save Draft" logs data with status: 'draft'
- [ ] "Save & Send" logs data with status: 'pending'
- [ ] Navigation back to /invoices after save

### Edit Mode
- [ ] Pre-fills client from existing invoice
- [ ] Pre-fills dates from existing invoice
- [ ] Pre-fills line items from existing invoice
- [ ] Shows current status badge
- [ ] Shows "View Public" button (if not draft)

### Responsive Behavior
- [ ] No horizontal scroll at 375px
- [ ] Grid stacks on mobile (client, dates)
- [ ] Line item rows stack/adjust on mobile
- [ ] Footer visible on mobile, hidden on desktop

### Accessibility
- [ ] All form fields have labels
- [ ] Required fields marked
- [ ] Date pickers keyboard accessible
- [ ] Client selector keyboard accessible
- [ ] Focus management in popovers

### Dark Mode
- [ ] All components adapt to dark mode
- [ ] Calendar has dark styling
- [ ] Dropdowns have dark styling
- [ ] Line items have dark backgrounds
```

9.2 Manual Testing Procedure

```markdown
## Testing Steps

### 1. Start Development Servers
```bash
bin/rails server
bin/vite dev
```

### 2. New Invoice Page
Navigate to http://localhost:3000/invoices/new
Verify sticky header with "New Invoice" and invoice number
Verify "Save Draft" and "Save & Send" buttons (desktop)

### 3. Client Selector Testing
Click client selector
Verify dropdown opens with search
Type "Acme" to filter
Click on Acme Corporation
Verify client displays in button with avatar
Click X to clear
Verify placeholder returns

### 4. Date Picker Testing
Click Issue Date picker
Verify calendar opens
Select a date
Verify date displays formatted
Repeat for Due Date

### 5. Line Items Testing
Verify one blank item exists
Fill in description: "Web Development"
Set quantity: 10
Select unit type: Hours
Set unit price: 150
Verify line total: S$1,500.00
Click "Add Item"
Verify second row appears
Fill in: "Design Work", 5 days, $800
Verify line total: S$4,000.00
Verify subtotal: S$5,500.00

### 6. Section Header Testing
Click "Add Section"
Verify section row appears (darker background)
Enter title: "Additional Services"
Verify it doesn't affect totals

### 7. Discount Testing
Click "Add Discount"
Verify discount row appears (rose background)
Enter description: "Early Payment Discount"
Enter amount: 500
Verify displays as -S$500.00
Verify total reduced by discount

### 8. Delete Item Testing
Click X on a line item
Verify item removed
Verify totals recalculate

### 9. Mobile Testing
Set viewport to 375px
Verify header actions hidden
Verify sticky footer visible with total
Verify form fields stack
Tap "Save Draft" in footer
Verify navigation works

### 10. Edit Mode Testing
Navigate to /invoices
Click on invoice 2025-0001
Verify Edit page loads with existing data
Verify client pre-selected
Verify dates pre-filled
Verify line items populated
Verify totals match

### 11. Dark Mode Testing
Toggle to dark mode
Verify header has dark background
Verify form has dark background
Verify calendar popup has dark styling
Verify line items have dark backgrounds
Verify discount row has dark rose styling

### 12. Calculation Verification
Using invoice 2025-0001 data:

Section: Development Services (no total)
Item: Frontend Development, 24 hrs × $150 = $3,600
Item: API Integration, 16 hrs × $150 = $2,400
Section: Additional Services (no total)
Item: Technical Consultation, 2 hrs × $200 = $400
Discount: Loyalty Discount 5% = -$320
Subtotal: $6,400
Discount: $320
Total: $6,080
```


---

## File Structure Summary (Day 5 Complete)

```text
app/frontend/
├── components/
│ ├── clients/
│ │ └── ... (Day 3 files)
│ ├── dashboard/
│ │ └── ... (Day 2 files)
│ ├── invoices/
│ │ ├── index.ts # UPDATED
│ │ ├── InvoiceFilterTabs.tsx
│ │ ├── InvoiceRowActions.tsx
│ │ ├── InvoiceTable.tsx
│ │ ├── InvoiceCard.tsx
│ │ ├── InvoiceList.tsx
│ │ ├── ClientSelector.tsx # NEW
│ │ ├── DatePicker.tsx # NEW
│ │ ├── LineItemRow.tsx # NEW
│ │ ├── SectionHeaderRow.tsx # NEW
│ │ ├── DiscountRow.tsx # NEW
│ │ ├── LineItemsEditor.tsx # NEW
│ │ └── InvoiceSummary.tsx # NEW
│ ├── layout/
│ │ └── ... (Day 1 files)
│ ├── shared/
│ │ └── ... (Day 2 files)
│ └── ui/
│ ├── index.ts # UPDATED
│ ├── button.tsx
│ ├── calendar.tsx # NEW
│ ├── card.tsx
│ ├── command.tsx # NEW
│ ├── dropdown-menu.tsx
│ ├── input.tsx
│ ├── label.tsx
│ ├── popover.tsx # NEW
│ ├── select.tsx # NEW
│ ├── separator.tsx
│ ├── sheet.tsx
│ ├── table.tsx
│ ├── tabs.tsx
│ ├── textarea.tsx
│ └── tooltip.tsx
├── hooks/
│ └── useTheme.ts
├── layouts/
│ └── AppLayout.tsx
├── lib/
│ ├── utils.ts
│ ├── types.ts
│ ├── mock-data.ts
│ └── invoice-utils.ts # NEW
├── pages/
│ ├── Dashboard.tsx
│ ├── Clients/
│ │ └── Index.tsx
│ └── Invoices/
│ ├── Index.tsx
│ ├── New.tsx # UPDATED (full implementation)
│ └── Edit.tsx # UPDATED (full implementation)
└── entrypoints/
├── inertia.tsx
└── application.css
```

---

## Day 5 Success Criteria

```text
| Criterion | Validation Method | Status |
|-----------|-------------------|--------|
| Sticky header works | Scroll page, verify header stays | ⬜ |
| Back button navigates | Click back, verify navigation | ⬜ |
| Client selector works | Select/clear client | ⬜ |
| Date pickers work | Select dates, verify display | ⬜ |
| Line items can be added | Add item/section/discount | ⬜ |
| Line items can be edited | Change values, verify update | ⬜ |
| Line items can be deleted | Delete item, verify removal | ⬜ |
| Line totals calculate | Check item × price = total | ⬜ |
| Subtotal calculates | Sum of all item totals | ⬜ |
| Discount calculates | Discount reduces total | ⬜ |
| Final total calculates | Subtotal - Discount | ⬜ |
| Mobile footer shows | Check at 375px | ⬜ |
| Form submits | Click save, verify log | ⬜ |
| Edit mode loads data | Open existing invoice | ⬜ |
| Dark mode adapts | Toggle theme, verify | ⬜ |
| Accessibility passes | Tab navigation, labels | ⬜ |
---

## Invoice Editor Preview

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ STICKY HEADER │
│ ┌─────────────────────────────────────────────────────────────────────────┐│
│ │ ← │ New Invoice [Save Draft] [Save & Send] ││
│ │ │ #2025-0003 ││
│ └─────────────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────────────┤
│ │
│ ┌─────────────────────────────────────────────────────────────────────────┐│
│ │ ││
│ │ CLIENT & DATES ││
│ │ ┌─────────────────────┐ ┌────────────────┐ ┌────────────────┐ ││
│ │ │ Client * │ │ Issue Date │ │ Due Date │ ││
│ │ │ 🔵 Acme Corporation │ │ 📅 20 Jan 2025 │ │ 📅 19 Feb 2025 │ ││
│ │ │ Acme Corp Pte │ │ │ │ │ ││
│ │ └─────────────────────┘ └────────────────┘ └────────────────┘ ││
│ │ ││
│ ├─────────────────────────────────────────────────────────────────────────┤│
│ │ ││
│ │ LINE ITEMS ││
│ │ ││
│ │ ┌───────────────────────────────────────────────────────────────────┐ ││
│ │ │ ≡ │ Section: Development Services [×] │ ││
│ │ └───────────────────────────────────────────────────────────────────┘ ││
│ │ ││
│ │ ┌───────────────────────────────────────────────────────────────────┐ ││
│ │ │ ≡ │ Frontend Development │ 24 │ hrs │ $150 │ S$3,600.00 [×] │ ││
│ │ └───────────────────────────────────────────────────────────────────┘ ││
│ │ ││
│ │ ┌───────────────────────────────────────────────────────────────────┐ ││
│ │ │ ≡ │ API Integration │ 16 │ hrs │ $150 │ S$2,400.00 [×] │ ││
│ │ └───────────────────────────────────────────────────────────────────┘ ││
│ │ ││
│ │ ┌───────────────────────────────────────────────────────────────────┐ ││
│ │ │ ≡ │ Discount: Loyalty 5% │ -S$320.00 [×] │ ││
│ │ └───────────────────────────────────────────────────────────────────┘ ││
│ │ ││
│ │ [+ Add Item] [+ Add Section] [+ Add Discount] ││
│ │ ││
│ ├─────────────────────────────────────────────────────────────────────────┤│
│ │ ││
│ │ SUMMARY ││
│ │ Subtotal: S$6,400.00 ││
│ │ Discount: -S$320.00 ││
│ │ ───────────────────────── ││
│ │ TOTAL: S$6,080.00 ││
│ │ ││
│ └─────────────────────────────────────────────────────────────────────────┘│
│ │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ MOBILE STICKY FOOTER │
│ ┌─────────────────────────────────────────────────────────────────────────┐│
│ │ Total [Save Draft] [Save & Send] ││
│ │ S$6,080.00 ││
│ └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Ready for Implementation

This comprehensive Day 5 plan includes:

1. ✅ **9 detailed phases** with clear objectives
2. ✅ **Complete code** for all new components
3. ✅ **v4.2 design tokens** strictly followed
4. ✅ **Client selector** with search functionality
5. ✅ 
