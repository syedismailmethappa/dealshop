import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { StoreFilter } from "@/components/StoreFilter";
import { ProductCard } from "@/components/ProductCard";
import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import heroBanner from "@/assets/hero-banner.jpg";

// Sample product data - replace with real affiliate links
const products = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    store: "amazon",
    affiliateLink: "https://amazon.in",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Men's Casual Cotton T-Shirt - Pack of 3",
    price: "₹799",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    store: "myntra",
    affiliateLink: "https://myntra.com",
    category: "Fashion",
  },
  {
    id: 3,
    title: "Women's Ethnic Kurta Set with Dupatta",
    price: "₹599",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    store: "meesho",
    affiliateLink: "https://meesho.com",
    category: "Ethnic Wear",
  },
  {
    id: 4,
    title: "Smart Watch with Fitness Tracker",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    store: "amazon",
    affiliateLink: "https://amazon.in",
    category: "Electronics",
  },
  {
    id: 5,
    title: "Leather Casual Shoes for Men",
    price: "₹1,299",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
    store: "myntra",
    affiliateLink: "https://myntra.com",
    category: "Footwear",
  },
  {
    id: 6,
    title: "Kitchen Cookware Set - Non Stick",
    price: "₹899",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80",
    store: "meesho",
    affiliateLink: "https://meesho.com",
    category: "Home & Kitchen",
  },
  {
    id: 7,
    title: "Backpack Laptop Bag with USB Charging Port",
    price: "₹1,199",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    store: "amazon",
    affiliateLink: "https://amazon.in",
    category: "Bags",
  },
  {
    id: 8,
    title: "Women's Designer Handbag",
    price: "₹1,599",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
    store: "myntra",
    affiliateLink: "https://myntra.com",
    category: "Accessories",
  },
];

const Index = () => {
  const [activeStore, setActiveStore] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesStore = activeStore === "all" || product.store === activeStore;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStore && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-90"
          style={{ 
            backgroundImage: `url(${heroBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Discover Best Deals Across Top Stores
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-95">
              Compare prices from Amazon, Myntra, and Meesho - All in one place
            </p>
            <div className="flex gap-4 justify-center items-center">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm font-medium">Trending Products Updated Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <StoreFilter activeStore={activeStore} onStoreChange={setActiveStore} />
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {activeStore === "all" ? "All Products" : `${activeStore.charAt(0).toUpperCase() + activeStore.slice(1)} Products`}
          </h2>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No products found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-muted mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 DealHub. Find the best deals from top e-commerce stores.</p>
          <p className="text-sm mt-2">Affiliate links may earn us a commission at no extra cost to you.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
