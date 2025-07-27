    interface TrailerProps {
  videoUrl: string; 
}

// utility to extract YouTube video ID from various URL formats
const getYouTubeID = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function Trailer({ videoUrl }: TrailerProps) {
  const videoId = getYouTubeID(videoUrl);

  if (!videoId) {
    return <div className="text-red-500">Invalid YouTube URL provided.</div>;
  }
  
  return (
    <div className="w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
}