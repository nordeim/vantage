# InvoiceForge — Personal Invoicing Application
**Document Version:** 4.1.0
**Phase:** 1 — Frontend Design & Prototyping
**Status:** Final — Ready for Implementation
**Last Updated:** December 2025

## Table of Contents
1.  **Product Vision & Philosophy**
    *   1.1 Purpose Statement
    *   1.2 Core Philosophy
    *   1.3 Design Manifesto: "Neo-Editorial Precision"
    *   1.4 Currency & Locale
    *   1.5 Anti-Patterns (What We Avoid)
2.  **Design System**
    *   2.1 Typography
    *   2.2 Color System
    *   2.3 Spacing & Layout
    *   2.4 Effects & Treatments
    *   2.5 Iconography
    *   2.6 Motion & Interactions
    *   2.7 Component Style Guide (Implementation Patterns)
3.  **Technical Architecture**
    *   3.1 Stack Overview
    *   3.2 Directory Structure
    *   3.3 Routing Configuration
    *   3.4 Route-to-View Mapping
    *   3.5 Utility Functions (`lib/utils.ts`)
4.  **Data Models**
    *   4.1 Entity Relationship Diagram
    *   4.2 TypeScript Interfaces
    *   4.3 Mock Data Structure (Full)
5.  **Application Shell**
    *   5.1 Layout Architecture
    *   5.2 Logo Design
    *   5.3 Navigation Specification
    *   5.4 Theme Toggle Component
6.  **View Specifications**
    *   6.1 Dashboard View
    *   6.2 Clients View
    *   6.3 Invoices View
    *   6.4 Invoice Editor View
    *   6.5 Shareable Invoice View (Public)
7.  **Component Library**
    *   7.1 ShadCN UI Components Required
    *   7.2 Custom Components to Build
8.  **Responsive Design**
    *   8.1 Breakpoint Strategy
    *   8.2 Responsive Patterns by View
    *   8.3 Mobile-First Implementation Pattern
9.  **Accessibility Requirements**
    *   9.1 WCAG 2.1 AA Targets
    *   9.2 Implementation Checklist
    *   9.3 Keyboard Navigation
10. **Theme System**
    *   10.1 Implementation Strategy
11. **Print Optimization**
    *   11.1 Print Stylesheet Strategy
    *   11.2 Tailwind Print Utilities
12. **Implementation Roadmap**
    *   12.1 Phase 1 Schedule (Daily Breakdown)
13. **Quality Assurance & Validation**
    *   13.1 Validation Checkpoints
    *   13.2 Visual & Functional QA
    *   13.3 Success Criteria
14. **Appendices**
    *   A. Component Import Cheatsheet
    *   B. Color Reference Quick Sheet

---

## 1. Product Vision & Philosophy

### 1.1 Purpose Statement
InvoiceForge is a single-user invoicing application designed for freelancers and solo professionals who demand speed, clarity, and a polished client-facing presentation. The application serves two distinct users:
1.  **The Admin (You):** Needs a friction-free workflow to manage cash flow and generate documents rapidly.
2.  **The Client (The Payer):** Needs a professional, trustworthy, and clear document that removes barriers to payment.

### 1.2 Core Philosophy
**"Precision is the ultimate sophistication."**

Every pixel, interaction, and typographic choice serves a purpose. The interface should feel:
*   **Swift:** Inertia/React SPA architecture ensures instant navigation.
*   **Confident:** Bold typography and deliberate spacing project competence.
*   **Trustworthy:** Clean financial presentation that clients take seriously.

### 1.3 Design Manifesto: "Neo-Editorial Precision"
We merge Swiss International Style foundations with Neo-Editorial boldness:

| Swiss Foundation | Neo-Editorial Execution |
| :--- | :--- |
| **Rigid grid systems** | Asymmetric tension within the grid |
| **Purposeful whitespace** | Generous margins that breathe |
| **Typographic hierarchy** | Dramatic scale contrasts (e.g., massive Invoice Numbers) |
| **Functional minimalism** | Singular bold accent for focus |
| **Data-forward layouts** | Editorial typography treatments |

**The Unforgettable Element:**
The invoice number treatment — oversized, typographically distinctive, positioned with editorial confidence. When clients see `2025-0001`, it's not just a reference — it's a statement.

### 1.4 Currency & Locale
*   **Primary Currency:** SGD (Singapore Dollar)
*   **Format:** `S$1,234.56` with locale-aware thousand separators.
*   **Decimal Precision:** Always 2 decimal places for monetary values.

### 1.5 Anti-Patterns (What We Avoid)
To maintain the integrity of the design vision, we explicitly reject the following patterns:

| ❌ Avoid | ✅ Instead |
| :--- | :--- |
| **Soft diffuse shadows** (`shadow-lg`) | Sharp, shallow shadows (`shadow-sm`) or distinct 1px borders. |
| **Rounded-everything** (`rounded-xl`) | Precise corners (`rounded-md` or `rounded-lg` max). |
| **Generic icons everywhere** | Purposeful iconography; usage of text labels where clarity aids speed. |
| **Gradient backgrounds** | Solid, intentional color blocks (Slate/White). |
| **Decorative illustrations** | Data visualization and typography *are* the decoration. |
| **System fonts** (Inter/Roboto) | Distinctive pairing: Instrument Serif + Geist. |

---

## 2. Design System

### 2.1 Typography

**Font Selection Rationale:**
We employ a distinctive serif + modern sans-serif pairing that balances editorial sophistication with technical precision.

| Role | Font Family | Weight Range | Google Fonts Import |
| :--- | :--- | :--- | :--- |
| **Display/Headlines** | Instrument Serif | 400 (Regular) | `family=Instrument+Serif:ital@0;1` |
| **UI/Body** | Geist | 400, 500, 600, 700 | `family=Geist:wght@400;500;600;700` |
| **Monospace** | Geist Mono | 400, 500 | `family=Geist+Mono:wght@400;500` |

**Tailwind v4 Configuration:**
Add this to `app/assets/stylesheets/application.css`:

```css
@import "tailwindcss";

@theme {
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
}
```

**Typographic Scale:**
*   **Invoice Hero:** `text-6xl` or `text-8xl` (Font: Mono, Tracking: Tighter)
*   **Page Title:** `text-4xl` (Font: Display, Leading: None)
*   **Section Heading:** `text-xl` (Font: Sans, Weight: 600)
*   **Body:** `text-sm` or `text-base` (Font: Sans, Weight: 400)
*   **Data/Numbers:** `text-sm` (Font: Mono, Weight: 500)

### 2.2 Color System

**Palette Definition:**
Base: Slate (neutral with subtle blue undertone).
Accent: Electric Blue (used exclusively for primary actions).

**CSS Variables (Tailwind v4):**
```css
@theme {
  /* Primary Action */
  --color-accent: var(--color-blue-500);
  --color-accent-hover: var(--color-blue-600);
  --color-accent-subtle: var(--color-blue-50);
  
  /* Status Colors */
  --color-status-draft: var(--color-slate-400);
  --color-status-pending: var(--color-amber-500);
  --color-status-paid: var(--color-emerald-500);
  --color-status-overdue: var(--color-rose-500);
}
```

**Status Badge Specifications:**
| Status | Light Mode | Dark Mode | Border Style |
| :--- | :--- | :--- | :--- |
| **Draft** | `bg-slate-100` `text-slate-600` `border-slate-300` | `bg-slate-800` `text-slate-400` `border-slate-600` | Dashed (`border-dashed`) |
| **Pending** | `bg-amber-50` `text-amber-700` `border-amber-300` | `bg-amber-950` `text-amber-400` `border-amber-700` | Solid |
| **Paid** | `bg-emerald-50` `text-emerald-700` `border-emerald-300` | `bg-emerald-950` `text-emerald-400` `border-emerald-700` | Solid |
| **Overdue** | `bg-rose-50` `text-rose-700` `border-rose-300` | `bg-rose-950` `text-rose-400` `border-rose-700` | Solid |

### 2.3 Spacing & Layout
*   **Container Max Width:** `max-w-7xl` (1280px)
*   **Page Padding:** `px-4 sm:px-6 lg:px-8`
*   **Gap Scale:**
    *   `gap-1` (4px): Inline icon + text
    *   `gap-2` (8px): Form label to input
    *   `gap-4` (16px): Standard element spacing
    *   `gap-8` (32px): Major page sections

### 2.4 Effects & Treatments
**Shadows (Brutalist Precision):**
*   **None:** `shadow-none` (Flat cards)
*   **Subtle:** `shadow-sm` (Cards at rest - suggests elevation without fuzziness)
*   **Elevated:** `shadow-md` (Dropdowns)

**Border Radius:**
*   **Cards:** `rounded-lg`
*   **Buttons/Inputs:** `rounded-md`
*   **Badges:** `rounded-full`

### 2.5 Iconography
**Library:** Lucide React
**Standard Sizes:**
*   **Inline:** 16px (`size-4`)
*   **Navigation:** 20px (`size-5`)
*   **Empty State:** 48px (`size-12`)
**Stroke Width:** 2px (Default)

### 2.6 Motion & Interactions
**Philosophy:** Restrained, purposeful motion. One well-orchestrated moment is better than scattered micro-interactions.

**Transition Defaults:**
```css
/* Standard transition for interactive elements */
transition-colors duration-150 ease-in-out

/* Page transitions (Inertia) */
transition-opacity duration-300
```

**Key Interaction Patterns:**
*   **Button Hover:** Color shift (150ms ease).
*   **Card Hover:** Subtle border color change (no movement).
*   **Modal Open:** Fade in (200ms) + slight scale (0.95 → 1).
*   **Dropdown Open:** Fade + translate-y (`-4px` → `0`).

**Staggered List Animation:**
Use for `RecentInvoices` or `ClientTable` to create a premium feel.
```jsx
// React / Framer Motion Example
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }}
>
```

### 2.7 Component Style Guide (Implementation Patterns)
The following snippets illustrate how to implement the "Neo-Editorial" aesthetic using ShadCN primitives and Tailwind classes.

**Primary Button:**
```tsx
<Button className="
  bg-blue-500 hover:bg-blue-600 
  text-white font-medium
  px-4 py-2 rounded-md
  transition-colors duration-150
  focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
">
  Create Invoice
</Button>
```

**Secondary Button (Outline):**
```tsx
<Button variant="outline" className="
  bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800
  text-slate-900 dark:text-slate-100 font-medium
  border border-slate-300 dark:border-slate-700
  rounded-md
">
  Cancel
</Button>
```

