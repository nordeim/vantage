Phase 1: Planning the Comprehensive PRD
Execution Plan
Before delivering the PRD, here's my structured approach:

Phase	Objective	Deliverables
1. Document Architecture	Structure the PRD for maximum clarity and actionability	Table of contents, section hierarchy
2. Design System Definition	Lock in typography, colors, spacing, components	Complete design token specification
3. Technical Blueprint	Define architecture, dependencies, setup procedures	Installation commands, file structure
4. Functional Specifications	Detail each view with wireframe descriptions & interactions	Component breakdowns, state definitions
5. Implementation Guide	Provide actionable roadmap with success criteria	Phased checklist, validation checkpoints
📋 Project Requirements Document
InvoiceFlow — Personal Invoicing Application
Document Version: 1.0
Last Updated: January 2025
Status: Final — Ready for Implementation

Table of Contents
Executive Summary
Product Vision & Philosophy
Design System Specification
Technical Architecture
Application Shell
View Specifications
Data Models (Phase 1 Mock Data)
Responsive Design Matrix
Accessibility Requirements
Implementation Roadmap
Deliverables & Success Criteria
Appendices
1. Executive Summary
1.1 Project Overview
InvoiceFlow is a single-user, high-performance invoicing application designed for speed, clarity, and professional presentation. The application serves dual purposes:

Admin Experience: Friction-free invoice management with rapid data entry
Client Experience: Polished, trustworthy shareable invoice pages with payment capability
1.2 Phase 1 Scope
In Scope	Out of Scope
Frontend design & UI implementation	Backend API development
Stubbed routes with mock data	Database persistence
All 5 core views fully styled	Authentication system
Light/Dark mode with toggle	Payment processing integration
Mobile responsive layouts	Email delivery system
Print-optimized invoice view	PDF generation
1.3 Key Decisions Summary
Decision	Choice	Rationale
Typography	Fraunces + Outfit	Distinctive editorial quality without generic AI aesthetics
Aesthetic	Swiss Utility + Neo-Editorial	Grid discipline with bold typographic hierarchy
Accent Color	Electric Blue (blue-500)	Professional yet distinctive; strong contrast
Theme Priority	Light primary, Dark secondary	Daylight readability focus with polished dark alternative
Invoice Format	YYYY-NNNN (e.g., 2025-0001)	Date-contextual, auto-incrementing
Currency	SGD (S$)	Locale-aware formatting
2. Product Vision & Philosophy
2.1 Core Philosophy
"Speed is a feature. Clarity is trust."

The UI must feel immediate—every interaction should complete before the user expects it. The design must be data-forward, presenting financial information with absolute clarity.

2.2 Design Direction: "Neo-Editorial Swiss"
We combine two distinct design philosophies:

Foundation: Swiss International Style
Rigid grid systems with mathematical precision
Purposeful negative space that lets content breathe
Typographic hierarchy as the primary organizational tool
Asymmetric balance creating visual interest within structure
Execution: Neo-Editorial
Bold typographic contrasts — dramatic size differentials
Decisive color usage — accent appears only for primary actions
Sharp, intentional borders — 1px crisp lines, no soft shadows
Data as hero — numbers are the visual centerpiece
2.3 Anti-Patterns (What We Avoid)
❌ Avoid	✅ Instead
Soft diffuse shadows (shadow-lg)	Sharp, shallow shadows (shadow-sm) or borders
Rounded-everything (rounded-xl)	Precise corners (rounded-none or rounded-sm)
Generic icons everywhere	Purposeful iconography with typographic alternatives
Gradient backgrounds	Solid, intentional color blocks
Decorative illustrations	Data visualization and typography as decoration
Inter, Roboto, system fonts	Distinctive typeface pairing
3. Design System Specification
3.1 Typography
Font Selection
Role	Font Family	Weight Range	Google Fonts Import
Display / Headlines	Fraunces	400, 600, 700	family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700
Body / UI	Outfit	300, 400, 500, 600	family=Outfit:wght@300;400;500;600
Typography Scale
text

Display XL:    text-5xl  (48px) — Fraunces 700 — Dashboard metrics
Display LG:    text-4xl  (36px) — Fraunces 600 — Page titles
Heading 1:     text-2xl  (24px) — Fraunces 600 — Section headers
Heading 2:     text-xl   (20px) — Outfit 600   — Card titles
Heading 3:     text-lg   (18px) — Outfit 500   — Subsections
Body:          text-base (16px) — Outfit 400   — Primary content
Body Small:    text-sm   (14px) — Outfit 400   — Secondary content
Caption:       text-xs   (12px) — Outfit 500   — Labels, metadata
CSS Configuration (Add to application.css or layout)
CSS

@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600&display=swap');
Tailwind Configuration
JavaScript

// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      display: ['Fraunces', 'Georgia', 'serif'],
      sans: ['Outfit', 'system-ui', 'sans-serif'],
    },
  },
}
3.2 Color Palette
Semantic Color Tokens
Token	Light Mode	Dark Mode	Usage
Background Primary	white	slate-950	Page backgrounds
Background Secondary	slate-50	slate-900	Cards, panels
Background Tertiary	slate-100	slate-800	Hover states, wells
Foreground Primary	slate-900	slate-50	Headings, primary text
Foreground Secondary	slate-600	slate-400	Body text
Foreground Muted	slate-400	slate-500	Captions, placeholders
Border Default	slate-200	slate-800	Dividers, card borders
Border Strong	slate-300	slate-700	Emphasized borders
Accent Colors
Token	Value	Usage
Accent Primary	blue-500	Primary buttons, links, focus rings
Accent Hover	blue-600	Button hover states
Accent Subtle	blue-50 / blue-950 (dark)	Accent backgrounds
Status Colors
Status	Light Background	Light Text	Dark Background	Dark Text
Draft	slate-100	slate-600	slate-800	slate-400
Pending	amber-50	amber-700	amber-950	amber-400
Paid	emerald-50	emerald-700	emerald-950	emerald-400
Overdue	rose-50	rose-700	rose-950	rose-400
3.3 Spacing System
Using Tailwind's default spacing scale with intentional application:

Context	Spacing	Tailwind Class
Page Padding	24px / 32px	p-6 / lg:p-8
Section Gap	32px / 48px	space-y-8 / lg:space-y-12
Card Padding	20px / 24px	p-5 / lg:p-6
Inline Element Gap	8px / 12px	gap-2 / gap-3
Form Field Gap	16px	space-y-4
3.4 Border & Shadow Specifications
text

