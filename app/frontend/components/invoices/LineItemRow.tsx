// app/frontend/components/invoices/LineItemRow.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GripVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import { calculateLineTotal, unitTypeOptions } from "@/lib/invoice-utils"
import type { LineItem, UnitType } from "@/lib/types"

interface LineItemRowProps {
  item: LineItem
  onChange: (item: LineItem) => void
  onDelete: () => void
  disabled?: boolean
}

/**
 * LineItemRow — Editable row for regular line items
 * 
 * Layout:
 * - Drag handle | Description | Quantity | Unit Type | Unit Price | Line Total | Delete
 */
export function LineItemRow({
  item,
  onChange,
  onDelete,
  disabled = false,
}: LineItemRowProps) {
  const lineTotal = calculateLineTotal(item)

  const handleChange = <K extends keyof LineItem>(field: K, value: LineItem[K]) => {
    onChange({ ...item, [field]: value })
  }

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg",
      "bg-slate-50 dark:bg-slate-800/50",
      "border border-slate-200 dark:border-slate-700"
    )}>
      {/* Drag Handle */}
      <div className="flex-shrink-0 cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <Input
          value={item.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Item description"
          disabled={disabled}
          className="bg-white dark:bg-slate-900"
        />
      </div>

      {/* Quantity */}
      <div className="w-20 flex-shrink-0">
        <Input
          type="number"
          min="0"
          step="0.5"
          value={item.quantity ?? ''}
          onChange={(e) => handleChange('quantity', parseFloat(e.target.value) || 0)}
          placeholder="Qty"
          disabled={disabled}
          className="bg-white dark:bg-slate-900 text-right"
        />
      </div>

      {/* Unit Type */}
      <div className="w-24 flex-shrink-0">
        <Select
          value={item.unitType}
          onValueChange={(value) => handleChange('unitType', value as UnitType)}
          disabled={disabled}
        >
          <SelectTrigger className="bg-white dark:bg-slate-900">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            {unitTypeOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Unit Price */}
      <div className="w-28 flex-shrink-0">
        <Input
          type="number"
          min="0"
          step="0.01"
          value={item.unitPrice ?? ''}
          onChange={(e) => handleChange('unitPrice', parseFloat(e.target.value) || 0)}
          placeholder="Price"
          disabled={disabled}
          className="bg-white dark:bg-slate-900 text-right"
        />
      </div>

      {/* Line Total */}
      <div className="w-28 flex-shrink-0 text-right">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-50">
          {formatCurrency(lineTotal)}
        </span>
      </div>

      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={disabled}
        className="flex-shrink-0 h-8 w-8 text-slate-400 hover:text-rose-500"
        aria-label="Remove item"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
