import React, { useState } from "react";
import { useEffect } from "react";

interface VideoPlayerProps {
  url: string;
  className?: string;
}

function VideoPlayer({ url, className = "w-full" }: VideoPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playPause = (): void => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full relative">
      <video
        src={url}
        onClick={playPause}
        controls={true}
        className={className}
      />
    </div>
  );
}

export default VideoPlayer;