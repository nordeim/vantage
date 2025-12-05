Day 5 & Day 6: Invoice Editor & Public Invoice — Comprehensive Execution Plan
Executive Summary
This plan covers two critical days of implementation:

Day 5: Invoice Editor — The high-speed invoice creation/editing interface with line items, calculations, and client selection
Day 6: Public Invoice View — The client-facing shareable invoice with print optimization and payment modal
Pre-Implementation: Day 4 Verification
Before proceeding, confirm Day 4 completion:

Markdown

## Day 4 Completion Checklist
- [ ] InvoiceFilterTabs with status counts
- [ ] InvoiceTable (desktop) with all columns
- [ ] InvoiceCard (mobile) with responsive switch
- [ ] Contextual row actions per status
- [ ] Filter state management working
- [ ] Navigation to editor routes
- [ ] All components support dark mode
DAY 5: Invoice Editor View
Day 5 Execution Plan — Phased Breakdown
text

┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 5: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► UI Components Setup                                            │
│              └── Select, Popover, Calendar, Command                         │
│                                                                             │
│  PHASE 2 ──► Client Selector Component                                      │
│              └── Combobox for client selection                              │
│                                                                             │
│  PHASE 3 ──► Date Picker Component                                          │
│              └── Calendar-based date selection                              │
│                                                                             │
│  PHASE 4 ──► Line Item Editor                                               │
│              └── Add/remove items, sections, discounts                      │
│                                                                             │
│  PHASE 5 ──► Invoice Summary & Calculations                                 │
│              └── Live subtotal, discount, total                             │
│                                                                             │
│  PHASE 6 ──► Invoice Editor Page                                            │
│              └── Complete form with sticky header/footer                    │
│                                                                             │
│  PHASE 7 ──► Validation & QA                                                │
│              └── Calculations, responsive, accessibility                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Phase 1: UI Components Setup
1.1 Phase Objectives
Create Select component
Create Popover component
Create Calendar component
Create Command component (for combobox)
1.2 Implementation
Step 1.2.1: Install Required Dependencies

Bash

