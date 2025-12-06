# Day 1: Environment & Shell — Comprehensive Execution Plan

## Executive Summary

Day 1 establishes the complete foundation for InvoiceForge: Rails 8 + Inertia.js + React 18 + TailwindCSS v4 + ShadCN UI, fully configured with the v4.2 Neo-Editorial design system.

---

## Pre-Implementation Checklist

Before proceeding, please confirm:

| Requirement | Expected |
|-------------|----------|
| Ruby version | 3.2+ |
| Rails version | 8.x |
| Node.js version | 20+ |
| Package manager | npm or yarn |
| Project initialized? | New Rails 8 app ready |

**Assumption:** I'm assuming you have a fresh Rails 8 application. If not, I'll include the initialization command.

---

## Day 1 Execution Plan — Phased Breakdown

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DAY 1: EXECUTION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PHASE 1 ──► Rails + Inertia + React Setup                                  │
│              └── Inertia adapter, React, Vite configuration                 │
│                                                                             │
│  PHASE 2 ──► TailwindCSS v4 + Design System                                 │
│              └── @theme tokens, fonts, brutalist shadows                    │
│                                                                             │
│  PHASE 3 ──► ShadCN UI Installation                                         │
│              └── Init + core components for Day 1                           │
│                                                                             │
│  PHASE 4 ──► Foundation Files                                               │
│              └── types.ts, utils.ts, useTheme.ts                            │
│                                                                             │
│  PHASE 5 ──► Layout Components                                              │
│              └── AppLayout, Sidebar, MobileNav, Logo, ThemeToggle           │
│                                                                             │
│  PHASE 6 ──► Dashboard Placeholder + Routing                                │
│              └── Basic page to verify shell works                           │
│                                                                             │
│  PHASE 7 ──► Validation & QA                                                │
│              └── Responsive, theme, typography checks                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Rails + Inertia + React Setup

### 1.1 Phase Objectives
- Install Inertia.js Rails adapter
- Configure React 18 as the view layer
- Set up Vite for asset bundling
- Verify basic Inertia page rendering

### 1.2 Phase Checklist

```markdown
## Phase 1 Checklist
- [ ] Install inertia_rails gem
- [ ] Install @inertiajs/react package
- [ ] Install React and React DOM
- [ ] Configure Vite for React/TypeScript
- [ ] Create Inertia entrypoint
- [ ] Set up application layout for Inertia
- [ ] Verify Inertia renders a test page
```

### 1.3 Implementation

**Step 1.3.1: Add Gems to Gemfile**

```ruby
# Gemfile - Add these gems

# Inertia.js Rails adapter
gem 'inertia_rails'
```

Run:
```bash
bundle install
```

**Step 1.3.2: Install JavaScript Dependencies**

```bash
# Install Inertia.js React adapter and React
npm install @inertiajs/react react react-dom

# Install TypeScript and types
npm install -D typescript @types/react @types/react-dom

# Install Vite React plugin if not already present
npm install -D @vitejs/plugin-react
```

**Step 1.3.3: Configure Vite for React + TypeScript**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/frontend'),
    },
  },
})
```

**Step 1.3.4: Create TypeScript Configuration**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/frontend/*"]
    }
  },
  "include": ["app/frontend/**/*"]
}
```

**Step 1.3.5: Create Inertia Entrypoint**

```tsx
// app/frontend/entrypoints/inertia.tsx
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  // Resolve page components from the pages directory
  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
    const page = pages[`../pages/${name}.tsx`]
    if (!page) {
      throw new Error(`Page not found: ${name}`)
    }
    return page
  },

  // Set up the React root
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
```

**Step 1.3.6: Update Application Layout**

```erb
<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html lang="en" class="h-full">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InvoiceForge</title>
    
    <!-- Google Fonts: Instrument Serif + Geist + Geist Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    
    <%= vite_client_tag %>
    <%= vite_javascript_tag 'inertia' %>
    <%= vite_stylesheet_tag 'application', media: 'all' %>
  </head>
  <body class="h-full">
    <%= yield %>
  </body>
</html>
```

**Step 1.3.7: Create Test Dashboard Controller**

```ruby
# app/controllers/dashboard_controller.rb
class DashboardController < ApplicationController
  def index
    render inertia: 'Dashboard'
  end
end
```

**Step 1.3.8: Configure Routes**

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root "dashboard#index"
  get "dashboard", to: "dashboard#index"
end
```

**Step 1.3.9: Create Test Dashboard Page**

```tsx
// app/frontend/pages/Dashboard.tsx
export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4 text-slate-600">Inertia + React is working!</p>
    </div>
  )
}
```

### 1.4 Phase 1 Validation

```bash
# Start the Rails server
bin/rails server

