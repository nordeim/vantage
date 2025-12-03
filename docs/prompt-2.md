awesome understanding! now, please meticulously review and analyze project overview below. Then think deeper and think harder to deeply explore thoroughly and systematically to re-imagine a comprehensive `Project Requirements Document` for the project base on draft requirements below. Please also consult the UI/UX design guideline below.

# Project Overview: 

## Goal

We're going to build a simple invoicing app for managing a list of clients and creating invoices with nice clean shareable invoice pages that show a client the line items they're being billed for, along with a pay now button to pay.

The app is for my own use and not others, so we'll skip authentication for now.

## App Shell
- Simple logo (icon + text)
- Navigation: Dashboard, Clients, Invoices

## Views & Features

### Dashboard
- Metrics
- Recent invoices
- Recent clients
- Actions (create invoice, create client)

### Clients
- List clients, amount billed
- Create new clients

### Invoices
- List all invoices
- Filter by status
- Create invoice
  - Create line items

### Shareable Invoice View
- Clean professional design
- Show client's info
- Line items and total
- Pay Now button launches a payment modal
  - Just mockup the payment form, for now. We won't wire up payment processing for now.

## Tech Stack
This app has already been initialized with the following:
- Ruby on Rails 8
- Inertia
- React
- TailwindCSS v4
- ShadCN UI components
- Google Fonts
- Lucide Icons

## Phase 1: Frontend Design Focus
Let's start with the frontend design. We won't build the full API and backend functionality just yet. We'll focus on the design and UI first.

Start by stubbing out routes and views for:
- Dashboard
- Clients list
- Invoices list
- Invoice editor
- Shareable invoice

Then use your frontend-design skill to design a clean, professional, frontend design, UI and UX for each of those views.

## Design Requirements
- All views are mobile responsive and work well on mobile, tablet and desktop screen sizes.
- All views are light and dark mode friendly, based on the user's system setting.
- Use TailwindCSS v4 (already installed) utility classes only, don't write custom CSS.
- Use TailwindCSS v4 (already installed) color utility classes, don't use custom colors.
- Use Google Fonts (already installed)
- Use Lucide icons (already installed)

## Deliverables
When finished, provide the localhost route URLs for each of those 5 views so I can preview them.

