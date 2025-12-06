// app/frontend/pages/Dashboard.tsx
import { Link } from "@inertiajs/react"
import { AppLayout } from "@/layouts/AppLayout"
import { PageHeader } from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { 
  MetricCard, 
  RecentInvoices, 
  ActivityFeed 
} from "@/components/dashboard"
import { 
  mockDashboardMetrics, 
  mockInvoices, 
  mockRecentActivity 
} from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import { 
  Plus, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  AlertTriangle 
} from "lucide-react"
import type { DashboardMetrics, Invoice, RecentActivity } from "@/lib/types"

interface DashboardProps {
  /** Dashboard metrics from backend (optional - falls back to mock) */
  metrics?: DashboardMetrics
  /** Recent invoices from backend (optional - falls back to mock) */
  invoices?: Invoice[]
  /** Recent activities from backend (optional - falls back to mock) */
  activities?: RecentActivity[]
}

/**
 * Dashboard Page — Financial pulse and quick actions
 * 
 * Layout (v4.2):
 * - PageHeader with date and "New Invoice" CTA
 * - Metrics Grid: 4 columns desktop, 2 tablet, 1 mobile
 * - Two-column layout: Recent Invoices | Activity Feed
 */
export default function Dashboard({ 
  metrics: propsMetrics,
  invoices: propsInvoices,
  activities: propsActivities 
}: DashboardProps) {
  // Use props if provided, otherwise fall back to mock data
  const metrics = propsMetrics || mockDashboardMetrics
  const allInvoices = propsInvoices || mockInvoices
  const activities = propsActivities || mockRecentActivity

  // Format today's date
  const today = new Date().toLocaleDateString('en-SG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Sort invoices by date (most recent first) for display
  const recentInvoices = [...allInvoices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Count invoices by status for subtext
  const pendingCount = allInvoices.filter(inv => inv.status === 'pending').length
  const overdueCount = allInvoices.filter(inv => inv.status === 'overdue').length
  const outstandingCount = pendingCount + overdueCount

  return (
    <AppLayout>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        subtitle={today}
        actions={
          <Button asChild>
            <Link href="/invoices/new">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Link>
          </Button>
        }
      />

      {/* Metrics Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Outstanding */}
        <MetricCard
          label="Outstanding"
          value={formatCurrency(metrics.totalOutstanding)}
          subtext={`${outstandingCount} invoice${outstandingCount !== 1 ? 's' : ''}`}
          icon={DollarSign}
        />

        {/* Paid This Month */}
        <MetricCard
          label="Paid (Month)"
          value={formatCurrency(metrics.totalPaidThisMonth)}
          trend={{
            value: "12%",
            direction: "up",
            positive: true,
          }}
          icon={TrendingUp}
        />

        {/* Paid YTD */}
        <MetricCard
          label="Paid (YTD)"
          value={formatCurrency(metrics.totalPaidYTD)}
          icon={DollarSign}
          variant="success"
        />

        {/* Overdue */}
        <MetricCard
          label="Overdue"
          value={formatCurrency(metrics.overdueAmount)}
          subtext={`${metrics.overdueCount} invoice${metrics.overdueCount !== 1 ? 's' : ''}`}
          variant="danger"
          icon={AlertTriangle}
        />
      </div>

      {/* Two Column Layout: Recent Invoices | Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Invoices */}
        <RecentInvoices invoices={recentInvoices} limit={4} />

        {/* Activity Feed */}
        <ActivityFeed activities={activities} limit={5} />
      </div>
    </AppLayout>
  )
}
