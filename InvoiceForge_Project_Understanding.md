# InvoiceForge_Project_Understanding.md

## 1. Product Context & Vision
- InvoiceForge targets solo professionals requiring rapid, polished invoicing while instilling client trust, guided by the “Neo-Editorial Precision” philosophy emphasizing typographic tension, tight grids, and brutalist shadows.@AGENT.md#1-69  
- Prior internal analyses (my_analysis_of_PRD_v4.2.md / your_analysis_of_PRD_v4.2.md / Comprehensive_Alignment_Analysis_PRD_v4.2.md) corroborate full alignment on personas, scope (Dashboard, Clients, Invoices, Invoice Editor, Public Invoice), design guardrails, and the 7-day rollout plan.

## 2. Tech Stack & Tooling
- Dependencies confirm Rails 8 backend with Inertia + React 18 front-end bridge, TypeScript, TailwindCSS v4, lucide-react icons, and Radix-based UI primitives via shadcn patterns.@package.json#1-25  
- README reinforces philosophy, feature scope, architecture, and provides setup + development commands (bin/dev, bin/rails, npm scripts).@README.md#1-400

## 3. Backend Surface (Rails)
- Routes expose root/dashboard, clients index, invoices index/new/edit, and the public tokenized invoice endpoint `/i/:token`.@config/routes.rb#1-12  
- Controllers simply render Inertia pages with optional props (e.g., `InvoicesController#edit` forwards `id`).@app/controllers/invoices_controller.rb#1-17 @app/controllers/clients_controller.rb#1-6 @app/controllers/dashboard_controller.rb#1-6

## 4. Frontend Architecture
- Inertia entrypoint imports Tailwind v4 CSS and lazily resolves React pages via Vite globbing, mounting through `createRoot`.@app/frontend/entrypoints/inertia.tsx#1-21  
- `AppLayout` composes global canvas, permanent sidebar (desktop), and mobile sheet nav, wrapped in `TooltipProvider`.@app/frontend/layouts/AppLayout.tsx#1-31  
- `PublicLayout` provides minimal centered shell for shareable invoice pages with print overrides.@app/frontend/layouts/PublicLayout.tsx#1-30  
- Theme management toggles and persists `light`/`dark/system` preferences while syncing DOM classes.@app/frontend/hooks/useTheme.ts#1-86

## 5. Pages & Feature Readiness
- **Dashboard**: Fully realized metrics grid, activity feed, recent invoices with fallback to mock data; modern layout and quick CTA to invoice creation. Latest implementation resides in `Dashboard.tsx`; legacy snapshot `Dashboard.tsx.1` can be removed once migration confirmed.@app/frontend/pages/Dashboard.tsx#1-138  
- **Clients**: Searchable directory with responsive table/card swap, client sheet form with validation guidance, and mock CRUD handlers logging actions.@app/frontend/pages/Clients/Index.tsx#1-138  
- **Invoices Index**: Implements status filter tabs, responsive table/card views, and rich action handlers (edit, view, send, mark paid, copy link).@app/frontend/pages/Invoices/Index.tsx#1-146  
- **Invoices New/Edit**: Currently placeholders signalling Day-5 work backlog; rely on `PageHeader` plus stub body messaging.@app/frontend/pages/Invoices/New.tsx#1-35 @app/frontend/pages/Invoices/Edit.tsx#1-39  
- **Public Invoice Show**: Token-based lookup with payment modal, totals, line-items, print handling. Note missing tail portion (after action bar comment) likely due to truncated file snapshot; ensure completion when editing.@app/frontend/pages/PublicInvoice/Show.tsx#1-63

