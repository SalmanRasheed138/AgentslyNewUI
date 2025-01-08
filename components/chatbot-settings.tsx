'use client'

import * as React from 'react'
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function ChatbotSettings() {
  const [agentIntroduction, setAgentIntroduction] = React.useState('')
  const [customizeAssistantName, setCustomizeAssistantName] = React.useState(false)
  const [enableConsentFix, setEnableConsentFix] = React.useState(false)

  return (
    <div className="w-full max-w-[800px] mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
      {/* Agent Introduction */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold">Agent Introduction</h2>
          <Button 
            size="sm" 
            className="bg-[#4F46E5]/[0.31] text-white hover:bg-[#4F46E5]"
          >
            Save
          </Button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Agent Introduction</Label>
            <div className="relative">
              <Textarea
                value={agentIntroduction}
                onChange={(e) => setAgentIntroduction(e.target.value)}
                placeholder="Value"
                className="min-h-[120px] resize-none pr-16 text-sm sm:text-base"
              />
              <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {agentIntroduction.length}/1000
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Agent Introduction Preview</Label>
            <Textarea
              placeholder="Value"
              className="min-h-[80px] resize-none text-sm sm:text-base"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Instruction:</Label>
            <p className="text-xs sm:text-sm text-muted-foreground">
              To dynamically place your information in the text, please use this format.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Example Input:</Label>
            <pre className="text-xs sm:text-sm bg-muted p-2 rounded-md overflow-x-auto">
              My name is [agent_name] and my NPN is [npn]
            </pre>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Example Output:</Label>
            <pre className="text-xs sm:text-sm bg-muted p-2 rounded-md overflow-x-auto">
              My name is Rovic and my NPN is 655546789
            </pre>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Reference:</Label>
            <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
              <p>Agent name: [agent_name]</p>
              <p>Assistant name: [assistant_name]</p>
              <p>NPN: [npn]</p>
              <p>Email: [email]</p>
              <p>Phone: [phone]</p>
              <p>Content link: [content_link]</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Assistant Information */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold">Assistant Information</h2>
          <Button 
            size="sm" 
            className="bg-[#4F46E5]/[0.31] text-white hover:bg-[#4F46E5]"
          >
            Save
          </Button>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm sm:text-base">Customize agent assistant name</Label>
              <p className="text-xs sm:text-sm text-muted-foreground">
                You can use variables like [agent first name], [agent last name], [agent full name]
              </p>
            </div>
            <Switch
              checked={customizeAssistantName}
              onCheckedChange={setCustomizeAssistantName}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="npn" className="text-sm sm:text-base">NPN</Label>
              <Input id="npn" placeholder="Enter NPN" className="text-sm sm:text-base" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm sm:text-base">Phone number</Label>
              <Input id="phone" placeholder="Enter phone number" className="text-sm sm:text-base" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base">Agent email address</Label>
            <Input id="email" type="email" placeholder="Enter email address" className="text-sm sm:text-base" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cross-sell" className="text-sm sm:text-base">Cross sell link</Label>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Link of other product that you want to sell
            </p>
            <Input id="cross-sell" placeholder="Enter cross sell link" className="text-sm sm:text-base" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Description of cross sell link</Label>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Please provide a description of the product you would like to cross sell; otherwise, leave it blank
            </p>
            <div className="relative">
              <Textarea
                placeholder="Value"
                className="min-h-[100px] resize-none pr-16 text-sm sm:text-base"
              />
              <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                0/1000
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dental-sales" className="text-sm sm:text-base">Dental Sales Link</Label>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Link to access insurance consent
            </p>
            <Input id="dental-sales" placeholder="Enter dental sales link" className="text-sm sm:text-base" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm sm:text-base">Enable consent fix at the end</Label>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Mode for Consent Acceptance
              </p>
            </div>
            <Switch
              checked={enableConsentFix}
              onCheckedChange={setEnableConsentFix}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calendar" className="text-sm sm:text-base">Calendar link</Label>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Schedule appointment effortlessly
            </p>
            <Input id="calendar" placeholder="Enter calendar link" className="text-sm sm:text-base" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signature" className="text-sm sm:text-base">Signature form link</Label>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              The form link for signature
            </p>
            <Input id="signature" placeholder="Enter signature form link" className="text-sm sm:text-base" />
          </div>
        </div>
      </Card>

      {/* Bot Introduction */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold">Bot Introduction</h2>
          <Button 
            size="sm" 
            className="bg-[#4F46E5]/[0.31] text-white hover:bg-[#4F46E5]"
          >
            Save
          </Button>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label className="text-sm sm:text-base">What is your company's mission statement and what are your chatbot's capabilities? Be clear and concise</Label>
            <div className="relative">
              <Textarea
                placeholder="Value"
                className="min-h-[100px] resize-none pr-16 text-sm sm:text-base"
              />
              <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                0/1000
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">Describe the chatbot's ideal tone and style</Label>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Ex: Professional, friendly, and informative. Avoid slang.
            </p>
            <div className="relative">
              <Textarea
                placeholder="Value"
                className="min-h-[100px] resize-none pr-16 text-sm sm:text-base"
              />
              <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                0/1000
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">If you have an example of a perfect welcome message, please paste it below</Label>
            <div className="relative">
              <Textarea
                placeholder="Value"
                className="min-h-[100px] resize-none pr-16 text-sm sm:text-base"
              />
              <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                0/1000
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">If you have an example of a message with no zip code yet, Provide here</Label>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Ex: Professional, friendly, and informative. Avoid slang.
            </p>
            <div className="relative">
              <Textarea
                placeholder="Value"
                className="min-h-[100px] resize-none pr-16 text-sm sm:text-base"
              />
              <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                0/1000
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base">How should the chatbot summarize messages to user? Be specific !</Label>
            <div className="relative">
              <Textarea
                placeholder="Value"
                className="min-h-[100px] resize-none pr-16 text-sm sm:text-base"
              />
              <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                0/1000
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

