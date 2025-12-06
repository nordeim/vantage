# Implementation Plan - InvoiceForge (Phase 1)

**Goal**: Implement Phase 1 of InvoiceForge as per PRD v4.2, ensuring "Neo-Editorial Precision" design fidelity.

## User Review Required
> [!IMPORTANT]
> **Design Fidelity**: Strict adherence to "Neo-Editorial" aesthetic (Instrument Serif + Geist, "Brutalist" shadows, precise spacing) is critical. Use `generate_image` or strictly follow Tailwind config to verify visual outcomes.
> **Tech Stack**: Confirm Rails 8 + Inertia.js + React 18 + Tailwind v4 environment is ready or needs initialization.

## Proposed Changes

### 1. Environment & Design System Setup
- [ ] Initialize Rails 8 app with Inertia and Tailwind v4.
- [ ] Install ShadCN UI and required components.
- [ ] **[NEW]** `app/assets/stylesheets/application.css`: Configure Tailwind v4 theme (Fonts, Colors, Shadows).
- [ ] **[NEW]** `app/frontend/lib/utils.ts`: Add utility functions (cn, formatters).
- [ ] **[NEW]** `app/frontend/lib/types.ts`: Define TypeScript interfaces.
- [ ] **[NEW]** `app/frontend/lib/mock-data.ts`: Implement specific mock data from PRD.

### 2. Application Shell & Layouts
- [ ] **[NEW]** `app/frontend/components/layout/Logo.tsx`: Implement custom logo component.
- [ ] **[NEW]** `app/frontend/components/layout/Sidebar.tsx`: creating responsive navigation.
- [ ] **[NEW]** `app/frontend/components/layout/ThemeToggle.tsx`: Implement dark mode toggle.
- [ ] **[NEW]** `app/frontend/layouts/AppLayout.tsx`: Main authenticated layout.

### 3. Feature: Dashboard (`/dashboard`)
- [ ] **[NEW]** `app/frontend/components/dashboard/MetricCard.tsx`
- [ ] **[NEW]** `app/frontend/components/dashboard/ActivityFeed.tsx`
- [ ] **[NEW]** `app/frontend/pages/Dashboard.tsx`: Assemble dashboard view.

### 4. Feature: Clients (`/clients`)
- [ ] **[NEW]** `app/frontend/components/clients/ClientAvatar.tsx`: Color hashing logic.
- [ ] **[NEW]** `app/frontend/pages/Clients/Index.tsx`: Responsive Table/Card view.
- [ ] **[NEW]** `app/frontend/components/clients/ClientForm.tsx`: Sheet-based form.

### 5. Feature: Invoices (`/invoices`)
- [ ] **[NEW]** `app/frontend/components/shared/StatusBadge.tsx`: Strict state styling.
- [ ] **[NEW]** `app/frontend/pages/Invoices/Index.tsx`: List view with filters.
- [ ] **[NEW]** `app/frontend/pages/Invoices/New.tsx` & `Edit.tsx`: Editor logic.
- [ ] **[NEW]** `app/frontend/components/invoices/LineItemEditor.tsx`: Dynamic form fields.

### 6. Feature: Public View (`/i/:token`)
- [ ] **[NEW]** `app/frontend/layouts/PublicLayout.tsx`: Minimal layout.
- [ ] **[NEW]** `app/frontend/pages/PublicInvoice/Show.tsx`: Print-optimized view.

## Verification Plan

### Automated Tests
- Run `bin/dev` to verify build success.
- Use `browser_subagent` to visit each route (`/dashboard`, `/clients`, `/invoices`, `/i/token`) and screenshot for visual verification.

### Manual Verification
- **Design Check**: Compare screenshots against PRD description (Fonts, Shadows, Spacing).
- **Responsive Check**: Verify Mobile (375px) vs Desktop (1280px) layouts.
- **Dark Mode**: Toggle theme and verify color tokens (Canvas vs Surface).
- **Print**: Verify print preview of Public Invoice.
