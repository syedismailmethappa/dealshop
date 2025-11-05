import { Button } from "@/components/ui/button";
import { Package, ShoppingBag, Store } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const stores = [
  { id: "all", name: "All Stores", icon: Package, path: "/" },
  { id: "amazon", name: "Amazon", icon: ShoppingBag, path: "/amazon" },
  { id: "myntra", name: "Myntra", icon: Store, path: "/myntra" },
  { id: "meesho", name: "Meesho", icon: Package, path: "/meesho" },
];

export const StoreFilter = () => {
  const location = useLocation();

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {stores.map((store) => {
        const Icon = store.icon;
        const isActive = location.pathname === store.path;
        return (
          <Button
            key={store.id}
            variant={isActive ? "default" : "outline"}
            asChild
            className="gap-2 transition-all"
          >
            <Link to={store.path}>
              <Icon className="w-4 h-4" />
              {store.name}
            </Link>
          </Button>
        );
      })}
    </div>
  );
};
