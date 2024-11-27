export interface Track {
  id: string;
  title: string;
  artist: string;
  type: 'track' | 'mix';
  file: File | null;
  url: string;
  uploadDate: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  downloadUrl: string;
}