**Card Container:**
```tsx
<div className="
  bg-white dark:bg-slate-900
  border border-slate-200 dark:border-slate-800
  rounded-lg
  shadow-sm
  p-6
">
  {/* Content */}
</div>
```

**Input Field:**
```tsx
<input 
  className="
    w-full px-3 py-2
    bg-white dark:bg-slate-950
    border border-slate-300 dark:border-slate-700
    rounded-md
    text-slate-900 dark:text-slate-100
    placeholder:text-slate-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  "
/>
```

---

## 3. Technical Architecture

### 3.1 Stack Overview
*   **Backend Framework:** Ruby on Rails 8.x
*   **Frontend Adapter:** Inertia.js (Rails Adapter)
*   **View Layer:** React 18+
*   **Styling:** TailwindCSS v4
*   **Component Library:** ShadCN UI (Radix Primitives)
*   **Icons:** Lucide React

### 3.2 Directory Structure
```text
app/
├── controllers/
│   ├── dashboard_controller.rb
│   ├── clients_controller.rb
│   ├── invoices_controller.rb
│   └── public_invoices_controller.rb
├── frontend/
│   ├── components/
│   │   ├── ui/               # ShadCN components (Button, Card, etc.)
│   │   ├── layout/           # AppShell, Sidebar, MobileNav
│   │   ├── dashboard/        # MetricCard, ActivityFeed
│   │   ├── clients/          # ClientTable, ClientForm
│   │   ├── invoices/         # InvoiceTable, LineItemEditor
│   │   └── shared/           # PageHeader, StatusBadge
│   ├── layouts/
│   │   ├── AppLayout.tsx     # Main authenticated layout
│   │   └── PublicLayout.tsx  # Shareable invoice layout
│   ├── lib/
│   │   ├── utils.ts          # cn() helper, formatters
│   │   └── mock-data.ts      # Phase 1 stub data
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Clients/
│   │   │   ├── Index.tsx
│   │   │   └── (Show.tsx)
│   │   ├── Invoices/
│   │   │   ├── Index.tsx
│   │   │   ├── New.tsx
│   │   │   └── Edit.tsx
│   │   └── PublicInvoice/
│   │       └── Show.tsx
│   ├── hooks/                # useTheme, useCurrency
│   └── entrypoints/
│       └── inertia.tsx       # Inertia app initialization
└── assets/
    └── stylesheets/
        └── application.css   # Tailwind v4 entry point
```

### 3.3 Routing Configuration
**Rails Routes (`config/routes.rb`):**

```ruby
Rails.application.routes.draw do
  # Redirect root to dashboard
  root "dashboard#index"

  # Main application routes
  get "dashboard", to: "dashboard#index"
  
  resources :clients, only: [:index, :new, :create, :edit, :update, :destroy]
  
  resources :invoices, only: [:index, :new, :create, :edit, :update, :destroy] do
    member do
      post :send_invoice    # Changes status to 'pending'
      post :mark_paid       # Changes status to 'paid'
    end
  end

  # Public shareable invoice (no auth required)
  get "i/:token", to: "public_invoices#show", as: :public_invoice
end
```

### 3.4 Route-to-View Mapping
| Route | Controller#Action | React Page Component | Description |
| :--- | :--- | :--- | :--- |
| `/` | `redirect` | — | Redirects to `/dashboard` |
| `/dashboard` | `dashboard#index` | `pages/Dashboard.tsx` | Main dashboard |
| `/clients` | `clients#index` | `pages/Clients/Index.tsx` | Client list |
| `/invoices` | `invoices#index` | `pages/Invoices/Index.tsx` | Invoice list |
| `/invoices/new` | `invoices#new` | `pages/Invoices/New.tsx` | Invoice editor (create) |
| `/invoices/:id/edit` | `invoices#edit` | `pages/Invoices/Edit.tsx` | Invoice editor (edit) |
| `/i/:token` | `public_invoices#show` | `pages/PublicInvoice/Show.tsx` | Shareable invoice |

### 3.5 Utility Functions (`lib/utils.ts`)

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Class name merger (standard shadcn utility)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatter for SGD
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
  }).format(amount)
}

// Date formatter
export function formatDate(dateStr: string, options: Intl.DateTimeFormatOptions = {}) {
  const defaultOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Intl.DateTimeFormat('en-SG', { ...defaultOptions, ...options }).format(new Date(dateStr))
}

// Invoice number generator
export function generateInvoiceNumber(year: number, sequence: number) {
  return `${year}-${String(sequence).padStart(4, '0')}`
}

// Invoice status calculator (if needed on frontend)
export function calculateInvoiceStatus(invoice: any) {
  if (invoice.paidAt) return 'paid'
  if (new Date(invoice.dueDate) < new Date()) return 'overdue'
  if (invoice.sentAt) return 'pending'
  return 'draft'
}
```

---

## 4. Data Models

### 4.1 Entity Relationship Diagram

```text
┌─────────────────┐       ┌─────────────────────┐
│     CLIENT      │       │       INVOICE       │
├─────────────────┤       ├─────────────────────┤
│ id              │       │ id                  │
│ name            │◄──────│ client_id           │
│ email           │   1:N │ invoice_number      │
│ company         │       │ status              │
│ address         │       │ issue_date          │
│ phone           │       │ due_date            │
│ notes           │       │ token (public URL)  │
│ total_billed    │       │ created_at          │
│ created_at      │       │ updated_at          │
└─────────────────┘       └─────────┬───────────┘
                                    │
                                    │ 1:N
                                    ▼
                          ┌─────────────────────┐
                          │    LINE_ITEM        │
                          ├─────────────────────┤
                          │ id                  │
                          │ invoice_id          │
                          │ type (item/section/ │
                          │       discount)     │
                          │ description         │
                          │ quantity            │
                          │ unit_type           │
                          │ unit_price          │
                          │ position (ordering) │
                          └─────────────────────┘
```

### 4.2 TypeScript Interfaces
File: `app/frontend/lib/types.ts`

```typescript
// ENUMS
export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue';
export type LineItemType = 'item' | 'section' | 'discount';
export type UnitType = 'hours' | 'days' | 'items' | 'units' | 'fixed';

// ENTITIES
export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  address?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  // Computed (for list views)
  totalBilled?: number;
  lastInvoiceDate?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // Format: "2025-0001"
  clientId: string;
  client?: Client; // Expanded relation
  status: InvoiceStatus;
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string
  notes?: string;
  lineItems: LineItem[];
  token: string; // For public URL
  createdAt: string;
  updatedAt: string;
  // Computed
  subtotal?: number;
  totalDiscount?: number;
  total?: number;
}

export interface LineItem {
  id: string;
  invoiceId: string;
  type: LineItemType;
  description: string;
  quantity?: number; // null for section headers
  unitType?: UnitType; // null for section headers
  unitPrice?: number; // Negative for discounts
  position: number;
  // Computed
  lineTotal?: number;
}

// DASHBOARD METRICS
export interface DashboardMetrics {
  totalOutstanding: number;
  totalPaidThisMonth: number;
  totalPaidYTD: number;
  overdueAmount: number;
  overdueCount: number;
}

