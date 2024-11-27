import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Track, Product } from '../types';

interface UploadFormProps {
  onUpload: (item: Track | Product) => void;
  type: 'track' | 'mix' | 'product';
}

export function UploadForm({ onUpload, type }: UploadFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const item = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      file,
      url: URL.createObjectURL(file),
      uploadDate: new Date().toISOString(),
      ...(type === 'product' ? {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        image: formData.get('image') as string,
        downloadUrl: URL.createObjectURL(file),
      } : {
        artist: formData.get('artist') as string,
        type: type as 'track' | 'mix',
      })
    };

    onUpload(item as Track | Product);
    setFile(null);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onDragEnter={handleDrag}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your file here, or click to select
        </p>
        {file && (
          <p className="mt-2 text-sm text-green-600">
            Selected: {file.name}
          </p>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {type === 'product' ? (
          <>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Product Description"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="title"
              placeholder="Track Title"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="artist"
              placeholder="Artist Name"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </>
        )}
        <button
          type="submit"
          disabled={!file}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Upload {type === 'product' ? 'Product' : 'Track'}
        </button>
      </div>
    </form>
  );
}