Borders:
- Default:      border border-slate-200 dark:border-slate-800
- Strong:       border border-slate-300 dark:border-slate-700
- Accent:       border-2 border-blue-500
- Draft Status: border border-dashed border-slate-300

Shadows (Used Sparingly):
- Card:         shadow-sm (subtle lift)
- Dropdown:     shadow-md
- Modal:        shadow-lg

Corner Radius:
- Default:      rounded (4px) — buttons, inputs
- Cards:        rounded-sm (2px) — precise, editorial
- Pills:        rounded-full — status badges only
3.5 Component Style Guide
Buttons
React

// Primary Button
<button className="
  bg-blue-500 hover:bg-blue-600 
  text-white font-medium
  px-4 py-2 rounded
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  dark:focus:ring-offset-slate-950
">
  Create Invoice
</button>

// Secondary Button
<button className="
  bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800
  text-slate-900 dark:text-slate-100 font-medium
  px-4 py-2 rounded
  border border-slate-300 dark:border-slate-700
  transition-colors duration-150
">
  Cancel
</button>

// Ghost Button
<button className="
  bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800
  text-slate-600 dark:text-slate-400 
  px-3 py-1.5 rounded
  transition-colors duration-150
">
  View All
</button>
Status Badges
React

// Badge Component Pattern
const statusStyles = {
  draft: "bg-slate-100 text-slate-600 border-dashed border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600",
  pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
  overdue: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800",
}

<span className={`
  inline-flex items-center px-2.5 py-0.5 
  rounded-full text-xs font-medium border
  ${statusStyles[status]}
`}>
  {status}
</span>
Cards
React

<div className="
  bg-white dark:bg-slate-900
  border border-slate-200 dark:border-slate-800
  rounded-sm
  p-5 lg:p-6
">
  {/* Card content */}
</div>
Input Fields
React

<input 
  type="text"
  className="
    w-full px-3 py-2
    bg-white dark:bg-slate-900
    border border-slate-300 dark:border-slate-700
    rounded
    text-slate-900 dark:text-slate-100
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-shadow duration-150
  "
  placeholder="Enter value..."
/>
3.6 Icons
Library: Lucide React (already installed)

Usage Guidelines:

Context	Size	Stroke Width
Navigation	20px (w-5 h-5)	2
Inline with text	16px (w-4 h-4)	2
Feature/Empty State	48px (w-12 h-12)	1.5
Buttons (icon + text)	16px (w-4 h-4)	2
Core Icons Required:

React

import { 
  LayoutDashboard,  // Dashboard nav
  Users,            // Clients nav
  FileText,         // Invoices nav
  Plus,             // Create actions
  Search,           // Search inputs
  Filter,           // Filter controls
  MoreHorizontal,   // Row actions
  ChevronDown,      // Dropdowns
  ChevronRight,     // Breadcrumbs
  Calendar,         // Date pickers
  Send,             // Send invoice
  Download,         // Export/Download
  Printer,          // Print
  CreditCard,       // Payment
  Sun,              // Light mode
  Moon,             // Dark mode
  X,                // Close/Remove
  Check,            // Success/Confirm
  AlertCircle,      // Warning/Error
  Trash2,           // Delete
  Pencil,           // Edit
} from 'lucide-react'
3.7 Motion & Interactions
Philosophy: Restrained, purposeful motion. One well-orchestrated moment is better than scattered micro-interactions.

Transition Defaults
CSS

/* Standard transition for interactive elements */
transition-colors duration-150

/* Expanded transition for layout shifts */
transition-all duration-200

/* Page transitions (Inertia) */
transition-opacity duration-300
Key Interaction Patterns
Interaction	Animation
Button hover	Color shift (150ms ease)
Card hover	Subtle border color change
Modal open	Fade in (200ms) + slight scale (0.95 → 1)
Dropdown open	Fade + translate-y (-4px → 0)
Page transition	Content fade (managed by Inertia)
Toast notification	Slide in from top-right
Staggered List Animation (Optional Enhancement)
React

// For lists like invoices or clients
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }}
>
4. Technical Architecture
4.1 Technology Stack
Layer	Technology	Version
Backend Framework	Ruby on Rails	8.x
Frontend Adapter	Inertia.js	Latest
View Layer	React	18.x
Styling	TailwindCSS	4.x
Component Library	ShadCN UI	Latest
Icons	Lucide React	Latest
Fonts	Google Fonts	N/A
4.2 Project Structure
text

app/
├── controllers/
│   ├── dashboard_controller.rb
│   ├── clients_controller.rb
│   ├── invoices_controller.rb
│   └── public/
│       └── invoices_controller.rb
├── javascript/
│   ├── components/
│   │   ├── ui/                    # ShadCN components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── select.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── dropdown-menu.jsx
│   │   │   ├── table.jsx
│   │   │   ├── tabs.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── separator.jsx
│   │   │   └── sheet.jsx
│   │   ├── layout/
│   │   │   ├── AppShell.jsx       # Main layout wrapper
│   │   │   ├── Sidebar.jsx        # Desktop sidebar
│   │   │   ├── MobileNav.jsx      # Mobile navigation
│   │   │   ├── ThemeToggle.jsx    # Light/Dark switcher
│   │   │   └── Logo.jsx           # Brand mark
│   │   ├── dashboard/
│   │   │   ├── MetricCard.jsx
│   │   │   ├── RecentInvoices.jsx
│   │   │   └── RecentClients.jsx
│   │   ├── clients/
│   │   │   ├── ClientsTable.jsx
│   │   │   ├── ClientRow.jsx
│   │   │   ├── ClientForm.jsx
│   │   │   └── ClientAvatar.jsx
│   │   ├── invoices/
│   │   │   ├── InvoicesTable.jsx
│   │   │   ├── InvoiceRow.jsx
│   │   │   ├── InvoiceStatusBadge.jsx
│   │   │   ├── InvoiceFilters.jsx
│   │   │   ├── InvoiceEditor/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── ClientSelector.jsx
│   │   │   │   ├── DateFields.jsx
│   │   │   │   ├── LineItemsTable.jsx
│   │   │   │   ├── LineItemRow.jsx
│   │   │   │   ├── SectionHeader.jsx
│   │   │   │   └── InvoiceSummary.jsx
│   │   │   └── PaymentModal.jsx
│   │   └── shared/
│   │       ├── PageHeader.jsx
│   │       ├── EmptyState.jsx
│   │       ├── DataTable.jsx
│   │       ├── SearchInput.jsx
│   │       └── CurrencyDisplay.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Clients/
│   │   │   └── Index.jsx
│   │   ├── Invoices/
│   │   │   ├── Index.jsx
│   │   │   ├── New.jsx
│   │   │   └── Edit.jsx
│   │   └── Public/
│   │       └── Invoice.jsx        # Shareable invoice view
│   ├── lib/
│   │   ├── utils.js               # cn() helper, formatters
│   │   ├── mockData.js            # Phase 1 stub data
│   │   └── constants.js           # App constants
│   └── hooks/
│       ├── useTheme.js            # Theme management
│       └── useCurrency.js         # Currency formatting
4.3 Route Configuration
Rails Routes (config/routes.rb)
Ruby

