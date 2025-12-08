# AGENT BRIEFING: InvoiceForge (Phase 1)

**Date:** 2025-12-06
**Status:** Phase 1 (Frontend Design & Prototyping) - Day 3 Completed
**Stack:** Rails 8 + Inertia.js + React 18 + TailwindCSS v4

## 1. Executive Summary
InvoiceForge is a single-user invoicing application prioritizing "Neo-Editorial Precision". The project is currently in **Phase 1**, focusing on building a pixel-perfect, static frontend with mock data before backend integration.

**Current State**:
- **Shell/Layouts**: ✅ Complete (Sidebar, MobileNav, ThemeToggle).
- **Dashboard**: ✅ Complete (Metrics, ActivityFeed).
- **Clients**: ✅ Complete (Index, Search, Sheet Form).
- **Invoices**: ✅ Mixed Status.
    - `Index.tsx`: ✅ Complete.
    - `Edit.tsx` / `LineItemsEditor.tsx`: **Surprisingly Complete**. Core complex logic for editing lines is largely done.
- **Backend Setup**: Basic routes exist (`index` only).
- **Patches Applied**: Day 3 CSS additions (Radix animations, slide-out classes) are applied.

## 2. Technical Architecture & Standards

### Design System ("Neo-Editorial Precision")
**Strict Adherence Required**:
*   **Typography**: `font-display` (Instrument Serif), `font-sans` (Geist), `font-mono` (Geist Mono).
*   **Tension**: Use `tracking-tight` on all headers.
*   **Shadows**: Use `shadow-brutal` (Hard 4px offset) for popovers/dropdowns. Use `shadow-sm` for cards. **NO** `shadow-lg` or diffuse shadows.
*   **Colors**: `bg-slate-50` (Canvas) vs `bg-white` (Card).

### Code Patterns
*   **Frontend**: Inertia.js pages in `app/frontend/pages`. Components in `app/frontend/components`.
*   **Styling**: Tailwind v4. Configuration is in `app/assets/stylesheets/application.css` via `@theme`. **Do not look for tailwind.config.js**.
*   **Data**: Currently uses `app/frontend/lib/mock-data.ts`. All frontend pages should fallback to this if props are missing.
*   **Icons**: `lucide-react`.

## 3. Detailed Component Status

| Feature | Component/File | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Shell** | `AppLayout` | ✅ Done | Correct "well" background structure. |
| | `Sidebar` / `MobileNav` | ✅ Done | Responsive logic works. |
| | `ThemeToggle` | ✅ Done | Tailwind v4 dark mode verified. |
| **Dashboard** | `MetricCard` | ✅ Done | |
| | `Dashboard.tsx` | ✅ Done | Fully implemented. |
| **Clients** | `ClientList` | ✅ Done | Handles Table/Card responsive switch. |
| | `ClientFormSheet` | ✅ Done | |
| **Invoices** | `Invoices/Index.tsx` | ❌ **TODO** | Currently a placeholder text. |
| | `Invoices/Edit.tsx` | ✅ Done | `InvoiceEditor` logic implemented. |
| | `LineItemsEditor` | ✅ Done | Complex CRUD for lines/sections/discounts working. |
| | `ClientSelector` | ✅ Done | |

## 4. Immediate Next Steps (Day 4 & 5 Cleanup)

The previous developer seems to have jumped ahead to Day 5 (Editor) logic, leaving Day 4 (Index) behind.

1.  **Implement `Invoices/Index.tsx`**:
    *   Build the `InvoiceTable` component.
    *   Implement `FilterTabs` (Draft, Pending, Paid, Overdue).
    *   Add "New Invoice" navigation.
2.  **Verify Invoice Editor Connectivity**:
    *   Ensure `New.tsx` is using the `InvoiceEditor` properly (likely re-using `Edit.tsx` logic or sharing a component).
    *   Test navigation flow: Dashboard -> New Invoice -> Save (Mock).
3.  **Public Invoice View (Day 6)**:
    *   This is the next major module to build (`/i/:token`).

## 5. Critical Resources
*   **Design Tokens**: See `app/assets/stylesheets/application.css`.
*   **Mock Data**: `app/frontend/lib/mock-data.ts`.
*   **Type Definitions**: `app/frontend/lib/types.ts`.
