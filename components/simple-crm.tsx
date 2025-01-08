'use client'

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { setActiveTab } from '@/lib/slices/crmSlice'
import { TabsNavigation } from './tabs-navigation'
import { PageHeader } from './page-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Download } from 'lucide-react'
import { DateRangePicker } from './date-range-picker'
import { CustomerTable } from './customer-table'

const analyticsData = [
  { name: 'Leads', value: 77, color: '#818CF8' },
  { name: 'Applicant', value: 15, color: '#60A5FA' },
  { name: 'Completed', value: 8, color: '#34D399' },
]

const dateRanges = [
  { value: 'last-30-days', label: 'Last 30 Days' },
  { value: 'last-7-days', label: 'Last 7 Days' },
  { value: 'last-90-days', label: 'Last 90 Days' },
  { value: 'custom', label: 'Custom Range' },
]

export function SimpleCRM() {
  const dispatch = useDispatch()
  const activeTab = useSelector((state: RootState) => state.crm.activeTab)
  const [selectedRange, setSelectedRange] = React.useState('last-30-days')

  const tabs = [
    { value: 'customer', label: 'Customer' },
    { value: 'analytics', label: 'Analytics' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'customer':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerTable />
              </CardContent>
            </Card>
          </div>
        )
      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Header with Date Range and Export */}
            <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <DateRangePicker />
                <span className="text-sm text-muted-foreground">
                  1 Nov 2024 - 1 December 2024
                </span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </Card>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Leads</CardTitle>
                  <CardDescription>Customer who has shown interest</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">240</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applicant</CardTitle>
                  <CardDescription>Lead who submitted their consent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">240</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Complete Application</CardTitle>
                  <CardDescription>Applicant who are officially enrolled</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">240</div>
                </CardContent>
              </Card>
            </div>

            {/* Chart Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Chart overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        {analyticsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend 
                        verticalAlign="middle" 
                        align="right"
                        layout="vertical"
                        formatter={(value, entry) => (
                          <span className="text-sm">
                            {value}: {entry.payload.value}%
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <PageHeader title="Simple CRM" />
      <div className="border-b">
        <div className="px-4 sm:px-6">
          <TabsNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(value) => dispatch(setActiveTab(value as 'customer' | 'analytics'))}
          />
        </div>
      </div>
      <div className="p-4 sm:p-6">
        {renderTabContent()}
      </div>
    </div>
  )
}

