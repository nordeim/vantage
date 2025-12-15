# AGENT BRIEFING: InvoiceForge (Phase 2)

**Date:** 2025-12-15
**Status:** Phase 2 (Backend Integration) - In Progress ⚙️
**Stack:** Rails 8.1.1 + Inertia.js + React 18 + TailwindCSS v4 + PostgreSQL v16

## 1. Executive Summary

InvoiceForge is a single-user invoicing application prioritizing "Neo-Editorial Precision". The project has completed **Phase 1** (Frontend) and is actively working on **Phase 2** (Backend Integration).

**Current State**:
- **Phase 1 (Frontend)**: ✅ Complete
  - Shell/Layouts, Dashboard, Clients, Invoices List, Invoice Editor, Public Invoice, Accessibility
- **Phase 2 (Backend)**: ✅ Complete
  - Database (PostgreSQL v16 with Docker): ✅ Complete
  - Authentication (Devise): ✅ Complete
  - Models (Client, Invoice, LineItem, User): ✅ Complete
  - Controllers (Dashboard, Clients, Invoices): ✅ Complete
  - Email (InvoiceMailer wired to actions): ✅ Complete
  - PDF Generation (Prawn): ✅ Complete
  - Stripe Integration: ✅ Complete

## 2. Technical Architecture & Standards

### Database
- **PostgreSQL v16** running in Docker container
- Managed via `docker-compose.yml` and `bin/docker-dev` helper script
- Environment variables in `.env` (copied from `.env.docker`)

### Authentication
- **Devise** gem with custom User model
- Session-based authentication
- All routes protected by `authenticate_user!` except public invoice

### Design System ("Neo-Editorial Precision")
**Strict Adherence Required**:
*   **Typography**: `font-display` (Instrument Serif), `font-sans` (Geist), `font-mono` (Geist Mono).
*   **Tension**: Use `tracking-tight` on all headers.
*   **Shadows**: Use `shadow-brutal` (Hard 4px offset) for popovers/dropdowns. Use `shadow-sm` for cards.
*   **Colors**: `bg-slate-50` (Canvas) vs `bg-white` (Card).

### Code Patterns
*   **Frontend**: Inertia.js pages in `app/frontend/pages`. Components in `app/frontend/components`.
*   **Styling**: Tailwind v4. Configuration is in `app/frontend/entrypoints/application.css` via `@theme`.
*   **Data**: Real data from PostgreSQL. Mock data fallback removed.
*   **Icons**: `lucide-react`.
*   **Accessibility**: Use components from `shared/` for skip links, announcements, and sr-only text.

### Vite Configuration
> **⚠️ Known Limitation**: React Hot Module Replacement (HMR) is disabled.  
> The React plugin was removed due to a "preamble detection" issue when Vite is proxied through Rails.  
> Using `esbuild` JSX transformation instead. Full page refresh required for React changes.

## 3. Detailed Component Status

| Feature | Component/File | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Backend** | PostgreSQL + Docker | ✅ Done | `docker-compose.yml`, `bin/docker-dev` |
| | Devise Auth | ✅ Done | User model with sessions |
| | Client Model | ✅ Done | With validations & computed fields |
| | Invoice Model | ✅ Done | Status workflow, totals calculation |
| | LineItem Model | ✅ Done | Item types, position ordering |
| | PDF Generation | ✅ Done | `InvoicePdfGenerator` with Prawn |
| **Shell** | `AppLayout` | ✅ Done | Correct "well" background structure. |
| | `Sidebar` / `MobileNav` | ✅ Done | Responsive logic works. |
| | `ThemeToggle` | ✅ Done | Light/dark with persistence. |
| | `PublicLayout` | ✅ Done | Minimal layout for public pages. |
| **Dashboard** | `MetricCard`, `ActivityFeed` | ✅ Done | Real database metrics |
| | `Dashboard.tsx` | ✅ Done | DashboardController with real data |
| **Clients** | `ClientTable`, `ClientCard` | ✅ Done | Real client data from DB |
| | `ClientForm` | ✅ Done | Sheet-based form. |
| **Invoices** | `Invoices/Index.tsx` | ✅ Done | Real invoices from DB |
| | `Invoices/New.tsx` | ✅ Done | Full invoice creation form. |
| | `Invoices/Edit.tsx` | ✅ Done | Status-aware editing. |
| | `LineItemsEditor` | ✅ Done | Items, sections, discounts. |
| **Public Invoice** | `PublicInvoice/Show.tsx` | ✅ Done | Token-based lookup. |
| | `PaymentModal` | ✅ Done | Mock Stripe (real integration pending) |
| **Email** | `InvoiceMailer` | ✅ Done | Basic templates created |

## 4. Key Files Reference

### Backend
*   **Models**: `app/models/client.rb`, `app/models/invoice.rb`, `app/models/line_item.rb`, `app/models/user.rb`
*   **Migrations**: `db/migrate/` (clients, invoices, line_items, devise_users)
*   **Controllers**: `app/controllers/dashboard_controller.rb`, `app/controllers/clients_controller.rb`
*   **Seeds**: `db/seeds.rb` (sample data)

### Frontend
*   **Design Tokens**: `app/frontend/entrypoints/application.css`
*   **Type Definitions**: `app/frontend/lib/types.ts`
*   **Invoice Utilities**: `app/frontend/lib/invoice-utils.ts`
*   **Accessibility Utilities**: `app/frontend/lib/accessibility-utils.ts`

### Configuration
*   **Docker**: `docker-compose.yml`, `Dockerfile`, `.dockerignore`
*   **Environment**: `.env.docker` (template), `.env` (active)
*   **Vite**: `vite.config.ts`, `config/vite.json`
*   **Routes**: `config/routes.rb`

## 5. Development Setup

```bash
# 1. Start PostgreSQL (Docker)
bin/docker-dev start

# 2. Setup database (first time)
source .env && bin/rails db:create db:migrate db:seed

# 3. Start development servers (Rails + Vite)
source .env && foreman start -f Procfile.dev

# 4. Open browser
open http://localhost:3000

# Login: admin@invoiceforge.app / password123
```

## 6. Next Steps (Phase 3)

1. **Deploy to Production**: Set up production environment
2. **Configure Stripe Webhook**: Add webhook URL in Stripe Dashboard
3. **Testing**: End-to-end testing of payment flow