export interface RecentActivity {
  id: string;
  type: 'invoice_created' | 'invoice_sent' | 'invoice_paid' | 'client_created';
  description: string;
  timestamp: string;
  relatedId?: string;
  relatedType?: 'invoice' | 'client';
}
```

### 4.3 Mock Data Structure (Full)
File: `app/frontend/lib/mock-data.ts`
**Note:** This data must be implemented exactly to pass validation checkpoints.

```typescript
import type { Client, Invoice, DashboardMetrics, RecentActivity } from './types';

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
];

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
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalOutstanding: 7280.00, // pending + overdue totals
  totalPaidThisMonth: 8000.00,
  totalPaidYTD: 56150.00,
  overdueAmount: 1200.00,
  overdueCount: 1,
};

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
];
```

---

## 5. Application Shell

### 5.1 Layout Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Mobile: Full width, Desktop: Hidden - Nav in Sidebar)  │
│ ┌─────────────┬───────────────────────────────────┬───────────┐ │
│ │ Logo        │                                   │ Theme     │ │
│ │ (Mobile)    │        (Mobile: Hamburger Menu)   │ Toggle    │ │
│ └─────────────┴───────────────────────────────────┴───────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────────────────────────────────┐ │
│  │              │  │                                          │ │
│  │   SIDEBAR    │  │              MAIN CONTENT                │ │
│  │  (Desktop)   │  │                                          │ │
│  │              │  │  ┌──────────────────────────────────────┐│ │
│  │  ┌────────┐  │  │  │  PAGE HEADER                        ││ │
│  │  │ Logo   │  │  │  │  Title + Actions                    ││ │
│  │  └────────┘  │  │  └──────────────────────────────────────┘│ │
│  │              │  │                                          │ │
│  │  Navigation  │  │  ┌──────────────────────────────────────┐│ │
│  │  ┌────────┐  │  │  │                                      ││ │
│  │  │Dashboard│  │  │  │          PAGE CONTENT               ││ │
│  │  ├────────┤  │  │  │                                      ││ │
│  │  │Clients │  │  │  │                                      ││ │
│  │  ├────────┤  │  │  │                                      ││ │
│  │  │Invoices│  │  │  │                                      ││ │
│  │  └────────┘  │  │  │                                      ││ │
│  │              │  │  │                                      ││ │
│  │  ┌────────┐  │  │  │                                      ││ │
│  │  │Theme   │  │  │  └──────────────────────────────────────┘│ │
│  │  │Toggle  │  │  │                                          │ │
│  │  └────────┘  │  │                                          │ │
│  │              │  │                                          │ │
│  └──────────────┘  └──────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Responsive Breakpoints:**
*   **Mobile (< 768px):** Sidebar hidden. Header visible with Hamburger menu trigger for Sheet.
*   **Desktop (> 1024px):** Sidebar fixed (240px). Header hidden.

### 5.2 Logo Design
**Concept:** Typographic mark that doubles as a visual identity.
**Typography:** `font-display` (Instrument Serif) for "INV", `font-mono` (Geist Mono) for "FORGE".

```text
┌──────────────────────────────────┐
│   INV                            │
│   ────  ← Horizontal rule        │
│   FORGE                          │
└──────────────────────────────────┘
```

**Implementation Pattern:**
```tsx
// components/layout/Logo.tsx
export function Logo({ collapsed = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <span className="font-display font-bold text-xl leading-none">INV</span>
        <div className="h-px bg-slate-900 dark:bg-slate-100 w-full my-0.5" />
        <span className="font-mono text-sm leading-none tracking-widest">FORGE</span>
      </div>
    </div>
  )
}
```

### 5.3 Navigation Specification
| Nav Item | Icon | Route | Active State |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `LayoutDashboard` | `/dashboard` | `bg-slate-100 dark:bg-slate-800` `text-blue-600 dark:text-blue-400` |
| **Clients** | `Users` | `/clients` | Same as above |
| **Invoices** | `FileText` | `/invoices` | Same as above |

### 5.4 Theme Toggle Component
**Behavior:**
*   Default to system preference on first load.
*   User selection persists in `localStorage`.
*   Smooth transition between modes (`transition-colors duration-200`).
**Visual:**
*   Sun icon (`Sun`) for light mode.
*   Moon icon (`Moon`) for dark mode.

---

## 6. View Specifications

### 6.1 Dashboard View (`/dashboard`)
**Purpose:** High-level financial pulse and quick actions.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ Dashboard (Page Title - Display)    │ [+ New Invoice]  │ │
│  │ Monday, 20 January 2025             │    Primary CTA   │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  METRICS GRID (4 columns desktop, 2 tablet, 1 mobile)       │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐     │
│  │ Outstanding   │ │ Paid (Month)  │ │ Paid (YTD)    │ ... │
│  │ S$7,280.00    │ │ S$8,000.00    │ │ S$56,150.00   │     │
│  │ 2 invoices    │ │ ↑ 12% vs last │ │               │     │
│  └───────────────┘ └───────────────┘ └───────────────┘     │
├─────────────────────────────────────────────────────────────┤
│  TWO COLUMN LAYOUT (stacks on mobile)                       │
│  ┌────────────────────────┐ ┌────────────────────────────┐  │
│  │ RECENT INVOICES        │ │ RECENT ACTIVITY            │  │
│  │ ┌────────────────────┐ │ │ ┌──────────────────────────┐│  │
│  │ │ #2025-0001         │ │ │ │ Invoice #2025-0002       ││  │
│  │ │ Acme Corp          │ │ │ │ created for Startup Labs ││  │
│  │ │ S$6,080 [Pending]  │ │ │ │ 2 hours ago              ││  │
│  │ └────────────────────┘ │ │ └──────────────────────────┘│  │
│  │ ┌────────────────────┐ │ │ ┌──────────────────────────┐│  │
│  │ │ #2025-0002         │ │ │ │ Invoice #2025-0001 sent  ││  │
│  │ │ Startup Labs       │ │ │ │ to Acme Corporation      ││  │
│  │ │ S$2,400 [Draft]    │ │ │ │ 5 days ago               ││  │
│  │ └────────────────────┘ │ │ └──────────────────────────┘│  │
│  │ [View All Invoices →]  │ │ │ ...                        │  │
│  └────────────────────────┘ └────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Component Breakdown:**
*   **MetricCard:** Large number (`font-mono text-3xl`) + Uppercase Label. *Note:* Overdue metrics use `text-rose-600`.
*   **RecentInvoiceCard:** Compact card. Click navigates to edit.
*   **ActivityFeed:** Vertical timeline. Icon + description + relative timestamp.

### 6.2 Clients View (`/clients`)
**Purpose:** Directory of all clients with billing overview.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ Clients (Page Title)                │ [+ New Client]   │ │
│  │ 3 total clients                     │                  │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  SEARCH BAR (optional for Phase 1)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🔍 Search clients...                                    │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  CLIENT TABLE / CARDS                                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ┌──────┬────────────────────┬───────────┬─────────────┐ │ │
│  │ │Avatar│ Name / Company      │ Total     │ Last Invoice│ │ │
│  │ ├──────┼────────────────────┼───────────┼─────────────┤ │ │
│  │ │  AC  │ Acme Corporation   │ S$15,750  │ 15 Jan 2025 │ │ │
│  │ │      │ billing@acme.corp  │           │             │ │ │
│  │ ├──────┼────────────────────┼───────────┼─────────────┤ │ │
│  │ │  SL  │ Startup Labs       │ S$8,400   │ 10 Jan 2025 │ │ │
│  │ │      │ finance@startup... │           │             │ │ │
│  │ └──────┴────────────────────┴───────────┴─────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Mobile Layout Strategy:**
On mobile, the table strictly transforms into a stack of cards:
```text
┌─────────────────────────────────┐
│ ┌────┐  Acme Corporation        │
│ │ AC │  billing@acme.corp       │
│ └────┘  ────────────────────    │
│         Total Billed: S$15,750  │
│         Last Invoice: 15 Jan    │
└─────────────────────────────────┘
```

**Client Avatar Logic (Implementation):**
```tsx
const avatarColors = [
  'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-purple-500'
]
function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % avatarColors.length
  return avatarColors[index]
}
```

**Add Client Form Fields (Sheet/Drawer):**
*   **Company Name** (Required, Text)
*   **Contact Person** (Text)
*   **Email** (Required, Email type)
*   **Phone** (Text)
*   **Address** (Textarea)
*   **Notes** (Textarea)

### 6.3 Invoices View (`/invoices`)
**Purpose:** Command center for all invoices.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ Invoices (Page Title)               │ [+ New Invoice]  │ │
│  │ 4 total invoices                    │                  │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  FILTER TABS                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [ All (4) ] [ Draft (1) ] [ Pending (1) ] [ Paid (1) ] │ │
│  │                                         [ Overdue (1) ] │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  INVOICE TABLE                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Invoice #    │ Client       │ Amount    │ Due Date     │ │
│  │              │              │           │ Status       │ │
│  ├──────────────┼──────────────┼───────────┼──────────────┤ │
│  │ 2025-0001    │ Acme Corp    │ S$6,080   │ 14 Feb 2025  │ │
│  │              │              │           │ [Pending]    │ │
│  ├──────────────┼──────────────┼───────────┼──────────────┤ │
│  │ 2025-0002    │ Startup Labs │ S$2,400   │ 19 Feb 2025  │ │
│  │              │              │           │ [Draft]      │ │
│  └──────────────┴──────────────┴───────────┴──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Row Actions Menu:**
Triggered by `MoreHorizontal` icon.
*   **Edit:** Open invoice editor (All statuses)
*   **View Public:** Open shareable link (Not Draft)
*   **Send:** Change status to Pending (Draft only)
*   **Mark Paid:** Change status to Paid (Pending/Overdue)
*   **Delete:** Remove invoice (Draft only)

### 6.4 Invoice Editor View (`/invoices/new` & `/edit`)
**Purpose:** High-speed invoice creation.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  STICKY HEADER                                              │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ ← Back    New Invoice               │ [Save Draft]     │ │
│  │           #2025-0003 (auto)         │ [Save & Send]    │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  INVOICE FORM (max-w-4xl centered)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  CLIENT & DATES                                         │ │
│  │  ┌─────────────────────────┬───────────────────────────┐ │
│  │  │ Client                  │ Issue Date    Due Date    │ │
│  │  │ [Acme Corporation    ▼] │ [20/01/2025] [19/02/2025]│ │
│  │  └─────────────────────────┴───────────────────────────┘ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  LINE ITEMS                                             │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ Section: Development Services            [×]  │   │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ │ Frontend Development  │ 24 │ hrs │ $150 │$3600│ │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ Discount: Loyalty 5%                    │-$320│ │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │                                                         │ │
│  │  [+ Add Item] [+ Add Section] [+ Add Discount]          │ │
│  │                                                         │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  TOTALS (right-aligned)                                 │ │
│  │  ┌─────────────────────────────────────────────────────┐ │
│  │  │                              Subtotal:    S$6,400   │ │
│  │  │                              Discount:    -S$320    │ │
│  │  │                              ─────────────────────  │ │
│  │  │                              TOTAL:       S$6,080   │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  STICKY FOOTER (Mobile especially)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │          Total: S$6,080    [Save Draft] [Save & Send]  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Specialized Row Styling:**
*   **Section Headers:** Span full width, different background (`bg-slate-100 dark:bg-slate-800`), bold text.
*   **Discount Rows:** `text-rose-600` for negative values.
*   **Unit Types:** Dropdown options: `hours`, `days`, `items`, `units`, `(empty)`.

**Calculation Logic (Frontend):**
```typescript
const calculateTotals = (lineItems: LineItem[]) => {
  const items = lineItems.filter(li => li.type === 'item');
  const discounts = lineItems.filter(li => li.type === 'discount');
  
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.quantity ?? 0) * (item.unitPrice ?? 0);
  }, 0);
  
  const totalDiscount = Math.abs(
    discounts.reduce((sum, d) => sum + (d.unitPrice ?? 0), 0)
  );
  
  const total = subtotal - totalDiscount;
  return { subtotal, totalDiscount, total };
};
```

### 6.5 Shareable Invoice View (`/i/:token`)
**Purpose:** Client-facing invoice. Minimal, print-optimized.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────┐│
│  │                     INVOICE HEADER                      ││
│  │  ┌───────────────────────┬─────────────────────────────┐││
│  │  │                       │                             │││
│  │  │  INV/FORGE            │        INVOICE              │││
│  │  │  Your Name            │        #2025-0001           │││
│  │  │                       │                             │││
│  │  └───────────────────────┴─────────────────────────────┘││
│  │                                                         ││
│  │  BILLED TO                                              ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  Acme Corporation Pte Ltd                           │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                     LINE ITEMS                          ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │ DEVELOPMENT SERVICES                    (Section)   │││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ Frontend Development - Dashboard Module             │││
│  │  │ 24 hours × S$150.00                       S$3,600.00│││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                       TOTALS                            ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │                           TOTAL DUE:      S$6,080.00│││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              [ PAY NOW - S$6,080.00 ]                   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Payment Modal Mockup:**
When "Pay Now" is clicked, show a `Dialog` with a mock Stripe form.
*   **Fields:** Card Number (0000 0000 0000 0000), Expiry (MM/YY), CVC (123).
*   **Visual:** "Secured by Stripe" logo (mock).
*   **Mobile:** Full-screen modal on mobile.

---

## 7. Component Library

### 7.1 ShadCN UI Components Required
Run these commands in the Rails root:

```bash
# Initialize
npx shadcn@latest init

# Core & Layout
npx shadcn@latest add button card separator sheet
npx shadcn@latest add dialog dropdown-menu popover tooltip