# In another terminal, start Vite
bin/vite dev

# Visit http://localhost:3000
# Expected: See "Dashboard" heading with "Inertia + React is working!"
```

---

## Phase 2: TailwindCSS v4 + Design System

### 2.1 Phase Objectives
- Configure Tailwind v4 with @theme tokens
- Set up Neo-Editorial typography (Instrument Serif, Geist, Geist Mono)
- Define color tokens (Canvas, Surface, Accent, Status)
- Configure brutalist shadows

### 2.2 Phase Checklist

```markdown
## Phase 2 Checklist
- [ ] Install Tailwind v4 and dependencies
- [ ] Configure @theme block with typography
- [ ] Configure color tokens (Canvas/Surface)
- [ ] Configure brutalist shadows
- [ ] Configure accent and status colors
- [ ] Add dark mode support
- [ ] Verify fonts load correctly
```

### 2.3 Implementation

**Step 2.3.1: Install Tailwind v4**

```bash
npm install tailwindcss @tailwindcss/vite
```

**Step 2.3.2: Update Vite Config for Tailwind**

```typescript
// vite.config.ts (updated)
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/frontend'),
    },
  },
})
```

**Step 2.3.3: Create Complete Application CSS with v4.2 Design System**

```css
/* app/assets/stylesheets/application.css */

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
     Distinctive serif + modern sans-serif pairing for editorial sophistication
     ───────────────────────────────────────────────────────────────────────── */
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  /* ─────────────────────────────────────────────────────────────────────────
     PRIMARY ACTION COLORS
     Electric Blue — used exclusively for primary actions
     ───────────────────────────────────────────────────────────────────────── */
  --color-accent: var(--color-blue-500);
  --color-accent-hover: var(--color-blue-600);
  --color-accent-subtle: var(--color-blue-50);

  /* ─────────────────────────────────────────────────────────────────────────
     STATUS COLORS
     Semantic colors for invoice states
     ───────────────────────────────────────────────────────────────────────── */
  --color-status-draft: var(--color-slate-400);
  --color-status-pending: var(--color-amber-500);
  --color-status-paid: var(--color-emerald-500);
  --color-status-overdue: var(--color-rose-500);

  /* ─────────────────────────────────────────────────────────────────────────
     BRUTALIST SHADOWS
     Hard-edge shadows for Neo-Editorial aesthetic
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
  /* Apply default font and smooth transitions for theme changes */
  html {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Smooth color transitions for theme toggle */
  * {
    @apply transition-colors duration-200;
  }

  /* Prevent transition on page load */
  html.no-transitions * {
    transition: none !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRINT STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

@media print {
  /* Hide non-essential elements */
  .no-print,
  nav,
  footer,
  button,
  .sidebar {
    display: none !important;
  }

  /* Reset backgrounds for print */
  body {
    background: white !important;
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Ensure proper page breaks */
  .invoice-container {
    box-shadow: none !important;
    border: 1px solid #e2e8f0 !important;
    width: 100% !important;
    page-break-inside: avoid;
  }
}
```

**Step 2.3.4: Create Vite CSS Entrypoint**

```css
/* app/frontend/entrypoints/application.css */
@import "../../assets/stylesheets/application.css";
```

Update `vite.config.ts` or ensure the CSS is imported in your entrypoint:

```tsx
// app/frontend/entrypoints/inertia.tsx (add at top)
import './application.css'
import { createInertiaApp } from '@inertiajs/react'
// ... rest of file
```

Or update the layout to use Vite's CSS handling:

```erb
<!-- app/views/layouts/application.html.erb -->
<!-- Replace vite_stylesheet_tag with: -->
<%= vite_stylesheet_tag 'application' %>
```

### 2.4 Phase 2 Validation

Update the test Dashboard to verify typography:

```tsx
// app/frontend/pages/Dashboard.tsx (temporary test version)
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      {/* Test Canvas/Surface distinction */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6 max-w-2xl">
        
        {/* Test Display Font */}
        <h1 className="font-display text-4xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
          Dashboard
        </h1>
        
        {/* Test Section Heading */}
        <h2 className="font-sans text-xl font-semibold tracking-tight mt-6 text-slate-900 dark:text-slate-50">
          Recent Invoices
        </h2>
        
        {/* Test Monospace / Invoice Hero */}
        <div className="mt-6">
          <span className="font-mono text-6xl tracking-tighter font-medium text-slate-900 dark:text-slate-50">
            2025-0001
          </span>
        </div>
        
        {/* Test Body Text */}
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
          This is body text using Geist Sans. The design system is working!
        </p>
        
        {/* Test Data/Numbers */}
        <div className="mt-4">
          <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
            S$6,080.00
          </span>
        </div>
        
        {/* Test Brutalist Shadow */}
        <div className="mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-brutal transition-colors">
            Test Brutalist Shadow
          </button>
        </div>
      </div>
    </div>
  )
}
```

**Expected Results:**
- Page background: Light gray (`bg-slate-50`)
- Card: Pure white with subtle shadow
- "Dashboard" in Instrument Serif, tightly tracked
- "2025-0001" in Geist Mono, very tightly tracked
- Button has hard 4px offset shadow

---

## Phase 3: ShadCN UI Installation

### 3.1 Phase Objectives
- Initialize ShadCN UI for React
- Install core components needed for Day 1
- Configure component paths correctly

### 3.2 Phase Checklist

```markdown
## Phase 3 Checklist
- [ ] Install clsx and tailwind-merge (dependencies)
- [ ] Initialize ShadCN UI
- [ ] Install Button component
- [ ] Install Sheet component (for MobileNav)
- [ ] Install Separator component
- [ ] Install Tooltip component
- [ ] Verify components render correctly
```

### 3.3 Implementation

**Step 3.3.1: Install ShadCN Dependencies**

```bash
npm install clsx tailwind-merge class-variance-authority lucide-react
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-separator @radix-ui/react-tooltip
```

**Step 3.3.2: Create ShadCN Utils**

```typescript
// app/frontend/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind classes with proper precedence
 * Standard ShadCN utility function
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency in SGD
 * @param amount - Numeric amount to format
 * @returns Formatted string like "S$1,234.56"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format date for display
 * @param dateStr - ISO date string
 * @param options - Intl.DateTimeFormatOptions overrides
 * @returns Formatted date string like "20 Jan 2025"
 */
export function formatDate(
  dateStr: string, 
  options: Intl.DateTimeFormatOptions = {}
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Intl.DateTimeFormat('en-SG', { 
    ...defaultOptions, 
    ...options 
  }).format(new Date(dateStr))
}

/**
 * Generate invoice number in format YYYY-XXXX
 * @param year - Year for the invoice
 * @param sequence - Sequence number
 * @returns Formatted invoice number like "2025-0001"
 */
export function generateInvoiceNumber(year: number, sequence: number): string {
  return `${year}-${String(sequence).padStart(4, '0')}`
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param dateStr - ISO date string
 * @returns Relative time string
 */
export function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return formatDate(dateStr)
}
```

**Step 3.3.3: Create Button Component**

```tsx
// app/frontend/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        destructive: "bg-rose-500 text-white hover:bg-rose-600",
        outline: "border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100",
        secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700",
        ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100",
        link: "text-blue-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Step 3.3.4: Create Sheet Component (for Mobile Nav)**

```tsx
// app/frontend/components/ui/sheet.tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-white dark:bg-slate-900 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
      {children}
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-slate-900 dark:text-slate-50", className)}
    {...props}
  />
))
SheetTitle.displayName = DialogPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
))
SheetDescription.displayName = DialogPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
}
```

**Step 3.3.5: Create Separator Component**

```tsx
// app/frontend/components/ui/separator.tsx
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-slate-200 dark:bg-slate-800",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

**Step 3.3.6: Create Tooltip Component**

```tsx
// app/frontend/components/ui/tooltip.tsx
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-slate-900 dark:bg-slate-50 px-3 py-1.5 text-xs text-slate-50 dark:text-slate-900 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

---

## Phase 4: Foundation Files

### 4.1 Phase Objectives
- Create TypeScript type definitions
- Create useTheme hook for dark mode
- Set up all types for the application

### 4.2 Phase Checklist

```markdown
## Phase 4 Checklist
- [ ] Create types.ts with all entity interfaces
- [ ] Create useTheme.ts hook
- [ ] Create mock-data.ts (partial - Dashboard data only for Day 1)
- [ ] Verify types compile correctly
```

### 4.3 Implementation

**Step 4.3.1: Create Type Definitions**

```typescript
// app/frontend/lib/types.ts

/* ═══════════════════════════════════════════════════════════════════════════
   INVOICEFORGE TYPE DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS / UNION TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue'
export type LineItemType = 'item' | 'section' | 'discount'
export type UnitType = 'hours' | 'days' | 'items' | 'units' | 'fixed'
export type ActivityType = 'invoice_created' | 'invoice_sent' | 'invoice_paid' | 'client_created'

// ─────────────────────────────────────────────────────────────────────────────
// ENTITIES
// ─────────────────────────────────────────────────────────────────────────────

export interface Client {
  id: string
  name: string
  email: string
  company?: string
  address?: string
  phone?: string
  notes?: string
  createdAt: string
  updatedAt: string
  // Computed (for list views)
  totalBilled?: number
  lastInvoiceDate?: string
}

export interface LineItem {
  id: string
  invoiceId: string
  type: LineItemType
  description: string
  quantity?: number       // null for section headers
  unitType?: UnitType     // null for section headers
  unitPrice?: number      // Negative for discounts
  position: number
  // Computed
  lineTotal?: number
}

export interface Invoice {
  id: string
  invoiceNumber: string   // Format: "2025-0001"
  clientId: string
  client?: Client         // Expanded relation
  status: InvoiceStatus
  issueDate: string       // ISO date string
  dueDate: string         // ISO date string
  notes?: string
  lineItems: LineItem[]
  token: string           // For public URL
  createdAt: string
  updatedAt: string
  // Computed
  subtotal?: number
  totalDiscount?: number
  total?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface DashboardMetrics {
  totalOutstanding: number
  totalPaidThisMonth: number
  totalPaidYTD: number
  overdueAmount: number
  overdueCount: number
}

export interface RecentActivity {
  id: string
  type: ActivityType
  description: string
  timestamp: string
  relatedId?: string
  relatedType?: 'invoice' | 'client'
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}
```

**Step 4.3.2: Create Theme Hook**

```typescript
// app/frontend/hooks/useTheme.ts
import { useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface UseThemeReturn {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Get the resolved theme based on system preference
  const getResolvedTheme = useCallback((currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return currentTheme
  }, [])

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setThemeState(stored)
    }
  }, [])

  // Apply theme changes to DOM
  useEffect(() => {
    const root = window.document.documentElement
    const resolved = getResolvedTheme(theme)
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add resolved theme class
    root.classList.add(resolved)
    
    // Update resolved theme state
    setResolvedTheme(resolved)
    
    // Persist to localStorage
    localStorage.setItem('theme', theme)
  }, [theme, getResolvedTheme])

  // Listen for system preference changes
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      const resolved = getResolvedTheme('system')
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(resolved)
      setResolvedTheme(resolved)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, getResolvedTheme])

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
  }, [])

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'light'
      // If system, switch to opposite of current resolved
      return resolvedTheme === 'light' ? 'dark' : 'light'
    })
  }, [resolvedTheme])

  return { theme, resolvedTheme, setTheme, toggleTheme }
}
```

**Step 4.3.3: Create Mock Data (Complete)**

```typescript
// app/frontend/lib/mock-data.ts
import type { 
  Client, 
  Invoice, 
  DashboardMetrics, 
  RecentActivity 
} from './types'

/* ═══════════════════════════════════════════════════════════════════════════
   MOCK DATA — Phase 1 Stub Data
   Note: This data must match the PRD v4.2 specification exactly
   ═══════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────────────
// CLIENTS
// ─────────────────────────────────────────────────────────────────────────────

export const mockClients: Client[] = [
  {
    id: 'cli_001',
    name: 'Acme Corporation',
    email: 'billing@acme.corp',
    company: 'Acme Corporation Pte Ltd',
    address: '123 Business Park, #10-01, Singapore 123456',
    phone: '+65 6123 4567',
    notes: 'Net 30 payment terms preferred',
    totalBilled: 15750.00,
    lastInvoiceDate: '2025-01-15',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'cli_002',
    name: 'Startup Labs',
    email: 'finance@startuplabs.io',
    company: 'Startup Labs Pte Ltd',
    address: '456 Innovation Drive, Singapore 654321',
    phone: '+65 6987 6543',
    totalBilled: 8400.00,
    lastInvoiceDate: '2025-01-10',
    createdAt: '2024-09-15T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'cli_003',
    name: 'Global Ventures',
    email: 'accounts@globalventures.com',
    company: 'Global Ventures Holdings',
    address: '789 Commerce Tower, Singapore 789012',
    totalBilled: 32000.00,
    lastInvoiceDate: '2024-12-20',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// INVOICES
// ─────────────────────────────────────────────────────────────────────────────

export const mockInvoices: Invoice[] = [
  {
    id: 'inv_001',
    invoiceNumber: '2025-0001',
    clientId: 'cli_001',
    client: mockClients[0],
    status: 'pending',
    issueDate: '2025-01-15',
    dueDate: '2025-02-14',
    token: 'abc123xyz',
    lineItems: [
      {
        id: 'li_001',
        invoiceId: 'inv_001',
        type: 'section',
        description: 'Development Services',
        position: 1,
      },
      {
        id: 'li_002',
        invoiceId: 'inv_001',
        type: 'item',
        description: 'Frontend Development - Dashboard Module',
        quantity: 24,
        unitType: 'hours',
        unitPrice: 150.00,
        position: 2,
        lineTotal: 3600.00,
      },
      {
        id: 'li_003',
        invoiceId: 'inv_001',
        type: 'item',
        description: 'API Integration',
        quantity: 16,
        unitType: 'hours',
        unitPrice: 150.00,
        position: 3,
        lineTotal: 2400.00,
      },
      {
        id: 'li_004',
        invoiceId: 'inv_001',
        type: 'section',
        description: 'Additional Services',
        position: 4,
      },
      {
        id: 'li_005',
        invoiceId: 'inv_001',
        type: 'item',
        description: 'Technical Consultation',
        quantity: 2,
        unitType: 'hours',
        unitPrice: 200.00,
        position: 5,
        lineTotal: 400.00,
      },
      {
        id: 'li_006',
        invoiceId: 'inv_001',
        type: 'discount',
        description: 'Loyalty Discount (5%)',
        quantity: 1,
        unitType: 'fixed',
        unitPrice: -320.00,
        position: 6,
        lineTotal: -320.00,
      },
    ],
    subtotal: 6400.00,
    totalDiscount: 320.00,
    total: 6080.00,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'inv_002',
    invoiceNumber: '2025-0002',
    clientId: 'cli_002',
    client: mockClients[1],
    status: 'draft',
    issueDate: '2025-01-20',
    dueDate: '2025-02-19',
    token: 'def456uvw',
    lineItems: [
      {
        id: 'li_007',
        invoiceId: 'inv_002',
        type: 'item',
        description: 'UI/UX Design - Mobile App',
        quantity: 3,
        unitType: 'days',
        unitPrice: 800.00,
        position: 1,
        lineTotal: 2400.00,
      },
    ],
    subtotal: 2400.00,
    totalDiscount: 0,
    total: 2400.00,
    createdAt: '2025-01-20T09:00:00Z',
    updatedAt: '2025-01-20T09:00:00Z',
  },
  {
    id: 'inv_003',
    invoiceNumber: '2024-0012',
    clientId: 'cli_003',
    client: mockClients[2],
    status: 'paid',
    issueDate: '2024-12-20',
    dueDate: '2025-01-19',
    token: 'ghi789rst',
    lineItems: [
      {
        id: 'li_008',
        invoiceId: 'inv_003',
        type: 'item',
        description: 'Annual Retainer - Q4 2024',
        quantity: 1,
        unitType: 'fixed',
        unitPrice: 8000.00,
        position: 1,
        lineTotal: 8000.00,
      },
    ],
    subtotal: 8000.00,
    totalDiscount: 0,
    total: 8000.00,
    createdAt: '2024-12-20T08:00:00Z',
    updatedAt: '2025-01-05T14:00:00Z',
  },
  {
    id: 'inv_004',
    invoiceNumber: '2024-0010',
    clientId: 'cli_001',
    client: mockClients[0],
    status: 'overdue',
    issueDate: '2024-11-15',
    dueDate: '2024-12-15',
    token: 'jkl012mno',
    lineItems: [
      {
        id: 'li_009',
        invoiceId: 'inv_004',
        type: 'item',
        description: 'Maintenance & Support - November',
        quantity: 10,
        unitType: 'hours',
        unitPrice: 120.00,
        position: 1,
        lineTotal: 1200.00,
      },
    ],
    subtotal: 1200.00,
    totalDiscount: 0,
    total: 1200.00,
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD METRICS
// ─────────────────────────────────────────────────────────────────────────────

export const mockDashboardMetrics: DashboardMetrics = {
  totalOutstanding: 7280.00,   // pending + overdue totals
  totalPaidThisMonth: 8000.00,
  totalPaidYTD: 56150.00,
  overdueAmount: 1200.00,
  overdueCount: 1,
}

// ─────────────────────────────────────────────────────────────────────────────
// RECENT ACTIVITY
// ─────────────────────────────────────────────────────────────────────────────

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'act_001',
    type: 'invoice_created',
    description: 'Invoice #2025-0002 created for Startup Labs',
    timestamp: '2025-01-20T09:00:00Z',
    relatedId: 'inv_002',
    relatedType: 'invoice',
  },
  {
    id: 'act_002',
    type: 'invoice_sent',
    description: 'Invoice #2025-0001 sent to Acme Corporation',
    timestamp: '2025-01-15T10:30:00Z',
    relatedId: 'inv_001',
    relatedType: 'invoice',
  },
  {
    id: 'act_003',
    type: 'invoice_paid',
    description: 'Invoice #2024-0012 paid by Global Ventures',
    timestamp: '2025-01-05T14:00:00Z',
    relatedId: 'inv_003',
    relatedType: 'invoice',
  },
  {
    id: 'act_004',
    type: 'client_created',
    description: 'New client added: Startup Labs',
    timestamp: '2024-09-15T11:00:00Z',
    relatedId: 'cli_002',
    relatedType: 'client',
  },
]
```

---

## Phase 5: Layout Components

### 5.1 Phase Objectives
- Create Logo component with Neo-Editorial typography
- Create ThemeToggle component
- Create Sidebar component (desktop)
- Create MobileNav component (mobile Sheet)
- Create AppLayout wrapper

### 5.2 Phase Checklist

```markdown
## Phase 5 Checklist
- [ ] Create Logo component
- [ ] Create ThemeToggle component
- [ ] Create NavItem component
- [ ] Create Sidebar component
- [ ] Create MobileNav component
- [ ] Create AppLayout component
- [ ] Verify responsive behavior
```

### 5.3 Implementation

**Step 5.3.1: Create Logo Component**

```tsx
// app/frontend/components/layout/Logo.tsx
import { cn } from "@/lib/utils"

interface LogoProps {
  collapsed?: boolean
  className?: string
}

export function Logo({ collapsed = false, className }: LogoProps) {
  if (collapsed) {
    // Compact version for collapsed sidebar (if needed later)
    return (
      <div className={cn("flex items-center", className)}>
        <span className="font-display text-xl font-bold leading-none text-slate-900 dark:text-slate-50">
          IF
        </span>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex flex-col">
        {/* INV in Instrument Serif */}
        <span className="font-display text-xl font-bold leading-none tracking-tight text-slate-900 dark:text-slate-50">
          INV
        </span>
        {/* Horizontal rule */}
        <div className="h-px bg-slate-900 dark:bg-slate-100 w-full my-0.5" />
        {/* FORGE in Geist Mono */}
        <span className="font-mono text-xs leading-none tracking-widest text-slate-900 dark:text-slate-50">
          FORGE
        </span>
      </div>
    </div>
  )
}
```

**Step 5.3.2: Create ThemeToggle Component**

```tsx
// app/frontend/components/layout/ThemeToggle.tsx
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("relative", className)}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun icon - visible in dark mode */}
      <Sun 
        className={cn(
          "h-5 w-5 transition-all",
          resolvedTheme === 'dark' 
            ? "rotate-0 scale-100" 
            : "rotate-90 scale-0 absolute"
        )} 
      />
      {/* Moon icon - visible in light mode */}
      <Moon 
        className={cn(
          "h-5 w-5 transition-all",
          resolvedTheme === 'light' 
            ? "rotate-0 scale-100" 
            : "-rotate-90 scale-0 absolute"
        )} 
      />
    </Button>
  )
}
```

**Step 5.3.3: Create NavItem Component**

```tsx
// app/frontend/components/layout/NavItem.tsx
import { Link, usePage } from "@inertiajs/react"
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

export function NavItem({ href, icon: Icon, label }: NavItemProps) {
  const { url } = usePage()
  
  // Check if current route matches (handle both exact and prefix matching)
  const isActive = url === href || url.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span>{label}</span>
    </Link>
  )
}
```

**Step 5.3.4: Create Sidebar Component**

```tsx
// app/frontend/components/layout/Sidebar.tsx
import { LayoutDashboard, Users, FileText } from "lucide-react"
import { Logo } from "./Logo"
import { NavItem } from "./NavItem"
import { ThemeToggle } from "./ThemeToggle"
import { Separator } from "@/components/ui/separator"

const navigation = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/clients", icon: Users, label: "Clients" },
  { href: "/invoices", icon: FileText, label: "Invoices" },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-1 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        {/* Logo */}
        <div className="flex h-16 items-center px-6">
          <Logo />
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>

        {/* Footer with Theme Toggle */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  )
}
```

**Step 5.3.5: Create MobileNav Component**

```tsx
// app/frontend/components/layout/MobileNav.tsx
import { Menu, LayoutDashboard, Users, FileText } from "lucide-react"
import { Link, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "./Logo"
import { ThemeToggle } from "./ThemeToggle"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navigation = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/clients", icon: Users, label: "Clients" },
  { href: "/invoices", icon: FileText, label: "Invoices" },
]

export function MobileNav() {
  const { url } = usePage()
  const [open, setOpen] = useState(false)

  return (
    <header className="lg:hidden sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4">
      {/* Hamburger Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="px-6 py-4">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <Logo />
          </SheetHeader>
          <Separator />
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = url === item.href || url.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Centered Logo (Mobile) */}
      <div className="flex-1 flex justify-center">
        <Logo />
      </div>

      {/* Right side - Theme Toggle */}
      <ThemeToggle />
    </header>
  )
}
```

**Step 5.3.6: Create AppLayout Component**

```tsx
// app/frontend/layouts/AppLayout.tsx
import { Sidebar } from "@/components/layout/Sidebar"
import { MobileNav } from "@/components/layout/MobileNav"
import { TooltipProvider } from "@/components/ui/tooltip"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <TooltipProvider>
      {/* Canvas background - the "well" that cards sit in */}
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Header */}
        <MobileNav />

        {/* Main Content Area */}
        <main className="lg:pl-64">
          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}
```

**Step 5.3.7: Create Component Index Files**

```tsx
// app/frontend/components/layout/index.ts
export { Logo } from './Logo'
export { ThemeToggle } from './ThemeToggle'
export { NavItem } from './NavItem'
export { Sidebar } from './Sidebar'
export { MobileNav } from './MobileNav'
```

```tsx
// app/frontend/components/ui/index.ts
export { Button, buttonVariants } from './button'
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

## Phase 6: Dashboard Placeholder + Routing

### 6.1 Phase Objectives
- Update Dashboard page to use AppLayout
- Add placeholder content demonstrating the design system
- Verify all routes work with Inertia

### 6.2 Implementation

**Step 6.2.1: Update Dashboard Page**

```tsx
// app/frontend/pages/Dashboard.tsx
import { AppLayout } from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { mockDashboardMetrics } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-SG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {today}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Outstanding */}
        <MetricCard
          label="Outstanding"
          value={formatCurrency(mockDashboardMetrics.totalOutstanding)}
          subtext="2 invoices"
        />
        
        {/* Paid This Month */}
        <MetricCard
          label="Paid (Month)"
          value={formatCurrency(mockDashboardMetrics.totalPaidThisMonth)}
        />
        
        {/* Paid YTD */}
        <MetricCard
          label="Paid (YTD)"
          value={formatCurrency(mockDashboardMetrics.totalPaidYTD)}
        />
        
        {/* Overdue */}
        <MetricCard
          label="Overdue"
          value={formatCurrency(mockDashboardMetrics.overdueAmount)}
          subtext={`${mockDashboardMetrics.overdueCount} invoice`}
          variant="danger"
        />
      </div>

      {/* Two Column Layout Placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Invoices Placeholder */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6">
          <h2 className="font-sans text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            Recent Invoices
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Invoice list will be implemented on Day 2
          </p>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6">
          <h2 className="font-sans text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            Recent Activity
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Activity feed will be implemented on Day 2
          </p>
        </div>
      </div>
    </AppLayout>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MetricCard Component (inline for Day 1, will move to separate file on Day 2)
// ─────────────────────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string
  value: string
  subtext?: string
  variant?: 'default' | 'danger'
}

function MetricCard({ label, value, subtext, variant = 'default' }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6">
      {/* Label */}
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      
      {/* Value */}
      <p className={`font-mono text-3xl font-medium mt-2 ${
        variant === 'danger' 
          ? 'text-rose-600 dark:text-rose-400' 
          : 'text-slate-900 dark:text-slate-50'
      }`}>
        {value}
      </p>
      
      {/* Subtext */}
      {subtext && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {subtext}
        </p>
      )}
    </div>
  )
}
```

**Step 6.2.2: Create Placeholder Pages for Clients and Invoices**

```tsx
// app/frontend/pages/Clients/Index.tsx
import { AppLayout } from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ClientsIndex() {
  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
            Clients
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            3 total clients
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Client
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Client list will be implemented on Day 3
        </p>
      </div>
    </AppLayout>
  )
}
```

```tsx
// app/frontend/pages/Invoices/Index.tsx
import { AppLayout } from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function InvoicesIndex() {
  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl tracking-tight leading-none text-slate-900 dark:text-slate-50">
            Invoices
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            4 total invoices
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Invoice list will be implemented on Day 4
        </p>
      </div>
    </AppLayout>
  )
}
```

**Step 6.2.3: Update Rails Controllers**

```ruby
# app/controllers/clients_controller.rb
class ClientsController < ApplicationController
  def index
    render inertia: 'Clients/Index'
  end
