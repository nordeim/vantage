// app/frontend/components/invoices/ClientSelector.tsx
import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ClientAvatar } from "@/components/clients/ClientAvatar"
import type { Client } from "@/lib/types"

interface ClientSelectorProps {
  clients: Client[]
  selectedClientId?: string
  onSelect: (clientId: string) => void
  onCreateNew?: () => void
  placeholder?: string
  disabled?: boolean
}

/**
 * ClientSelector — Combobox for selecting a client
 * 
 * Features:
 * - Searchable dropdown
 * - Shows avatar and company
 * - Option to create new client
 */
export function ClientSelector({
  clients,
  selectedClientId,
  onSelect,
  onCreateNew,
  placeholder = "Select a client...",
  disabled = false,
}: ClientSelectorProps) {
  const [open, setOpen] = React.useState(false)
  
  const selectedClient = clients.find(c => c.id === selectedClientId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a client"
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !selectedClient && "text-slate-400"
          )}
        >
          {selectedClient ? (
            <div className="flex items-center gap-2">
              <ClientAvatar name={selectedClient.name} size="sm" />
              <span className="truncate">{selectedClient.name}</span>
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search clients..." />
          <CommandList>
            <CommandEmpty>
              <div className="py-2">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  No clients found
                </p>
                {onCreateNew && (
                  <Button size="sm" variant="outline" onClick={() => {
                    onCreateNew()
                    setOpen(false)
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Client
                  </Button>
                )}
              </div>
            </CommandEmpty>
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.name}
                  onSelect={() => {
                    onSelect(client.id)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <ClientAvatar name={client.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{client.name}</p>
                      {client.company && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {client.company}
                        </p>
                      )}
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      selectedClientId === client.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {onCreateNew && clients.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 p-2">
              <Button
                size="sm"
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onCreateNew()
                  setOpen(false)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Client
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
