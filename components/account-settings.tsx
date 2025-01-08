'use client'

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageHeader } from './page-header'
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Info, CreditCard, X } from 'lucide-react'
import { setAvatarUrl } from '@/lib/slices/userProfileSlice'
import { RootState } from '@/lib/store'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image'

export function AccountSettings() {
  const dispatch = useDispatch()
  const avatarUrl = useSelector((state: RootState) => state.userProfile.avatarUrl)
  const [activeTab, setActiveTab] = React.useState('personal')
  const [apiKeyEnabled, setApiKeyEnabled] = React.useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        dispatch(setAvatarUrl(reader.result as string))
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleCancelPlan = () => {
    // Implement actual cancellation logic here
    console.log('Plan cancelled')
    setCancelDialogOpen(false)
  }

  const invoices = [
    {
      date: '22 Aug 2024',
      total: 'US $21.80',
      status: 'Paid',
      id: '1'
    },
    {
      date: '22 July 2024',
      total: 'US $21.80',
      status: 'Amount Due',
      id: '2'
    }
  ]

  return (
    <div>
      <PageHeader title="Account Settings" />
      <div className="border-b">
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-auto p-0 bg-transparent">
              {[
                { value: 'personal', label: 'Personal Information' },
                { value: 'subscription', label: 'Subscription' },
                { value: 'backup', label: 'Backup' },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 py-2 rounded-none font-normal data-[state=active]:font-medium border-b-2 border-transparent data-[state=active]:border-[#4F46E5] text-muted-foreground data-[state=active]:text-[#4F46E5]"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6 w-full max-w-[95%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] mx-auto">
        {activeTab === 'personal' && (
          <>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-medium">Profile photo</h3>
                <Button variant="secondary" size="sm">Save</Button>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 bg-[#4F46E5]/10">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="Profile" />
                  ) : (
                    <AvatarFallback className="text-[#4F46E5] text-xl">RV</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button variant="outline" className="mb-2" onClick={triggerFileInput}>
                    Upload picture
                  </Button>
                  <p className="text-sm sm:text-base text-muted-foreground">JPG, GIF or PNG. Max size of 5MB.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-medium">Basic information</h3>
                <Button variant="secondary" size="sm">Save</Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Agent email address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-medium">Change password</h3>
                <Button variant="secondary" size="sm">Save</Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Verify current password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter your current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter your new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm your new password" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-medium">Free Credits/Tokens</h3>
                <div>
                  <div className="text-2xl sm:text-4xl font-bold">150,000 <span className="text-xl font-normal text-muted-foreground">TPM</span></div>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2">This is the amount of credit you can immediatly use.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-medium">Set up your API KEY</h3>
                <Button variant="secondary" size="sm">Save</Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="apiKey">Add your own API KEY</Label>
                  <Switch 
                    id="apiKey" 
                    checked={apiKeyEnabled}
                    onCheckedChange={setApiKeyEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input placeholder="Enter your API key" disabled={!apiKeyEnabled} />
                </div>
                <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg text-sm">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-blue-700">
                    Check <a href="#" className="underline">here</a> to see which could models could be compatible. 
                    Make sure it has 'tool' capability else it wont be able to get accurate API from the Healthcare API CMS.
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-medium">Payment</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span>Visa ********0687</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-medium">Invoices</h3>
                <Table className="w-full">
                  <TableHeader className="min-w-[400px]">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.total}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'Paid' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {invoice.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto font-normal">
                            View Invoice
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-medium">Cancellation</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Cancel plan</p>
                </div>
                <Button 
                  variant="destructive"
                  onClick={() => setCancelDialogOpen(true)}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'backup' && (
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-medium">Set up your backup</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.3 78" className="w-full h-full">
                      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                    </svg>
                  </div>
                  <span>Connect your account to google drive</span>
                </div>
                <Button variant="outline" size="sm">
                  Set up
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle>Cancel Plan</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto p-0 hover:bg-transparent"
              onClick={() => setCancelDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              Canceling will stop the recurring billing right away, but you'll keep your Agenstly Assistant access until 22 Sep 2024.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
            >
              Go back
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelPlan}
            >
              Cancel plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

