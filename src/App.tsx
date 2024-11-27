import React, { useState } from 'react';
import { Music, Package } from 'lucide-react';
import { Track, Product } from './types';
import { UploadForm } from './components/UploadForm';
import { TrackList } from './components/TrackList';
import { ProductList } from './components/ProductList';

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'music' | 'products'>('music');

  const handleUpload = (item: Track | Product) => {
    if ('artist' in item) {
      setTracks([...tracks, item]);
    } else {
      setProducts([...products, item]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Music className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold">MusicShare</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('music')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'music'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Music className="mr-2" size={20} />
            Music
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Package className="mr-2" size={20} />
            Products
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Upload {activeTab === 'music' ? 'Music' : 'Products'}
          </h2>
          <UploadForm
            onUpload={handleUpload}
            type={activeTab === 'music' ? 'track' : 'product'}
          />
        </div>

        <div className="mt-8">
          {activeTab === 'music' ? (
            <TrackList tracks={tracks} />
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;