end
```

```ruby
# app/controllers/invoices_controller.rb
class InvoicesController < ApplicationController
  def index
    render inertia: 'Invoices/Index'
  end
end
```

**Step 6.2.4: Update Routes**

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root "dashboard#index"
  
  get "dashboard", to: "dashboard#index"
  
  resources :clients, only: [:index]
  resources :invoices, only: [:index]
end
```

---

## Phase 7: Validation & QA

### 7.1 Validation Checklist

```markdown
## Day 1 Final Validation Checklist

### Environment Setup
- [ ] Rails server starts without errors
- [ ] Vite dev server starts without errors
- [ ] No TypeScript compilation errors
- [ ] No console errors in browser

### Typography (Neo-Editorial v4.2)
- [ ] Instrument Serif loads for page titles
- [ ] Geist loads for body text
- [ ] Geist Mono loads for numbers
- [ ] tracking-tight visible on page titles
- [ ] tracking-tighter visible on invoice numbers (when added)

### Color System (Canvas/Surface v4.2)
- [ ] Page background is bg-slate-50 (light mode)
- [ ] Cards are bg-white (light mode)
- [ ] Visual depth is apparent (cards "float" above canvas)
- [ ] Dark mode: bg-slate-950 (canvas) / bg-slate-900 (surface)

### Layout & Navigation
- [ ] Desktop: Sidebar visible at lg: breakpoint
- [ ] Desktop: Sidebar is 256px (w-64)
- [ ] Mobile: Sidebar hidden
- [ ] Mobile: Header with hamburger visible
- [ ] Mobile: Sheet opens from left on hamburger click
- [ ] Navigation links work (Dashboard, Clients, Invoices)
- [ ] Active navigation state shows blue text

### Theme Toggle
- [ ] Toggle switches between light/dark modes
- [ ] Theme persists on page reload
- [ ] Smooth color transitions
- [ ] Icons animate correctly

### Responsive Behavior
- [ ] No horizontal scroll on 375px viewport
- [ ] Metrics grid: 1 column mobile, 2 tablet, 4 desktop
- [ ] Page header stacks vertically on mobile

### Components
- [ ] Button renders with correct blue accent
- [ ] Sheet opens/closes correctly
- [ ] Separator renders as thin line
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

### 2. Desktop Testing (>= 1024px)
1. Open http://localhost:3000
2. Verify sidebar is visible on left
3. Verify logo shows "INV / FORGE" with line separator
4. Click each nav item - verify route changes
5. Verify active state (blue text, gray background)
6. Click theme toggle - verify dark mode activates
7. Refresh page - verify theme persists

### 3. Mobile Testing (< 768px)
1. Open Chrome DevTools, set viewport to 375px
2. Verify sidebar is hidden
3. Verify header shows with hamburger icon
4. Click hamburger - verify sheet slides in from left
5. Click nav item - verify navigation and sheet closes
6. Verify theme toggle works in mobile header

### 4. Typography Verification
1. Inspect "Dashboard" title
2. Verify font-family includes "Instrument Serif"
3. Verify letter-spacing shows tracking-tight value
4. Inspect metric card values
5. Verify font-family includes "Geist Mono"

### 5. Color Verification
1. In light mode, inspect body background
2. Verify it's rgb(248, 250, 252) = #f8fafc = slate-50
3. Inspect card background
4. Verify it's rgb(255, 255, 255) = white
5. Toggle to dark mode
6. Verify canvas is slate-950, cards are slate-900
```

