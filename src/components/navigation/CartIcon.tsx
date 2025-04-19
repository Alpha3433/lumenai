
import React from 'react';
import { Link } from 'react-router-dom';
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
  const { items, total } = useCart();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {items.length}
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
                    <span className="font-medium">{item.name}</span>
                    <span>${(item.price / 100).toFixed(2)}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.description}</span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${(total / 100).toFixed(2)}</span>
              </div>
              <Link to="/checkout">
                <Button className="w-full">
                  Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartIcon;