Rails.application.routes.draw do
  # Main application routes
  root "dashboard#index"
  
  get "dashboard", to: "dashboard#index"
  
  resources :clients, only: [:index, :new, :create, :edit, :update, :destroy]
  
  resources :invoices, only: [:index, :new, :create, :edit, :update, :destroy]
  
  # Public shareable invoice route (token-based)
  namespace :public do
    get "invoices/:token", to: "invoices#show", as: :invoice
  end
end
Route Summary Table
View	Path	Controller#Action	Inertia Page
Dashboard	/dashboard	dashboard#index	Dashboard
Clients List	/clients	clients#index	Clients/Index
Invoices List	/invoices	invoices#index	Invoices/Index
New Invoice	/invoices/new	invoices#new	Invoices/New
Edit Invoice	/invoices/:id/edit	invoices#edit	Invoices/Edit
Public Invoice	/public/invoices/:token	public/invoices#show	Public/Invoice
4.4 ShadCN UI Component Installation
Prerequisites Check
Bash

# Verify ShadCN is initialized (components.json should exist)
cat components.json
Required Components Installation
Execute these commands in your project root:

Bash

# Core UI Components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add table
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add sheet
npx shadcn@latest add avatar
npx shadcn@latest add popover
npx shadcn@latest add command      # For searchable selects
npx shadcn@latest add calendar     # For date pickers
npx shadcn@latest add textarea
npx shadcn@latest add tooltip
npx shadcn@latest add scroll-area
Component Customization
After installation, customize components to match our design system. Example for Button:

React

// components/ui/button.jsx
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800",
        ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
        destructive: "bg-rose-500 text-white hover:bg-rose-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
4.5 Utility Functions
lib/utils.js
JavaScript

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Class name merger (standard shadcn utility)
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Currency formatter for SGD
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
  }).format(amount)
}

// Date formatter
export function formatDate(date, options = {}) {
  const defaultOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Intl.DateTimeFormat('en-SG', { ...defaultOptions, ...options }).format(new Date(date))
}

// Invoice number generator
export function generateInvoiceNumber(year, sequence) {
  return `${year}-${String(sequence).padStart(4, '0')}`
}

// Status calculation
export function calculateInvoiceStatus(invoice) {
  if (invoice.paidAt) return 'paid'
  if (new Date(invoice.dueDate) < new Date()) return 'overdue'
  if (invoice.sentAt) return 'pending'
  return 'draft'
}
5. Application Shell
5.1 Overview
The application shell provides consistent navigation, branding, and theme switching across all internal views. The public invoice view uses a separate, minimal layout.

5.2 Layout Structure
text

┌─────────────────────────────────────────────────────────────┐
│  HEADER (Mobile Only)                                       │
│  ┌─────────┬─────────────────────────────┬───────────────┐  │
│  │  ≡ Menu │  InvoiceFlow                │  🌙 Theme     │  │
│  └─────────┴─────────────────────────────┴───────────────┘  │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│   SIDEBAR    │              MAIN CONTENT                    │
│   (Desktop)  │                                              │
│              │  ┌────────────────────────────────────────┐  │
│  ┌────────┐  │  │  Page Header                           │  │
│  │  Logo  │  │  │  ┌──────────────┬─────────────────┐    │  │
│  └────────┘  │  │  │  Title       │  Actions        │    │  │
│              │  │  └──────────────┴─────────────────┘    │  │
│  ┌────────┐  │  ├────────────────────────────────────────┤  │
│  │  Nav   │  │  │                                        │  │
│  │ Items  │  │  │           Page Content                 │  │
│  │        │  │  │                                        │  │
│  └────────┘  │  │                                        │  │
│              │  │                                        │  │
│  ┌────────┐  │  │                                        │  │
│  │ Theme  │  │  │                                        │  │
│  │ Toggle │  │  └────────────────────────────────────────┘  │
│  └────────┘  │                                              │
└──────────────┴──────────────────────────────────────────────┘
5.3 Component Specifications
Logo Component
React

// components/layout/Logo.jsx
export function Logo({ collapsed = false }) {
  return (
    <div className="flex items-center gap-2">
      {/* Icon mark - always visible */}
      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
        <span className="text-white font-display font-bold text-sm">IF</span>
      </div>
      
      {/* Wordmark - hidden when collapsed */}
      {!collapsed && (
        <span className="font-display font-semibold text-lg text-slate-900 dark:text-slate-100">
          InvoiceFlow
        </span>
      )}
    </div>
  )
}
Sidebar Navigation
Desktop: Fixed 240px width sidebar
Tablet: Collapsible to 64px (icon-only mode)
Mobile: Hidden; replaced with slide-out sheet

React

// Navigation Items
const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Clients', href: '/clients', icon: Users },
  { label: 'Invoices', href: '/invoices', icon: FileText },
]
Theme Toggle
React

// components/layout/ThemeToggle.jsx
export function ThemeToggle() {
  const [theme, setTheme] = useTheme() // 'light' | 'dark' | 'system'
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      )}
    </button>
  )
}
5.4 Responsive Breakpoints
Breakpoint	Width	Sidebar Behavior
Mobile	< 768px	Hidden (sheet overlay)
Tablet	768px - 1024px	Collapsed (64px icons)
Desktop	> 1024px	Expanded (240px full)
6. View Specifications
6.1 Dashboard View
Route: /dashboard
Purpose: High-level financial pulse and quick actions

Wireframe Layout
text

