Day 5 & Day 6: Invoice Editor & Public Invoice — Comprehensive Execution Plan
Executive Summary
This combined plan covers two major features:

Day 5: Complete Invoice Editor with line item management, live calculations, and responsive sticky elements
Day 6: Public shareable invoice view with print optimization and payment modal mockup
Pre-Implementation: Day 4 Verification
Before proceeding, confirm Day 4 completion:

Markdown

## Day 4 Completion Checklist
- [ ] InvoiceFilterTabs with all 5 status options
- [ ] InvoiceTable (desktop) with contextual actions
- [ ] InvoiceCard (mobile) with responsive switch
- [ ] Contextual row actions per invoice status
- [ ] Filter state management working
- [ ] Navigation to editor pages working
- [ ] All components support dark mode
DAY 5: Invoice Editor View
Day 5 Execution Plan — Phased Breakdown
text

┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 5: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► Additional UI Components                                       │
│              └── Select, Popover, Calendar, Command (for combobox)          │
│                                                                             │
│  PHASE 2 ──► Client Selector Component                                      │
│              └── Combobox for selecting clients                             │
│                                                                             │
│  PHASE 3 ──► Date Picker Component                                          │
│              └── Calendar-based date selection                              │
│                                                                             │
│  PHASE 4 ──► Line Item Components                                           │
│              └── LineItemRow, SectionRow, DiscountRow                       │
│                                                                             │
│  PHASE 5 ──► Line Item Editor                                               │
│              └── Full editor with add/remove, drag handles                  │
│                                                                             │
│  PHASE 6 ──► Invoice Summary & Calculations                                 │
│              └── Subtotal, discounts, total calculation                     │
│                                                                             │
│  PHASE 7 ──► Invoice Editor Page                                            │
│              └── Complete page with sticky header/footer                    │
│                                                                             │
│  PHASE 8 ──► Validation & QA                                                │
│              └── Calculations, responsive, accessibility                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Phase 1: Additional UI Components
1.1 Implementation
Step 1.1.1: Install Required Radix Primitives

Bash

npm install @radix-ui/react-select @radix-ui/react-popover cmdk date-fns
Step 1.1.2: Create Select Component

React

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
      "flex h-10 w-full items-center justify-between rounded-md",
      "bg-white dark:bg-slate-950",
      "border border-slate-300 dark:border-slate-700",
      "px-3 py-2 text-sm",
      "text-slate-900 dark:text-slate-100",
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
Step 1.1.3: Create Popover Component

React

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
Step 1.1.4: Create Calendar Component

React

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
        head_cell: "text-slate-500 dark:text-slate-400 rounded-md w-9 font-normal text-[0.8rem]",
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
          "day-outside text-slate-400 opacity-50 aria-selected:bg-slate-100/50 dark:aria-selected:bg-slate-800/50 aria-selected:text-slate-400 aria-selected:opacity-30",
        day_disabled: "text-slate-400 opacity-50",
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
Step 1.1.5: Install react-day-picker

Bash

npm install react-day-picker
Step 1.1.6: Create Command Component (for Combobox)

React

// app/frontend/components/ui/command.tsx
import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

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
    className="py-6 text-center text-sm text-slate-500"
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
      "overflow-hidden p-1 text-slate-900 dark:text-slate-100",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400",
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
      "aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800",
      "aria-selected:text-slate-900 dark:aria-selected:text-slate-100",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
Step 1.1.7: Create Dialog Component

React

// app/frontend/components/ui/dialog.tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4",
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "p-6 shadow-lg rounded-lg",
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      "text-slate-900 dark:text-slate-100",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
Step 1.1.8: Update UI Components Index

React

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
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command'
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'
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
Phase 2: Client Selector Component
2.1 Implementation
React

// app/frontend/components/invoices/ClientSelector.tsx
import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
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
  selectedClientId?: string
  onSelect: (clientId: string) => void
  onCreateNew?: () => void
  placeholder?: string
  disabled?: boolean
}

/**
 * ClientSelector — Combobox for selecting a client
 * 
 * Features:
 * - Searchable dropdown
 * - Shows client avatar and name
 * - Option to create new client
 */
