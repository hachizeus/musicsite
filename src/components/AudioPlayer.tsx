import React, { useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  url: string;
  title: string;
}

export function AudioPlayer({ url, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <audio ref={audioRef} src={url} className="hidden" />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <SkipForward size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Volume2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}