import React from 'react';
import { Download } from 'lucide-react';
import { Track } from '../types';
import { AudioPlayer } from './AudioPlayer';

interface TrackListProps {
  tracks: Track[];
}

export function TrackList({ tracks }: TrackListProps) {
  return (
    <div className="space-y-4">
      {tracks.map((track) => (
        <div key={track.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{track.title}</h3>
              <p className="text-sm text-gray-600">{track.artist}</p>
            </div>
            <a
              href={track.url}
              download={track.title}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Download size={20} />
            </a>
          </div>
          <AudioPlayer url={track.url} title={track.title} />
        </div>
      ))}
    </div>
  );
}