┌────────────────────────────────────────────────────────────────┐
│  Dashboard                                      [+ New Invoice]│
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐│
│  │   Outstanding    │ │   Paid (YTD)     │ │    Overdue       ││
│  │                  │ │                  │ │                  ││
│  │   S$ 12,450.00   │ │   S$ 84,320.00   │ │   S$ 2,100.00    ││
│  │   ▲ 3 invoices   │ │   ▲ 24 invoices  │ │   ▲ 1 invoice    ││
│  └──────────────────┘ └──────────────────┘ └──────────────────┘│
│                                                                │
│  ┌─────────────────────────────────┐ ┌─────────────────────────┤
│  │  Recent Invoices                │ │  Recent Clients        ││
│  │                                 │ │                        ││
│  │  #2025-0012  Acme Corp   Draft  │ │  ┌──┐ Globex Inc      ││
│  │  #2025-0011  Beta Ltd    Paid   │ │  │AB│ Added 2 days ago││
│  │  #2025-0010  Gamma LLC   Pending│ │  └──┘                 ││
│  │  #2025-0009  Delta Co    Overdue│ │  ┌──┐ Initech         ││
│  │                                 │ │  │IN│ Added 1 week ago││
│  │  View All Invoices →            │ │  └──┘                 ││
│  └─────────────────────────────────┘ │  View All Clients →   ││
│                                      └─────────────────────────┤
└────────────────────────────────────────────────────────────────┘
Component Breakdown
MetricCard Component:

React

<MetricCard
  title="Outstanding"
  value={12450.00}
  subtitle="3 invoices"
  trend="neutral"  // or "up" | "down"
/>
Metric Card Styling:

Large display number using font-display text-4xl font-bold
Title in text-sm font-medium text-slate-500 uppercase tracking-wide
Subtitle in text-sm text-slate-600
Overdue metric uses text-rose-600 for the value
Recent Invoices Table:

Compact rows showing: Invoice #, Client, Amount, Status Badge
Maximum 5 items displayed
"View All" link at bottom
Recent Clients List:

Avatar (initials) + Name + "Added X ago"
Maximum 5 items displayed
6.2 Clients View
Route: /clients
Purpose: Client directory with billing overview

Wireframe Layout
text

┌────────────────────────────────────────────────────────────────┐
│  Clients                                        [+ Add Client] │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🔍 Search clients...                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CLIENT           CONTACT         TOTAL BILLED   ACTIONS │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  ┌──┐                                                    │  │
│  │  │AC│ Acme Corp    John Smith     S$ 24,500.00    •••   │  │
│  │  └──┘              john@acme.co                          │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  ┌──┐                                                    │  │
│  │  │BL│ Beta Ltd     Jane Doe       S$ 18,200.00    •••   │  │
│  │  └──┘              jane@beta.io                          │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  ┌──┐                                                    │  │
│  │  │GL│ Globex Inc   Bob Wilson     S$ 45,800.00    •••   │  │
│  │  └──┘              bob@globex.com                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Showing 1-10 of 24 clients                      < 1 2 3 ... > │
└────────────────────────────────────────────────────────────────┘
Client Data Display
Column	Content	Width
Client	Avatar + Company Name + (Email below)	flex-1
Contact	Contact person name	150px
Total Billed	Currency formatted	140px
Actions	Dropdown (Edit, Delete)	60px
Add Client Form (Sheet/Drawer)
text

┌────────────────────────────────┐
│  Add New Client            ✕   │
├────────────────────────────────┤
│                                │
│  Company Name *                │
│  ┌────────────────────────────┐│
│  │                            ││
│  └────────────────────────────┘│
│                                │
│  Contact Person                │
│  ┌────────────────────────────┐│
│  │                            ││
│  └────────────────────────────┘│
│                                │
│  Email *                       │
│  ┌────────────────────────────┐│
│  │                            ││
│  └────────────────────────────┘│
│                                │
│  Phone                         │
│  ┌────────────────────────────┐│
│  │                            ││
│  └────────────────────────────┘│
│                                │
│  Address                       │
│  ┌────────────────────────────┐│
│  │                            ││
│  │                            ││
│  └────────────────────────────┘│
│                                │
│  Notes                         │
│  ┌────────────────────────────┐│
│  │                            ││
│  │                            ││
│  └────────────────────────────┘│
│                                │
├────────────────────────────────┤
│  [Cancel]           [Save Client]│
└────────────────────────────────┘
Client Avatar Component
React

// Generate consistent colors based on company name
const avatarColors = [
  'bg-blue-500',
  'bg-emerald-500', 
  'bg-amber-500',
  'bg-rose-500',
  'bg-purple-500',
  'bg-cyan-500',
]

function getAvatarColor(name) {
  const index = name.charCodeAt(0) % avatarColors.length
  return avatarColors[index]
}

function ClientAvatar({ name }) {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  
  return (
    <div className={`
      w-10 h-10 rounded flex items-center justify-center
      ${getAvatarColor(name)}
    `}>
      <span className="text-white font-medium text-sm">
        {initials}
      </span>
    </div>
  )
}
6.3 Invoices View
Route: /invoices
Purpose: Invoice command center with status filtering

Wireframe Layout
text

┌────────────────────────────────────────────────────────────────┐
│  Invoices                                     [+ Create Invoice]│
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────┬─────────┬─────────┬────────┬─────────┐              │
│  │ All  │  Draft  │ Pending │  Paid  │ Overdue │              │
│  │ (42) │   (3)   │   (8)   │  (28)  │   (3)   │              │
│  └──────┴─────────┴─────────┴────────┴─────────┘              │
│                                                                │
│  ┌─────────────────────────────────────────┬─────────────────┐ │
│  │  🔍 Search invoices...                  │ 📅 Date Range ▼ │ │
│  └─────────────────────────────────────────┴─────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  INVOICE #     CLIENT        DATE       AMOUNT   STATUS  │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  2025-0012    Acme Corp    Jan 15    S$ 3,200   [Draft]  │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  2025-0011    Beta Ltd     Jan 14    S$ 1,850   [Paid]   │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  2025-0010    Globex Inc   Jan 12    S$ 5,400   [Pending]│  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  2025-0009    Delta Co     Jan 8     S$ 2,100   [Overdue]│  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Showing 1-10 of 42 invoices                    < 1 2 3 ... >  │
└────────────────────────────────────────────────────────────────┘
Filter Tabs Component
React

const tabs = [
  { key: 'all', label: 'All', count: 42 },
  { key: 'draft', label: 'Draft', count: 3 },
  { key: 'pending', label: 'Pending', count: 8 },
  { key: 'paid', label: 'Paid', count: 28 },
  { key: 'overdue', label: 'Overdue', count: 3 },
]