---

## File Structure Summary (Day 1 Complete)

```
app/
├── controllers/
│   ├── dashboard_controller.rb
│   ├── clients_controller.rb
│   └── invoices_controller.rb
├── frontend/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── index.ts
│   │   │   ├── Logo.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── NavItem.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   └── ui/
│   │       ├── index.ts
│   │       ├── button.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       └── tooltip.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── layouts/
│   │   └── AppLayout.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── types.ts
│   │   └── mock-data.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Clients/
│   │   │   └── Index.tsx
│   │   └── Invoices/
│   │       └── Index.tsx
│   └── entrypoints/
│       ├── inertia.tsx
│       └── application.css
├── assets/
│   └── stylesheets/
│       └── application.css
└── views/
    └── layouts/
        └── application.html.erb
```

---

## Day 1 Success Criteria

| Criterion | Validation Method | Status |
|-----------|-------------------|--------|
| Rails + Inertia + React running | Server starts, pages render | ⬜ |
| Tailwind v4 configured | Custom fonts/colors work | ⬜ |
| Typography loads correctly | Instrument Serif in headings | ⬜ |
| Canvas/Surface depth visible | Page bg differs from card bg | ⬜ |
| Desktop sidebar works | Visible at lg:, navigation works | ⬜ |
| Mobile nav works | Sheet opens/closes, nav works | ⬜ |
| Theme toggle works | Switches modes, persists | ⬜ |
| All routes accessible | /dashboard, /clients, /invoices | ⬜ |
| No TypeScript errors | Clean compilation | ⬜ |
| No console errors | Browser console clean | ⬜ |

---

## Ready to Proceed

This comprehensive Day 1 plan includes:

1. ✅ **7 detailed phases** with clear objectives
2. ✅ **Complete code** for all files
3. ✅ **v4.2 design tokens** fully implemented
4. ✅ **Validation checklists** for QA
5. ✅ **File structure** reference

**Would you like me to:**
1. Proceed with creating these files in your project?
2. Provide any clarification on specific components?
3. Adjust any implementation details?

Please confirm and I'll begin the systematic implementation, providing progress updates at each phase checkpoint.
