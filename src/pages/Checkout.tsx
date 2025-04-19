
import React from 'react';
import { useCart } from '@/hooks/useCart';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';

const Checkout = () => {
  const { items, total } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b last:border-0">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <span className="font-medium">${(item.price / 100).toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">${(total / 100).toFixed(2)}</span>
          </CardFooter>
        </Card>
        
        <Button size="lg" className="w-full">
          Complete Purchase
        </Button>
      </div>
    </div>
  );
};

export default Checkout;

