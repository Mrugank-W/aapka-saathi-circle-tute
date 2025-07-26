import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Smartphone, 
  Building2, 
  Recycle, 
  TrendingUp,
  Users,
  Leaf,
  Coins
} from 'lucide-react';
import heroImage from '@/assets/hero-circular-economy.jpg';

interface LandingPageProps {
  onSelectApp: (app: 'vendor' | 'mfc') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectApp }) => {
  const features = [
    {
      icon: <Coins className="h-6 w-6" />,
      title: "Saathi Credit System",
      description: "Replace exploitative udhaar with transparent credit system"
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Waste to Wealth",
      description: "Turn organic waste into valuable credits - ₹5 per kg"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "15% Profit Increase",
      description: "Reduce costs and increase margins through circular economy"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Time Savings",
      description: "Save 15+ hours per week with direct procurement"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-vendor-success/5 to-secondary/5" />
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            {/* Logo and Title */}
            <div className="space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <img src={heroImage} alt="Aapka Saathi" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-vendor-success to-secondary bg-clip-text text-transparent">
                  आपका साथी
                </h1>
                <h2 className="text-2xl font-semibold text-muted-foreground mt-2">
                  Aapka Saathi
                </h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                  India's First Two-Way Circular Economy Platform for Street Food Vendors
                </p>
              </div>
            </div>

            {/* Problem Statement */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto shadow-lg border">
              <h3 className="text-xl font-semibold mb-4">Solving the Double Loss Problem</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">3 Hours</div>
                  <p className="text-sm text-muted-foreground">Lost daily at wholesale markets</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">15%</div>
                  <p className="text-sm text-muted-foreground">Income lost to food waste</p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, idx) => (
                <Card key={idx} className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App Selection Section */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience Both Sides of the Platform</h2>
          <p className="text-muted-foreground">
            See how our circular economy works from both vendor and management perspectives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vendor App */}
          <Card className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary/20">
            <CardHeader className="bg-gradient-to-br from-primary/10 to-vendor-success/10">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl">Vendor App</h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    For Street Food Vendors
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-saathi-credit/10 text-saathi-credit border-saathi-credit/30">
                    <Coins className="h-3 w-3 mr-1" />
                    Saathi Credits
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-waste-credit/10 text-waste-credit border-waste-credit/30">
                    <Leaf className="h-3 w-3 mr-1" />
                    Waste Credits
                  </Badge>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Hindi language interface (हिंदी में)</li>
                <li>• Visual-first product selection</li>
                <li>• Transparent credit balance</li>
                <li>• One-tap ordering system</li>
                <li>• Real-time order tracking</li>
                <li>• Waste credit earnings history</li>
              </ul>

              <Button 
                onClick={() => onSelectApp('vendor')}
                variant="saathi" 
                size="lg" 
                className="w-full"
              >
                Try Vendor App
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <div className="text-xs text-center text-muted-foreground">
                Demo login: Any 6-digit OTP
              </div>
            </CardContent>
          </Card>

          {/* MFC Dashboard */}
          <Card className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-secondary/20">
            <CardHeader className="bg-gradient-to-br from-secondary/10 to-waste-credit/10">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-secondary/20 rounded-full">
                  <Building2 className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl">MFC Dashboard</h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    For Managers & Drivers
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    Manager View
                  </Badge>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                    Driver App
                  </Badge>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Real-time order management</li>
                <li>• Aggregate procurement lists</li>
                <li>• Driver delivery tracking</li>
                <li>• Waste pickup logging</li>
                <li>• Instant credit generation</li>
                <li>• Revenue analytics</li>
              </ul>

              <Button 
                onClick={() => onSelectApp('mfc')}
                variant="default" 
                size="lg" 
                className="w-full"
              >
                Try MFC Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <div className="text-xs text-center text-muted-foreground">
                Demo: Manager or Driver access
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Circular Economy Visualization */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/5 via-vendor-success/5 to-secondary/5 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">The Circular Economy Loop</h3>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Fresh Produce Delivery</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-waste-credit rounded-full"></div>
                  <span>Waste Collection</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-vendor-success rounded-full"></div>
                  <span>Credit Generation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};