'use client'

import * as React from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Eye, MessageCircle, MoreHorizontal } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Portal } from '@radix-ui/react-portal'
import { CustomerDetailsSheet } from './customer-details-sheet'

interface InsuranceProgress {
  type: 'ACA' | 'Dental' | 'Final Expense'
  progress: number
}

interface Customer {
  id: string
  name: string
  dependents: number
  consents: number
  insuranceProgress: InsuranceProgress[]
  status: 'Lead' | 'Complete' | 'Applicant'
  messageStatus: 'unread' | 'read' | 'none'
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'Liam Carter',
    dependents: 0,
    consents: 1,
    insuranceProgress: [
      { type: 'ACA', progress: 3 }
    ],
    status: 'Lead',
    messageStatus: 'unread'
  },
  {
    id: '2',
    name: 'Ava Thompson',
    dependents: 0,
    consents: 4,
    insuranceProgress: [
      { type: 'ACA', progress: 100 },
      { type: 'Dental', progress: 80 }
    ],
    status: 'Complete',
    messageStatus: 'read'
  },
  {
    id: '3',
    name: 'Noah Anderson',
    dependents: 0,
    consents: 1,
    insuranceProgress: [
      { type: 'Final Expense', progress: 30 }
    ],
    status: 'Applicant',
    messageStatus: 'unread'
  },
  {
    id: '4',
    name: 'Amelia Martinez',
    dependents: 0,
    consents: 3,
    insuranceProgress: [
      { type: 'ACA', progress: 100 },
      { type: 'Dental', progress: 80 },
      { type: 'Final Expense', progress: 100 }
    ],
    status: 'Complete',
    messageStatus: 'none'
  }
]

export function CustomerTable() {
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setSheetOpen(true)
  }

  return (
    <div className="relative w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[100px]">Dependents</TableHead>
            <TableHead className="w-[100px]">Consent/SOA</TableHead>
            <TableHead className="w-[300px]">Insurance Progress</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Messages</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="border-b last:border-0">
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.dependents}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {Array.from({ length: customer.consents }).map((_, i) => (
                    <Check key={i} className="h-4 w-4 text-blue-600" />
                  ))}
                  {customer.consents === 0 && (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  {customer.insuranceProgress.map((insurance, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Progress 
                        value={insurance.progress} 
                        className="h-2 w-[100px]"
                        indicatorColor={
                          insurance.type === 'Final Expense' 
                            ? 'bg-blue-600' 
                            : 'bg-[#4F46E5]'
                        }
                      />
                      <span className="text-sm min-w-[40px]">{insurance.progress}%</span>
                      <span 
                        className={cn(
                          "text-sm font-medium",
                          insurance.type === 'Final Expense' ? 'text-blue-600' : 'text-[#4F46E5]'
                        )}
                      >
                        {insurance.type}
                      </span>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={
                    customer.status === 'Lead' 
                      ? 'lead' 
                      : customer.status === 'Complete' 
                      ? 'complete' 
                      : 'applicant'
                  }
                >
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell>
                {customer.messageStatus === 'unread' && (
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                    Unread
                  </span>
                )}
                {customer.messageStatus === 'read' && (
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    Read
                  </span>
                )}
                {customer.messageStatus === 'none' && (
                  <span className="text-muted-foreground">No messages</span>
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <Portal>
                    <DropdownMenuContent align="end" className="z-50">
                      <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Omni Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </Portal>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomerDetailsSheet 
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        customer={selectedCustomer || undefined}
      />
    </div>
  )
}

