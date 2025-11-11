import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, CreditCard, Wallet } from "lucide-react";

const Payment = () => {
  const paymentMethods = [
    {
      icon: CreditCard,
      title: "Credit/Debit Cards",
      description: "Visa, Mastercard, American Express, and more",
    },
    {
      icon: Wallet,
      title: "Digital Wallets",
      description: "PayPal, Google Pay, Apple Pay",
    },
    {
      icon: Shield,
      title: "Net Banking",
      description: "All major banks supported",
    },
  ];

  const benefits = [
    "Secure payment processing",
    "Multiple payment options",
    "Instant transaction confirmation",
    "Buyer protection guarantee",
    "Easy refunds and returns",
    "24/7 customer support",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Payment Information
            </h1>
            <p className="text-lg text-muted-foreground">
              Safe, secure, and convenient payment options for your purchases
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                How Payment Works
              </CardTitle>
              <CardDescription>
                Understanding our affiliate payment model
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">For Shoppers</h3>
                  <p className="text-muted-foreground">
                    When you click on a product link and make a purchase on flipkart, Myntra, or Meesho, 
                    you'll complete the payment directly on their secure platforms. We do not handle any 
                    payment processing. All transactions are protected by the respective store's security measures.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-2">Affiliate Disclosure</h3>
                  <p className="text-muted-foreground">
                    DealHub earns a small commission when you purchase products through our links. 
                    This commission comes from the store, not from you - there's no extra cost to you. 
                    This helps us maintain the platform and continue bringing you the best deals.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-2">Your Price Protection</h3>
                  <p className="text-muted-foreground">
                    Using our affiliate links does not increase the price you pay. In fact, we often 
                    feature exclusive deals and discounts that can save you money. The price you see 
                    is the same price you'd pay by visiting the store directly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Payment Methods Accepted by Stores</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {paymentMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="transition-all hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Why Shop Through DealHub?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-card rounded-lg border">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">100% Secure Shopping</h4>
                    <p className="text-sm text-muted-foreground">
                      All payments are processed through trusted e-commerce platforms with industry-standard 
                      encryption and security protocols. Your financial information is never shared with us.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-muted mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 DealHub. Find the best deals from top e-commerce stores.</p>
          <p className="text-sm mt-2">Affiliate links may earn us a commission at no extra cost to you.</p>
        </div>
      </footer>
    </div>
  );
};

export default Payment;
