import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, TrendingUp, Award } from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To help shoppers find the best deals across multiple e-commerce platforms in one convenient place.",
    },
    {
      icon: Users,
      title: "User First",
      description: "We prioritize user experience by curating quality products and verified deals from trusted stores.",
    },
    {
      icon: TrendingUp,
      title: "Daily Updates",
      description: "Our team constantly monitors prices and updates deals to ensure you never miss a great offer.",
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description: "Partnered with leading e-commerce stores to bring you authentic products and reliable service.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About DealHub
            </h1>
            <p className="text-lg text-muted-foreground">
              Your trusted partner in finding the best deals online
            </p>
          </div>

          <div className="mb-16">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-accent p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                <p className="text-lg opacity-95">
                  DealHub is a comprehensive affiliate marketing platform that aggregates the best deals 
                  from top e-commerce stores including Flipkart, Myntra, and Meesho. We make online shopping 
                  easier by bringing all the deals to one place, saving you time and money.
                </p>
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Our Story</h3>
                <p className="text-muted-foreground mb-4">
                  Founded with a vision to simplify online shopping, DealHub was created to help consumers 
                  navigate the overwhelming world of e-commerce. We understand that finding the right product 
                  at the best price across multiple platforms can be time-consuming and frustrating.
                </p>
                <p className="text-muted-foreground">
                  That's why we built a platform that does the hard work for you - comparing prices, 
                  highlighting deals, and providing direct links to purchase your favorite products from 
                  trusted stores.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="transition-all hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Join Thousands of Smart Shoppers</h2>
              <p className="text-muted-foreground mb-6">
                Start saving money today by discovering the best deals from top e-commerce stores.
              </p>
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

export default AboutUs;
