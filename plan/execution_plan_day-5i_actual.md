Day 5 Complete Implementation Plan (v2 - Corrected)
Invoice Editor — Full Implementation with Drop-in Code
Plan Overview

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DAY 5: COMPLETE EXECUTION PLAN                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 0 ──► Pre-Implementation Verification                               │
│              └── Verify Day 4 completion, dependencies, cross-day imports  │
│                                                                             │
│  PHASE 1 ──► UI Components Setup                                           │
│              └── Popover, Select, Command, Calendar (with correct deps)    │
│                                                                             │
│  PHASE 1.5 ──► Type Definitions Update                                     │
│               └── LineItem, LineItemType, UnitType interfaces              │
│                                                                             │
│  PHASE 2 ──► Invoice Calculation Utilities                                 │
│              └── calculateTotals, line item math, helpers                  │
│                                                                             │
│  PHASE 3 ──► Client Selector Component                                     │
│              └── Searchable combobox for client selection                  │
│                                                                             │
│  PHASE 4 ──► Date Picker Component                                         │
│              └── Issue date and due date selection                         │
│                                                                             │
│  PHASE 5 ──► Line Item Components                                          │
│              └── ItemRow, SectionRow, DiscountRow                          │
│                                                                             │
│  PHASE 6 ──► Line Items Editor Container                                   │
│              └── Full editor with add/remove/update logic                  │
│                                                                             │
│  PHASE 7 ──► Invoice Summary Component                                     │
│              └── Subtotal, discount, total display                         │
│                                                                             │
│  PHASE 8 ──► Invoice Editor Pages                                          │
│              └── New + Edit pages with sticky header/footer                │
│                                                                             │
│  PHASE 8.5 ──► Route Configuration                                         │
│               └── Rails routes and controller setup                        │
│                                                                             │
│  PHASE 9 ──► Validation & QA                                               │
│              └── Comprehensive testing and verification                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```


Phase 0: Pre-Implementation Verification
0.1 Phase Objectives
Confirm Day 4 completion
Verify all cross-day dependencies exist
Validate mock data structure
Ensure development environment is ready
0.2 Day 4 Completion Checklist

```markdown
## Day 4 Completion Verification
- [ ] InvoiceFilterTabs component exists and exports correctly
- [ ] InvoiceTable (desktop) component exists with all columns
- [ ] InvoiceCard (mobile) component exists with responsive switch
- [ ] InvoiceRowActions component exists with contextual actions
- [ ] InvoiceList component exists and switches based on viewport
- [ ] Filter functionality works correctly
- [ ] Navigation to /invoices/new works (placeholder OK)
- [ ] All invoice components support dark mode
- [ ] No TypeScript errors in invoice components
```

0.3 Cross-Day Dependency Verification
Run this verification before proceeding:

```markdown
## Cross-Day Dependencies Checklist
- [ ] ClientAvatar component exists at components/clients/ClientAvatar.tsx
- [ ] StatusBadge component exists at components/shared/StatusBadge.tsx
- [ ] formatCurrency function exists in lib/utils.ts
- [ ] generateInvoiceNumber function exists in lib/utils.ts
- [ ] cn utility function exists in lib/utils.ts
- [ ] mockClients array exists in lib/mock-data.ts
- [ ] mockInvoices array exists in lib/mock-data.ts
- [ ] Client interface defined in lib/types.ts
- [ ] Invoice interface defined in lib/types.ts
- [ ] InvoiceStatus type defined in lib/types.ts
```

0.4 Verification Script
Create and run this script to automate verification:

```ts
// scripts/verify-day5-prerequisites.ts
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

interface CheckResult {
  name: string
  passed: boolean
  message: string
}

const results: CheckResult[] = []

// File existence checks
const requiredFiles = [
  { path: 'app/frontend/components/clients/ClientAvatar.tsx', name: 'ClientAvatar' },
  { path: 'app/frontend/components/shared/StatusBadge.tsx', name: 'StatusBadge' },
  { path: 'app/frontend/lib/utils.ts', name: 'Utils' },
  { path: 'app/frontend/lib/types.ts', name: 'Types' },
  { path: 'app/frontend/lib/mock-data.ts', name: 'Mock Data' },
  { path: 'app/frontend/components/invoices/InvoiceFilterTabs.tsx', name: 'InvoiceFilterTabs' },
  { path: 'app/frontend/components/invoices/InvoiceTable.tsx', name: 'InvoiceTable' },
  { path: 'app/frontend/components/invoices/InvoiceCard.tsx', name: 'InvoiceCard' },
]

console.log('\n🔍 Day 5 Pre-Implementation Verification\n')
console.log('=' .repeat(60))

// Check file existence
console.log('\n📁 File Existence Checks:\n')
requiredFiles.forEach(({ path, name }) => {
  const fullPath = resolve(path)
  const exists = existsSync(fullPath)
  results.push({
    name: `${name} file`,
    passed: exists,
    message: exists ? `Found: ${path}` : `Missing: ${path}`
  })
  console.log(`  ${exists ? '✅' : '❌'} ${name}: ${path}`)
})

// Check for required exports in utils.ts
console.log('\n📦 Required Exports:\n')
try {
  const utilsContent = readFileSync(resolve('app/frontend/lib/utils.ts'), 'utf-8')
  
  const formatCurrencyExists = utilsContent.includes('formatCurrency')
  results.push({
    name: 'formatCurrency export',
    passed: formatCurrencyExists,
    message: formatCurrencyExists ? 'Found in utils.ts' : 'Missing from utils.ts'
  })
  console.log(`  ${formatCurrencyExists ? '✅' : '❌'} formatCurrency function`)
  
  const generateInvoiceNumberExists = utilsContent.includes('generateInvoiceNumber')
  results.push({
    name: 'generateInvoiceNumber export',
    passed: generateInvoiceNumberExists,
    message: generateInvoiceNumberExists ? 'Found in utils.ts' : 'Missing from utils.ts'
  })
  console.log(`  ${generateInvoiceNumberExists ? '✅' : '❌'} generateInvoiceNumber function`)
  
  const cnExists = utilsContent.includes('export function cn') || utilsContent.includes('export const cn')
  results.push({
    name: 'cn utility export',
    passed: cnExists,
    message: cnExists ? 'Found in utils.ts' : 'Missing from utils.ts'
  })
  console.log(`  ${cnExists ? '✅' : '❌'} cn utility function`)
} catch (e) {
  console.log('  ❌ Could not read utils.ts')
}