# Form Elements
npx shadcn@latest add input label textarea select
npx shadcn@latest add command switch checkbox

# Data Display
npx shadcn@latest add table badge avatar tabs skeleton calendar
```

### 7.2 Custom Components to Build
*   **Logo:** `components/layout/Logo.tsx`
*   **ThemeToggle:** `components/layout/ThemeToggle.tsx`
*   **Sidebar:** `components/layout/Sidebar.tsx`
*   **MobileNav:** `components/layout/MobileNav.tsx`
*   **PageHeader:** `components/shared/PageHeader.tsx` (Title + subtitle + actions)
*   **MetricCard:** `components/dashboard/MetricCard.tsx`
*   **ActivityFeed:** `components/dashboard/ActivityFeed.tsx`
*   **StatusBadge:** `components/shared/StatusBadge.tsx`
*   **ClientAvatar:** `components/clients/ClientAvatar.tsx`
*   **ClientTable/InvoiceTable:** Specific wrappers around ShadCN tables.
*   **LineItemEditor:** Complex form component for invoice rows.
*   **PaymentModal:** Mock payment form.

---

## 8. Responsive Design

### 8.1 Breakpoint Strategy
| Breakpoint | Width | Tailwind Prefix | Behavior |
| :--- | :--- | :--- | :--- |
| **Mobile** | < 640px | default | Single column, Sheet nav, Card lists |
| **Tablet** | 640px+ | `sm:` | 2-column metrics, collapsed sidebar |
| **Desktop** | 1024px+ | `lg:` | Full sidebar, data tables |
| **Wide** | 1280px+ | `xl:` | Max-width constraints apply |

### 8.2 Responsive Patterns by View
*   **Tables:** Use `hidden md:table` for the table and `md:hidden` for the card stack.
*   **Invoice Editor:** On mobile, the "Client" and "Date" fields stack vertically. The footer becomes fixed at the bottom of the viewport (`fixed bottom-0`).
*   **Nav:** Sidebar toggles between `w-64` (desktop), `w-20` (tablet - icon only), and `hidden` (mobile).

### 8.3 Mobile-First Implementation Pattern
```tsx
// Grid Layout Example
<div className="
  grid gap-4
  grid-cols-1           // Mobile: stack
  md:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-4        // Desktop: 4 columns
">
  {/* Content */}
</div>

// Table vs Card Example
<>
  <div className="hidden md:block"><Table>...</Table></div>
  <div className="md:hidden space-y-3">
    {items.map(item => <MobileCard key={item.id} {...item} />)}
  </div>
</>
```

---

## 9. Accessibility Requirements

### 9.1 WCAG 2.1 AA Targets
*   **Contrast:** Text must satisfy 4.5:1 ratio.
    *   *Verification:* `text-slate-600` on `bg-slate-50` passes.
*   **Keyboard:** All functions (especially "Create" actions and "Close Modal") must be keyboard accessible.
*   **Focus Visible:** Explicit focus rings on all interactive elements.

### 9.2 Implementation Checklist
**Form Fields:**
```tsx
<div>
  <Label htmlFor="client-name">Client Name</Label>
  <Input id="client-name" name="clientName" aria-describedby="hint" />
  <p id="hint" className="text-sm text-slate-500">Enter company name</p>
</div>
```

**Icon Buttons:**
```tsx
<Button variant="ghost" size="icon" aria-label="Delete invoice">
  <Trash2 className="size-4" />
</Button>
```

**Status Badges (Screen Reader Support):**
```tsx
<Badge variant="overdue">
  Overdue
  <span className="sr-only">Payment is past due date</span>
