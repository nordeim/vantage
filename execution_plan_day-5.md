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