// Check types.ts for required interfaces
console.log('\n📝 Type Definitions:\n')
try {
  const typesContent = readFileSync(resolve('app/frontend/lib/types.ts'), 'utf-8')
  
  const clientInterface = typesContent.includes('interface Client')
  console.log(`  ${clientInterface ? '✅' : '❌'} Client interface`)
  
  const invoiceInterface = typesContent.includes('interface Invoice')
  console.log(`  ${invoiceInterface ? '✅' : '❌'} Invoice interface`)
  
  const invoiceStatus = typesContent.includes('InvoiceStatus')
  console.log(`  ${invoiceStatus ? '✅' : '❌'} InvoiceStatus type`)
} catch (e) {
  console.log('  ❌ Could not read types.ts')
}

// Summary
console.log('\n' + '=' .repeat(60))
const passed = results.filter(r => r.passed).length
const total = results.length
const allPassed = passed === total

console.log(`\n${allPassed ? '✅' : '❌'} Verification: ${passed}/${total} checks passed\n`)

if (!allPassed) {
  console.log('⚠️  Please fix the failing checks before proceeding with Day 5.\n')
  console.log('Missing items:')
  results.filter(r => !r.passed).forEach(r => {
    console.log(`  - ${r.name}: ${r.message}`)
  })
  process.exit(1)
} else {
  console.log('🎉 All pre-implementation checks passed! Ready for Day 5.\n')
}
```

0.5 Run Verification

```bash
# Run the verification script
npx ts-node scripts/verify-day5-prerequisites.ts

# If any checks fail, address them before proceeding
```

Phase 1: UI Components Setup
1.1 Phase Objectives
Install all required dependencies (correctly)
Create Popover component
Create Select component
Create Command (Combobox) component
Create Calendar component
Update UI components index
1.2 Phase Checklist

```markdown
## Phase 1 Checklist
- [ ] Install ALL dependencies (including react-day-picker)
- [ ] Create Popover component
- [ ] Create Select component
- [ ] Create Command component
- [ ] Create Calendar component
- [ ] Update UI components index
- [ ] Verify all components render without errors
```

1.3 Implementation
Step 1.3.1: Install Dependencies (CORRECTED)

```bash
# Install all required dependencies - including react-day-picker with pinned version
npm install @radix-ui/react-popover @radix-ui/react-select cmdk date-fns react-day-picker@^8.10.0
```

Verification:

```bash
# Verify installation
npm list @radix-ui/react-popover @radix-ui/react-select cmdk date-fns react-day-picker
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

const PopoverClose = PopoverPrimitive.Close

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
        // Base styles
        "z-50 w-72 rounded-md p-4",
        // Colors
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        // Brutalist shadow (v4.2 design system)
        "shadow-brutal",
        // Focus
        "outline-none",
        // Animations
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

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose }
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
      // Base styles
      "flex h-10 w-full items-center justify-between rounded-md px-3 py-2",
      // Colors
      "bg-white dark:bg-slate-950",
      "border border-slate-300 dark:border-slate-700",
      "text-sm text-slate-900 dark:text-slate-100",
      // Placeholder
      "placeholder:text-slate-400 dark:placeholder:text-slate-500",
      // Focus
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0",
      "focus:border-transparent",
      // Disabled
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Text truncation
      "[&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
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
      "text-slate-500 dark:text-slate-400",
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
      "text-slate-500 dark:text-slate-400",
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
        // Base styles
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md",
        // Colors
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        // Shadow
        "shadow-brutal",
        // Animations
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        // Popper positioning
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
    className={cn(
      "py-1.5 pl-8 pr-2 text-sm font-semibold",
      "text-slate-900 dark:text-slate-100",
      className
    )}
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
      // Base styles
      "relative flex w-full cursor-default select-none items-center",
      "rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      // Colors
      "text-slate-900 dark:text-slate-100",
      // Focus/hover
      "focus:bg-slate-100 dark:focus:bg-slate-800",
      "data-[highlighted]:bg-slate-100 dark:data-[highlighted]:bg-slate-800",
      // Disabled
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

interface CommandDialogProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const CommandDialog = ({ children, open, onOpenChange, ...props }: CommandDialogProps) => {
  return (
    <Command {...props}>
      {children}
    </Command>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div 
    className="flex items-center border-b border-slate-200 dark:border-slate-800 px-3" 
    cmdk-input-wrapper=""
  >
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
      "relative flex cursor-default select-none items-center",
      "rounded-sm px-2 py-1.5 text-sm outline-none",
      // Selected state
      "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800",
      "data-[selected=true]:text-slate-900 dark:data-[selected=true]:text-slate-100",
      // Disabled state
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
        "ml-auto text-xs tracking-widest text-slate-500 dark:text-slate-400",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

const CommandLoading = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Loading>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>((props, ref) => (
  <CommandPrimitive.Loading
    ref={ref}
    className="py-6 text-center text-sm text-slate-500 dark:text-slate-400"
    {...props}
  />
))
CommandLoading.displayName = CommandPrimitive.Loading.displayName

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandLoading,
}
```

Step 1.3.5: Create Calendar Component

```tsx
// app/frontend/components/ui/calendar.tsx
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import type { DayPickerSingleProps } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = DayPickerSingleProps

/**
 * Calendar — Date picker calendar component
 * 
 * Built on react-day-picker v8.x
 * Styled to match v4.2 design system
 */
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
        head_cell: cn(
          "text-slate-500 dark:text-slate-400",
          "rounded-md w-9 font-normal text-[0.8rem]"
        ),
        row: "flex w-full mt-2",
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-outside)]:bg-slate-100/50 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50",
          "[&:has([aria-selected])]:bg-slate-100 dark:[&:has([aria-selected])]:bg-slate-800",
          "first:[&:has([aria-selected])]:rounded-l-md",
          "last:[&:has([aria-selected])]:rounded-r-md",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-blue-500 text-white",
          "hover:bg-blue-600 hover:text-white",
          "focus:bg-blue-500 focus:text-white"
        ),
        day_today: cn(
          "bg-slate-100 dark:bg-slate-800",
          "text-slate-900 dark:text-slate-100"
        ),
        day_outside: cn(
          "day-outside text-slate-400 dark:text-slate-500 opacity-50",
          "aria-selected:bg-slate-100/50 dark:aria-selected:bg-slate-800/50",
          "aria-selected:text-slate-400 dark:aria-selected:text-slate-500",
          "aria-selected:opacity-30"
        ),
        day_disabled: "text-slate-400 dark:text-slate-500 opacity-50",
        day_range_middle: cn(
          "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800",
          "aria-selected:text-slate-900 dark:aria-selected:text-slate-100"
        ),
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