## 6. Component System
- **Layout Components**: Sidebar/MobileNav/ThemeToggle/Logo enforce navigation, theme, and brand identity; nav links leverage Inertia `usePage` for active state detection. Mobile sheet uses Radix Sheet primitives.@app/frontend/components/layout/Sidebar.tsx#1-48 @app/frontend/components/layout/MobileNav.tsx#1-82 @app/frontend/components/layout/ThemeToggle.tsx#1-43 @app/frontend/components/layout/Logo.tsx#1-38  
- **UI Primitives (ShadCN style)**: Buttons, inputs, select/popover/tooltip/sheet/calendar/etc. wrap Radix, aligning with custom v4 tokens and animations (shadow-brutal).@app/frontend/components/ui/button.tsx#1-55 @app/frontend/components/ui/select.tsx#1-175 @app/frontend/components/ui/popover.tsx#1-41 @app/frontend/components/ui/table.tsx#1-140 @app/frontend/components/ui/index.ts#1-81  
- **Dashboard Components**: Metric cards, recent invoice list, activity feed, activity item timeline—all animated, theme-aware, and mock-aware.@app/frontend/components/dashboard/MetricCard.tsx#1-121 @app/frontend/components/dashboard/RecentInvoices.tsx#1-67 @app/frontend/components/dashboard/RecentInvoiceCard.tsx#1-99 @app/frontend/components/dashboard/ActivityFeed.tsx#1-58 @app/frontend/components/dashboard/ActivityItem.tsx#1-111  
- **Clients Components**: Avatar hashing, responsive tables/cards, sheet-backed form with validation and accessibility hints.@app/frontend/components/clients/ClientAvatar.tsx#1-110 @app/frontend/components/clients/ClientTable.tsx#1-171 @app/frontend/components/clients/ClientCard.tsx#1-137 @app/frontend/components/clients/ClientFormSheet.tsx#1-72 @app/frontend/components/clients/ClientForm.tsx#1-285 @app/frontend/components/clients/ClientList.tsx#1-66  
- **Invoices Components**: Filter tabs, responsive list/table, row actions with contextual menu, rich line item editor (items/sections/discounts), summary, client selector, date picker. Line item editor handles CRUD via helper factories and calculates totals via [InvoiceSummary](cci:1://file:///home/project/vantage/app/frontend/components/invoices/InvoiceSummary.tsx:12:0-61:1) utilities.@app/frontend/components/invoices/InvoiceFilterTabs.tsx#1-143 @app/frontend/components/invoices/InvoiceList.tsx#1-118 @app/frontend/components/invoices/InvoiceTable.tsx#1-157 @app/frontend/components/invoices/InvoiceCard.tsx#1-117 @app/frontend/components/invoices/InvoiceRowActions.tsx#1-126 @app/frontend/components/invoices/LineItemRow.tsx#1-133 @app/frontend/components/invoices/SectionHeaderRow.tsx#1-72 @app/frontend/components/invoices/DiscountRow.tsx#1-102 @app/frontend/components/invoices/LineItemsEditor.tsx#1-167 @app/frontend/components/invoices/InvoiceSummary.tsx#1-63 @app/frontend/components/invoices/ClientSelector.tsx#1-162 @app/frontend/components/invoices/DatePicker.tsx#1-71  
- **Public Invoice Components**: Header, totals, line items, payment modal mirror spec (editorial invoice number, brutalist sections, mock Stripe).@app/frontend/components/public-invoice/PublicInvoiceHeader.tsx#1-93 @app/frontend/components/public-invoice/PublicInvoiceTotals.tsx#1-58 @app/frontend/components/public-invoice/PublicInvoiceLineItems.tsx#1-110 @app/frontend/components/public-invoice/PaymentModal.tsx#1-147  
- **Shared Components**: `PageHeader` standardizes hero typography; [StatusBadge](cci:1://file:///home/project/vantage/app/frontend/components/shared/StatusBadge.tsx:11:0-44:1) centralizes status colors, dashed draft styling, and SR text.@app/frontend/components/shared/PageHeader.tsx#1-52 @app/frontend/components/shared/StatusBadge.tsx#1-119 @app/frontend/components/shared/index.ts#1-4

## 7. Styling & Design System
- Tailwind v4 `@theme` defines typographic families, accent palette, status colors, and brutalist shadows; includes animation utilities, Radix motion classes, print rules, and dark-mode overrides.@app/assets/stylesheets/application.css#1-275  
- Manual testing procedure validates layouts, typography, colors, and theme persistence on desktop/mobile.@manual_testing_procedure.md#1-43

## 8. Data, Types & Utilities
- Mock data covers clients, invoices (all status states), dashboard metrics, and recent activities for parity with PRD; used as fallbacks across pages.@app/frontend/lib/mock-data.ts#1-273  
- Type definitions enumerate entities, statuses, props, and utility types; invoice totals rely on [InvoiceTotals](cci:2://file:///home/project/vantage/app/frontend/lib/types.ts:125:0-129:1), while `statusConfig/statusLabels` exported for reuse.@app/frontend/lib/types.ts#1-216 @app/frontend/components/shared/StatusBadge.tsx#1-119  
- Utility helpers deliver class merging ([cn](cci:1://file:///home/project/vantage/app/frontend/lib/utils.ts:4:0-10:1)), SGD currency/date formatting with heuristics, relative time, status calculation, debounce, and temp ID generation.@app/frontend/lib/utils.ts#1-203

## 9. Current Status & Gaps
- Dashboard, Clients, Invoice index, shared components, and public invoice view align with PRD Day 1–4 expectations.  
- Invoice creation/editing pages remain placeholders pending integration with [LineItemsEditor](cci:1://file:///home/project/vantage/app/frontend/components/invoices/LineItemsEditor.tsx:20:0-148:1), [ClientSelector](cci:1://file:///home/project/vantage/app/frontend/components/invoices/ClientSelector.tsx:29:0-160:1), and summary components.  
- Public invoice page snippet appears truncated in repo view—verify full implementation before shipping.  
- No automated tests presently; `Dashboard.tsx.test` is an early scaffold.@app/frontend/pages/Dashboard.tsx.test#1-11

## 10. Risks & Follow-Up
- Complete Invoices New/Edit flows (bind mock data props, handle state, confer PRD day-5 spec).  
- Audit public invoice page for missing footer/actions.  
- Establish test coverage for invoice calculations and client form validation per PRD QA checklist.  
- Plan removal of obsolete artifacts (`Dashboard.tsx.1`, placeholder tests) once migration done.  
- Prepare backend data wiring for Phase 2, replacing mock data with controllers fetching real models while preserving type contracts.