</Badge>
```

### 9.3 Keyboard Navigation
*   **Tab:** Move focus forward.
*   **Shift+Tab:** Move focus backward.
*   **Enter/Space:** Activate button.
*   **Esc:** Close modal/dropdown.
*   **Arrow Keys:** Navigate within menus/lists.

---

## 10. Theme System

### 10.1 Implementation Strategy
We use a custom hook to manage the `dark` class on the `<html>` element.

**Theme Hook (`useTheme.ts`):**
```typescript
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}
```

---

## 11. Print Optimization

### 11.1 Print Stylesheet Strategy
Add this to `application.css`:

```css
@media print {
  /* Hide non-essential elements */
  .no-print, nav, footer, button, .sidebar {
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

### 11.2 Tailwind Print Utilities
Use these utility classes in React components:
*   `print:hidden` (Hide buttons/nav)
*   `print:block` (Show print-only headers)
*   `print:text-black` (Ensure contrast)
*   `print:shadow-none` (Remove depth)

---

## 12. Implementation Roadmap

### 12.1 Phase 1 Schedule (Daily Breakdown)

**Day 1: Environment & Shell**
*   Configure Rails 8 + Inertia + Tailwind v4.
*   Install ShadCN components (Button, Card, Input, Label, Sheet, etc).
*   Implement `AppLayout`, `Sidebar`, `MobileNav`.
*   Build `ThemeToggle` & `Logo`.
*   *Validation:* Shell works on Mobile/Desktop, Theme toggle works.

**Day 2: Dashboard**
*   Build `MetricCard` & `RecentActivity`.
*   Layout Dashboard grid.
*   Integrate Mock Data.

**Day 3: Clients**
*   Build `ClientTable` (Desktop) & `ClientCard` (Mobile).
*   Implement `ClientAvatar` with color hash.
*   Create "New Client" Sheet form.

**Day 4: Invoices List**
*   Build `FilterTabs`.
*   Build `InvoiceTable` & `StatusBadge`.
*   Implement Row Actions (Edit, Send, Delete).

**Day 5: Invoice Editor (Core Logic)**
*   Build `LineItemEditor` (Add/Remove items).
*   Implement frontend calculations (`calculateTotals`).
*   Build `InvoiceSummary` & Sticky Footer.
*   Implement `ClientSelector` (Combobox).

**Day 6: Public Invoice View**
*   Build `PublicLayout` (Minimal).
*   Implement Print Styles (`@media print`).
*   Build `PaymentModal` mockup.

**Day 7: Polish & QA**
*   Execute Accessibility Audit (Tab order, ARIA).
*   Verify Dark Mode contrast.
*   Final responsive check on 375px viewport.

---

## 13. Quality Assurance & Validation

### 13.1 Validation Checkpoints
**CP1: Shell Complete**
*   [ ] Navigation works (SPA transitions).
*   [ ] Theme toggle persists on reload.
*   [ ] Mobile Sheet opens/closes.

**CP2: Views Render**
*   [ ] All 5 routes load without errors.
*   [ ] Mock data populates correctly.

**CP3: Responsive Pass**
*   [ ] No horizontal scrolling on Mobile.
*   [ ] Tables transform to Cards on Mobile.
*   [ ] Sidebar collapses/hides correctly.

**CP4: Accessibility Pass**
*   [ ] Focus rings visible on all inputs.
*   [ ] Status badges have SR-only text.
*   [ ] Interactive icons have `aria-label`.

**CP5: Print Ready**
*   [ ] Shareable invoice prints on 1 page.
*   [ ] Buttons hidden in print preview.
*   [ ] Background colors removed or adjusted.

### 13.2 Visual & Functional QA
*   **Typography:** Verify Instrument Serif headers load.
*   **Colors:** Check Blue-500 usage (Primary actions only).
*   **Calculations:** Verify Invoice Editor math is correct (Subtotal - Discount = Total).
*   **Data Integrity:** Ensure Mock Data Types match TypeScript Interfaces.

### 13.3 Success Criteria
*   **Functional:** All 5 views render, mock data displays, theme toggle works.
*   **Design:** Typography matches "Neo-Editorial" spec (Fonts: Instrument Serif + Geist).
*   **Responsive:** Mobile (375px), Tablet (768px), Desktop (1280px) layouts work.
*   **Accessibility:** Keyboard accessible, WCAG AA contrast.
*   **Print:** Shareable invoice prints cleanly on A4.

---

## 14. Appendices

### Appendix A: Component Import Cheatsheet
Useful for quickly scaffolding pages.
```tsx
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

// Icons
import { 
  LayoutDashboard, Users, FileText, Plus, Search, Filter, 
  MoreHorizontal, ChevronDown, ChevronRight, Calendar, 
  Send, Download, Printer, CreditCard, Sun, Moon, 
  X, Check, AlertCircle, Trash2, Pencil 
} from 'lucide-react'
```

### Appendix B: Color Reference Quick Sheet
**Light Mode:**
*   `bg-white` → Page background / Card surface
*   `bg-slate-50` → Alternative background
*   `text-slate-900` → Primary text
*   `text-slate-600` → Secondary text
*   `border-slate-200` → Borders
*   `bg-blue-500` → Primary buttons

**Dark Mode:**
*   `bg-slate-950` → Page background
*   `bg-slate-900` → Card surface
*   `text-slate-50` → Primary text
*   `text-slate-400` → Secondary text
*   `border-slate-800` → Borders
*   `bg-blue-500` → Primary buttons (same)

# Executive Summary

I have devised a surgical update plan to upgrade `PRD_v4.1.0` to **`PRD_v4.2.0`**. This update specifically targets the regression in "Neo-Editorial" design fidelity identified in the gap analysis.

My approach is to restore the **high-contrast, precision aesthetic** defined in v3 without losing the comprehensive implementation details added in v4.

### Patch Strategy
1.  **Restore Typographic Tension (Section 2.1):** explicitly re-inject `tracking-tight` and `tracking-tighter` into the Typographic Scale to ensure headers feel "tight" and editorial, rather than loose and standard.
2.  **Restore Depth Hierarchy (Section 2.2 & Appendix B):** Re-define the color tokens to enforce `bg-slate-50` (Page) vs `bg-white` (Card). This "well" effect is crucial for the "Swiss Utility" look.
3.  **Restore Brutalist Shadows (Section 2.4):** Re-insert the specific Tailwind v4 `@theme` shadow definitions. This is the "signature" of the design language that prevents the app from looking generic.

---

# 📄 Project Requirements Document (PRD_v4.2)

**File Name:** `PRD_v4.2.md`
**Version:** 4.2.0 (Unified Master + Design Patch)
**Status:** Final — Production Ready
**Basis:** Fixes design token regressions in v4.1.0.

--- START OF FILE PRD_v4.2.md ---

# InvoiceForge — Personal Invoicing Application
**Document Version:** 4.2.0
**Phase:** 1 — Frontend Design & Prototyping
**Status:** Final — Ready for Implementation
**Last Updated:** January 2025

## Table of Contents
1.  **Product Vision & Philosophy**
    *   1.1 Purpose Statement
    *   1.2 Core Philosophy
    *   1.3 Design Manifesto: "Neo-Editorial Precision"
    *   1.4 Currency & Locale
    *   1.5 Anti-Patterns (What We Avoid)
2.  **Design System**
    *   2.1 Typography
    *   2.2 Color System
    *   2.3 Spacing & Layout
    *   2.4 Effects & Treatments
    *   2.5 Iconography
    *   2.6 Motion & Interactions
    *   2.7 Component Style Guide (Implementation Patterns)
3.  **Technical Architecture**
    *   3.1 Stack Overview
    *   3.2 Directory Structure
    *   3.3 Routing Configuration
    *   3.4 Route-to-View Mapping
    *   3.5 Utility Functions (`lib/utils.ts`)
4.  **Data Models**
    *   4.1 Entity Relationship Diagram
    *   4.2 TypeScript Interfaces
    *   4.3 Mock Data Structure (Full)
5.  **Application Shell**
    *   5.1 Layout Architecture
    *   5.2 Logo Design
    *   5.3 Navigation Specification
    *   5.4 Theme Toggle Component
6.  **View Specifications**
    *   6.1 Dashboard View
    *   6.2 Clients View
    *   6.3 Invoices View
    *   6.4 Invoice Editor View
    *   6.5 Shareable Invoice View (Public)
7.  **Component Library**
    *   7.1 ShadCN UI Components Required
    *   7.2 Custom Components to Build
8.  **Responsive Design**
    *   8.1 Breakpoint Strategy
    *   8.2 Responsive Patterns by View
    *   8.3 Mobile-First Implementation Pattern
9.  **Accessibility Requirements**
    *   9.1 WCAG 2.1 AA Targets
    *   9.2 Implementation Checklist
    *   9.3 Keyboard Navigation
10. **Theme System**
    *   10.1 Implementation Strategy
11. **Print Optimization**
    *   11.1 Print Stylesheet Strategy
    *   11.2 Tailwind Print Utilities
12. **Implementation Roadmap**
    *   12.1 Phase 1 Schedule (Daily Breakdown)
13. **Quality Assurance & Validation**
    *   13.1 Validation Checkpoints
    *   13.2 Visual & Functional QA
    *   13.3 Success Criteria
14. **Appendices**
    *   A. Component Import Cheatsheet
    *   B. Color Reference Quick Sheet

---

## 1. Product Vision & Philosophy

### 1.1 Purpose Statement
InvoiceForge is a single-user invoicing application designed for freelancers and solo professionals who demand speed, clarity, and a polished client-facing presentation. The application serves two distinct users:
1.  **The Admin (You):** Needs a friction-free workflow to manage cash flow and generate documents rapidly.
2.  **The Client (The Payer):** Needs a professional, trustworthy, and clear document that removes barriers to payment.

### 1.2 Core Philosophy
**"Precision is the ultimate sophistication."**

Every pixel, interaction, and typographic choice serves a purpose. The interface should feel:
*   **Swift:** Inertia/React SPA architecture ensures instant navigation.
*   **Confident:** Bold typography and deliberate spacing project competence.
*   **Trustworthy:** Clean financial presentation that clients take seriously.

### 1.3 Design Manifesto: "Neo-Editorial Precision"
We merge Swiss International Style foundations with Neo-Editorial boldness:

| Swiss Foundation | Neo-Editorial Execution |
| :--- | :--- |
| **Rigid grid systems** | Asymmetric tension within the grid |
| **Purposeful whitespace** | Generous margins that breathe |
| **Typographic hierarchy** | Dramatic scale contrasts (e.g., massive Invoice Numbers) |
| **Functional minimalism** | Singular bold accent for focus |
| **Data-forward layouts** | Editorial typography treatments |

**The Unforgettable Element:**
The invoice number treatment — oversized, typographically distinctive, positioned with editorial confidence. When clients see `2025-0001`, it's not just a reference — it's a statement.

### 1.4 Currency & Locale
*   **Primary Currency:** SGD (Singapore Dollar)
*   **Format:** `S$1,234.56` with locale-aware thousand separators.
*   **Decimal Precision:** Always 2 decimal places for monetary values.

### 1.5 Anti-Patterns (What We Avoid)
To maintain the integrity of the design vision, we explicitly reject the following patterns:

| ❌ Avoid | ✅ Instead |
| :--- | :--- |
| **Soft diffuse shadows** (`shadow-lg`) | Sharp, shallow shadows (`shadow-sm`) or distinct 1px borders. |
| **Rounded-everything** (`rounded-xl`) | Precise corners (`rounded-md` or `rounded-lg` max). |
| **Generic icons everywhere** | Purposeful iconography; usage of text labels where clarity aids speed. |
| **Gradient backgrounds** | Solid, intentional color blocks (Slate/White). |
| **Decorative illustrations** | Data visualization and typography *are* the decoration. |
| **System fonts** (Inter/Roboto) | Distinctive pairing: Instrument Serif + Geist. |

---

## 2. Design System

### 2.1 Typography

**Font Selection Rationale:**
We employ a distinctive serif + modern sans-serif pairing that balances editorial sophistication with technical precision.

| Role | Font Family | Weight Range | Google Fonts Import |
| :--- | :--- | :--- | :--- |
| **Display/Headlines** | Instrument Serif | 400 (Regular) | `family=Instrument+Serif:ital@0;1` |
| **UI/Body** | Geist | 400, 500, 600, 700 | `family=Geist:wght@400;500;600;700` |
| **Monospace** | Geist Mono | 400, 500 | `family=Geist+Mono:wght@400;500` |

**Tailwind v4 Configuration:**
Add this to `app/assets/stylesheets/application.css`:

```css
@import "tailwindcss";

@theme {
  --font-display: "Instrument Serif", Georgia, serif;
  --font-sans: "Geist", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
}
```

**Typographic Scale:**
Use `tracking-tight` to create editorial tension in headlines.

*   **Invoice Hero:** `text-6xl` or `text-8xl` (Font: Mono, Tracking: `-tracking-tighter`)
*   **Page Title:** `text-4xl` (Font: Display, Tracking: `-tracking-tight`, Leading: None)
*   **Section Heading:** `text-xl` (Font: Sans, Weight: 600, Tracking: `-tracking-tight`)
*   **Card Title:** `text-lg` (Font: Sans, Weight: 600)
*   **Body:** `text-sm` or `text-base` (Font: Sans, Weight: 400)
*   **Data/Numbers:** `text-sm` (Font: Mono, Weight: 500)

### 2.2 Color System

**Palette Definition:**
Base: Slate (neutral with subtle blue undertone).
Accent: Electric Blue (used exclusively for primary actions).

**CSS Variables (Tailwind v4):**
```css
@theme {
  /* Primary Action */
  --color-accent: var(--color-blue-500);
  --color-accent-hover: var(--color-blue-600);
  --color-accent-subtle: var(--color-blue-50);
  
  /* Status Colors */
  --color-status-draft: var(--color-slate-400);
  --color-status-pending: var(--color-amber-500);
  --color-status-paid: var(--color-emerald-500);
  --color-status-overdue: var(--color-rose-500);
}
```

**Surface Tokens (Depth Hierarchy):**
To avoid a flat look, we distinguish between the "Canvas" and the "Card".

| Token | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas (Page)** | `bg-slate-50` | `bg-slate-950` | The background behind everything. |
| **Surface (Card)** | `bg-white` | `bg-slate-900` | Cards, panels, and input fields. |
| **Border** | `border-slate-200` | `border-slate-800` | Hairline dividers. |

**Status Badge Specifications:**
| Status | Light Mode | Dark Mode | Border Style |
| :--- | :--- | :--- | :--- |
| **Draft** | `bg-slate-100` `text-slate-600` `border-slate-300` | `bg-slate-800` `text-slate-400` `border-slate-600` | Dashed (`border-dashed`) |
| **Pending** | `bg-amber-50` `text-amber-700` `border-amber-300` | `bg-amber-950` `text-amber-400` `border-amber-700` | Solid |
| **Paid** | `bg-emerald-50` `text-emerald-700` `border-emerald-300` | `bg-emerald-950` `text-emerald-400` `border-emerald-700` | Solid |
| **Overdue** | `bg-rose-50` `text-rose-700` `border-rose-300` | `bg-rose-950` `text-rose-400` `border-rose-700` | Solid |

### 2.3 Spacing & Layout
*   **Container Max Width:** `max-w-7xl` (1280px)
*   **Page Padding:** `px-4 sm:px-6 lg:px-8`
*   **Gap Scale:**
    *   `gap-1` (4px): Inline icon + text
    *   `gap-2` (8px): Form label to input
    *   `gap-4` (16px): Standard element spacing
    *   `gap-8` (32px): Major page sections

### 2.4 Effects & Treatments

**Shadows (Brutalist Precision):**
We define specific "hard" shadows to match the Neo-Editorial aesthetic. Add these to your CSS `@theme` block:

```css
@theme {
  /* ... existing colors ... */
  
  /* Custom Brutalist Shadows */
  --shadow-brutal: 4px 4px 0px 0px var(--color-slate-900);
  --shadow-brutal-sm: 2px 2px 0px 0px var(--color-slate-900);
}
```

*   **Cards:** `shadow-sm` (Subtle lift)
*   **Popovers/Dropdowns:** `shadow-brutal` (Distinct, hard-edge elevation)
*   **Modals:** `shadow-lg` (Traditional diffuse shadow for depth)

**Border Radius:**
*   **Cards:** `rounded-lg`
*   **Buttons/Inputs:** `rounded-md`
*   **Badges:** `rounded-full`

### 2.5 Iconography
**Library:** Lucide React
**Standard Sizes:**
*   **Inline:** 16px (`size-4`)
*   **Navigation:** 20px (`size-5`)
*   **Empty State:** 48px (`size-12`)
**Stroke Width:** 2px (Default)

### 2.6 Motion & Interactions
**Philosophy:** Restrained, purposeful motion. One well-orchestrated moment is better than scattered micro-interactions.

**Transition Defaults:**
```css
/* Standard transition for interactive elements */
transition-colors duration-150 ease-in-out

/* Page transitions (Inertia) */
transition-opacity duration-300
```

**Key Interaction Patterns:**
*   **Button Hover:** Color shift (150ms ease).
*   **Card Hover:** Subtle border color change (no movement).
*   **Modal Open:** Fade in (200ms) + slight scale (0.95 → 1).
*   **Dropdown Open:** Fade + translate-y (`-4px` → `0`).

**Staggered List Animation:**
Use for `RecentInvoices` or `ClientTable` to create a premium feel.
```jsx
// React / Framer Motion Example
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }}
>
```

### 2.7 Component Style Guide (Implementation Patterns)
The following snippets illustrate how to implement the "Neo-Editorial" aesthetic using ShadCN primitives and Tailwind classes.

**Primary Button:**
```tsx
<Button className="
  bg-blue-500 hover:bg-blue-600 
  text-white font-medium
  px-4 py-2 rounded-md
  transition-colors duration-150
  focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
">
  Create Invoice
</Button>
```

**Secondary Button (Outline):**
```tsx
<Button variant="outline" className="
  bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800
  text-slate-900 dark:text-slate-100 font-medium
  border border-slate-300 dark:border-slate-700
  rounded-md
">
  Cancel
</Button>
```

**Card Container:**
```tsx
<div className="
  bg-white dark:bg-slate-900
  border border-slate-200 dark:border-slate-800
  rounded-lg
  shadow-sm
  p-6
">
  {/* Content */}
</div>
```

**Input Field:**
```tsx
<input 
  className="
    w-full px-3 py-2
    bg-white dark:bg-slate-950
    border border-slate-300 dark:border-slate-700
    rounded-md
    text-slate-900 dark:text-slate-100
    placeholder:text-slate-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  "
/>
```

---

## 3. Technical Architecture

### 3.1 Stack Overview
*   **Backend Framework:** Ruby on Rails 8.x
*   **Frontend Adapter:** Inertia.js (Rails Adapter)
*   **View Layer:** React 18+
*   **Styling:** TailwindCSS v4
*   **Component Library:** ShadCN UI (Radix Primitives)
*   **Icons:** Lucide React

### 3.2 Directory Structure
```text
app/
├── controllers/
│   ├── dashboard_controller.rb
│   ├── clients_controller.rb
│   ├── invoices_controller.rb
│   └── public_invoices_controller.rb
├── frontend/
│   ├── components/
│   │   ├── ui/               # ShadCN components (Button, Card, etc.)
│   │   ├── layout/           # AppShell, Sidebar, MobileNav
│   │   ├── dashboard/        # MetricCard, ActivityFeed
│   │   ├── clients/          # ClientTable, ClientForm
│   │   ├── invoices/         # InvoiceTable, LineItemEditor
│   │   └── shared/           # PageHeader, StatusBadge
│   ├── layouts/
│   │   ├── AppLayout.tsx     # Main authenticated layout
│   │   └── PublicLayout.tsx  # Shareable invoice layout
│   ├── lib/
│   │   ├── utils.ts          # cn() helper, formatters
│   │   └── mock-data.ts      # Phase 1 stub data
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Clients/
│   │   │   ├── Index.tsx
│   │   │   └── (Show.tsx)
│   │   ├── Invoices/
│   │   │   ├── Index.tsx
│   │   │   ├── New.tsx
│   │   │   └── Edit.tsx
│   │   └── PublicInvoice/
│   │       └── Show.tsx
│   ├── hooks/                # useTheme, useCurrency
│   └── entrypoints/
│       └── inertia.tsx       # Inertia app initialization
└── assets/
    └── stylesheets/
        └── application.css   # Tailwind v4 entry point
```

### 3.3 Routing Configuration
**Rails Routes (`config/routes.rb`):**

```ruby
Rails.application.routes.draw do
  # Redirect root to dashboard
  root "dashboard#index"

  # Main application routes
  get "dashboard", to: "dashboard#index"
  
  resources :clients, only: [:index, :new, :create, :edit, :update, :destroy]
  
  resources :invoices, only: [:index, :new, :create, :edit, :update, :destroy] do
    member do
      post :send_invoice    # Changes status to 'pending'
      post :mark_paid       # Changes status to 'paid'
    end
  end

  # Public shareable invoice (no auth required)
  get "i/:token", to: "public_invoices#show", as: :public_invoice
end
```

### 3.4 Route-to-View Mapping
| Route | Controller#Action | React Page Component | Description |
| :--- | :--- | :--- | :--- |
| `/` | `redirect` | — | Redirects to `/dashboard` |
| `/dashboard` | `dashboard#index` | `pages/Dashboard.tsx` | Main dashboard |
| `/clients` | `clients#index` | `pages/Clients/Index.tsx` | Client list |
| `/invoices` | `invoices#index` | `pages/Invoices/Index.tsx` | Invoice list |
| `/invoices/new` | `invoices#new` | `pages/Invoices/New.tsx` | Invoice editor (create) |
| `/invoices/:id/edit` | `invoices#edit` | `pages/Invoices/Edit.tsx` | Invoice editor (edit) |
| `/i/:token` | `public_invoices#show` | `pages/PublicInvoice/Show.tsx` | Shareable invoice |

### 3.5 Utility Functions (`lib/utils.ts`)

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Class name merger (standard shadcn utility)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatter for SGD
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
  }).format(amount)
}