Step 1.3.6: Update UI Components Index

```ts
// app/frontend/components/ui/index.ts
// Complete UI components barrel export

// Button
export { Button, buttonVariants } from './button'

// Calendar
export { Calendar } from './calendar'
export type { CalendarProps } from './calendar'

// Card
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from './card'

// Command (Combobox)
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandLoading,
} from './command'

// Dropdown Menu
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

// Input
export { Input } from './input'

// Label
export { Label } from './label'

// Popover
export { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverAnchor,
  PopoverClose 
} from './popover'

// Select
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
} from './select'

// Separator
export { Separator } from './separator'

// Sheet
export { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from './sheet'

// Table
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

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'

// Textarea
export { Textarea } from './textarea'

// Tooltip
export { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from './tooltip'
```


Phase 1.5: Type Definitions Update
1.5.1 Phase Objectives
Define LineItemType enum
Define UnitType enum
Define LineItem interface
Update Invoice interface to include lineItems
Ensure all types are properly exported
1.5.2 Phase Checklist

```markdown
## Phase 1.5 Checklist
- [ ] Add LineItemType type
- [ ] Add UnitType type
- [ ] Add LineItem interface
- [ ] Update Invoice interface with lineItems
- [ ] Verify TypeScript compilation passes
- [ ] Verify no import errors
```

1.5.3 Implementation
Step 1.5.3.1: Update Types File (Complete Replacement)

```ts
// app/frontend/lib/types.ts
// Complete type definitions for the invoice application

/**
 * Invoice status enum
 */
export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'

/**
 * Line item type enum
 * - item: Regular billable item with quantity and price
 * - section: Section header for grouping items (no price)
 * - discount: Discount line (negative price)
 */
export type LineItemType = 'item' | 'section' | 'discount'

/**
 * Unit type for billing
 */
export type UnitType = 'hours' | 'days' | 'items' | 'units' | 'fixed'

/**
 * Client interface
 */
export interface Client {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  postalCode?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

/**
 * Line item interface
 */
export interface LineItem {
  id: string
  invoiceId: string
  type: LineItemType
  description: string
  quantity?: number
  unitType?: UnitType
  unitPrice?: number
  position: number
}

/**
 * Invoice interface
 */
export interface Invoice {
  id: string
  invoiceNumber: string
  clientId: string
  clientName: string
  clientCompany?: string
  clientEmail?: string
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  subtotal: number
  totalDiscount: number
  total: number
  notes?: string
  token: string
  lineItems: LineItem[]
  createdAt: string
  updatedAt: string
}

/**
 * Invoice summary (calculated totals)
 */
export interface InvoiceTotals {
  subtotal: number
  totalDiscount: number
  total: number
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  totalRevenue: number
  pendingAmount: number
  overdueAmount: number
  totalClients: number
  totalInvoices: number
  paidInvoices: number
  pendingInvoices: number
  overdueInvoices: number
}

/**
 * Recent activity item
 */
export interface ActivityItem {
  id: string
  type: 'invoice_created' | 'invoice_sent' | 'invoice_paid' | 'invoice_overdue' | 'client_created'
  description: string
  timestamp: string
  invoiceId?: string
  clientId?: string
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  label: string
  value: number
}

/**
 * Navigation item
 */
export interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

/**
 * Filter option
 */
export interface FilterOption<T = string> {
  value: T
  label: string
  count?: number
}

/**
 * Sort option
 */
export interface SortOption {
  field: string
  direction: 'asc' | 'desc'
  label: string
}

/**
 * Pagination info
 */
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T
  message?: string
  errors?: Record<string, string[]>
}

/**
 * Form field error
 */
export interface FieldError {
  field: string
  message: string
}
```

Phase 2: Invoice Calculation Utilities
2.1 Phase Objectives
Create calculation functions for invoice totals
Handle line item subtotals
Handle discount calculations
Ensure precision for currency
Create helper functions for line item creation
2.2 Phase Checklist

```markdown
## Phase 2 Checklist
- [ ] Create calculateLineTotal function
- [ ] Create calculateSubtotal function
- [ ] Create calculateTotalDiscount function
- [ ] Create calculateInvoiceTotal function
- [ ] Create calculateTotals convenience function
- [ ] Create generateLineItemId helper
- [ ] Create createBlankItem helper
- [ ] Create createSectionHeader helper
- [ ] Create createDiscountLine helper
- [ ] Create getUnitTypeLabel helper
- [ ] Define unitTypeOptions constant
- [ ] Add unit tests for calculations
```

2.3 Implementation
Step 2.3.1: Create Invoice Calculation Utilities

