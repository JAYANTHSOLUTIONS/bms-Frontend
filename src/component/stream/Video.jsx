import React from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

export default function Video() {
  const { urlid } = useParams();

  // Decode and trim to remove any hidden whitespace/newlines
  const decodedUrl = decodeURIComponent(urlid).trim();

  const extractId = (input) => {
    // This regex is strict and handles standard, short, and embed links
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = input.match(regExp);
    
    const id = (match && match[1].length === 11) ? match[1] : input;
    
    // Final safety check: if the result still looks like a URL, return null 
    // to prevent the widgetapi error
    return id.length === 11 ? id : null;
  };

  const finalVideoId = extractId(decodedUrl);

  const opts = {
    height: '600', // Note: height/width in opts usually take numbers/strings without 'px'
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
    },
  };

  // If no valid ID is found, show an error state instead of breaking the widget
  if (!finalVideoId) {
    return (
      <div className="bg-dark vh-100 d-flex align-items-center justify-content-center text-white">
        <h3>Error: Could not load video ID. URL provided: {decodedUrl}</h3>
      </div>
    );
  }

  return (
  /* vh-100 makes the black background fill the whole screen */
  <div className="video-page bg-dark vh-100 d-flex align-items-center justify-content-center overflow-hidden">
    
    {/* This container determines how wide the video gets. 
        Change 'container-fluid' to 'container' if you want side margins. */}
    <div className="container-fluid p-0 h-100">
      <YouTube 
        videoId={finalVideoId} 
        opts={opts} 
        // iframeClassName is the trick to styling the actual video element
        iframeClassName="vh-100 w-100" 
        className="h-100 w-100"
        onReady={() => console.log("Ready to play!")} 
      />
    </div>

  </div>
);
}