// Date formatter
export function formatDate(dateStr: string, options: Intl.DateTimeFormatOptions = {}) {
  const defaultOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Intl.DateTimeFormat('en-SG', { ...defaultOptions, ...options }).format(new Date(dateStr))
}

// Invoice number generator
export function generateInvoiceNumber(year: number, sequence: number) {
  return `${year}-${String(sequence).padStart(4, '0')}`
}

// Invoice status calculator (if needed on frontend)
export function calculateInvoiceStatus(invoice: any) {
  if (invoice.paidAt) return 'paid'
  if (new Date(invoice.dueDate) < new Date()) return 'overdue'
  if (invoice.sentAt) return 'pending'
  return 'draft'
}
```

---

## 4. Data Models

### 4.1 Entity Relationship Diagram

```text
┌─────────────────┐       ┌─────────────────────┐
│     CLIENT      │       │       INVOICE       │
├─────────────────┤       ├─────────────────────┤
│ id              │       │ id                  │
│ name            │◄──────│ client_id           │
│ email           │   1:N │ invoice_number      │
│ company         │       │ status              │
│ address         │       │ issue_date          │
│ phone           │       │ due_date            │
│ notes           │       │ token (public URL)  │
│ total_billed    │       │ created_at          │
│ created_at      │       │ updated_at          │
└─────────────────┘       └─────────┬───────────┘
                                    │
                                    │ 1:N
                                    ▼
                          ┌─────────────────────┐
                          │    LINE_ITEM        │
                          ├─────────────────────┤
                          │ id                  │
                          │ invoice_id          │
                          │ type (item/section/ │
                          │       discount)     │
                          │ description         │
                          │ quantity            │
                          │ unit_type           │
                          │ unit_price          │
                          │ position (ordering) │
                          └─────────────────────┘
```

### 4.2 TypeScript Interfaces
File: `app/frontend/lib/types.ts`

```typescript
// ENUMS
export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue';
export type LineItemType = 'item' | 'section' | 'discount';
export type UnitType = 'hours' | 'days' | 'items' | 'units' | 'fixed';

// ENTITIES
export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  address?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  // Computed (for list views)
  totalBilled?: number;
  lastInvoiceDate?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // Format: "2025-0001"
  clientId: string;
  client?: Client; // Expanded relation
  status: InvoiceStatus;
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string
  notes?: string;
  lineItems: LineItem[];
  token: string; // For public URL
  createdAt: string;
  updatedAt: string;
  // Computed
  subtotal?: number;
  totalDiscount?: number;
  total?: number;
}

export interface LineItem {
  id: string;
  invoiceId: string;
  type: LineItemType;
  description: string;
  quantity?: number; // null for section headers
  unitType?: UnitType; // null for section headers
  unitPrice?: number; // Negative for discounts
  position: number;
  // Computed
  lineTotal?: number;
}

// DASHBOARD METRICS
export interface DashboardMetrics {
  totalOutstanding: number;
  totalPaidThisMonth: number;
  totalPaidYTD: number;
  overdueAmount: number;
  overdueCount: number;
}