```ts
// app/frontend/lib/invoice-utils.ts
import type { LineItem, LineItemType, UnitType, InvoiceTotals } from './types'

/**
 * Calculate the total for a single line item
 * 
 * @param item - The line item to calculate
 * @returns The line total (quantity * unitPrice), or 0 for sections
 */
export function calculateLineTotal(item: LineItem): number {
  // Sections don't have a total
  if (item.type === 'section') {
    return 0
  }
  
  const quantity = item.quantity ?? 0
  const unitPrice = item.unitPrice ?? 0
  
  // Use toFixed to avoid floating point precision issues
  // Then convert back to number
  const total = quantity * unitPrice
  return Math.round(total * 100) / 100
}

/**
 * Calculate subtotal (sum of all item line totals, excluding discounts)
 * 
 * @param lineItems - Array of line items
 * @returns Sum of all item totals
 */
export function calculateSubtotal(lineItems: LineItem[]): number {
  const subtotal = lineItems
    .filter(item => item.type === 'item')
    .reduce((sum, item) => sum + calculateLineTotal(item), 0)
  
  return Math.round(subtotal * 100) / 100
}

/**
 * Calculate total discount amount (absolute value)
 * Discounts are stored as negative values, this returns positive
 * 
 * @param lineItems - Array of line items
 * @returns Total discount amount (positive)
 */
export function calculateTotalDiscount(lineItems: LineItem[]): number {
  const totalDiscount = Math.abs(
    lineItems
      .filter(item => item.type === 'discount')
      .reduce((sum, item) => sum + (item.unitPrice ?? 0), 0)
  )
  
  return Math.round(totalDiscount * 100) / 100
}

/**
 * Calculate final invoice total
 * 
 * @param lineItems - Array of line items
 * @returns Final total (subtotal - discount)
 */
export function calculateInvoiceTotal(lineItems: LineItem[]): number {
  const subtotal = calculateSubtotal(lineItems)
  const discount = calculateTotalDiscount(lineItems)
  const total = subtotal - discount
  
  return Math.round(total * 100) / 100
}

/**
 * Calculate all totals at once
 * 
 * @param lineItems - Array of line items
 * @returns Object with subtotal, totalDiscount, and total
 */
export function calculateTotals(lineItems: LineItem[]): InvoiceTotals {
  const subtotal = calculateSubtotal(lineItems)
  const totalDiscount = calculateTotalDiscount(lineItems)
  const total = Math.round((subtotal - totalDiscount) * 100) / 100
  
  return { subtotal, totalDiscount, total }
}

/**
 * Generate a unique ID for new line items
 * Format: li_{timestamp}_{random}
 * 
 * @returns Unique line item ID
 */
export function generateLineItemId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 11)
  return `li_${timestamp}_${random}`
}

/**
 * Create a new blank item line
 * 
 * @param position - Position in the list
 * @param invoiceId - Parent invoice ID (optional for new invoices)
 * @returns New blank line item
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
 * 
 * @param description - Section title
 * @param position - Position in the list
 * @param invoiceId - Parent invoice ID (optional for new invoices)
 * @returns New section line item
 */
export function createSectionHeader(
  description: string, 
  position: number, 
  invoiceId: string = ''
): LineItem {
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
 * 
 * @param description - Discount description
 * @param amount - Discount amount (will be stored as negative)
 * @param position - Position in the list
 * @param invoiceId - Parent invoice ID (optional for new invoices)
 * @returns New discount line item
 */
export function createDiscountLine(
  description: string, 
  amount: number, 
  position: number, 
  invoiceId: string = ''
): LineItem {
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
 * 
 * @param unitType - Unit type value
 * @returns Human-readable short label
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
 * Get full display label for unit type (for selects)
 * 
 * @param unitType - Unit type value
 * @returns Human-readable full label
 */
export function getUnitTypeFullLabel(unitType: UnitType): string {
  const labels: Record<UnitType, string> = {
    hours: 'Hours',
    days: 'Days',
    items: 'Items',
    units: 'Units',
    fixed: 'Fixed',
  }
  return labels[unitType] || ''
}

/**
 * Available unit type options for selects
 */
export const unitTypeOptions: Array<{ value: UnitType; label: string }> = [
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'items', label: 'Items' },
  { value: 'units', label: 'Units' },
  { value: 'fixed', label: 'Fixed' },
]

/**
 * Reorder line items after add/remove/move
 * Updates position values to be sequential
 * 
 * @param lineItems - Array of line items
 * @returns Array with updated position values
 */
export function reorderLineItems(lineItems: LineItem[]): LineItem[] {
  return lineItems
    .sort((a, b) => a.position - b.position)
    .map((item, index) => ({
      ...item,
      position: index + 1,
    }))
}

/**
 * Validate a line item has required fields
 * 
 * @param item - Line item to validate
 * @returns Object with isValid and errors array
 */
export function validateLineItem(item: LineItem): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!item.description?.trim()) {
    errors.push('Description is required')
  }
  
  if (item.type === 'item') {
    if (item.quantity === undefined || item.quantity < 0) {
      errors.push('Quantity must be 0 or greater')
    }
    if (item.unitPrice === undefined || item.unitPrice < 0) {
      errors.push('Unit price must be 0 or greater')
    }
  }
  
  if (item.type === 'discount') {
    if (item.unitPrice === undefined) {
      errors.push('Discount amount is required')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Check if invoice has any line items with values
 * 
 * @param lineItems - Array of line items
 * @returns True if at least one item has a description
 */
export function hasLineItems(lineItems: LineItem[]): boolean {
  return lineItems.some(item => item.description?.trim())
}
```

Phase 3: Client Selector Component
3.1 Phase Objectives
Create searchable client selector combobox
Display selected client info with avatar
Allow clearing selection
Support keyboard navigation
Handle empty states
3.2 Phase Checklist

```markdown
## Phase 3 Checklist
- [ ] Create ClientSelector component
- [ ] Implement search functionality (name, company, email)
- [ ] Show client avatar, name, and company in dropdown
- [ ] Display selected client with avatar
- [ ] Allow clearing selection
- [ ] Support disabled state
- [ ] Handle empty client list
- [ ] Verify keyboard navigation
- [ ] Verify dark mode styling
```

3.3 Implementation
Step 3.3.1: Create ClientSelector Component