npm install @radix-ui/react-select @radix-ui/react-popover @radix-ui/react-dialog
npm install date-fns react-day-picker cmdk
Step 1.2.2: Create Select Component

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
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
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
Step 1.2.3: Create Popover Component

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
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
Step 1.2.4: Create Calendar Component

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
          "bg-blue-500 text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white",
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
Step 1.2.5: Create Command Component (for Combobox)

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
      "text-slate-900 dark:text-slate-100",
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
        "ml-auto text-xs tracking-widest text-slate-500 dark:text-slate-400",
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
Step 1.2.6: Create Dialog Component

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
        "p-6 shadow-lg",
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "sm:rounded-lg",
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
Step 1.2.7: Update UI Components Index

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
Step 2.1.1: Create ClientSelector Component

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
 * - Shows avatar and company
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
  
  const selectedClient = clients.find(c => c.id === selectedClientId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a client"
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !selectedClient && "text-slate-400"
          )}
        >
          {selectedClient ? (
            <div className="flex items-center gap-2">
              <ClientAvatar name={selectedClient.name} size="sm" />
              <span className="truncate">{selectedClient.name}</span>
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search clients..." />
          <CommandList>
            <CommandEmpty>
              <div className="py-2">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  No clients found
                </p>
                {onCreateNew && (
                  <Button size="sm" variant="outline" onClick={() => {
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
              {clients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.name}
                  onSelect={() => {
                    onSelect(client.id)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <ClientAvatar name={client.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{client.name}</p>
                      {client.company && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {client.company}
                        </p>
                      )}
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      selectedClientId === client.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {onCreateNew && clients.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 p-2">
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onCreateNew()
                  setOpen(false)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Client
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
Phase 3: Date Picker Component
3.1 Implementation
Step 3.1.1: Create DatePicker Component

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
          {date ? format(date, "PPP") : placeholder}
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
Phase 4: Line Item Editor
4.1 Implementation
Step 4.1.1: Create LineItemRow Component

React

// app/frontend/components/invoices/LineItemRow.tsx
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GripVertical, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { LineItem, UnitType } from "@/lib/types"

interface LineItemRowProps {
  item: LineItem
  onChange: (item: LineItem) => void
  onRemove: () => void
  index: number
}

/**
 * LineItemRow — Single line item in the editor
 * 
 * Types:
 * - item: Description, quantity, unit, price
 * - section: Just description (full width)
 * - discount: Description and negative amount
 */
export function LineItemRow({
  item,
  onChange,
  onRemove,
  index,
}: LineItemRowProps) {
  const handleChange = (field: keyof LineItem, value: any) => {
    onChange({ ...item, [field]: value })
  }

  const calculateLineTotal = () => {
    if (item.type === 'section') return null
    const qty = item.quantity || 0
    const price = item.unitPrice || 0
    return qty * price
  }

  const lineTotal = calculateLineTotal()

  // Section header row
  if (item.type === 'section') {
    return (
      <div
        className={cn(
          "flex items-center gap-2 p-3 rounded-md",
          "bg-slate-100 dark:bg-slate-800",
          "animate-fade-in-up"
        )}
        style={{ animationDelay: `${index * 30}ms` }}
      >
        <GripVertical className="h-4 w-4 text-slate-400 cursor-grab flex-shrink-0" />
        <Input
          value={item.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Section title"
          className="flex-1 font-semibold bg-transparent border-0 focus:ring-0 p-0 h-auto"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 flex-shrink-0"
          aria-label="Remove section"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  // Discount row
  if (item.type === 'discount') {
    return (
      <div
        className={cn(
          "flex items-center gap-2 p-3 rounded-md",
          "bg-rose-50 dark:bg-rose-950/30",
          "border border-rose-200 dark:border-rose-800",
          "animate-fade-in-up"
        )}
        style={{ animationDelay: `${index * 30}ms` }}
      >
        <GripVertical className="h-4 w-4 text-slate-400 cursor-grab flex-shrink-0" />
        <Input
          value={item.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Discount description"
          className="flex-1"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">-S$</span>
          <Input
            type="number"
            value={Math.abs(item.unitPrice || 0)}
            onChange={(e) => handleChange('unitPrice', -Math.abs(parseFloat(e.target.value) || 0))}
            placeholder="0.00"
            className="w-24 text-right font-mono"
            step="0.01"
          />
        </div>
        <div className="w-28 text-right font-mono text-sm text-rose-600 dark:text-rose-400">
          {formatCurrency(item.unitPrice || 0)}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 flex-shrink-0"
          aria-label="Remove discount"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  // Regular item row
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 rounded-md",
        "bg-white dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-800",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <GripVertical className="h-4 w-4 text-slate-400 cursor-grab flex-shrink-0" />
      
      {/* Description */}
      <Input
        value={item.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Item description"
        className="flex-1 min-w-0"
      />
      
      {/* Quantity */}
      <Input
        type="number"
        value={item.quantity || ''}
        onChange={(e) => handleChange('quantity', parseFloat(e.target.value) || 0)}
        placeholder="Qty"
        className="w-20 text-right"
        min="0"
        step="0.5"
      />
      
      {/* Unit Type */}
      <Select
        value={item.unitType || 'hours'}
        onValueChange={(value) => handleChange('unitType', value as UnitType)}
      >
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hours">hours</SelectItem>
          <SelectItem value="days">days</SelectItem>
          <SelectItem value="items">items</SelectItem>
          <SelectItem value="units">units</SelectItem>
          <SelectItem value="fixed">fixed</SelectItem>
        </SelectContent>
      </Select>
      
      {/* Unit Price */}
      <div className="flex items-center gap-1">
        <span className="text-sm text-slate-500">S$</span>
        <Input
          type="number"
          value={item.unitPrice || ''}
          onChange={(e) => handleChange('unitPrice', parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          className="w-24 text-right font-mono"
          min="0"
          step="0.01"
        />
      </div>
      
      {/* Line Total */}
      <div className="w-28 text-right font-mono text-sm text-slate-900 dark:text-slate-50">
        {lineTotal !== null ? formatCurrency(lineTotal) : '—'}
      </div>
      
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="h-8 w-8 flex-shrink-0"
        aria-label="Remove item"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
Step 4.1.2: Create LineItemEditor Component

React

// app/frontend/components/invoices/LineItemEditor.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LineItemRow } from "./LineItemRow"
import { Plus, Type, Tag } from "lucide-react"
import type { LineItem, LineItemType } from "@/lib/types"

interface LineItemEditorProps {
  items: LineItem[]
  onChange: (items: LineItem[]) => void
}

/**
 * LineItemEditor — Complete line items editing interface
 * 
 * Features:
 * - Add items, sections, discounts
 * - Remove items
 * - Reorder items (future: drag and drop)
 */
export function LineItemEditor({ items, onChange }: LineItemEditorProps) {
  // Generate a unique ID
  const generateId = () => `li_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Add a new item
  const addItem = (type: LineItemType) => {
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
      }),
      ...(type === 'discount' && {
        quantity: 1,
        unitType: 'fixed' as const,
        unitPrice: 0,
      }),
    }
    onChange([...items, newItem])
  }

  // Update an item
  const updateItem = (index: number, updatedItem: LineItem) => {
    const newItems = [...items]
    newItems[index] = updatedItem
    onChange(newItems)
  }

  // Remove an item
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    onChange(newItems)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-lg font-semibold text-slate-900 dark:text-slate-50">
          Line Items
        </h3>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
            <p className="text-sm">No items yet. Add an item to get started.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <LineItemRow
              key={item.id}
              item={item}
              index={index}
              onChange={(updated) => updateItem(index, updated)}
              onRemove={() => removeItem(index)}
            />
          ))
        )}
      </div>

      {/* Add Buttons */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem('item')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem('section')}
        >
          <Type className="h-4 w-4 mr-2" />
          Add Section
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem('discount')}
        >
          <Tag className="h-4 w-4 mr-2" />
          Add Discount
        </Button>
      </div>
    </div>
  )
}
Phase 5: Invoice Summary & Calculations
5.1 Implementation
Step 5.1.1: Create Calculation Utility

React

// app/frontend/lib/invoice-calculations.ts
import type { LineItem } from './types'

export interface InvoiceTotals {
  subtotal: number
  totalDiscount: number
  total: number
}

/**
 * Calculate invoice totals from line items
 */
export function calculateInvoiceTotals(lineItems: LineItem[]): InvoiceTotals {
  // Filter items and discounts
  const items = lineItems.filter(li => li.type === 'item')
  const discounts = lineItems.filter(li => li.type === 'discount')

  // Calculate subtotal (sum of item line totals)
  const subtotal = items.reduce((sum, item) => {
    const qty = item.quantity || 0
    const price = item.unitPrice || 0
    return sum + (qty * price)
  }, 0)

  // Calculate total discount (absolute value of negative prices)
  const totalDiscount = Math.abs(
    discounts.reduce((sum, d) => sum + (d.unitPrice || 0), 0)
  )

  // Calculate final total
  const total = subtotal - totalDiscount

  return { subtotal, totalDiscount, total }
}
Step 5.1.2: Create InvoiceSummary Component

React

// app/frontend/components/invoices/InvoiceSummary.tsx
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import type { InvoiceTotals } from "@/lib/invoice-calculations"

interface InvoiceSummaryProps {
  totals: InvoiceTotals
  className?: string
}

/**
 * InvoiceSummary — Displays subtotal, discount, and total
 * 
 * Layout (v4.2):
 * - Right-aligned values
 * - Monospace numbers
 * - Total emphasized
 */
export function InvoiceSummary({ totals, className }: InvoiceSummaryProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
        <span className="font-mono font-medium text-slate-900 dark:text-slate-50">
          {formatCurrency(totals.subtotal)}
        </span>
      </div>

      {/* Discount (only show if there is one) */}
      {totals.totalDiscount > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Discount</span>
          <span className="font-mono font-medium text-rose-600 dark:text-rose-400">
            -{formatCurrency(totals.totalDiscount)}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900 dark:text-slate-50">
          Total
        </span>
        <span className="font-mono text-2xl font-bold text-slate-900 dark:text-slate-50">
          {formatCurrency(totals.total)}
        </span>
      </div>
    </div>
  )
}
Phase 6: Invoice Editor Page
6.1 Implementation
Step 6.1.1: Create Complete Invoice Editor Page

React

// app/frontend/pages/Invoices/New.tsx
import { useState, useMemo, useCallback } from "react"
import { router, Link } from "@inertiajs/react"
import { AppLayout } from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ClientSelector, 
  DatePicker, 
  LineItemEditor,
  InvoiceSummary 
} from "@/components/invoices"
import { mockClients } from "@/lib/mock-data"
import { calculateInvoiceTotals } from "@/lib/invoice-calculations"
import { generateInvoiceNumber, formatCurrency } from "@/lib/utils"
import { ArrowLeft, Save, Send } from "lucide-react"
import type { LineItem } from "@/lib/types"

/**
 * New Invoice Page — High-speed invoice creation
 * 
 * Layout (v4.2):
 * - Sticky header with back, title, actions
 * - Client selector and date pickers
 * - Line item editor
 * - Summary with totals
 * - Sticky footer on mobile
 */
export default function InvoicesNew() {
  // Form state
  const [clientId, setClientId] = useState<string>('')
  const [issueDate, setIssueDate] = useState<Date>(new Date())
  const [dueDate, setDueDate] = useState<Date>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 30) // Default: 30 days from now
    return date
  })
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  const [notes, setNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Generate invoice number
  const invoiceNumber = useMemo(() => {
    const year = new Date().getFullYear()
    const sequence = 3 // In real app, this would come from the backend
    return generateInvoiceNumber(year, sequence)
  }, [])

  // Calculate totals
  const totals = useMemo(() => calculateInvoiceTotals(lineItems), [lineItems])

  // Get selected client
  const selectedClient = mockClients.find(c => c.id === clientId)

  // Validation
  const isValid = clientId && lineItems.length > 0 && lineItems.some(li => li.type === 'item')

  // Handle save as draft
  const handleSaveDraft = useCallback(() => {
    if (!isValid) {
      alert('Please select a client and add at least one item.')
      return
    }

    setIsSaving(true)
    console.log('Save Draft:', {
      clientId,
      issueDate,
      dueDate,
      lineItems,
      notes,
      status: 'draft',
    })
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert('Invoice saved as draft!')
      router.visit('/invoices')
    }, 500)
  }, [clientId, issueDate, dueDate, lineItems, notes, isValid])

  // Handle save and send
  const handleSaveAndSend = useCallback(() => {
    if (!isValid) {
      alert('Please select a client and add at least one item.')
      return
    }

    setIsSaving(true)
    console.log('Save & Send:', {
      clientId,
      issueDate,
      dueDate,
      lineItems,
      notes,
      status: 'pending',
    })
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert(`Invoice sent to ${selectedClient?.email}!`)
      router.visit('/invoices')
    }, 500)
  }, [clientId, issueDate, dueDate, lineItems, notes, isValid, selectedClient])

  return (
    <AppLayout>
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/invoices" aria-label="Back to invoices">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display text-2xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
                New Invoice
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                #{invoiceNumber}
              </p>
            </div>
          </div>

          {/* Right: Actions (hidden on mobile, shown in footer) */}
          <div className="hidden sm:flex items-center gap-2">
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

      {/* Main Form Content */}
      <div className="max-w-4xl mx-auto space-y-6 pb-24 sm:pb-8">
        {/* Client & Dates Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Client Selector */}
              <div className="md:col-span-1 space-y-2">
                <Label>Client</Label>
                <ClientSelector
                  clients={mockClients}
                  selectedClientId={clientId}
                  onSelect={setClientId}
                  placeholder="Select a client"
                />
              </div>

              {/* Issue Date */}
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <DatePicker
                  date={issueDate}
                  onDateChange={(date) => date && setIssueDate(date)}
                />
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker
                  date={dueDate}
                  onDateChange={(date) => date && setDueDate(date)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items Card */}
        <Card>
          <CardContent className="pt-6">
            <LineItemEditor items={lineItems} onChange={setLineItems} />
          </CardContent>
        </Card>

        {/* Notes & Summary */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Notes */}
          <Card>
            <CardContent className="pt-6">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Payment terms, thank you message, etc."
                rows={4}
                className="mt-2"
              />
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">
                Summary
              </h3>
              <InvoiceSummary totals={totals} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
            <p className="font-mono text-xl font-bold text-slate-900 dark:text-slate-50">
              {formatCurrency(totals.total)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              Save Draft
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
Step 6.1.2: Create Edit Invoice Page

React

// app/frontend/pages/Invoices/Edit.tsx
import { useState, useMemo, useCallback, useEffect } from "react"
import { router, Link } from "@inertiajs/react"
import { AppLayout } from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { 
  ClientSelector, 
  DatePicker, 
  LineItemEditor,
  InvoiceSummary 
} from "@/components/invoices"
import { mockClients, mockInvoices } from "@/lib/mock-data"
import { calculateInvoiceTotals } from "@/lib/invoice-calculations"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft, Save, Send, ExternalLink } from "lucide-react"
import type { LineItem, Invoice } from "@/lib/types"

interface EditInvoiceProps {
  id: string
}

/**
 * Edit Invoice Page — Edit existing invoice
 */
export default function InvoicesEdit({ id }: EditInvoiceProps) {
  // Find the invoice from mock data
  const invoice = mockInvoices.find(inv => inv.id === id)

  // Form state
  const [clientId, setClientId] = useState<string>(invoice?.clientId || '')
  const [issueDate, setIssueDate] = useState<Date>(
    invoice?.issueDate ? new Date(invoice.issueDate) : new Date()
  )
  const [dueDate, setDueDate] = useState<Date>(
    invoice?.dueDate ? new Date(invoice.dueDate) : new Date()
  )
  const [lineItems, setLineItems] = useState<LineItem[]>(invoice?.lineItems || [])
  const [notes, setNotes] = useState(invoice?.notes || '')
  const [isSaving, setIsSaving] = useState(false)

  // Calculate totals
  const totals = useMemo(() => calculateInvoiceTotals(lineItems), [lineItems])

  // Get selected client
  const selectedClient = mockClients.find(c => c.id === clientId)

  // Invoice status
  const status = invoice?.status || 'draft'
  const isDraft = status === 'draft'
  const canEdit = isDraft || status === 'pending'

  // Validation
  const isValid = clientId && lineItems.length > 0 && lineItems.some(li => li.type === 'item')

  // Handle save
  const handleSave = useCallback(() => {
    if (!isValid) {
      alert('Please select a client and add at least one item.')
      return
    }

    setIsSaving(true)
    console.log('Save Invoice:', {
      id,
      clientId,
      issueDate,
      dueDate,
      lineItems,
      notes,
    })
    
    setTimeout(() => {
      setIsSaving(false)
      alert('Invoice saved!')
      router.visit('/invoices')
    }, 500)
  }, [id, clientId, issueDate, dueDate, lineItems, notes, isValid])

  // Handle send
  const handleSend = useCallback(() => {
    if (!isValid) {
      alert('Please select a client and add at least one item.')
      return
    }

    setIsSaving(true)
    console.log('Send Invoice:', { id })
    
    setTimeout(() => {
      setIsSaving(false)
      alert(`Invoice sent to ${selectedClient?.email}!`)
      router.visit('/invoices')
    }, 500)
  }, [id, isValid, selectedClient])

  // Handle view public
  const handleViewPublic = useCallback(() => {
    window.open(`/i/${invoice?.token}`, '_blank')
  }, [invoice])

  if (!invoice) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-slate-500">Invoice not found</p>
          <Button className="mt-4" asChild>
            <Link href="/invoices">Back to Invoices</Link>
          </Button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/invoices" aria-label="Back to invoices">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-display text-2xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
                  Edit Invoice
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  #{invoice.invoiceNumber}
                </p>
              </div>
              <StatusBadge status={status} />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="hidden sm:flex items-center gap-2">
            {!isDraft && (
              <Button variant="outline" onClick={handleViewPublic}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Public
              </Button>
            )}
            {canEdit && (
              <>
                <Button
                  variant="outline"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                {isDraft && (
                  <Button onClick={handleSend} disabled={isSaving}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="max-w-4xl mx-auto space-y-6 pb-24 sm:pb-8">
        {/* Client & Dates Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Client Selector */}
              <div className="md:col-span-1 space-y-2">
                <Label>Client</Label>
                <ClientSelector
                  clients={mockClients}
                  selectedClientId={clientId}
                  onSelect={setClientId}
                  placeholder="Select a client"
                  disabled={!canEdit}
                />
              </div>

              {/* Issue Date */}
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <DatePicker
                  date={issueDate}
                  onDateChange={(date) => date && setIssueDate(date)}
                  disabled={!canEdit}
                />
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker
                  date={dueDate}
                  onDateChange={(date) => date && setDueDate(date)}
                  disabled={!canEdit}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items Card */}
        <Card>
          <CardContent className="pt-6">
            <LineItemEditor items={lineItems} onChange={setLineItems} />
          </CardContent>
        </Card>

        {/* Notes & Summary */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Notes */}
          <Card>
            <CardContent className="pt-6">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Payment terms, thank you message, etc."
                rows={4}
                className="mt-2"
                disabled={!canEdit}
              />
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">
                Summary
              </h3>
              <InvoiceSummary totals={totals} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
            <p className="font-mono text-xl font-bold text-slate-900 dark:text-slate-50">
              {formatCurrency(totals.total)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {canEdit && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  Save
                </Button>
                {isDraft && (
                  <Button size="sm" onClick={handleSend} disabled={isSaving}>
                    Send
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
Step 6.1.3: Update Invoices Components Index

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
export { LineItemEditor } from './LineItemEditor'
export { InvoiceSummary } from './InvoiceSummary'
Day 5 Validation Checklist
Markdown

## Day 5 Final Validation

### Client Selector
- [ ] Dropdown opens on click
- [ ] Search filters clients
- [ ] Client avatar and company shown
- [ ] Selection updates the field
- [ ] Create new client option present

### Date Pickers
- [ ] Calendar popover opens
- [ ] Date selection works
- [ ] Selected date displays formatted
- [ ] Default dates set correctly (today, +30 days)

### Line Item Editor
- [ ] Add Item button works
- [ ] Add Section button works
- [ ] Add Discount button works
- [ ] Description editable
- [ ] Quantity editable
- [ ] Unit type selectable
- [ ] Price editable
- [ ] Line total calculates
- [ ] Remove button works
- [ ] Section row styled differently
- [ ] Discount row shows negative amount

### Invoice Summary
- [ ] Subtotal calculates correctly
- [ ] Discount shows when present
- [ ] Total = Subtotal - Discount
- [ ] Values update live

### Page Layout
- [ ] Sticky header works
- [ ] Back button returns to list
- [ ] Invoice number shown
- [ ] Save Draft button works
- [ ] Save & Send button works
- [ ] Mobile footer shows total and actions

### Validation
- [ ] Cannot save without client
- [ ] Cannot save without items
- [ ] Form state persists during edits