export interface RecentActivity {
  id: string;
  type: 'invoice_created' | 'invoice_sent' | 'invoice_paid' | 'client_created';
  description: string;
  timestamp: string;
  relatedId?: string;
  relatedType?: 'invoice' | 'client';
}
```

### 4.3 Mock Data Structure (Full)
File: `app/frontend/lib/mock-data.ts`
**Note:** This data must be implemented exactly to pass validation checkpoints.

```typescript
import type { Client, Invoice, DashboardMetrics, RecentActivity } from './types';

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
];

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
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalOutstanding: 7280.00, // pending + overdue totals
  totalPaidThisMonth: 8000.00,
  totalPaidYTD: 56150.00,
  overdueAmount: 1200.00,
  overdueCount: 1,
};

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
];
```

---

## 5. Application Shell

### 5.1 Layout Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Mobile: Full width, Desktop: Hidden - Nav in Sidebar)  │
│ ┌─────────────┬───────────────────────────────────┬───────────┐ │
│ │ Logo        │                                   │ Theme     │ │
│ │ (Mobile)    │        (Mobile: Hamburger Menu)   │ Toggle    │ │
│ └─────────────┴───────────────────────────────────┴───────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────────────────────────────────┐ │
│  │              │  │                                          │ │
│  │   SIDEBAR    │  │              MAIN CONTENT                │ │
│  │  (Desktop)   │  │                                          │ │
│  │              │  │  ┌──────────────────────────────────────┐│ │
│  │  ┌────────┐  │  │  │  PAGE HEADER                        ││ │
│  │  │ Logo   │  │  │  │  Title + Actions                    ││ │
│  │  └────────┘  │  │  └──────────────────────────────────────┘│ │
│  │              │  │                                          │ │
│  │  Navigation  │  │  ┌──────────────────────────────────────┐│ │
│  │  ┌────────┐  │  │  │                                      ││ │
│  │  │Dashboard│  │  │  │          PAGE CONTENT               ││ │
│  │  ├────────┤  │  │  │                                      ││ │
│  │  │Clients │  │  │  │                                      ││ │
│  │  ├────────┤  │  │  │                                      ││ │
│  │  │Invoices│  │  │  │                                      ││ │
│  │  └────────┘  │  │  │                                      ││ │
│  │              │  │  │                                      ││ │
│  │  ┌────────┐  │  │  │                                      ││ │
│  │  │Theme   │  │  │  └──────────────────────────────────────┘│ │
│  │  │Toggle  │  │  │                                          │ │
│  │  └────────┘  │  │                                          │ │
│  │              │  │                                          │ │
│  └──────────────┘  └──────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Responsive Breakpoints:**
*   **Mobile (< 768px):** Sidebar hidden. Header visible with Hamburger menu trigger for Sheet.
*   **Desktop (> 1024px):** Sidebar fixed (240px). Header hidden.

### 5.2 Logo Design
**Concept:** Typographic mark that doubles as a visual identity.
**Typography:** `font-display` (Instrument Serif) for "INV", `font-mono` (Geist Mono) for "FORGE".

```text
┌──────────────────────────────────┐
│   INV                            │
│   ────  ← Horizontal rule        │
│   FORGE                          │
└──────────────────────────────────┘
```

**Implementation Pattern:**
```tsx
// components/layout/Logo.tsx
export function Logo({ collapsed = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <span className="font-display font-bold text-xl leading-none">INV</span>
        <div className="h-px bg-slate-900 dark:bg-slate-100 w-full my-0.5" />
        <span className="font-mono text-sm leading-none tracking-widest">FORGE</span>
      </div>
    </div>
  )
}
```

### 5.3 Navigation Specification
| Nav Item | Icon | Route | Active State |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `LayoutDashboard` | `/dashboard` | `bg-slate-100 dark:bg-slate-800` `text-blue-600 dark:text-blue-400` |
| **Clients** | `Users` | `/clients` | Same as above |
| **Invoices** | `FileText` | `/invoices` | Same as above |

### 5.4 Theme Toggle Component
**Behavior:**
*   Default to system preference on first load.
*   User selection persists in `localStorage`.
*   Smooth transition between modes (`transition-colors duration-200`).
**Visual:**
*   Sun icon (`Sun`) for light mode.
*   Moon icon (`Moon`) for dark mode.

---

## 6. View Specifications

### 6.1 Dashboard View (`/dashboard`)
**Purpose:** High-level financial pulse and quick actions.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ Dashboard (Page Title - Display)    │ [+ New Invoice]  │ │
│  │ Monday, 20 January 2025             │    Primary CTA   │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  METRICS GRID (4 columns desktop, 2 tablet, 1 mobile)       │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐     │
│  │ Outstanding   │ │ Paid (Month)  │ │ Paid (YTD)    │ ... │
│  │ S$7,280.00    │ │ S$8,000.00    │ │ S$56,150.00   │     │
│  │ 2 invoices    │ │ ↑ 12% vs last │ │               │     │
│  └───────────────┘ └───────────────┘ └───────────────┘     │
├─────────────────────────────────────────────────────────────┤
│  TWO COLUMN LAYOUT (stacks on mobile)                       │
│  ┌────────────────────────┐ ┌────────────────────────────┐  │
│  │ RECENT INVOICES        │ │ RECENT ACTIVITY            │  │
│  │ ┌────────────────────┐ │ │ ┌──────────────────────────┐│  │
│  │ │ #2025-0001         │ │ │ │ Invoice #2025-0002       ││  │
│  │ │ Acme Corp          │ │ │ │ created for Startup Labs ││  │
│  │ │ S$6,080 [Pending]  │ │ │ │ 2 hours ago              ││  │
│  │ └────────────────────┘ │ │ └──────────────────────────┘│  │
│  │ ┌────────────────────┐ │ │ ┌──────────────────────────┐│  │
│  │ │ #2025-0002         │ │ │ │ Invoice #2025-0001 sent  ││  │
│  │ │ Startup Labs       │ │ │ │ to Acme Corporation      ││  │
│  │ │ S$2,400 [Draft]    │ │ │ │ 5 days ago               ││  │
│  │ └────────────────────┘ │ │ └──────────────────────────┘│  │
│  │ [View All Invoices →]  │ │ │ ...                        │  │
│  └────────────────────────┘ └────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Component Breakdown:**
*   **MetricCard:** Large number (`font-mono text-3xl`) + Uppercase Label. *Note:* Overdue metrics use `text-rose-600`.
*   **RecentInvoiceCard:** Compact card. Click navigates to edit.
*   **ActivityFeed:** Vertical timeline. Icon + description + relative timestamp.

### 6.2 Clients View (`/clients`)
**Purpose:** Directory of all clients with billing overview.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ Clients (Page Title)                │ [+ New Client]   │ │
│  │ 3 total clients                     │                  │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  SEARCH BAR (optional for Phase 1)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🔍 Search clients...                                    │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  CLIENT TABLE / CARDS                                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ ┌──────┬────────────────────┬───────────┬─────────────┐ │ │
│  │ │Avatar│ Name / Company      │ Total     │ Last Invoice│ │ │
│  │ ├──────┼────────────────────┼───────────┼─────────────┤ │ │
│  │ │  AC  │ Acme Corporation   │ S$15,750  │ 15 Jan 2025 │ │ │
│  │ │      │ billing@acme.corp  │           │             │ │ │
│  │ ├──────┼────────────────────┼───────────┼─────────────┤ │ │
│  │ │  SL  │ Startup Labs       │ S$8,400   │ 10 Jan 2025 │ │ │
│  │ │      │ finance@startup... │           │             │ │ │
│  │ └──────┴────────────────────┴───────────┴─────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Mobile Layout Strategy:**
On mobile, the table strictly transforms into a stack of cards:
```text
┌─────────────────────────────────┐
│ ┌────┐  Acme Corporation        │
│ │ AC │  billing@acme.corp       │
│ └────┘  ────────────────────    │
│         Total Billed: S$15,750  │
│         Last Invoice: 15 Jan    │
└─────────────────────────────────┘
```

**Client Avatar Logic (Implementation):**
```tsx
const avatarColors = [
  'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-purple-500'
]
function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % avatarColors.length
  return avatarColors[index]
}
```

**Add Client Form Fields (Sheet/Drawer):**
*   **Company Name** (Required, Text)
*   **Contact Person** (Text)
*   **Email** (Required, Email type)
*   **Phone** (Text)
*   **Address** (Textarea)
*   **Notes** (Textarea)

### 6.3 Invoices View (`/invoices`)
**Purpose:** Command center for all invoices.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ Invoices (Page Title)               │ [+ New Invoice]  │ │
│  │ 4 total invoices                    │                  │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  FILTER TABS                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ [ All (4) ] [ Draft (1) ] [ Pending (1) ] [ Paid (1) ] │ │
│  │                                         [ Overdue (1) ] │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  INVOICE TABLE                                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Invoice #    │ Client       │ Amount    │ Due Date     │ │
│  │              │              │           │ Status       │ │
│  ├──────────────┼──────────────┼───────────┼──────────────┤ │
│  │ 2025-0001    │ Acme Corp    │ S$6,080   │ 14 Feb 2025  │ │
│  │              │              │           │ [Pending]    │ │
│  ├──────────────┼──────────────┼───────────┼──────────────┤ │
│  │ 2025-0002    │ Startup Labs │ S$2,400   │ 19 Feb 2025  │ │
│  │              │              │           │ [Draft]      │ │
│  └──────────────┴──────────────┴───────────┴──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Row Actions Menu:**
Triggered by `MoreHorizontal` icon.
*   **Edit:** Open invoice editor (All statuses)
*   **View Public:** Open shareable link (Not Draft)
*   **Send:** Change status to Pending (Draft only)
*   **Mark Paid:** Change status to Paid (Pending/Overdue)
*   **Delete:** Remove invoice (Draft only)

### 6.4 Invoice Editor View (`/invoices/new` & `/edit`)
**Purpose:** High-speed invoice creation.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  STICKY HEADER                                              │
│  ┌─────────────────────────────────────┬──────────────────┐ │
│  │ ← Back    New Invoice               │ [Save Draft]     │ │
│  │           #2025-0003 (auto)         │ [Save & Send]    │ │
│  └─────────────────────────────────────┴──────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  INVOICE FORM (max-w-4xl centered)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  CLIENT & DATES                                         │ │
│  │  ┌─────────────────────────┬───────────────────────────┐ │
│  │  │ Client                  │ Issue Date    Due Date    │ │
│  │  │ [Acme Corporation    ▼] │ [20/01/2025] [19/02/2025]│ │
│  │  └─────────────────────────┴───────────────────────────┘ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  LINE ITEMS                                             │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ Section: Development Services            [×]  │   │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ │ Frontend Development  │ 24 │ hrs │ $150 │$3600│ │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │  ┌──────────────────────────────────────────────────┐   │ │
│  │  │ ≡ Discount: Loyalty 5%                    │-$320│ │ │
│  │  └──────────────────────────────────────────────────┘   │ │
│  │                                                         │ │
│  │  [+ Add Item] [+ Add Section] [+ Add Discount]          │ │
│  │                                                         │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │  TOTALS (right-aligned)                                 │ │
│  │  ┌─────────────────────────────────────────────────────┐ │
│  │  │                              Subtotal:    S$6,400   │ │
│  │  │                              Discount:    -S$320    │ │
│  │  │                              ─────────────────────  │ │
│  │  │                              TOTAL:       S$6,080   │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  STICKY FOOTER (Mobile especially)                          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │          Total: S$6,080    [Save Draft] [Save & Send]  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Specialized Row Styling:**
*   **Section Headers:** Span full width, different background (`bg-slate-100 dark:bg-slate-800`), bold text.
*   **Discount Rows:** `text-rose-600` for negative values.
*   **Unit Types:** Dropdown options: `hours`, `days`, `items`, `units`, `(empty)`.

**Calculation Logic (Frontend):**
```typescript
const calculateTotals = (lineItems: LineItem[]) => {
  const items = lineItems.filter(li => li.type === 'item');
  const discounts = lineItems.filter(li => li.type === 'discount');
  
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.quantity ?? 0) * (item.unitPrice ?? 0);
  }, 0);
  
  const totalDiscount = Math.abs(
    discounts.reduce((sum, d) => sum + (d.unitPrice ?? 0), 0)
  );
  
  const total = subtotal - totalDiscount;
  return { subtotal, totalDiscount, total };
};
```

### 6.5 Shareable Invoice View (`/i/:token`)
**Purpose:** Client-facing invoice. Minimal, print-optimized.

**Wireframe:**
```text
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────────────┐│
│  │                     INVOICE HEADER                      ││
│  │  ┌───────────────────────┬─────────────────────────────┐││
│  │  │                       │                             │││
│  │  │  INV/FORGE            │        INVOICE              │││
│  │  │  Your Name            │        #2025-0001           │││
│  │  │                       │                             │││
│  │  └───────────────────────┴─────────────────────────────┘││
│  │                                                         ││
│  │  BILLED TO                                              ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │  Acme Corporation Pte Ltd                           │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                     LINE ITEMS                          ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │ DEVELOPMENT SERVICES                    (Section)   │││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ Frontend Development - Dashboard Module             │││
│  │  │ 24 hours × S$150.00                       S$3,600.00│││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                       TOTALS                            ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │                           TOTAL DUE:      S$6,080.00│││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              [ PAY NOW - S$6,080.00 ]                   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Payment Modal Mockup:**
When "Pay Now" is clicked, show a `Dialog` with a mock Stripe form.
*   **Fields:** Card Number (0000 0000 0000 0000), Expiry (MM/YY), CVC (123).
*   **Visual:** "Secured by Stripe" logo (mock).
*   **Mobile:** Full-screen modal on mobile.