## Next Step
Start by asking clarifying questions to inform your plan for this.
```

---

# Draft Project Requirements Document (for reference/re-imagine): Invoicing Application

## 1. Product Vision
A single-user, high-performance invoicing tool designed for speed and clarity. The application prioritizes a friction-less user experience for the admin (user) and a polished, trustworthy presentation for the end-client (invoice recipient).

**Core Philosophy:** "Speed is a feature." The UI should feel immediate (Inertia/React) and the design should be data-forward.

## 2. Design Direction: "Refined Swiss Utility"
*Referencing `frontend_design_skillset.md`*

We will avoid the generic "SaaS Bootstrap" look. Instead, we will adopt a **Swiss Style / International Typographic Style** approach.
*   **Typography:** High contrast. We will use a pairing like **"Inter Tight"** (for density) or **"Space Grotesk"** (for character) combined with a highly legible serif for invoice bodies (e.g., **"Merriweather"** or **"Libre Baskerville"**) to convey financial trust.
*   **Layout:** Rigid grid systems, asymmetric balance, and purposeful negative space.
*   **Color Palette:** Monochrome base (Slate/Zinc) with a single, electric accent color (e.g., International Orange or Electric Blue) used *only* for primary actions to guide the eye.
*   **Visuals:** No decorative fluff. Borders are crisp (1px). Shadows are harsh and shallow (retro-utilitarian) rather than soft and diffuse.

## 3. Technical Architecture (Constraints & Setup)
*   **Backend:** Ruby on Rails 8 (acting as the Inertia monolith).
*   **Frontend adapter:** Inertia.js (bridging Rails and React).
*   **View Layer:** React.
*   **Styling:** TailwindCSS v4.
    *   *Constraint:* No custom CSS files. All styling via utility classes.
    *   *Constraint:* Use native Tailwind color palette (e.g., `slate`, `neutral`, `indigo`).
*   **Components:** ShadCN UI (headless logic) styled to match the "Swiss Utility" aesthetic.
*   **Icons:** Lucide React.
*   **Auth:** None (Single-user mode).

## 4. Functional Specifications & View Definitions

### A. App Shell
*   **Sidebar/Top Nav:** Responsive navigation.
    *   **Logo:** Typographic logo (e.g., "INV/8").
    *   **Links:** Dashboard, Clients, Invoices.
    *   **Theme Toggle:** Integrated Light/Dark mode switch.

### B. Dashboard View (`/dashboard`)
*   **Objective:** High-level financial pulse.
*   **Key Components:**
    *   **Metrics Cards:** Total Revenue (YTD), Outstanding Amount, Overdue Amount. *Design Note: Large, bold typography for numbers.*
    *   **Recent Activity:** Mixed stream of "New Client Added" or "Invoice #003 Sent".
    *   **Quick Actions:** Floating Action Button (FAB) or prominent header buttons for "New Invoice".

### C. Clients View (`/clients`)
*   **Objective:** Directory and quick status check.
*   **Key Components:**
    *   **Data Table:** Client Name, Contact Person, Total Billed, Last Invoice Date.
    *   **Visuals:** Avatars (initials) with distinctive colored backgrounds.
*   **Actions:** "Add Client" drawer or modal.

### D. Invoices View (`/invoices`)
*   **Objective:** The command center for billing.
*   **Key Components:**
    *   **Filter Bar:** Tabbed interface (All | Draft | Pending | Paid).
    *   **List Layout:** Invoice #, Client Name, Date, Amount, Status Badge.
    *   **Status Badges:**
        *   *Draft:* Gray/Dashed border.
        *   *Pending:* Yellow/Orange solid.
        *   *Paid:* Green/Emerald solid.
        *   *Overdue:* Red/Rose solid.

### E. Invoice Editor (`/invoices/new` & `/invoices/:id/edit`)
*   **Objective:** High-speed data entry.
*   **Key Components:**
    *   **Client Selector:** Searchable dropdown (Combobox).
    *   **Date Pickers:** Issue Date, Due Date.
    *   **Line Items Table:** Dynamic rows (Description, Qty, Price). Auto-calculating totals.
    *   **Sticky Footer:** "Save Draft" and "Publish/View" buttons always visible.

### F. Shareable Invoice View (`/public/invoices/:token`)
*   **Objective:** The "Product" delivered to the customer. Needs to look printable.
*   **Key Components:**
    *   **Header:** Vendor Logo & Info vs. Client Info (Classic invoice layout).
    *   **The Bill:** Clean table, clear separation of Subtotal, Tax (if applicable), and Total.
    *   **Payment Action:** "Pay Now" button (Primary action).
    *   **Modal:** On click, opens a mock payment form (Credit Card input visual only).

## 5. Implementation Roadmap (Phase 1)
1.  **Setup:** Configure Routes in Rails and Page components in Inertia/React.
2.  **Shell:** Build the Main Layout wrapper with responsive nav.
3.  **Components:** Customize ShadCN base components (Buttons, Inputs, Cards) to match "Swiss Utility" theme using Tailwind v4 classes.
4.  **Views:** Implement the 5 core pages with mock data (stubs).
5.  **Review:** Verify Dark Mode and Mobile responsiveness.
```

---

**Additional Information:**
*   **Currency:** All monetary values formatted as `SGD` (S$) with locale-aware formatting.
*   **Metrics:** Dashboard will prioritize **MRR (Monthly Recurring Revenue)** visualization alongside Invoiced Totals.
*   **Complexity:** Removal of Tax/VAT logic simplifies the `InvoiceTotal` calculation components.
*   **Client Data:** Added support for a "Notes" text area in the Client interfaces.

---

name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

# Frontend Design Guideline: This guides the creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: You are capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
