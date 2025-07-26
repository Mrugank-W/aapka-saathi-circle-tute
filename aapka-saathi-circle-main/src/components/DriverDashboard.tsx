import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  MapPin, 
  Recycle, 
  CheckCircle, 
  LogOut,
  Scale,
  Coins
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Delivery {
  orderId: string;
  vendorName: string;
  vendorStall: string;
  address: string;
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  status: 'assigned' | 'delivered';
}

interface DriverDashboardProps {
  onLogout: () => void;
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({ onLogout }) => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      orderId: 'ORD-002',
      vendorName: 'सुनीता देवी',
      vendorStall: 'सुनीता की चाट',
      address: 'सेक्टर 15, गुड़गांव',
      items: [
        { name: 'आलू', quantity: 10, unit: 'kg' },
        { name: 'हरी सब्जी', quantity: 2, unit: 'bundle' }
      ],
      status: 'assigned'
    }
  ]);

  const [wastePickupForm, setWastePickupForm] = useState({
    vendorId: '',
    vendorName: '',
    wasteWeight: ''
  });

  const [showWasteForm, setShowWasteForm] = useState(false);
  const { toast } = useToast();

  const markAsDelivered = (orderId: string) => {
    setDeliveries(current =>
      current.map(delivery =>
        delivery.orderId === orderId
          ? { ...delivery, status: 'delivered' }
          : delivery
      )
    );

    toast({
      title: "Delivery Completed",
      description: `Order ${orderId} marked as delivered`,
    });
  };

  const logWastePickup = () => {
    const wasteWeight = parseFloat(wastePickupForm.wasteWeight);
    if (!wasteWeight || wasteWeight <= 0) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a valid waste weight",
        variant: "destructive",
      });
      return;
    }

    // Calculate credits earned (₹5 per kg)
    const creditsEarned = wasteWeight * 5;

    // Simulate Firebase Cloud Function trigger
    toast({
      title: "🌱 Waste Pickup Logged Successfully!",
      description: `${wasteWeight} kg waste collected. ₹${creditsEarned} credits added to ${wastePickupForm.vendorName}'s account.`,
    });

    // Show success notification for vendor
    setTimeout(() => {
      toast({
        title: "Vendor Notification Sent",
        description: `${wastePickupForm.vendorName} has been notified about their new waste credits!`,
      });
    }, 2000);

    // Reset form
    setWastePickupForm({
      vendorId: '',
      vendorName: '',
      wasteWeight: ''
    });
    setShowWasteForm(false);
  };

  const vendorOptions = [
    { id: 'vendor1', name: 'राजू कुमार - राजू के छोले भटूरे' },
    { id: 'vendor2', name: 'सुनीता देवी - सुनीता की चाट' },
    { id: 'vendor3', name: 'मोहन सिंह - मोहन के समोसे' }
  ];

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Driver Dashboard</h1>
          <p className="text-muted-foreground">Aapka Saathi - Delivery & Waste Collection</p>
        </div>
        <Button variant="ghost" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Assigned Deliveries</p>
                <p className="text-2xl font-bold text-blue-700">
                  {deliveries.filter(d => d.status === 'assigned').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-full">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Completed Today</p>
                <p className="text-2xl font-bold text-green-700">
                  {deliveries.filter(d => d.status === 'delivered').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-waste-credit/20 to-waste-credit/10 border-waste-credit/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-waste-credit rounded-full">
                <Recycle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-waste-credit">Waste Credits Generated</p>
                <p className="text-2xl font-bold text-waste-credit">₹125</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Assigned Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveries.length === 0 ? (
                <div className="text-center py-8">
                  <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No deliveries assigned</p>
                </div>
              ) : (
                deliveries.map((delivery) => (
                  <div key={delivery.orderId} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{delivery.vendorName}</p>
                        <p className="text-sm text-muted-foreground">{delivery.vendorStall}</p>
                      </div>
                      <Badge 
                        className={delivery.status === 'delivered' 
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                        }
                      >
                        {delivery.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {delivery.address}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Items:</p>
                      {delivery.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          • {item.name} - {item.quantity} {item.unit}
                        </p>
                      ))}
                    </div>

                    {delivery.status === 'assigned' && (
                      <Button
                        onClick={() => markAsDelivered(delivery.orderId)}
                        variant="default"
                        size="sm"
                        className="w-full"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Delivered
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Waste Pickup Section - THE MAGIC FEATURE */}
        <Card className="border-waste-credit/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-waste-credit">
              <Recycle className="h-5 w-5" />
              Waste Collection & Credit Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showWasteForm ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-waste-credit/20 rounded-full flex items-center justify-center">
                  <Recycle className="h-8 w-8 text-waste-credit" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Circular Economy in Action</h3>
                  <p className="text-muted-foreground text-sm">
                    Turn vendor waste into valuable credits. Every kg of organic waste = ₹5 in vendor credits.
                  </p>
                </div>
                <Button
                  onClick={() => setShowWasteForm(true)}
                  variant="waste"
                  size="lg"
                  className="w-full"
                >
                  <Scale className="h-4 w-4 mr-2" />
                  Log Waste Pickup
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Vendor
                  </label>
                  <select
                    className="w-full p-3 border rounded-md bg-background"
                    value={wastePickupForm.vendorId}
                    onChange={(e) => {
                      const selectedVendor = vendorOptions.find(v => v.id === e.target.value);
                      setWastePickupForm({
                        ...wastePickupForm,
                        vendorId: e.target.value,
                        vendorName: selectedVendor ? selectedVendor.name : ''
                      });
                    }}
                  >
                    <option value="">Choose a vendor...</option>
                    {vendorOptions.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Waste Weight (kg)
                  </label>
                  <Input
                    type="number"
                    placeholder="3.5"
                    value={wastePickupForm.wasteWeight}
                    onChange={(e) => setWastePickupForm({
                      ...wastePickupForm,
                      wasteWeight: e.target.value
                    })}
                    className="text-lg h-12"
                    step="0.1"
                  />
                </div>

                {wastePickupForm.wasteWeight && (
                  <div className="p-3 bg-vendor-success/10 rounded-lg border border-vendor-success/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Credits to be earned:</span>
                      <span className="text-lg font-bold text-vendor-success">
                        ₹{(parseFloat(wastePickupForm.wasteWeight) * 5).toFixed(0)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowWasteForm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={logWastePickup}
                    variant="waste"
                    className="flex-1"
                    disabled={!wastePickupForm.vendorId || !wastePickupForm.wasteWeight}
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Generate Credits
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};