---

## 7. Component Library

### 7.1 ShadCN UI Components Required
Run these commands in the Rails root:

```bash
# Initialize
npx shadcn@latest init

# Core & Layout
npx shadcn@latest add button card separator sheet
npx shadcn@latest add dialog dropdown-menu popover tooltip

# Form Elements
npx shadcn@latest add input label textarea select
npx shadcn@latest add command switch checkbox

# Data Display
npx shadcn@latest add table badge avatar tabs skeleton calendar
```

### 7.2 Custom Components to Build
*   **Logo:** `components/layout/Logo.tsx`
*   **ThemeToggle:** `components/layout/ThemeToggle.tsx`
*   **Sidebar:** `components/layout/Sidebar.tsx`
*   **MobileNav:** `components/layout/MobileNav.tsx`
*   **PageHeader:** `components/shared/PageHeader.tsx` (Title + subtitle + actions)
*   **MetricCard:** `components/dashboard/MetricCard.tsx`
*   **ActivityFeed:** `components/dashboard/ActivityFeed.tsx`
*   **StatusBadge:** `components/shared/StatusBadge.tsx`
*   **ClientAvatar:** `components/clients/ClientAvatar.tsx`
*   **ClientTable/InvoiceTable:** Specific wrappers around ShadCN tables.
*   **LineItemEditor:** Complex form component for invoice rows.
*   **PaymentModal:** Mock payment form.

---

## 8. Responsive Design

### 8.1 Breakpoint Strategy
| Breakpoint | Width | Tailwind Prefix | Behavior |
| :--- | :--- | :--- | :--- |
| **Mobile** | < 640px | default | Single column, Sheet nav, Card lists |
| **Tablet** | 640px+ | `sm:` | 2-column metrics, collapsed sidebar |
| **Desktop** | 1024px+ | `lg:` | Full sidebar, data tables |
| **Wide** | 1280px+ | `xl:` | Max-width constraints apply |

### 8.2 Responsive Patterns by View
*   **Tables:** Use `hidden md:table` for the table and `md:hidden` for the card stack.
*   **Invoice Editor:** On mobile, the "Client" and "Date" fields stack vertically. The footer becomes fixed at the bottom of the viewport (`fixed bottom-0`).
*   **Nav:** Sidebar toggles between `w-64` (desktop), `w-20` (tablet - icon only), and `hidden` (mobile).

### 8.3 Mobile-First Implementation Pattern
```tsx
// Grid Layout Example
<div className="
  grid gap-4
  grid-cols-1           // Mobile: stack
  md:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-4        // Desktop: 4 columns
">
  {/* Content */}
</div>

// Table vs Card Example
<>
  <div className="hidden md:block"><Table>...</Table></div>
  <div className="md:hidden space-y-3">
    {items.map(item => <MobileCard key={item.id} {...item} />)}
  </div>
</>
```

---

## 9. Accessibility Requirements

### 9.1 WCAG 2.1 AA Targets
*   **Contrast:** Text must satisfy 4.5:1 ratio.
    *   *Verification:* `text-slate-600` on `bg-slate-50` passes.
*   **Keyboard:** All functions (especially "Create" actions and "Close Modal") must be keyboard accessible.
*   **Focus Visible:** Explicit focus rings on all interactive elements.

### 9.2 Implementation Checklist
**Form Fields:**
```tsx
<div>
  <Label htmlFor="client-name">Client Name</Label>
  <Input id="client-name" name="clientName" aria-describedby="hint" />
  <p id="hint" className="text-sm text-slate-500">Enter company name</p>
</div>
```

**Icon Buttons:**
```tsx
<Button variant="ghost" size="icon" aria-label="Delete invoice">
  <Trash2 className="size-4" />
</Button>
```

**Status Badges (Screen Reader Support):**
```tsx
<Badge variant="overdue">
  Overdue
  <span className="sr-only">Payment is past due date</span>
</Badge>
```

### 9.3 Keyboard Navigation
*   **Tab:** Move focus forward.
*   **Shift+Tab:** Move focus backward.
*   **Enter/Space:** Activate button.
*   **Esc:** Close modal/dropdown.
*   **Arrow Keys:** Navigate within menus/lists.

---

## 10. Theme System

### 10.1 Implementation Strategy
We use a custom hook to manage the `dark` class on the `<html>` element.

**Theme Hook (`useTheme.ts`):**
```typescript
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}
```

---

## 11. Print Optimization

### 11.1 Print Stylesheet Strategy
Add this to `application.css`:

```css
@media print {
  /* Hide non-essential elements */
  .no-print, nav, footer, button, .sidebar {
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

### 11.2 Tailwind Print Utilities
Use these utility classes in React components:
*   `print:hidden` (Hide buttons/nav)
*   `print:block` (Show print-only headers)
*   `print:text-black` (Ensure contrast)
*   `print:shadow-none` (Remove depth)

---

## 12. Implementation Roadmap

### 12.1 Phase 1 Schedule (Daily Breakdown)

**Day 1: Environment & Shell**
*   Configure Rails 8 + Inertia + Tailwind v4.
*   Install ShadCN components (Button, Card, Input, Label, Sheet, etc).
*   Implement `AppLayout`, `Sidebar`, `MobileNav`.
*   Build `ThemeToggle` & `Logo`.
*   *Validation:* Shell works on Mobile/Desktop, Theme toggle works.

**Day 2: Dashboard**
*   Build `MetricCard` & `RecentActivity`.
*   Layout Dashboard grid.
*   Integrate Mock Data.

**Day 3: Clients**
*   Build `ClientTable` (Desktop) & `ClientCard` (Mobile).
*   Implement `ClientAvatar` with color hash.
*   Create "New Client" Sheet form.

**Day 4: Invoices List**
*   Build `FilterTabs`.
*   Build `InvoiceTable` & `StatusBadge`.
*   Implement Row Actions (Edit, Send, Delete).

**Day 5: Invoice Editor (Core Logic)**
*   Build `LineItemEditor` (Add/Remove items).
*   Implement frontend calculations (`calculateTotals`).
*   Build `InvoiceSummary` & Sticky Footer.
*   Implement `ClientSelector` (Combobox).

**Day 6: Public Invoice View**
*   Build `PublicLayout` (Minimal).
*   Implement Print Styles (`@media print`).
*   Build `PaymentModal` mockup.

**Day 7: Polish & QA**
*   Execute Accessibility Audit (Tab order, ARIA).
*   Verify Dark Mode contrast.
*   Final responsive check on 375px viewport.

---

## 13. Quality Assurance & Validation

### 13.1 Validation Checkpoints
**CP1: Shell Complete**
*   [ ] Navigation works (SPA transitions).
*   [ ] Theme toggle persists on reload.
*   [ ] Mobile Sheet opens/closes.

**CP2: Views Render**
*   [ ] All 5 routes load without errors.
*   [ ] Mock data populates correctly.

**CP3: Responsive Pass**
*   [ ] No horizontal scrolling on Mobile.
*   [ ] Tables transform to Cards on Mobile.
*   [ ] Sidebar collapses/hides correctly.

**CP4: Accessibility Pass**
*   [ ] Focus rings visible on all inputs.
*   [ ] Status badges have SR-only text.
*   [ ] Interactive icons have `aria-label`.

**CP5: Print Ready**
*   [ ] Shareable invoice prints on 1 page.
*   [ ] Buttons hidden in print preview.
*   [ ] Background colors removed or adjusted.

### 13.2 Visual & Functional QA
*   **Typography:** Verify Instrument Serif headers load.
*   **Colors:** Check Blue-500 usage (Primary actions only).
*   **Calculations:** Verify Invoice Editor math is correct (Subtotal - Discount = Total).
*   **Data Integrity:** Ensure Mock Data Types match TypeScript Interfaces.

### 13.3 Success Criteria
*   **Functional:** All 5 views render, mock data displays, theme toggle works.
*   **Design:** Typography matches "Neo-Editorial" spec (Fonts: Instrument Serif + Geist).
*   **Responsive:** Mobile (375px), Tablet (768px), Desktop (1280px) layouts work.
*   **Accessibility:** Keyboard accessible, WCAG AA contrast.
*   **Print:** Shareable invoice prints cleanly on A4.

---

## 14. Appendices

### Appendix A: Component Import Cheatsheet
Useful for quickly scaffolding pages.
```tsx
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

// Icons
import { 
  LayoutDashboard, Users, FileText, Plus, Search, Filter, 
  MoreHorizontal, ChevronDown, ChevronRight, Calendar, 
  Send, Download, Printer, CreditCard, Sun, Moon, 
  X, Check, AlertCircle, Trash2, Pencil 
} from 'lucide-react'
```

### Appendix B: Color Reference Quick Sheet
**Light Mode:**
*   `bg-slate-50` → Page background (Canvas)
*   `bg-white` → Card surface
*   `text-slate-900` → Primary text
*   `text-slate-600` → Secondary text
*   `border-slate-200` → Borders
*   `bg-blue-500` → Primary buttons

**Dark Mode:**
*   `bg-slate-950` → Page background (Canvas)
*   `bg-slate-900` → Card surface
*   `text-slate-50` → Primary text
*   `text-slate-400` → Secondary text
*   `border-slate-800` → Borders
*   `bg-blue-500` → Primary buttons (same)

--- END OF FILE PRD_v4.2.md ---