```tsx
// app/frontend/components/invoices/ClientSelector.tsx
import * as React from "react"
import { Check, ChevronsUpDown, X, User } from "lucide-react"
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
  /** Array of available clients */
  clients: Client[]
  /** Currently selected client ID */
  selectedClientId: string | null
  /** Callback when selection changes */
  onSelect: (clientId: string | null) => void
  /** Placeholder text when no client selected */
  placeholder?: string
  /** Disable the selector */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * ClientSelector — Searchable combobox for selecting a client
 * 
 * Features:
 * - Search by name, company, or email
 * - Shows avatar, name, and company in dropdown
 * - Displays selected client info
 * - Clear button to deselect
 * - Keyboard accessible
 * - Dark mode support
 */
export function ClientSelector({
  clients,
  selectedClientId,
  onSelect,
  placeholder = "Select a client...",
  disabled = false,
  className,
}: ClientSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  // Find selected client
  const selectedClient = React.useMemo(
    () => clients.find(c => c.id === selectedClientId),
    [clients, selectedClientId]
  )

  // Filter clients based on search
  const filteredClients = React.useMemo(() => {
    if (!search.trim()) return clients
    
    const query = search.toLowerCase().trim()
    return clients.filter(client =>
      client.name.toLowerCase().includes(query) ||
      client.company?.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    )
  }, [clients, search])

  // Handle client selection
  const handleSelect = React.useCallback((clientId: string) => {
    // Toggle selection if clicking the same client
    onSelect(clientId === selectedClientId ? null : clientId)
    setOpen(false)
    setSearch("")
  }, [onSelect, selectedClientId])

  // Handle clear button click
  const handleClear = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onSelect(null)
  }, [onSelect])

  // Reset search when popover closes
  React.useEffect(() => {
    if (!open) {
      setSearch("")
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select client"
          aria-haspopup="listbox"
          disabled={disabled}
          className={cn(
            "w-full justify-between h-auto min-h-10 py-2 px-3",
            "font-normal",
            !selectedClient && "text-slate-400 dark:text-slate-500",
            className
          )}
        >
          {selectedClient ? (
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <ClientAvatar name={selectedClient.name} size="sm" />
              <div className="flex flex-col items-start min-w-0 text-left">
                <span className="font-medium text-slate-900 dark:text-slate-100 truncate max-w-full">
                  {selectedClient.name}
                </span>
                {selectedClient.company && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-full">
                    {selectedClient.company}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <span className="truncate">{placeholder}</span>
          )}
          
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            {selectedClient && !disabled && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect(null)
                  }
                }}
                className={cn(
                  "p-1 rounded transition-colors",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                aria-label="Clear selection"
              >
                <X className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
              </span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] min-w-[300px] p-0" 
        align="start"
        sideOffset={4}
      >
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search clients..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {clients.length === 0 ? (
              <div className="py-6 text-center">
                <User className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500 mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No clients yet
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Add a client to get started
                </p>
              </div>
            ) : filteredClients.length === 0 ? (
              <CommandEmpty>
                No clients found for "{search}"
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredClients.map((client) => (
                  <CommandItem
                    key={client.id}
                    value={client.id}
                    onSelect={() => handleSelect(client.id)}
                    className="flex items-center gap-3 py-2 cursor-pointer"
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
                        "h-4 w-4 flex-shrink-0 text-blue-500",
                        selectedClientId === client.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

Phase 4: Date Picker Component
4.1 Phase Objectives
Create reusable date picker component
Use Popover + Calendar combination
Format dates for display
Support clearing date
Handle disabled state
4.2 Phase Checklist

```markdown
## Phase 4 Checklist
- [ ] Create DatePicker component
- [ ] Format selected date for display
- [ ] Support placeholder when empty
- [ ] Allow clearing date (optional)
- [ ] Support disabled state
- [ ] Verify calendar opens correctly
- [ ] Verify date selection works
- [ ] Verify keyboard navigation
- [ ] Verify dark mode styling
```

4.3 Implementation
Step 4.3.1: Create DatePicker Component

```tsx
// app/frontend/components/invoices/DatePicker.tsx
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  /** Currently selected date */
  date: Date | undefined
  /** Callback when date changes */
  onSelect: (date: Date | undefined) => void
  /** Placeholder text when no date selected */
  placeholder?: string
  /** Disable the picker */
  disabled?: boolean
  /** Show clear button when date is selected */
  clearable?: boolean
  /** Additional CSS classes */
  className?: string
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Date format string (date-fns format) */
  dateFormat?: string
}

/**
 * DatePicker — Calendar date selector component
 * 
 * Features:
 * - Opens calendar in popover
 * - Displays formatted date
 * - Supports placeholder when empty
 * - Optional clear button
 * - Keyboard accessible
 * - Dark mode support
 */
export function DatePicker({
  date,
  onSelect,
  placeholder = "Select date",
  disabled = false,
  clearable = false,
  className,
  minDate,
  maxDate,
  dateFormat = "dd MMM yyyy",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Handle date selection
  const handleSelect = React.useCallback((selectedDate: Date | undefined) => {
    onSelect(selectedDate)
    setOpen(false)
  }, [onSelect])

  // Handle clear button click
  const handleClear = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onSelect(undefined)
  }, [onSelect])

  // Determine if a date is disabled
  const isDateDisabled = React.useCallback((checkDate: Date) => {
    if (minDate && checkDate < minDate) return true
    if (maxDate && checkDate > maxDate) return true
    return false
  }, [minDate, maxDate])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          aria-label={date ? `Selected date: ${format(date, dateFormat)}` : placeholder}
          aria-haspopup="dialog"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-slate-400 dark:text-slate-500",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="flex-1 truncate">
            {date ? format(date, dateFormat) : placeholder}
          </span>
          
          {/* Clear button */}
          {clearable && date && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(undefined)
                }
              }}
              className={cn(
                "ml-2 p-1 rounded transition-colors flex-shrink-0",
                "hover:bg-slate-100 dark:hover:bg-slate-800",
                "focus:outline-none focus:ring-2 focus:ring-blue-500"
              )}
              aria-label="Clear date"
            >
              <X className="h-3 w-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={isDateDisabled}
          initialFocus
          defaultMonth={date || new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}

/**
 * DateRangePicker — For selecting date ranges (future enhancement)
 * Currently using two DatePicker components for issue/due date
 */

// Helper to calculate due date based on payment terms
export function calculateDueDate(issueDate: Date, paymentTermDays: number = 30): Date {
  const dueDate = new Date(issueDate)
  dueDate.setDate(dueDate.getDate() + paymentTermDays)
  return dueDate
}

// Common payment term options
export const paymentTermOptions = [
  { value: 0, label: 'Due on receipt' },
  { value: 7, label: 'Net 7' },
  { value: 14, label: 'Net 14' },
  { value: 30, label: 'Net 30' },
  { value: 45, label: 'Net 45' },
  { value: 60, label: 'Net 60' },
  { value: 90, label: 'Net 90' },
]
```

Phase 5: Line Item Components
5.1 Phase Objectives
Create LineItemRow for regular items
Create SectionHeaderRow for sections
Create DiscountRow for discounts
Support editing all fields
Handle delete action
Display calculated line totals
5.2 Phase Checklist

```markdown
## Phase 5 Checklist
- [ ] Create LineItemRow component
- [ ] Create SectionHeaderRow component
- [ ] Create DiscountRow component
- [ ] Handle field changes with proper types
- [ ] Handle delete action
- [ ] Calculate and display line totals
- [ ] Style each row type distinctly
- [ ] Verify responsive behavior
- [ ] Verify dark mode styling
```

5.3 Implementation
Step 5.3.1: Create LineItemRow Component

```tsx
// app/frontend/components/invoices/LineItemRow.tsx
import * as React from "react"
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
import { cn, formatCurrency } from "@/lib/utils"
import { calculateLineTotal, unitTypeOptions } from "@/lib/invoice-utils"
import type { LineItem, UnitType } from "@/lib/types"