// Active tab has bottom border accent
// Counts shown in parentheses, muted color
Invoice Table Columns
Column	Content	Sortable	Width
Invoice #	2025-0012 format	Yes	120px
Client	Company name (linked)	Yes	flex-1
Date	Issue date formatted	Yes	100px
Due Date	Due date formatted	Yes	100px
Amount	Currency formatted	Yes	120px
Status	Status badge	No	100px
Actions	Dropdown menu	No	60px
Row Actions Dropdown
View Invoice
Edit Invoice
Send Invoice (if Draft)
Mark as Paid (if Pending)
Download PDF
Delete
6.4 Invoice Editor View
Routes: /invoices/new & /invoices/:id/edit
Purpose: High-speed invoice creation and editing

Wireframe Layout
text

┌────────────────────────────────────────────────────────────────┐
│  ← Back to Invoices                                            │
│                                                                │
│  New Invoice                                                   │
│  #2025-0013 (auto-generated)                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────────────────┐ ┌───────────────────────────┐ │
│  │  Client *                   │ │  Issue Date    Due Date   │ │
│  │  ┌───────────────────────┐  │ │  ┌─────────┐  ┌─────────┐ │ │
│  │  │ 🔍 Select client... ▼ │  │ │  │ Jan 15  │  │ Feb 14  │ │ │
│  │  └───────────────────────┘  │ │  └─────────┘  └─────────┘ │ │
│  └─────────────────────────────┘ └───────────────────────────┘ │
│                                                                │
│  LINE ITEMS                                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ═══════════════════════════════════════════════════════ │  │
│  │ ▼ Development Services                    [Section Header] │  │
│  │ ═══════════════════════════════════════════════════════ │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  DESCRIPTION          QTY    UNIT    PRICE      TOTAL    │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  Frontend Development  40    hours   S$ 150   S$ 6,000   │  │
│  │  Backend API work      24    hours   S$ 150   S$ 3,600   │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ ═══════════════════════════════════════════════════════ │  │
│  │ ▼ Additional Services                     [Section Header] │  │
│  │ ═══════════════════════════════════════════════════════ │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  Server setup           1    item    S$ 500   S$ 500     │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ ────────────────────────────────────────────────────────  │  │
│  │  🏷️ Early payment disc  1    —      -S$ 200  -S$ 200     │  │
│  │  [DISCOUNT ROW - styled differently]                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  [+ Add Line Item]  [+ Add Section]  [+ Add Discount]          │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                      Subtotal: S$ 10,100 │  │
│  │                                      Discount: -S$ 200   │  │
│  │                                    ─────────────────────  │  │
│  │                                         Total: S$ 9,900  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  STICKY FOOTER                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  [Delete Draft]            [Save Draft]  [Save & Preview] │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
Line Item Data Model
TypeScript

type LineItem = {
  id: string
  type: 'item' | 'section' | 'discount'
  description: string
  quantity: number | null
  unit: 'hours' | 'days' | 'items' | 'units' | null
  unitPrice: number | null
  total: number  // calculated
}
Unit Types Dropdown
Unit	Display
hours	hrs
days	days
items	items
units	units
(empty)	—
Section Header Styling
React

// Section headers span full width, have different background
<div className="
  col-span-full 
  bg-slate-100 dark:bg-slate-800 
  px-4 py-2 
  font-medium text-slate-700 dark:text-slate-300
  border-y border-slate-200 dark:border-slate-700
">
  <span className="flex items-center gap-2">
    <ChevronDown className="w-4 h-4" />
    Development Services
  </span>
</div>
Discount Row Styling
React

// Discount rows have distinct visual treatment
<tr className="bg-blue-50/50 dark:bg-blue-950/30">
  <td className="text-blue-700 dark:text-blue-400">
    <span className="flex items-center gap-2">
      <Tag className="w-4 h-4" />
      Early payment discount
    </span>
  </td>
  {/* ... negative values shown in blue */}
</tr>
Client Selector (Combobox)
React

