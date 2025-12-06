// app/frontend/components/clients/ClientForm.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { Client } from "@/lib/types"

interface ClientFormData {
  name: string
  email: string
  company: string
  phone: string
  address: string
  notes: string
}

interface ClientFormProps {
  /** Initial values for edit mode */
  initialData?: Partial<Client>
  /** Called on successful form submission */
  onSubmit: (data: ClientFormData) => void
  /** Called when form is cancelled */
  onCancel: () => void
  /** Whether the form is in a loading state */
  isLoading?: boolean
}

/**
 * ClientForm — Form fields for creating/editing a client
 * 
 * Fields (v4.2 specification):
 * - Name (Required)
 * - Email (Required)
 * - Company
 * - Phone
 * - Address (Textarea)
 * - Notes (Textarea)
 */
export function ClientForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  isLoading = false 
}: ClientFormProps) {
  // Form state
  const [formData, setFormData] = useState<ClientFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    company: initialData?.company || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    notes: initialData?.notes || '',
  })

  // Validation errors
  const [errors, setErrors] = useState<Partial<Record<keyof ClientFormData, string>>>({})

  // Handle field change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is modified
    if (errors[name as keyof ClientFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  // Validate form
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ClientFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validate()) {
      onSubmit(formData)
    }
  }

  const isEditing = !!initialData?.id

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field (Required) */}
      <FormField
        label="Name"
        name="name"
        required
        error={errors.name}
      >
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter client or contact name"
          disabled={isLoading}
          aria-invalid={!!errors.name}
        />
      </FormField>

      {/* Email Field (Required) */}
      <FormField
        label="Email"
        name="email"
        required
        error={errors.email}
      >
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="billing@example.com"
          disabled={isLoading}
          aria-invalid={!!errors.email}
        />
      </FormField>

      {/* Company Field */}
      <FormField
        label="Company"
        name="company"
      >
        <Input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company name (optional)"
          disabled={isLoading}
        />
      </FormField>

      {/* Phone Field */}
      <FormField
        label="Phone"
        name="phone"
      >
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+65 6123 4567"
          disabled={isLoading}
        />
      </FormField>

      {/* Address Field */}
      <FormField
        label="Address"
        name="address"
      >
        <Textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full billing address"
          rows={3}
          disabled={isLoading}
        />
      </FormField>

      {/* Notes Field */}
      <FormField
        label="Notes"
        name="notes"
        hint="Internal notes about payment terms, preferences, etc."
      >
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any notes about this client..."
          rows={3}
          disabled={isLoading}
        />
      </FormField>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Client'}
        </Button>
      </div>
    </form>
  )
}

/**
 * FormField — Wrapper for form field with label and error
 */
interface FormFieldProps {
  label: string
  name: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactElement<{
    id?: string
    'aria-describedby'?: string
    'aria-required'?: boolean
    'aria-invalid'?: boolean
  }>
}

function FormField({ 
  label, 
  name, 
  required, 
  error, 
  hint,
  children 
}: FormFieldProps) {
  const inputId = name
  const hintId = hint ? `${name}-hint` : undefined
  const errorId = error ? `${name}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  // Type-safe clone with proper typing
  const enhancedChild = React.isValidElement(children)
    ? React.cloneElement(children, {
        id: inputId,
        'aria-describedby': describedBy || undefined,
        'aria-required': required || undefined,
        'aria-invalid': !!error || undefined,
      })
    : children

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} className="flex items-center gap-1">
        {label}
        {required && (
          <>
            <span className="text-rose-500" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </Label>
      
      {enhancedChild}
      
      {hint && !error && (
        <p id={hintId} className="text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-xs text-rose-600 dark:text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
