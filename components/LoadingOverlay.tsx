"use client";

import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay = ({
  isVisible,
  message = "Processing your book...",
}: LoadingOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-card">
        <div className="loading-shadow">
          <Loader2 className="loading-animation w-12 h-12 text-[#663820]" />
          <h3 className="loading-title">{message}</h3>
          <div className="loading-progress">
            <div className="loading-progress-item">
              <span className="loading-progress-status" />
              <span className="text-[#3d485e]">Analyzing PDF...</span>
            </div>
            <div className="loading-progress-item">
              <span className="loading-progress-status" />
              <span className="text-[#3d485e]">Generating cover...</span>
            </div>
            <div className="loading-progress-item">
              <span className="loading-progress-status" />
              <span className="text-[#3d485e]">Preparing synthesis...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
