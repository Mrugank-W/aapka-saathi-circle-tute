import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Leaf, ShoppingCart, User, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product, CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Import product images
import onionsImg from '@/assets/onions.jpg';
import potatoesImg from '@/assets/potatoes.jpg';
import tomatoesImg from '@/assets/tomatoes.jpg';
import leafyVegetablesImg from '@/assets/leafy-vegetables.jpg';

// Demo data for products
const mockProducts: Product[] = [
  {
    productId: '1',
    name: 'प्याज',
    price: 25,
    unit: 'kg',
    imageURL: onionsImg,
    category: 'vegetables'
  },
  {
    productId: '2',
    name: 'आलू',
    price: 18,
    unit: 'kg',
    imageURL: potatoesImg,
    category: 'vegetables'
  },
  {
    productId: '3',
    name: 'टमाटर',
    price: 30,
    unit: 'kg',
    imageURL: tomatoesImg,
    category: 'vegetables'
  },
  {
    productId: '4',
    name: 'हरी सब्जी',
    price: 15,
    unit: 'bundle',
    imageURL: leafyVegetablesImg,
    category: 'leafy'
  }
];

interface VendorDashboardProps {
  onLogout: () => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'cart' | 'orders'>('home');
  const [vendor] = useState({
    name: 'राजू कुमार',
    stallName: 'राजू के छोले भटूरे',
    saathiCreditBalance: 2500,
    wasteCreditsBalance: 180
  });

  const { items, addItem, updateQuantity, getTotalCost, getItemCount } = useCart();
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    const cartItem: CartItem = {
      productId: product.productId,
      name: product.name,
      quantity: 1,
      unit: product.unit,
      price: product.price,
      imageURL: product.imageURL
    };
    addItem(cartItem);
    toast({
      title: "कार्ट में जोड़ा गया",
      description: `${product.name} आपके कार्ट में जोड़ दिया गया है।`,
    });
  };

  const HomeTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-primary/10 via-vendor-success/10 to-secondary/10 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                नमस्ते, {vendor.name}! 🙏
              </h2>
              <p className="text-muted-foreground">{vendor.stallName}</p>
            </div>
            <Button variant="ghost" onClick={onLogout} size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Credit Balances */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-saathi-credit/10 to-saathi-credit/5 border border-saathi-credit/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-saathi-credit/20 rounded-full">
                <Coins className="h-5 w-5 text-saathi-credit" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">साथी क्रेडिट</p>
                <p className="text-xl font-bold text-saathi-credit">
                  ₹{vendor.saathiCreditBalance}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-waste-credit/10 to-waste-credit/5 border border-waste-credit/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-waste-credit/20 rounded-full">
                <Leaf className="h-5 w-5 text-waste-credit" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">वेस्ट क्रेडिट</p>
                <p className="text-xl font-bold text-waste-credit">
                  ₹{vendor.wasteCreditsBalance}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            आज की सब्जियां
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {mockProducts.map((product) => (
              <Card key={product.productId} className="overflow-hidden hover:shadow-md transition-all">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm">{product.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    ₹{product.price}/{product.unit}
                  </p>
                  <Button
                    onClick={() => addToCart(product)}
                    variant="saathi"
                    size="sm"
                    className="w-full mt-2"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    जोड़ें
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CartTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>आपका कार्ट</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">आपका कार्ट खाली है</p>
              <Button
                onClick={() => setActiveTab('home')}
                variant="saathi"
                className="mt-4"
              >
                सब्जी चुनें
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price}/{item.unit}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="h-8 w-8"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">कुल राशि:</span>
                  <span className="text-xl font-bold">₹{getTotalCost()}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="useWasteCredits"
                      className="rounded"
                    />
                    <label htmlFor="useWasteCredits" className="text-sm">
                      वेस्ट क्रेडिट का उपयोग करें (₹{vendor.wasteCreditsBalance})
                    </label>
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    ऑर्डर करें
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const OrdersTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>मेरे ऑर्डर</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">ऑर्डर #12345</p>
                <p className="text-sm text-muted-foreground">आज, 10:30 AM</p>
              </div>
              <Badge variant="outline" className="bg-vendor-success/10 text-vendor-success border-vendor-success">
                पहुंचाया गया
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>वेस्ट पिकअप</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">पिकअप #001</p>
                <p className="text-sm text-muted-foreground">कल, 2:00 PM</p>
                <p className="text-xs text-muted-foreground">वजन: 3.5 kg</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-waste-credit">+₹18</p>
                <p className="text-xs text-muted-foreground">क्रेडिट मिला</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pb-20 p-4">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'cart' && <CartTab />}
        {activeTab === 'orders' && <OrdersTab />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="flex items-center justify-around p-2">
          <Button
            variant={activeTab === 'home' ? 'saathi' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('home')}
            className="flex-1 mx-1"
          >
            होम
          </Button>
          <Button
            variant={activeTab === 'cart' ? 'saathi' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('cart')}
            className="flex-1 mx-1 relative"
          >
            कार्ट
            {getItemCount() > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 bg-destructive">
                {getItemCount()}
              </Badge>
            )}
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'saathi' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('orders')}
            className="flex-1 mx-1"
          >
            ऑर्डर
          </Button>
        </div>
      </div>
    </div>
  );
};