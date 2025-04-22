
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const CartIcon = () => {
  const { items, total, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  // Handler: go to checkout (to Stripe; you likely need to call a function/edge function)
  const handleCheckout = async () => {
    // You likely want to call an edge function here with the items in the cart
    // For now, just navigate to the checkout page; implement actual logic as needed.
    navigate('/checkout');
  };

  // Calculate cart count (sum of item quantities)
  const cartCount = items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-semibold p-4">Shopping Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-auto">
              {items.map((item) => (
                <DropdownMenuItem key={item.id} className="flex flex-col p-4">
                  <div className="flex justify-between w-full">
                    <span className="font-medium">{item.name} {item.quantity && item.quantity > 1 ? `x${item.quantity}` : ''}</span>
                    <span>${((item.price * (item.quantity ?? 1)) / 100).toFixed(2)}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.description}</span>
                  <button
                    className="text-xs text-red-600 mt-1 hover:underline self-end"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${(total / 100).toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
              <button
                className="block w-full mt-2 text-xs text-gray-500 hover:underline text-center"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartIcon;
