"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, FileText, Zap, Crown } from "lucide-react"

const plans = [
  {
    id: "free",
    name: "Free",
    price: "€0",
    period: "/forever",
    description: "Perfect for getting started with resume building",
    icon: FileText,
    features: [
      "2 resume analyses per session", 
      "One-time template access"
    ],
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "€5",
    period: "/per month",
    description: "Ideal for active job seekers and professionals",
    icon: Zap,
    features: [
      "10 resume analyses per session",
      "Five times template access"
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "€10",
    period: "/per month",
    description: "For career professionals and frequent users",
    icon: Crown,
    features: [
      "Unlimited resume analyses & templates",
      "Advanced AI-powered deep analysis"
    ],
    buttonText: "Upgrade to Premium",
    buttonVariant: "default" as const,
    popular: false,
  },
]

export default function UpgradePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePlanSelect = async (planId: string) => {
    if (planId === "free") {
      return // Free plan doesn't need processing
    }

    setSelectedPlan(planId)
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Here you would integrate with your payment processor
      alert(`Redirecting to payment for ${planId} plan...`)
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Unlock the full potential of Evalurez with our flexible pricing plans.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const Icon = plan.icon
          const isSelected = selectedPlan === plan.id
          
          return (
            <Card
              key={plan.id}
              className={`relative border-2 transition-all duration-200 hover:shadow-lg flex flex-col h-full ${
                isSelected
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4 flex-shrink-0">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <div className="h-12 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-grow">
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full mb-6 ${
                    plan.buttonVariant === "default" 
                      ? "bg-foreground text-background hover:bg-foreground/90" 
                      : ""
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isProcessing && selectedPlan === plan.id}
                >
                  {isProcessing && selectedPlan === plan.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    plan.buttonText
                  )}
                </Button>

                {/* Key Features */}
                <div className="space-y-3 flex-grow">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Key Features</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}