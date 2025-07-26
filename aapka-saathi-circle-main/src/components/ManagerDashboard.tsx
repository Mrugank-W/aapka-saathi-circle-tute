import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  Truck,
  TrendingUp,
  Users,
  Package,
  LogOut
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Order {
  orderId: string;
  vendorName: string;
  vendorStall: string;
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  totalCost: number;
  status: 'pending' | 'confirmed' | 'assigned' | 'delivered';
  timestamp: string;
  driverId?: string;
}

interface ManagerDashboardProps {
  onLogout: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ onLogout }) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      orderId: 'ORD-001',
      vendorName: 'राजू कुमार',
      vendorStall: 'राजू के छोले भटूरे',
      items: [
        { name: 'प्याज', quantity: 5, unit: 'kg' },
        { name: 'टमाटर', quantity: 3, unit: 'kg' }
      ],
      totalCost: 215,
      status: 'pending',
      timestamp: '10:30 AM'
    },
    {
      orderId: 'ORD-002',
      vendorName: 'सुनीता देवी',
      vendorStall: 'सुनीता की चाट',
      items: [
        { name: 'आलू', quantity: 10, unit: 'kg' },
        { name: 'हरी सब्जी', quantity: 2, unit: 'bundle' }
      ],
      totalCost: 210,
      status: 'confirmed',
      timestamp: '10:15 AM'
    }
  ]);

  const [aggregateList, setAggregateList] = useState([
    { item: 'प्याज', totalQuantity: 25, unit: 'kg' },
    { item: 'टमाटर', totalQuantity: 18, unit: 'kg' },
    { item: 'आलू', totalQuantity: 30, unit: 'kg' },
    { item: 'हरी सब्जी', totalQuantity: 8, unit: 'bundle' }
  ]);

  const { toast } = useToast();

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(current =>
      current.map(order =>
        order.orderId === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'assigned': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusAction = (order: Order) => {
    switch (order.status) {
      case 'pending':
        return (
          <Button
            size="sm"
            variant="default"
            onClick={() => updateOrderStatus(order.orderId, 'confirmed')}
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirm
          </Button>
        );
      case 'confirmed':
        return (
          <Button
            size="sm"
            variant="saathi"
            onClick={() => updateOrderStatus(order.orderId, 'assigned')}
          >
            <Truck className="h-3 w-3 mr-1" />
            Assign Driver
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manager Dashboard</h1>
          <p className="text-muted-foreground">Aapka Saathi - MFC Operations</p>
        </div>
        <Button variant="ghost" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">New Orders</p>
                <p className="text-2xl font-bold text-blue-700">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500 rounded-full">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-yellow-600">Processing</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {orders.filter(o => ['confirmed', 'assigned'].includes(o.status)).length}
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
                <p className="text-sm text-green-600">Delivered</p>
                <p className="text-2xl font-bold text-green-700">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500 rounded-full">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-700">₹{orders.reduce((sum, o) => sum + o.totalCost, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Orders Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Live Orders Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {orders.map((order) => (
                <div key={order.orderId} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{order.vendorName}</p>
                      <p className="text-sm text-muted-foreground">{order.vendorStall}</p>
                      <p className="text-xs text-muted-foreground">{order.timestamp}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Items:</p>
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        • {item.name} - {item.quantity} {item.unit}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-semibold">₹{order.totalCost}</p>
                    {getStatusAction(order)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Aggregate Procurement List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Aggregate Procurement List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aggregateList.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">{item.item}</span>
                  <span className="text-lg font-bold text-primary">
                    {item.totalQuantity} {item.unit}
                  </span>
                </div>
              ))}
            </div>

            <Button variant="hero" className="w-full mt-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Purchase Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};