interface LineItemRowProps {
  /** The line item data */
  item: LineItem
  /** Callback when item changes */
  onChange: (item: LineItem) => void
  /** Callback when item should be deleted */
  onDelete: () => void
  /** Disable all inputs */
  disabled?: boolean
  /** Show drag handle */
  showDragHandle?: boolean
}

/**
 * LineItemRow — Editable row for regular line items
 * 
 * Layout (Desktop):
 * [Drag] [Description...........................] [Qty] [Unit] [Price] [Total] [X]
 * 
 * Features:
 * - Editable description, quantity, unit type, and price
 * - Auto-calculated line total
 * - Delete button
 * - Drag handle for reordering (future)
 * - Responsive layout
 */
export function LineItemRow({
  item,
  onChange,
  onDelete,
  disabled = false,
  showDragHandle = true,
}: LineItemRowProps) {
  // Calculate line total
  const lineTotal = React.useMemo(() => calculateLineTotal(item), [item])

  // Handle field changes
  const handleChange = React.useCallback(<K extends keyof LineItem>(
    field: K, 
    value: LineItem[K]
  ) => {
    onChange({ ...item, [field]: value })
  }, [item, onChange])

  // Handle numeric input changes with validation
  const handleQuantityChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow empty string for clearing, otherwise parse as float
    const quantity = value === '' ? 0 : parseFloat(value)
    if (!isNaN(quantity) && quantity >= 0) {
      handleChange('quantity', quantity)
    }
  }, [handleChange])

  const handlePriceChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const price = value === '' ? 0 : parseFloat(value)
    if (!isNaN(price) && price >= 0) {
      handleChange('unitPrice', price)
    }
  }, [handleChange])

  return (
    <div className={cn(
      "flex items-start gap-2 p-3 rounded-lg",
      "bg-slate-50 dark:bg-slate-800/50",
      "border border-slate-200 dark:border-slate-700",
      "transition-colors",
      disabled && "opacity-60"
    )}>
      {/* Drag Handle */}
      {showDragHandle && (
        <div 
          className={cn(
            "flex-shrink-0 mt-2.5",
            "cursor-grab active:cursor-grabbing",
            "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
            disabled && "cursor-not-allowed"
          )}
          aria-hidden="true"
        >
          <GripVertical className="h-5 w-5" />
        </div>
      )}

      {/* Main content - responsive grid */}
      <div className="flex-1 grid gap-2 sm:grid-cols-[1fr_80px_100px_100px_100px] items-start">
        {/* Description */}
        <div className="sm:col-span-1">
          <Input
            value={item.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Item description"
            disabled={disabled}
            className="bg-white dark:bg-slate-900"
            aria-label="Item description"
          />
        </div>

        {/* Quantity + Unit + Price row on mobile */}
        <div className="flex gap-2 sm:contents">
          {/* Quantity */}
          <div className="w-20 flex-shrink-0 sm:w-auto">
            <Input
              type="number"
              min="0"
              step="0.5"
              value={item.quantity ?? ''}
              onChange={handleQuantityChange}
              placeholder="Qty"
              disabled={disabled}
              className="bg-white dark:bg-slate-900 text-right"
              aria-label="Quantity"
            />
          </div>

          {/* Unit Type */}
          <div className="w-24 flex-shrink-0 sm:w-auto">
            <Select
              value={item.unitType}
              onValueChange={(value) => handleChange('unitType', value as UnitType)}
              disabled={disabled}
            >
              <SelectTrigger 
                className="bg-white dark:bg-slate-900"
                aria-label="Unit type"
              >
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
          <div className="flex-1 sm:w-auto sm:flex-none">
            <Input
              type="number"
              min="0"
              step="0.01"
              value={item.unitPrice ?? ''}
              onChange={handlePriceChange}
              placeholder="Price"
              disabled={disabled}
              className="bg-white dark:bg-slate-900 text-right"
              aria-label="Unit price"
            />
          </div>
        </div>

        {/* Line Total */}
        <div className="flex items-center justify-end sm:justify-end h-10">
          <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
            {formatCurrency(lineTotal)}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={disabled}
        className={cn(
          "flex-shrink-0 h-10 w-10 mt-0",
          "text-slate-400 hover:text-rose-500 dark:hover:text-rose-400",
          "hover:bg-rose-50 dark:hover:bg-rose-950/20"
        )}
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
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GripVertical, X, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface SectionHeaderRowProps {
  /** The section line item data */
  item: LineItem
  /** Callback when item changes */
  onChange: (item: LineItem) => void
  /** Callback when item should be deleted */
  onDelete: () => void
  /** Disable all inputs */
  disabled?: boolean
  /** Show drag handle */
  showDragHandle?: boolean
}

/**
 * SectionHeaderRow — Editable row for section headers
 * 
 * Layout:
 * [Drag] [Icon] [Section: ...title...] [X]
 * 
 * Features:
 * - Editable section title
 * - Visual distinction (darker background)
 * - Delete button
 * - Drag handle for reordering
 */
export function SectionHeaderRow({
  item,
  onChange,
  onDelete,
  disabled = false,
  showDragHandle = true,
}: SectionHeaderRowProps) {
  // Handle description change
  const handleChange = React.useCallback((description: string) => {
    onChange({ ...item, description })
  }, [item, onChange])

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-slate-100 dark:bg-slate-800",
      "border border-slate-300 dark:border-slate-600",
      "transition-colors",
      disabled && "opacity-60"
    )}>
      {/* Drag Handle */}
      {showDragHandle && (
        <div 
          className={cn(
            "flex-shrink-0",
            "cursor-grab active:cursor-grabbing",
            "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
            disabled && "cursor-not-allowed"
          )}
          aria-hidden="true"
        >
          <GripVertical className="h-5 w-5" />
        </div>
      )}

      {/* Section Icon */}
      <FolderOpen className="h-4 w-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />

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
          className={cn(
            "bg-white dark:bg-slate-900",
            "font-semibold text-slate-900 dark:text-slate-100"
          )}
          aria-label="Section title"
        />
      </div>

      {/* Delete Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={disabled}
        className={cn(
          "flex-shrink-0 h-10 w-10",
          "text-slate-400 hover:text-rose-500 dark:hover:text-rose-400",
          "hover:bg-rose-50 dark:hover:bg-rose-950/20"
        )}
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
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GripVertical, X, Percent } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface DiscountRowProps {
  /** The discount line item data */
  item: LineItem
  /** Callback when item changes */
  onChange: (item: LineItem) => void
  /** Callback when item should be deleted */
  onDelete: () => void
  /** Disable all inputs */
  disabled?: boolean
  /** Show drag handle */
  showDragHandle?: boolean
}

/**
 * DiscountRow — Editable row for discount line items
 * 
 * Layout:
 * [Drag] [Icon] [Discount: ...description...] [Amount] [-$XXX.XX] [X]
 * 
 * Features:
 * - Editable description and amount
 * - Amount always displayed as negative
 * - Visual distinction (rose background)
 * - Delete button
 * - Drag handle for reordering
 */
export function DiscountRow({
  item,
  onChange,
  onDelete,
  disabled = false,
  showDragHandle = true,
}: DiscountRowProps) {
  // Get absolute discount amount for display/input
  const discountAmount = Math.abs(item.unitPrice ?? 0)

  // Handle description change
  const handleDescriptionChange = React.useCallback((description: string) => {
    onChange({ ...item, description })
  }, [item, onChange])

  // Handle amount change - store as negative
  const handleAmountChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const amount = value === '' ? 0 : parseFloat(value)
    if (!isNaN(amount) && amount >= 0) {
      // Store as negative value
      onChange({ ...item, unitPrice: -Math.abs(amount) })
    }
  }, [item, onChange])

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-rose-50 dark:bg-rose-950/30",
      "border border-rose-200 dark:border-rose-800",
      "transition-colors",
      disabled && "opacity-60"
    )}>
      {/* Drag Handle */}
      {showDragHandle && (
        <div 
          className={cn(
            "flex-shrink-0",
            "cursor-grab active:cursor-grabbing",
            "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
            disabled && "cursor-not-allowed"
          )}
          aria-hidden="true"
        >
          <GripVertical className="h-5 w-5" />
        </div>
      )}

      {/* Discount Icon */}
      <Percent className="h-4 w-4 text-rose-500 dark:text-rose-400 flex-shrink-0" />

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
          aria-label="Discount description"
        />
      </div>

      {/* Amount Input */}
      <div className="w-28 flex-shrink-0">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={discountAmount || ''}
          onChange={handleAmountChange}
          placeholder="Amount"
          disabled={disabled}
          className="bg-white dark:bg-slate-900 text-right"
          aria-label="Discount amount"
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
        type="button"
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={disabled}
        className={cn(
          "flex-shrink-0 h-10 w-10",
          "text-slate-400 hover:text-rose-500 dark:hover:text-rose-400",
          "hover:bg-rose-50 dark:hover:bg-rose-950/20"
        )}
        aria-label="Remove discount"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