// Searchable dropdown using ShadCN Command component
<Popover>
  <PopoverTrigger>
    <Button variant="outline" className="w-full justify-between">
      {selectedClient?.name || "Select client..."}
      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent>
    <Command>
      <CommandInput placeholder="Search clients..." />
      <CommandList>
        <CommandEmpty>No clients found.</CommandEmpty>
        <CommandGroup>
          {clients.map(client => (
            <CommandItem key={client.id} onSelect={() => setClient(client)}>
              <ClientAvatar name={client.name} className="mr-2" />
              {client.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
6.5 Shareable Invoice View (Public)
Route: /public/invoices/:token
Purpose: Client-facing invoice presentation with payment action

Design Philosophy
This view is the product delivered to the customer. It must:

Look professional and trustworthy
Be print-ready
Work perfectly on mobile (clients check invoices on phones)
Have a clear payment call-to-action
Wireframe Layout
text

┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │   InvoiceFlow                            INVOICE         │  │
│  │                                          #2025-0012      │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌───────────────────────┐    ┌─────────────────────────────┐  │
│  │  FROM                 │    │  BILL TO                    │  │
│  │                       │    │                             │  │
│  │  Your Company Name    │    │  Acme Corporation           │  │
│  │  123 Business Street  │    │  John Smith                 │  │
│  │  Singapore 123456     │    │  456 Client Avenue          │  │
│  │  hello@company.com    │    │  Singapore 654321           │  │
│  │                       │    │  john@acmecorp.com          │  │
│  └───────────────────────┘    └─────────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Issue Date:     January 15, 2025                        │  │
│  │  Due Date:       February 14, 2025                       │  │
│  │  Status:         [Pending Payment]                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ═══════════════════════════════════════════════════════════   │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  DESCRIPTION                    QTY    RATE      AMOUNT  │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  ▌Development Services                                   │  │
│  │                                                          │  │
│  │  Frontend Development           40 hrs  S$ 150  S$ 6,000 │  │
│  │  Backend API implementation     24 hrs  S$ 150  S$ 3,600 │  │
│  │                                                          │  │
│  │  ▌Additional Services                                    │  │
│  │                                                          │  │
│  │  Server configuration & setup   1 item  S$ 500  S$ 500   │  │
│  │                                                          │  │
│  │  ▌Adjustments                                            │  │
│  │                                                          │  │
│  │  Early payment discount         —       —       -S$ 200  │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │                              Subtotal       S$ 10,100.00 │  │
│  │                              Discount         -S$ 200.00 │  │
│  │                              ─────────────────────────── │  │
│  │                              TOTAL DUE      S$ 9,900.00  │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │                    [ 💳 Pay Now — S$ 9,900.00 ]          │  │
│  │                                                          │  │
│  │                    🖨️ Print    📥 Download               │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ──────────────────────────────────────────────────────────    │
│  Thank you for your business!                                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
Print Optimization Styles
CSS

/* TailwindCSS v4 print utilities */
@media print {
  /* Add to your CSS or use Tailwind's print: prefix */
}
React

// Print-specific classes used throughout
<button className="print:hidden">Pay Now</button>
<div className="bg-slate-50 print:bg-white">...</div>
<div className="shadow-sm print:shadow-none">...</div>
Print Considerations:

Hide interactive elements (print:hidden)
Remove shadows and decorative backgrounds
Ensure sufficient contrast for B&W printing
Use serif font for line items (better print readability)
Fixed widths that work on A4/Letter paper
Payment Modal
text

┌────────────────────────────────────────────────────────────────┐
│  Pay Invoice #2025-0012                                    ✕   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Amount Due                                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     S$ 9,900.00                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Card Number                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  💳  4242 4242 4242 4242                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌────────────────────────┐  ┌────────────────────────────┐   │
│  │  Expiry Date           │  │  CVC                       │   │
│  │  ┌──────────────────┐  │  │  ┌──────────────────────┐  │   │
│  │  │  MM / YY         │  │  │  │  •••                 │  │   │
│  │  └──────────────────┘  │  │  └──────────────────────┘  │   │
│  └────────────────────────┘  └────────────────────────────┘   │
│                                                                │
│  Cardholder Name                                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  John Smith                                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│              [ Pay S$ 9,900.00 ]                               │
│                                                                │
│              🔒 Secured by Stripe (mock)                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
Note: This is a visual mockup only. No actual payment processing for Phase 1.

7. Data Models (Phase 1 Mock Data)
7.1 TypeScript Interfaces
TypeScript

// types/index.ts

interface Client {
  id: string
  companyName: string
  contactPerson: string | null
  email: string
  phone: string | null
  address: string | null
  notes: string | null
  createdAt: string
  totalBilled: number
}

interface Invoice {
  id: string
  invoiceNumber: string    // e.g., "2025-0012"
  token: string            // UUID for public URL
  clientId: string
  client: Client
  issueDate: string
  dueDate: string
  status: 'draft' | 'pending' | 'paid' | 'overdue'
  lineItems: LineItem[]
  subtotal: number
  discountTotal: number
  total: number
  sentAt: string | null
  paidAt: string | null
  createdAt: string
  updatedAt: string
}

interface LineItem {
  id: string
  type: 'item' | 'section' | 'discount'
  description: string
  quantity: number | null
  unit: 'hours' | 'days' | 'items' | 'units' | null
  unitPrice: number | null
  total: number
  order: number            // For sorting/reordering
}

interface DashboardMetrics {
  outstanding: {
    amount: number
    invoiceCount: number
  }
  paidThisMonth: {
    amount: number
    invoiceCount: number
  }
  paidYTD: {
    amount: number
    invoiceCount: number
  }
  overdue: {
    amount: number
    invoiceCount: number
  }
}

interface VendorInfo {
  companyName: string
  address: string
  email: string
  phone: string | null
}
7.2 Mock Data File
JavaScript

// lib/mockData.js

export const vendorInfo = {
  companyName: "Your Company Name",
  address: "123 Business Street\nSingapore 123456",
  email: "hello@yourcompany.com",
  phone: "+65 9123 4567",
}

export const clients = [
  {
    id: "client-001",
    companyName: "Acme Corporation",
    contactPerson: "John Smith",
    email: "john@acmecorp.com",
    phone: "+65 9111 2222",
    address: "456 Client Avenue\nSingapore 654321",
    notes: "Preferred payment: Bank transfer",
    createdAt: "2024-11-15T10:00:00Z",
    totalBilled: 24500.00,
  },
  {
    id: "client-002",
    companyName: "Beta Technologies Ltd",
    contactPerson: "Jane Doe",
    email: "jane@betatech.io",
    phone: "+65 9222 3333",
    address: "789 Tech Park\nSingapore 789012",
    notes: null,
    createdAt: "2024-12-01T14:30:00Z",
    totalBilled: 18200.00,
  },
  {
    id: "client-003",
    companyName: "Globex International",
    contactPerson: "Bob Wilson",
    email: "bob@globex.com",
    phone: "+65 9333 4444",
    address: "321 Global Tower\nSingapore 321098",
    notes: "Net 30 terms agreed",
    createdAt: "2024-12-10T09:15:00Z",
    totalBilled: 45800.00,
  },
  {
    id: "client-004",
    companyName: "Delta Dynamics",
    contactPerson: "Sarah Chen",
    email: "sarah@deltadyn.com",
    phone: null,
    address: "555 Innovation Hub\nSingapore 555555",
    notes: null,
    createdAt: "2025-01-02T11:00:00Z",
    totalBilled: 2100.00,
  },
  {
    id: "client-005",
    companyName: "Epsilon Enterprises",
    contactPerson: "Mike Brown",
    email: "mike@epsilon.sg",
    phone: "+65 9555 6666",
    address: null,
    notes: "New client - first project",
    createdAt: "2025-01-10T16:45:00Z",
    totalBilled: 0,
  },
]

export const invoices = [
  {
    id: "inv-001",
    invoiceNumber: "2025-0001",
    token: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    clientId: "client-001",
    issueDate: "2025-01-05",
    dueDate: "2025-02-04",
    status: "paid",
    lineItems: [
      {
        id: "li-001",
        type: "section",
        description: "Consulting Services",
        quantity: null,
        unit: null,
        unitPrice: null,
        total: 0,
        order: 1,
      },
      {
        id: "li-002",
        type: "item",
        description: "Strategy consultation sessions",
        quantity: 8,
        unit: "hours",
        unitPrice: 200,
        total: 1600,
        order: 2,
      },
      {
        id: "li-003",
        type: "item",
        description: "Market research report",
        quantity: 1,
        unit: "items",
        unitPrice: 2500,
        total: 2500,
        order: 3,
      },
    ],
    subtotal: 4100,
    discountTotal: 0,
    total: 4100,
    sentAt: "2025-01-05T10:00:00Z",
    paidAt: "2025-01-20T14:30:00Z",
    createdAt: "2025-01-05T09:00:00Z",
    updatedAt: "2025-01-20T14:30:00Z",
  },
  {
    id: "inv-002",
    invoiceNumber: "2025-0002",
    token: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    clientId: "client-003",
    issueDate: "2025-01-10",
    dueDate: "2025-02-09",
    status: "pending",
    lineItems: [
      {
        id: "li-004",
        type: "section",
        description: "Development Services",
        quantity: null,
        unit: null,
        unitPrice: null,
        total: 0,
        order: 1,
      },
      {
        id: "li-005",
        type: "item",
        description: "Frontend development (React)",
        quantity: 40,
        unit: "hours",
        unitPrice: 150,
        total: 6000,
        order: 2,
      },
      {
        id: "li-006",
        type: "item",
        description: "Backend API development",
        quantity: 24,
        unit: "hours",
        unitPrice: 150,
        total: 3600,
        order: 3,
      },
      {
        id: "li-007",
        type: "section",
        description: "Additional Services",
        quantity: null,
        unit: null,
        unitPrice: null,
        total: 0,
        order: 4,
      },
      {
        id: "li-008",
        type: "item",
        description: "Server setup and configuration",
        quantity: 1,
        unit: "items",
        unitPrice: 500,
        total: 500,
        order: 5,
      },
      {
        id: "li-009",
        type: "discount",
        description: "Early payment discount (5%)",
        quantity: 1,
        unit: null,
        unitPrice: -505,
        total: -505,
        order: 6,
      },
    ],
    subtotal: 10100,
    discountTotal: -505,
    total: 9595,
    sentAt: "2025-01-10T11:00:00Z",
    paidAt: null,
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T11:00:00Z",
  },
  {
    id: "inv-003",
    invoiceNumber: "2025-0003",
    token: "c3d4e5f6-a7b8-9012-cdef-345678901234",
    clientId: "client-004",
    issueDate: "2024-12-15",
    dueDate: "2025-01-14",
    status: "overdue",
    lineItems: [
      {
        id: "li-010",
        type: "item",
        description: "Website maintenance - December",
        quantity: 1,
        unit: "items",
        unitPrice: 2100,
        total: 2100,
        order: 1,
      },
    ],
    subtotal: 2100,
    discountTotal: 0,
    total: 2100,
    sentAt: "2024-12-15T09:00:00Z",
    paidAt: null,
    createdAt: "2024-12-15T08:30:00Z",
    updatedAt: "2024-12-15T09:00:00Z",
  },
  {
    id: "inv-004",
    invoiceNumber: "2025-0004",
    token: "d4e5f6a7-b8c9-0123-defa-456789012345",
    clientId: "client-002",
    issueDate: "2025-01-14",
    dueDate: "2025-02-13",
    status: "draft",
    lineItems: [
      {
        id: "li-011",
        type: "item",
        description: "Mobile app development - Phase 1",
        quantity: 60,
        unit: "hours",
        unitPrice: 175,
        total: 10500,
        order: 1,
      },
    ],
    subtotal: 10500,
    discountTotal: 0,
    total: 10500,
    sentAt: null,
    paidAt: null,
    createdAt: "2025-01-14T15:00:00Z",
    updatedAt: "2025-01-14T15:00:00Z",
  },
]

export const dashboardMetrics = {
  outstanding: {
    amount: 12195,  // pending + overdue totals
    invoiceCount: 2,
  },
  paidThisMonth: {
    amount: 4100,
    invoiceCount: 1,
  },
  paidYTD: {
    amount: 4100,
    invoiceCount: 1,
  },
  overdue: {
    amount: 2100,
    invoiceCount: 1,
  },
}

// Helper to get client by ID
export function getClientById(id) {
  return clients.find(c => c.id === id)
}

// Helper to get invoice with client data
export function getInvoiceWithClient(invoiceId) {
  const invoice = invoices.find(i => i.id === invoiceId)
  if (!invoice) return null
  return {
    ...invoice,
    client: getClientById(invoice.clientId),
  }
}

// Helper to get invoices by status
export function getInvoicesByStatus(status) {
  if (status === 'all') return invoices
  return invoices.filter(i => i.status === status)
}
8. Responsive Design Matrix
8.1 Breakpoint Definitions
Breakpoint	Min Width	Tailwind Prefix	Target Devices
Mobile	0px	(default)	Phones
Tablet	768px	md:	Tablets, small laptops
Desktop	1024px	lg:	Laptops, monitors
Wide	1280px	xl:	Large monitors
8.2 Layout Adaptations by View
App Shell
Element	Mobile	Tablet	Desktop
Sidebar	Hidden (Sheet overlay)	Collapsed 64px	Expanded 240px
Header	Visible with hamburger	Hidden	Hidden
Main padding	p-4	p-6	p-8
Dashboard
Element	Mobile	Tablet	Desktop
Metrics	Stack vertical	2-column grid	3-column grid
Recent panels	Stack vertical	Stack vertical	2-column side-by-side
Create button	FAB (fixed bottom-right)	Header button	Header button
Tables (Clients, Invoices)
Element	Mobile	Tablet	Desktop
Layout	Card list	Compact table	Full table
Columns visible	Essential only	Most columns	All columns
Actions	Bottom of card	Inline dropdown	Inline dropdown
Invoice Editor
Element	Mobile	Tablet	Desktop
Client/Date row	Stack vertical	Side-by-side	Side-by-side
Line items	Simplified cards	Table	Table with all columns
Sticky footer	Full width fixed	Full width fixed	Full width fixed
Shareable Invoice
Element	Mobile	Tablet	Desktop
From/Bill To	Stack vertical	Side-by-side	Side-by-side
Line items	Simplified	Full table	Full table
Pay button	Full width	Centered inline	Centered inline
8.3 Mobile-First Implementation Pattern
React

// Example: Metric Cards Grid
<div className="
  grid gap-4
  grid-cols-1           // Mobile: stack
  md:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-3        // Desktop: 3 columns
">
  <MetricCard ... />
  <MetricCard ... />
  <MetricCard ... />
</div>

// Example: Table to Card transformation
<div className="hidden md:block">
  <Table>...</Table>
</div>
<div className="md:hidden space-y-3">
  {items.map(item => <MobileCard key={item.id} {...item} />)}
</div>
9. Accessibility Requirements
9.1 WCAG 2.1 AA Compliance Targets
Criterion	Requirement	Implementation
1.4.3 Contrast	4.5:1 for normal text, 3:1 for large	Use Tailwind's standard palette; verified for both themes
2.1.1 Keyboard	All functions keyboard accessible	Focus states on all interactive elements
2.4.7 Focus Visible	Clear focus indication	focus:ring-2 focus:ring-blue-500
4.1.2 Name, Role, Value	Proper ARIA labels	Labels on all form fields, aria-labels on icon buttons
9.2 Implementation Checklist
React

// Form Field Pattern
<div>
  <Label htmlFor="client-name">Client Name</Label>
  <Input 
    id="client-name"
    name="clientName"
    aria-describedby="client-name-hint"
  />
  <p id="client-name-hint" className="text-sm text-slate-500">
    Enter the company or individual name
  </p>
</div>

// Icon Button Pattern
<Button variant="ghost" size="icon" aria-label="Delete invoice">
  <Trash2 className="w-4 h-4" />
</Button>

// Status with Screen Reader Text
<Badge status="overdue">
  Overdue
  <span className="sr-only">Payment is past due date</span>
</Badge>
9.3 Keyboard Navigation
Key	Action
Tab	Move focus forward
Shift + Tab	Move focus backward
Enter / Space	Activate button/link
Escape	Close modal/dropdown
Arrow Keys	Navigate within menus/lists
10. Implementation Roadmap
Phase 1: Frontend Design (Current Scope)
Step 1: Environment Setup ✓
 Verify Rails 8 + Inertia + React setup
 Confirm TailwindCSS v4 configuration
 Install ShadCN components (see section 4.4)
 Configure Google Fonts (Fraunces + Outfit)
 Set up Lucide React icons
Step 2: Design System Foundation
 Create lib/utils.js with helper functions
 Customize ShadCN component styles to match design system
 Create theme configuration (CSS variables for light/dark)
 Build and test ThemeToggle component
Step 3: Layout Shell
 Build AppShell.jsx wrapper component
 Implement responsive Sidebar (desktop expanded, tablet collapsed)
 Implement MobileNav with Sheet overlay
 Create Logo component
 Wire up navigation links with Inertia
Step 4: Shared Components
 PageHeader.jsx (title + actions pattern)
 MetricCard.jsx
 DataTable.jsx (reusable table wrapper)
 SearchInput.jsx
 CurrencyDisplay.jsx
 InvoiceStatusBadge.jsx
 ClientAvatar.jsx
 EmptyState.jsx
Step 5: Dashboard View
 Create pages/Dashboard.jsx
 Implement metrics grid (Outstanding, Paid, Overdue)
 Build RecentInvoices component
 Build RecentClients component
 Add "Create Invoice" action button
 Test responsive behavior
 Verify dark mode
Step 6: Clients View
 Create pages/Clients/Index.jsx
 Build ClientsTable with mock data
 Implement search functionality (client-side filter)
 Create Add Client sheet/drawer with form
 Build mobile card view alternative
 Test responsive behavior
 Verify dark mode
Step 7: Invoices View
 Create pages/Invoices/Index.jsx
 Build filter tabs (All, Draft, Pending, Paid, Overdue)
 Build InvoicesTable with mock data
 Implement search functionality
 Create row actions dropdown
 Build mobile card view alternative
 Test responsive behavior
 Verify dark mode
Step 8: Invoice Editor
 Create pages/Invoices/New.jsx (reuse for Edit)
 Build Client selector combobox
 Build date pickers (Issue Date, Due Date)
 Create LineItemsTable with add/remove functionality
 Implement section header rows
 Implement discount rows
 Build InvoiceSummary (subtotal, discounts, total)
 Create sticky footer with actions
 Test responsive behavior
 Verify dark mode
Step 9: Shareable Invoice View
 Create pages/Public/Invoice.jsx
 Build standalone layout (no app shell)
 Implement header (vendor + invoice number)
 Build From/Bill To sections
 Build line items table (with sections)
 Build totals section
 Create PaymentModal (mock form)
 Add print/download buttons
 Implement print styles (print: utilities)
 Test responsive behavior
 Verify dark mode
 Test print preview
Step 10: Integration & Polish
 Connect all routes
 Verify navigation flows
 Cross-browser testing (Chrome, Firefox, Safari)
 Mobile device testing
 Accessibility audit (keyboard nav, screen reader)
 Performance check (bundle size, load time)
 Final dark mode review
Validation Checkpoints
Checkpoint	Criteria	Method
CP1: Shell Complete	Navigation works, theme toggle functional	Manual testing
CP2: All Views Render	5 views accessible via routes	Route verification
CP3: Responsive Pass	All views work on mobile/tablet/desktop	Device testing
CP4: Dark Mode Pass	All views render correctly in dark mode	Visual review
CP5: Print Ready	Shareable invoice prints cleanly	Print preview
11. Deliverables & Success Criteria
11.1 Phase 1 Deliverables
#	Deliverable	Route	Status
1	Dashboard View	http://localhost:3000/dashboard	Pending
2	Clients List View	http://localhost:3000/clients	Pending
3	Invoices List View	http://localhost:3000/invoices	Pending
4	Invoice Editor View	http://localhost:3000/invoices/new	Pending
5	Shareable Invoice View	http://localhost:3000/public/invoices/:token	Pending
11.2 Success Criteria
Functional Criteria
 All 5 views render without errors
 Navigation between views works correctly
 Mock data displays correctly in all views
 Theme toggle switches between light/dark modes
 All interactive elements (buttons, dropdowns, tabs) function
Design Criteria
 Typography follows Fraunces + Outfit pairing
 Color palette adheres to design system
 Spacing is consistent with defined scale
 Status badges use correct colors
 Layout matches wireframes
Responsive Criteria
 Mobile (375px): All views usable, no horizontal scroll
 Tablet (768px): Appropriate layout adjustments
 Desktop (1280px): Full layouts render correctly
Accessibility Criteria
 All interactive elements keyboard accessible
 Focus states visible on all focusable elements
 Form labels properly associated
 Color contrast meets WCAG AA
Print Criteria (Shareable Invoice only)
 Invoice prints on single page (or clean page breaks)
 Interactive elements hidden in print
 Adequate contrast for B&W printing
12. Appendices
Appendix A: Color Reference Quick Sheet
text

Light Mode:
- bg-white                 → Page background
- bg-slate-50              → Card background
- text-slate-900           → Primary text
- text-slate-600           → Secondary text
- border-slate-200         → Borders
- bg-blue-500              → Primary buttons

Dark Mode:
- bg-slate-950             → Page background
- bg-slate-900             → Card background
- text-slate-50            → Primary text
- text-slate-400           → Secondary text
- border-slate-800         → Borders
- bg-blue-500              → Primary buttons (same)
Appendix B: Component Import Cheatsheet
React

// ShadCN Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
S