export function ClientSelector({
  clients,
  selectedClientId,
  onSelect,
  onCreateNew,
  placeholder = "Select a client...",
  disabled = false,
}: ClientSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const selectedClient = clients.find(c => c.id === selectedClientId)

  // Filter clients based on search
  const filteredClients = React.useMemo(() => {
    if (!searchValue) return clients
    const query = searchValue.toLowerCase()
    return clients.filter(
      client =>
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.company?.toLowerCase().includes(query)
    )
  }, [clients, searchValue])

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
            <div className="flex items-center gap-3">
              <ClientAvatar name={selectedClient.name} size="sm" />
              <div className="text-left">
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {selectedClient.name}
                </p>
                {selectedClient.company && (
                  <p className="text-xs text-slate-500">
                    {selectedClient.company}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search clients..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              <div className="py-4 text-center">
                <p className="text-sm text-slate-500 mb-3">No clients found</p>
                {onCreateNew && (
                  <Button size="sm" onClick={() => {
                    onCreateNew()
                    setOpen(false)
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Client
                  </Button>
                )}
              </div>
            </CommandEmpty>
            <CommandGroup>
              {filteredClients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.id}
                  onSelect={() => {
                    onSelect(client.id)
                    setOpen(false)
                  }}
                  className="flex items-center gap-3 py-2"
                >
                  <ClientAvatar name={client.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{client.name}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {client.email}
                    </p>
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4",
                      selectedClientId === client.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {onCreateNew && filteredClients.length > 0 && (
              <>
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-1" />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      onCreateNew()
                      setOpen(false)
                    }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create New Client
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
Phase 3: Date Picker Component
3.1 Implementation
React

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
  date?: Date
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

/**
 * DatePicker — Calendar-based date selection
 * 
 * Features:
 * - Popover with calendar
 * - Formatted date display
 * - Keyboard accessible
 */
export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

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
          {date ? format(date, "d MMM yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            onDateChange(newDate)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
Phase 4: Line Item Components
4.1 Implementation
Step 4.1.1: Create LineItemRow Component

React

// app/frontend/components/invoices/LineItemRow.tsx
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { GripVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { LineItem, UnitType } from "@/lib/types"

interface LineItemRowProps {
  item: LineItem
  onChange: (item: LineItem) => void
  onRemove: () => void
  disabled?: boolean
}

const unitTypes: { value: UnitType; label: string }[] = [
  { value: "hours", label: "hrs" },
  { value: "days", label: "days" },
  { value: "items", label: "items" },
  { value: "units", label: "units" },
  { value: "fixed", label: "fixed" },
]

/**
 * LineItemRow — Editable line item for invoices
 * 
 * Layout:
 * - Drag handle | Description | Qty | Unit | Price | Total | Remove
 */
export function LineItemRow({
  item,
  onChange,
  onRemove,
  disabled = false,
}: LineItemRowProps) {
  const handleChange = (field: keyof LineItem, value: any) => {
    const updated = { ...item, [field]: value }
    
    // Recalculate line total
    if (field === 'quantity' || field === 'unitPrice') {
      const qty = field === 'quantity' ? value : item.quantity
      const price = field === 'unitPrice' ? value : item.unitPrice
      updated.lineTotal = (qty || 0) * (price || 0)
    }
    
    onChange(updated)
  }

  const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-white dark:bg-slate-900",
      "border border-slate-200 dark:border-slate-800",
      "group"
    )}>
      {/* Drag Handle */}
      <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <Input
          value={item.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Item description"
          disabled={disabled}
          className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
        />
      </div>

      {/* Quantity */}
      <div className="w-20">
        <Input
          type="number"
          value={item.quantity || ''}
          onChange={(e) => handleChange('quantity', parseFloat(e.target.value) || 0)}
          placeholder="0"
          min="0"
          step="0.5"
          disabled={disabled}
          className="text-right"
        />
      </div>

      {/* Unit Type */}
      <div className="w-24">
        <Select
          value={item.unitType || 'hours'}
          onValueChange={(value) => handleChange('unitType', value)}
          disabled={disabled}
        >
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {unitTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Unit Price */}
      <div className="w-28">
        <Input
          type="number"
          value={item.unitPrice || ''}
          onChange={(e) => handleChange('unitPrice', parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          min="0"
          step="0.01"
          disabled={disabled}
          className="text-right"
        />
      </div>

      {/* Line Total */}
      <div className="w-28 text-right">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100">
          {formatCurrency(lineTotal)}
        </span>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={disabled}
        className="h-8 w-8 text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove item"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
Step 4.1.2: Create SectionRow Component

React

// app/frontend/components/invoices/SectionRow.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GripVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface SectionRowProps {
  item: LineItem
  onChange: (item: LineItem) => void
  onRemove: () => void
  disabled?: boolean
}

/**
 * SectionRow — Section header for grouping line items
 * 
 * Layout:
 * - Drag handle | Section title | Remove
 * - Different background to distinguish from items
 */
export function SectionRow({
  item,
  onChange,
  onRemove,
  disabled = false,
}: SectionRowProps) {
  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-slate-100 dark:bg-slate-800",
      "border border-slate-200 dark:border-slate-700",
      "group"
    )}>
      {/* Drag Handle */}
      <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Section Title */}
      <div className="flex-1">
        <Input
          value={item.description}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
          placeholder="Section title"
          disabled={disabled}
          className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 font-semibold text-slate-900 dark:text-slate-100"
        />
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={disabled}
        className="h-8 w-8 text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove section"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
Step 4.1.3: Create DiscountRow Component

React

// app/frontend/components/invoices/DiscountRow.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GripVertical, X, Percent } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface DiscountRowProps {
  item: LineItem
  onChange: (item: LineItem) => void
  onRemove: () => void
  disabled?: boolean
}

/**
 * DiscountRow — Discount line item (negative value)
 * 
 * Layout:
 * - Drag handle | Description | Amount (negative) | Remove
 * - Red text for discount amounts
 */
export function DiscountRow({
  item,
  onChange,
  onRemove,
  disabled = false,
}: DiscountRowProps) {
  // Ensure unitPrice is negative for discounts
  const handleAmountChange = (value: number) => {
    const negativeValue = value > 0 ? -value : value
    onChange({
      ...item,
      unitPrice: negativeValue,
      lineTotal: negativeValue,
      quantity: 1,
      unitType: 'fixed',
    })
  }

  const displayAmount = Math.abs(item.unitPrice || 0)

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-rose-50 dark:bg-rose-950/30",
      "border border-rose-200 dark:border-rose-900",
      "group"
    )}>
      {/* Drag Handle */}
      <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Discount Icon */}
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900/50">
        <Percent className="h-4 w-4 text-rose-600 dark:text-rose-400" />
      </div>

      {/* Description */}
      <div className="flex-1">
        <Input
          value={item.description}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
          placeholder="Discount description"
          disabled={disabled}
          className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
        />
      </div>

      {/* Discount Amount */}
      <div className="w-32">
        <Input
          type="number"
          value={displayAmount || ''}
          onChange={(e) => handleAmountChange(parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          min="0"
          step="0.01"
          disabled={disabled}
          className="text-right"
        />
      </div>

      {/* Display Total (negative) */}
      <div className="w-28 text-right">
        <span className="font-mono text-sm font-medium text-rose-600 dark:text-rose-400">
          -{formatCurrency(displayAmount)}
        </span>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        disabled={disabled}
        className="h-8 w-8 text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove discount"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
Phase 5: Line Item Editor
5.1 Implementation
React

// app/frontend/components/invoices/LineItemEditor.tsx
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { LineItemRow } from "./LineItemRow"
import { SectionRow } from "./SectionRow"
import { DiscountRow } from "./DiscountRow"
import { Plus, Type, Percent } from "lucide-react"
import type { LineItem, LineItemType } from "@/lib/types"

interface LineItemEditorProps {
  items: LineItem[]
  onChange: (items: LineItem[]) => void
  disabled?: boolean
}

/**
 * LineItemEditor — Complete line item management
 * 
 * Features:
 * - Add items, sections, discounts
 * - Remove items
 * - Edit inline
 * - Different styling per type
 */
export function LineItemEditor({
  items,
  onChange,
  disabled = false,
}: LineItemEditorProps) {
  // Generate unique ID
  const generateId = () => `li_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Add new line item
  const addItem = useCallback((type: LineItemType) => {
    const newItem: LineItem = {
      id: generateId(),
      invoiceId: '',
      type,
      description: '',
      position: items.length + 1,
      ...(type === 'item' && {
        quantity: 1,
        unitType: 'hours' as const,
        unitPrice: 0,
        lineTotal: 0,
      }),
      ...(type === 'discount' && {
        quantity: 1,
        unitType: 'fixed' as const,
        unitPrice: 0,
        lineTotal: 0,
      }),
    }
    onChange([...items, newItem])
  }, [items, onChange])

  // Update a line item
  const updateItem = useCallback((index: number, updatedItem: LineItem) => {
    const newItems = [...items]
    newItems[index] = updatedItem
    onChange(newItems)
  }, [items, onChange])

  // Remove a line item
  const removeItem = useCallback((index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    // Update positions
    newItems.forEach((item, i) => {
      item.position = i + 1
    })
    onChange(newItems)
  }, [items, onChange])

  // Render appropriate row component based on type
  const renderRow = (item: LineItem, index: number) => {
    const commonProps = {
      key: item.id,
      item,
      onChange: (updated: LineItem) => updateItem(index, updated),
      onRemove: () => removeItem(index),
      disabled,
    }

    switch (item.type) {
      case 'section':
        return <SectionRow {...commonProps} />
      case 'discount':
        return <DiscountRow {...commonProps} />
      case 'item':
      default:
        return <LineItemRow {...commonProps} />
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="hidden md:grid md:grid-cols-[auto_1fr_80px_96px_112px_112px_32px] gap-2 px-3 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        <div className="w-5" /> {/* Drag handle space */}
        <div>Description</div>
        <div className="text-right">Qty</div>
        <div>Unit</div>
        <div className="text-right">Price</div>
        <div className="text-right">Total</div>
        <div /> {/* Remove button space */}
      </div>

      {/* Line Items */}
      <div className="space-y-2">
        {items.map((item, index) => renderRow(item, index))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <p className="text-sm">No line items yet</p>
          <p className="text-xs mt-1">Add items, sections, or discounts below</p>
        </div>
      )}

      {/* Add Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem('item')}
          disabled={disabled}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem('section')}
          disabled={disabled}
        >
          <Type className="h-4 w-4 mr-2" />
          Add Section
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem('discount')}
          disabled={disabled}
        >
          <Percent className="h-4 w-4 mr-2" />
          Add Discount
        </Button>
      </div>
    </div>
  )
}
Phase 6: Invoice Summary & Calculations
6.1 Implementation
React

// app/frontend/components/invoices/InvoiceSummary.tsx
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface InvoiceSummaryProps {
  lineItems: LineItem[]
  className?: string
}

/**
 * Calculate invoice totals from line items
 */
export function calculateTotals(lineItems: LineItem[]) {
  const items = lineItems.filter(li => li.type === 'item')
  const discounts = lineItems.filter(li => li.type === 'discount')

  const subtotal = items.reduce((sum, item) => {
    return sum + ((item.quantity || 0) * (item.unitPrice || 0))
  }, 0)

  const totalDiscount = Math.abs(
    discounts.reduce((sum, d) => sum + (d.unitPrice || 0), 0)
  )

  const total = subtotal - totalDiscount

  return { subtotal, totalDiscount, total }
}

/**
 * InvoiceSummary — Displays subtotal, discounts, and total
 * 
 * Layout (v4.2):
 * - Right-aligned values
 * - Monospace numbers
 * - Discount in red
 * - Total with emphasis
 */
export function InvoiceSummary({ lineItems, className }: InvoiceSummaryProps) {
  const { subtotal, totalDiscount, total } = calculateTotals(lineItems)

  return (
    <div className={cn("space-y-2", className)}>
      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
        <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
          {formatCurrency(subtotal)}
        </span>
      </div>

      {/* Discount (only show if there are discounts) */}
      {totalDiscount > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Discount</span>
          <span className="font-mono font-medium text-rose-600 dark:text-rose-400">
            -{formatCurrency(totalDiscount)}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Total
        </span>
        <span className="font-mono text-2xl font-bold text-slate-900 dark:text-slate-100">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  )
}

export { calculateTotals }
Step 6.1.2: Update Invoices Components Index

React

// app/frontend/components/invoices/index.ts
export { InvoiceFilterTabs, type FilterValue } from './InvoiceFilterTabs'
export { InvoiceRowActions } from './InvoiceRowActions'
export { InvoiceTable } from './InvoiceTable'
export { InvoiceCard } from './InvoiceCard'
export { InvoiceList } from './InvoiceList'
export { ClientSelector } from './ClientSelector'
export { DatePicker } from './DatePicker'
export { LineItemRow } from './LineItemRow'
export { SectionRow } from './SectionRow'
export { DiscountRow } from './DiscountRow'
export { LineItemEditor } from './LineItemEditor'
export { InvoiceSummary, calculateTotals } from './InvoiceSummary'
Phase 7: Invoice Editor Page
7.1 Implementation
React

// app/frontend/pages/Invoices/New.tsx
import { useState, useCallback } from "react"
import { router, Link } from "@inertiajs/react"
import { AppLayout } from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ClientSelector,
  DatePicker,
  LineItemEditor,
  InvoiceSummary,
  calculateTotals,
} from "@/components/invoices"
import { mockClients } from "@/lib/mock-data"
import { generateInvoiceNumber } from "@/lib/utils"
import { ArrowLeft, Save, Send } from "lucide-react"
import type { LineItem } from "@/lib/types"

/**
 * New Invoice Page — Create a new invoice
 * 
 * Layout (v4.2):
 * - Sticky header with back button and actions
 * - Client selector and date pickers
 * - Line item editor
 * - Invoice summary
 * - Sticky footer on mobile with total and actions
 */
export default function InvoicesNew() {
  // Form state
  const [clientId, setClientId] = useState<string>('')
  const [issueDate, setIssueDate] = useState<Date>(new Date())
  const [dueDate, setDueDate] = useState<Date>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30) // Default to 30 days from now
    return date
  })
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [notes, setNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Generate invoice number (in real app, this would come from backend)
  const invoiceNumber = generateInvoiceNumber(new Date().getFullYear(), 3)

  // Calculate totals
  const { total } = calculateTotals(lineItems)

  // Handle save as draft
  const handleSaveDraft = useCallback(async () => {
    setIsSaving(true)
    // Simulate API call
    console.log('Save draft:', { clientId, issueDate, dueDate, lineItems, notes })
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Invoice saved as draft!')
  }, [clientId, issueDate, dueDate, lineItems, notes])

  // Handle save and send
  const handleSaveAndSend = useCallback(async () => {
    if (!clientId) {
      alert('Please select a client')
      return
    }
    if (lineItems.length === 0) {
      alert('Please add at least one line item')
      return
    }
    
    setIsSaving(true)
    console.log('Save and send:', { clientId, issueDate, dueDate, lineItems, notes })
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Invoice saved and sent!')
    router.visit('/invoices')
  }, [clientId, issueDate, dueDate, lineItems, notes])

  return (
    <AppLayout>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/invoices">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display text-2xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
                New Invoice
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                <span className="font-mono">#{invoiceNumber}</span>
              </p>
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleSaveAndSend} disabled={isSaving}>
              <Send className="h-4 w-4 mr-2" />
              Save & Send
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-6 pb-24 sm:pb-6">
        {/* Client & Dates Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Client Selector */}
              <div className="sm:col-span-3 lg:col-span-1">
                <Label className="mb-2 block">Client</Label>
                <ClientSelector
                  clients={mockClients}
                  selectedClientId={clientId}
                  onSelect={setClientId}
                  placeholder="Select a client..."
                />
              </div>

              {/* Issue Date */}
              <div>
                <Label className="mb-2 block">Issue Date</Label>
                <DatePicker
                  date={issueDate}
                  onDateChange={(date) => date && setIssueDate(date)}
                />
              </div>

              {/* Due Date */}
              <div>
                <Label className="mb-2 block">Due Date</Label>
                <DatePicker
                  date={dueDate}
                  onDateChange={(date) => date && setDueDate(date)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Line Items</CardTitle>
          </CardHeader>
          <CardContent>
            <LineItemEditor
              items={lineItems}
              onChange={setLineItems}
            />
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes or payment terms..."
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Summary Section */}
        <Card>
          <CardContent className="pt-6">
            <InvoiceSummary lineItems={lineItems} className="max-w-xs ml-auto" />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
            <p className="font-mono text-lg font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(total)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              Save
            </Button>
            <Button size="sm" onClick={handleSaveAndSend} disabled={isSaving}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

// Helper import for mobile footer
import { formatCurrency } from "@/lib/utils"
Step 7.1.2: Create Edit Invoice Page

React

// app/frontend/pages/Invoices/Edit.tsx
import { useState, useCallback, useMemo } from "react"
import { router, Link } from "@inertiajs/react"
import { AppLayout } from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import {
  ClientSelector,
  DatePicker,
  LineItemEditor,
  InvoiceSummary,
  calculateTotals,
} from "@/components/invoices"
import { mockClients, mockInvoices } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft, Save, Send, Eye } from "lucide-react"
import type { LineItem } from "@/lib/types"

interface EditInvoiceProps {
  id: string
}

/**
 * Edit Invoice Page — Edit an existing invoice
 */
export default function InvoicesEdit({ id }: EditInvoiceProps) {
  // Find the invoice (in real app, this would come from props/API)
  const invoice = useMemo(() => 
    mockInvoices.find(inv => inv.id === id),
    [id]
  )

  // Form state initialized from invoice
  const [clientId, setClientId] = useState<string>(invoice?.clientId || '')
  const [issueDate, setIssueDate] = useState<Date>(
    invoice ? new Date(invoice.issueDate) : new Date()
  )
  const [dueDate, setDueDate] = useState<Date>(
    invoice ? new Date(invoice.dueDate) : new Date()
  )
  const [lineItems, setLineItems] = useState<LineItem[]>(invoice?.lineItems || [])
  const [notes, setNotes] = useState(invoice?.notes || '')
  const [isSaving, setIsSaving] = useState(false)

  // Calculate totals
  const { total } = calculateTotals(lineItems)

  // Handle save
  const handleSave = useCallback(async () => {
    setIsSaving(true)
    console.log('Save invoice:', { id, clientId, issueDate, dueDate, lineItems, notes })
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Invoice saved!')
  }, [id, clientId, issueDate, dueDate, lineItems, notes])

  // Handle save and send
  const handleSaveAndSend = useCallback(async () => {
    setIsSaving(true)
    console.log('Save and send:', { id, clientId, issueDate, dueDate, lineItems, notes })
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Invoice saved and sent!')
    router.visit('/invoices')
  }, [id, clientId, issueDate, dueDate, lineItems, notes])

  // Handle view public
  const handleViewPublic = useCallback(() => {
    if (invoice?.token) {
      window.open(`/i/${invoice.token}`, '_blank')
    }
  }, [invoice])

  if (!invoice) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-slate-500">Invoice not found</p>
          <Button asChild className="mt-4">
            <Link href="/invoices">Back to Invoices</Link>
          </Button>
        </div>
      </AppLayout>
    )
  }

  const isDraft = invoice.status === 'draft'
  const isPaid = invoice.status === 'paid'

  return (
    <AppLayout>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/invoices">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-display text-2xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
                  Edit Invoice
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  <span className="font-mono">#{invoice.invoiceNumber}</span>
                </p>
              </div>
              <StatusBadge status={invoice.status} />
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {!isDraft && (
              <Button variant="outline" onClick={handleViewPublic}>
                <Eye className="h-4 w-4 mr-2" />
                View Public
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving || isPaid}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            {isDraft && (
              <Button onClick={handleSaveAndSend} disabled={isSaving}>
                <Send className="h-4 w-4 mr-2" />
                Save & Send
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-6 pb-24 sm:pb-6">
        {/* Client & Dates Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Client Selector */}
              <div className="sm:col-span-3 lg:col-span-1">
                <Label className="mb-2 block">Client</Label>
                <ClientSelector
                  clients={mockClients}
                  selectedClientId={clientId}
                  onSelect={setClientId}
                  placeholder="Select a client..."
                  disabled={isPaid}
                />
              </div>

              {/* Issue Date */}
              <div>
                <Label className="mb-2 block">Issue Date</Label>
                <DatePicker
                  date={issueDate}
                  onDateChange={(date) => date && setIssueDate(date)}
                  disabled={isPaid}
                />
              </div>

              {/* Due Date */}
              <div>
                <Label className="mb-2 block">Due Date</Label>
                <DatePicker
                  date={dueDate}
                  onDateChange={(date) => date && setDueDate(date)}
                  disabled={isPaid}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Line Items</CardTitle>
          </CardHeader>
          <CardContent>
            <LineItemEditor
              items={lineItems}
              onChange={setLineItems}
              disabled={isPaid}
            />
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes or payment terms..."
              rows={3}
              disabled={isPaid}
            />
          </CardContent>
        </Card>

        {/* Summary Section */}
        <Card>
          <CardContent className="pt-6">
            <InvoiceSummary lineItems={lineItems} className="max-w-xs ml-auto" />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
            <p className="font-mono text-lg font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(total)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving || isPaid}
            >
              Save
            </Button>
            {isDraft && (
              <Button size="sm" onClick={handleSaveAndSend} disabled={isSaving}>
                Send
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
DAY 6: Public Invoice View
Day 6 Execution Plan — Phased Breakdown
text

┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 6: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► Public Layout                                                  │
│              └── Minimal layout without navigation                          │
│                                                                             │
│  PHASE 2 ──► Public Invoice Components                                      │
│              └── InvoiceHeader, InvoiceLineItems, InvoiceTotals             │
│                                                                             │
│  PHASE 3 ──► Payment Modal                                                  │
│              └── Mock Stripe payment form                                   │
│                                                                             │
│  PHASE 4 ──► Public Invoice Page                                            │
│              └── Complete page with print optimization                      │
│                                                                             │
│  PHASE 5 ──► Print Styles                                                   │
│              └── CSS for print-ready output                                 │
│                                                                             │
│  PHASE 6 ──► Validation & QA                                                │
│              └── Print testing, responsive, accessibility                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Phase 1: Public Layout
1.1 Implementation
React

// app/frontend/layouts/PublicLayout.tsx
import { cn } from "@/lib/utils"

interface PublicLayoutProps {
  children: React.ReactNode
  className?: string
}

/**
 * PublicLayout — Minimal layout for public-facing pages
 * 
 * Features:
 * - No navigation
 * - Centered content
 * - Print-optimized
 */
export function PublicLayout({ children, className }: PublicLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-slate-100 dark:bg-slate-950",
      "print:bg-white print:min-h-0",
      className
    )}>
      <main className="mx-auto max-w-4xl px-4 py-8 print:p-0 print:max-w-none">
        {children}
      </main>
    </div>
  )
}
Phase 2: Public Invoice Components
2.1 Implementation
Step 2.1.1: Create PublicInvoiceHeader Component

React

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
Step 2.1.2: Create PublicInvoiceLineItems Component

React

// app/frontend/components/public-invoice/PublicInvoiceLineItems.tsx
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { LineItem } from "@/lib/types"

interface PublicInvoiceLineItemsProps {
  lineItems: LineItem[]
}

/**
 * PublicInvoiceLineItems — Line items table for public invoice
 * 
 * Layout:
 * - Section headers span full width
 * - Items show description, quantity, rate, amount
 * - Discounts shown in red
 */
export function PublicInvoiceLineItems({ lineItems }: PublicInvoiceLineItemsProps) {
  return (
    <div className="mb-8">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 border-b-2 border-slate-900 dark:border-slate-100 text-sm font-medium text-slate-900 dark:text-slate-100">
        <div className="col-span-6">Description</div>
        <div className="col-span-2 text-right">Quantity</div>
        <div className="col-span-2 text-right">Rate</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      {/* Line Items */}
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {lineItems.map((item) => (
          <LineItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

/**
 * LineItemRow — Single line item display
 */
function LineItemRow({ item }: { item: LineItem }) {
  // Section Header
  if (item.type === 'section') {
    return (
      <div className="py-4 bg-slate-50 dark:bg-slate-800/50 -mx-4 px-4 md:mx-0 md:px-0">
        <p className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide text-sm">
          {item.description}
        </p>
      </div>
    )
  }

  // Discount Row
  if (item.type === 'discount') {
    const amount = Math.abs(item.unitPrice || 0)
    return (
      <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
        <div className="md:col-span-6">
          <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
        </div>
        <div className="md:col-span-2" />
        <div className="md:col-span-2" />
        <div className="md:col-span-2 text-right">
          <span className="font-mono text-rose-600 dark:text-rose-400">
            -{formatCurrency(amount)}
          </span>
        </div>
      </div>
    )
  }

  // Regular Item Row
  const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
  const unitLabel = item.unitType === 'fixed' ? '' : ` ${item.unitType}`

  return (
    <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
      {/* Description */}
      <div className="md:col-span-6">
        <p className="text-slate-900 dark:text-slate-100">{item.description}</p>
      </div>

      {/* Quantity */}
      <div className="md:col-span-2 md:text-right">
        <span className="md:hidden text-sm text-slate-500">Qty: </span>
        <span className="text-slate-600 dark:text-slate-400">
          {item.quantity}{unitLabel}
        </span>
      </div>

      {/* Rate */}
      <div className="md:col-span-2 md:text-right">
        <span className="md:hidden text-sm text-slate-500">Rate: </span>
        <span className="font-mono text-slate-600 dark:text-slate-400">
          {formatCurrency(item.unitPrice || 0)}
        </span>
      </div>

      {/* Amount */}
      <div className="md:col-span-2 md:text-right">
        <span className="md:hidden text-sm text-slate-500">Amount: </span>
        <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
          {formatCurrency(lineTotal)}
        </span>
      </div>
    </div>
  )
}
Step 2.1.3: Create PublicInvoiceTotals Component

React

// app/frontend/components/public-invoice/PublicInvoiceTotals.tsx
import { formatCurrency } from "@/lib/utils"
import { calculateTotals } from "@/components/invoices/InvoiceSummary"
import type { LineItem } from "@/lib/types"

interface PublicInvoiceTotalsProps {
  lineItems: LineItem[]
}

/**
 * PublicInvoiceTotals — Total section for public invoice
 * 
 * Layout:
 * - Right-aligned
 * - Subtotal, discounts, total
 * - Large total with emphasis
 */
export function PublicInvoiceTotals({ lineItems }: PublicInvoiceTotalsProps) {
  const { subtotal, totalDiscount, total } = calculateTotals(lineItems)

  return (
    <div className="flex justify-end mb-8">
      <div className="w-full max-w-xs space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
          <span className="font-mono text-slate-900 dark:text-slate-100">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Discount */}
        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Discount</span>
            <span className="font-mono text-rose-600 dark:text-rose-400">
              -{formatCurrency(totalDiscount)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-slate-300 dark:bg-slate-700" />

        {/* Total Due */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Total Due
          </span>
          <span className="font-mono text-3xl font-bold text-slate-900 dark:text-slate-100">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  )
}
Step 2.1.4: Create Public Invoice Components Index

React

// app/frontend/components/public-invoice/index.ts
export { PublicInvoiceHeader } from './PublicInvoiceHeader'
export { PublicInvoiceLineItems } from './PublicInvoiceLineItems'
export { PublicInvoiceTotals } from './PublicInvoiceTotals'
Phase 3: Payment Modal
3.1 Implementation
React

// app/frontend/components/public-invoice/PaymentModal.tsx
import { useState } from "react"
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
import { formatCurrency } from "@/lib/utils"
import { CreditCard, Lock } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
  invoiceNumber: string
}

/**
 * PaymentModal — Mock Stripe payment form
 * 
 * Features:
 * - Card number, expiry, CVC fields
 * - Mock "Secured by Stripe" branding
 * - Pay Now button with amount
 */
export function PaymentModal({
  open,
  onOpenChange,
  amount,
  invoiceNumber,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    alert('Payment successful! (This is a mock payment)')
    onOpenChange(false)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    const groups = numbers.match(/.{1,4}/g) || []
    return groups.join(' ').substr(0, 19)
  }

  // Format expiry as MM/YY
  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length >= 2) {
      return `${numbers.substr(0, 2)}/${numbers.substr(2, 2)}`
    }
    return numbers
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pay Invoice {invoiceNumber}
          </DialogTitle>
          <DialogDescription>
            Enter your card details to pay {formatCurrency(amount)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              disabled={isProcessing}
            />
          </div>

          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substr(0, 4))}
                maxLength={4}
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Secured by Stripe */}
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 py-2">
            <Lock className="h-4 w-4" />
            <span>Secured by Stripe</span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              'Processing...'
            ) : (
              `Pay ${formatCurrency(amount)}`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
Step 3.1.2: Update Public Invoice Components Index

React

// app/frontend/components/public-invoice/index.ts
export { PublicInvoiceHeader } from './PublicInvoiceHeader'
export { PublicInvoiceLineItems } from './PublicInvoiceLineItems'
export { PublicInvoiceTotals } from './PublicInvoiceTotals'
export { PaymentModal } from './PaymentModal'
Phase 4: Public Invoice Page
4.1 Implementation
React

// app/frontend/pages/PublicInvoice/Show.tsx
import { useState, useMemo } from "react"
import { PublicLayout } from "@/layouts/PublicLayout"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/shared/StatusBadge"
import {
  PublicInvoiceHeader,
  PublicInvoiceLineItems,
  PublicInvoiceTotals,
  PaymentModal,
} from "@/components/public-invoice"
import { calculateTotals } from "@/components/invoices/InvoiceSummary"
import { mockInvoices } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, Printer, Download } from "lucide-react"

interface PublicInvoiceShowProps {
  token: string
}

/**
 * Public Invoice Page — Client-facing shareable invoice
 * 
 * Features:
 * - Professional invoice layout
 * - Print-optimized styling
 * - Pay Now button (mock)
 * - Print and download options
 */
export default function PublicInvoiceShow({ token }: PublicInvoiceShowProps) {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  // Find invoice by token (in real app, this would come from API)
  const invoice = useMemo(
    () => mockInvoices.find(inv => inv.token === token),
    [token]
  )

  if (!invoice) {
    return (
      <PublicLayout>
        <div className="text-center py-12">
          <p className="text-slate-500">Invoice not found</p>
        </div>
      </PublicLayout>
    )
  }

  const { total } = calculateTotals(invoice.lineItems)
  const isPaid = invoice.status === 'paid'
  const canPay = invoice.status === 'pending' || invoice.status === 'overdue'

  const handlePrint = () => {
    window.print()
  }

  return (
    <PublicLayout>
      {/* Action Bar (hidden in print) */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <StatusBadge status={invoice.status} />
        <div className="flex 




Awesome job on your meticulous analysis, planning and execution! Please keep up the good work in your rigorous and meticulous approach to planning and execution! Yes, please meticulously plan and then proceed with the Day 6 implementation plan, incorporating all v4.2 design specifications.