```

Phase 6: Line Items Editor Container
6.1 Phase Objectives
Create container for all line items
Manage adding/removing/updating items
Handle position ordering
Render correct row type per item
Provide action buttons
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
- [ ] Display empty state
- [ ] Verify keyboard accessibility
```

6.3 Implementation
Step 6.3.1: Create LineItemsEditor Component

```tsx
// app/frontend/components/invoices/LineItemsEditor.tsx
import * as React from "react"
import { Button } from "@/components/ui/button"
import { LineItemRow } from "./LineItemRow"
import { SectionHeaderRow } from "./SectionHeaderRow"
import { DiscountRow } from "./DiscountRow"
import { Plus, FolderPlus, Percent, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  createBlankItem, 
  createSectionHeader, 
  createDiscountLine,
  reorderLineItems,
} from "@/lib/invoice-utils"
import type { LineItem } from "@/lib/types"

interface LineItemsEditorProps {
  /** Array of line items */
  lineItems: LineItem[]
  /** Callback when line items change */
  onChange: (lineItems: LineItem[]) => void
  /** Parent invoice ID (optional for new invoices) */
  invoiceId?: string
  /** Disable all editing */
  disabled?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * LineItemsEditor — Full editor for invoice line items
 * 
 * Features:
 * - Renders correct component for each item type
 * - Add buttons for items, sections, discounts
 * - Handles all CRUD operations
 * - Maintains position ordering
 * - Empty state when no items
 * - Keyboard accessible
 */
export function LineItemsEditor({
  lineItems,
  onChange,
  invoiceId = '',
  disabled = false,
  className,
}: LineItemsEditorProps) {
  // Sort items by position
  const sortedItems = React.useMemo(
    () => [...lineItems].sort((a, b) => a.position - b.position),
    [lineItems]
  )

  // Get next position number
  const getNextPosition = React.useCallback(() => {
    if (lineItems.length === 0) return 1
    return Math.max(...lineItems.map(item => item.position)) + 1
  }, [lineItems])

  // Handle adding a new item
  const handleAddItem = React.useCallback(() => {
    const newItem = createBlankItem(getNextPosition(), invoiceId)
    onChange([...lineItems, newItem])
  }, [lineItems, onChange, getNextPosition, invoiceId])

  // Handle adding a new section
  const handleAddSection = React.useCallback(() => {
    const newSection = createSectionHeader('', getNextPosition(), invoiceId)
    onChange([...lineItems, newSection])
  }, [lineItems, onChange, getNextPosition, invoiceId])

  // Handle adding a new discount
  const handleAddDiscount = React.useCallback(() => {
    const newDiscount = createDiscountLine('', 0, getNextPosition(), invoiceId)
    onChange([...lineItems, newDiscount])
  }, [lineItems, onChange, getNextPosition, invoiceId])

  // Handle updating an item
  const handleUpdateItem = React.useCallback((updatedItem: LineItem) => {
    onChange(lineItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ))
  }, [lineItems, onChange])

  // Handle deleting an item
  const handleDeleteItem = React.useCallback((itemId: string) => {
    const remaining = lineItems.filter(item => item.id !== itemId)
    // Reorder positions after delete
    onChange(reorderLineItems(remaining))
  }, [lineItems, onChange])

  // Render the appropriate component for each item type
  const renderLineItem = React.useCallback((item: LineItem) => {
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
  }, [handleUpdateItem, handleDeleteItem, disabled])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-lg font-semibold text-slate-900 dark:text-slate-50">
          Line Items
        </h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {lineItems.length} {lineItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Line Items List */}
      <div className="space-y-2" role="list" aria-label="Invoice line items">
        {sortedItems.length === 0 ? (
          <EmptyState onAddItem={handleAddItem} disabled={disabled} />
        ) : (
          sortedItems.map(renderLineItem)
        )}
      </div>

      {/* Add Buttons */}
      {sortedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddItem}
            disabled={disabled}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSection}
            disabled={disabled}
            className="gap-2"
          >
            <FolderPlus className="h-4 w-4" />
            Add Section
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddDiscount}
            disabled={disabled}
            className="gap-2"
          >
            <Percent className="h-4 w-4" />
            Add Discount
          </Button>
        </div>
      )}
    </div>
  )
}

/**
 * EmptyState — Displayed when there are no line items
 */
interface EmptyStateProps {
  onAddItem: () => void
  disabled: boolean
}

function EmptyState({ onAddItem, disabled }: EmptyStateProps) {
  return (
    <div className={cn(
      "border-2 border-dashed rounded-lg p-8 text-center",
      "border-slate-200 dark:border-slate-700",
      "bg-slate-50/50 dark:bg-slate-800/50"
    )}>
      <FileText className="mx-auto h-10 w-10 text-slate-400 dark:text-slate-500 mb-3" />
      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">
        No line items yet
      </h4>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Add your first item to get started with this invoice.
      </p>
      <Button 
        variant="outline" 
        onClick={onAddItem}
        disabled={disabled}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Add First Item
      </Button>
    </div>
  )
}
```

