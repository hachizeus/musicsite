import React from 'react';
import { Download, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800'}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <p className="text-lg font-bold text-blue-600 mt-2">${product.price}</p>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                <ShoppingCart className="inline-block mr-2" size={20} />
                Buy Now
              </button>
              <a
                href={product.downloadUrl}
                download={product.name}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Download size={20} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}