Phase 7: Invoice Summary Component
7.1 Phase Objectives
Display subtotal, discount, and total
Right-aligned layout
Proper typography per v4.2
Monospace font for numbers
7.2 Phase Checklist

```markdown
## Phase 7 Checklist
- [ ] Create InvoiceSummary component
- [ ] Show subtotal
- [ ] Show total discount (only if > 0)
- [ ] Show final total (prominent)
- [ ] Right-align values
- [ ] Use monospace font for numbers
- [ ] Verify dark mode styling
```

7.3 Implementation
Step 7.3.1: Create InvoiceSummary Component

```tsx
// app/frontend/components/invoices/InvoiceSummary.tsx
import * as React from "react"
import { cn, formatCurrency } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface InvoiceSummaryProps {
  /** Subtotal before discounts */
  subtotal: number
  /** Total discount amount (positive number) */
  totalDiscount: number
  /** Final total (subtotal - discount) */
  total: number
  /** Additional CSS classes */
  className?: string
  /** Show compact version */
  compact?: boolean
}

/**
 * InvoiceSummary — Displays invoice totals
 * 
 * Layout (v4.2):
 * - Right-aligned values
 * - Subtotal, Discount (if any), Total
 * - Total is prominent with larger font
 * - Monospace font for numbers
 */
export function InvoiceSummary({
  subtotal,
  totalDiscount,
  total,
  className,
  compact = false,
}: InvoiceSummaryProps) {
  const hasDiscount = totalDiscount > 0

  return (
    <div className={cn("flex justify-end", className)}>
      <div className={cn(
        "w-full space-y-2",
        compact ? "max-w-[200px]" : "max-w-xs"
      )}>
        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">
            Subtotal
          </span>
          <span className="font-mono font-medium text-slate-900 dark:text-slate-50">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Discount (only show if there is one) */}
        {hasDiscount && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Discount
            </span>
            <span className="font-mono font-medium text-rose-600 dark:text-rose-400">
              -{formatCurrency(totalDiscount)}
            </span>
          </div>
        )}

        <Separator className="my-2" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className={cn(
            "font-semibold text-slate-900 dark:text-slate-50",
            compact ? "text-sm" : "text-base"
          )}>
            Total
          </span>
          <span className={cn(
            "font-mono font-bold text-slate-900 dark:text-slate-50",
            compact ? "text-lg" : "text-2xl"
          )}>
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * InvoiceSummaryCompact — Smaller version for mobile footer
 */
export function InvoiceSummaryCompact({
  total,
  className,
}: {
  total: number
  className?: string
}) {
  return (
    <div className={cn("text-left", className)}>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Total
      </p>
      <p className="font-mono text-lg font-bold text-slate-900 dark:text-slate-50">
        {formatCurrency(total)}
      </p>
    </div>
  )
}
```

Step 7.3.2: Update Invoices Components Index

```ts
// app/frontend/components/invoices/index.ts
// Complete invoices components barrel export

// Filter and list components (Day 4)
export { InvoiceFilterTabs } from './InvoiceFilterTabs'
export type { FilterValue } from './InvoiceFilterTabs'
export { InvoiceRowActions } from './InvoiceRowActions'
export { InvoiceTable } from './InvoiceTable'
export { InvoiceCard } from './InvoiceCard'
export { InvoiceList } from './InvoiceList'

// Editor components (Day 5)
export { ClientSelector } from './ClientSelector'
export { DatePicker, calculateDueDate, paymentTermOptions } from './DatePicker'
export { LineItemRow } from './LineItemRow'
export { SectionHeaderRow } from './SectionHeaderRow'
export { DiscountRow } from './DiscountRow'
export { LineItemsEditor } from './LineItemsEditor'
export { InvoiceSummary, InvoiceSummaryCompact } from './InvoiceSummary'
```

Phase 8: Invoice Editor Pages
8.1 Phase Objectives
Create complete New Invoice page
Create Edit Invoice page
Implement sticky header with actions
Implement form state management
Handle New vs Edit modes
Implement sticky footer on mobile
Handle form submission
8.2 Phase Checklist

```markdown
## Phase 8 Checklist
- [ ] Create New.tsx page
- [ ] Create Edit.tsx page
- [ ] Implement sticky header with back button
- [ ] Display auto-generated invoice number
- [ ] Add Save Draft and Save & Send buttons
- [ ] Wire ClientSelector
- [ ] Wire DatePickers for issue/due dates
- [ ] Wire LineItemsEditor
- [ ] Wire InvoiceSummary with calculated totals
- [ ] Implement sticky footer on mobile
- [ ] Handle form submission (Save Draft / Save & Send)
- [ ] Support Edit mode with existing data
- [ ] Handle status-based permissions in Edit mode
- [ ] Verify responsive behavior
- [ ] Verify dark mode styling
```

8.3 Implementation
Step 8.3.1: Create New Invoice Page

```tsx
// app/frontend/pages/Invoices/New.tsx
import { useState, useMemo, useCallback } from "react"
import { router, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
```
