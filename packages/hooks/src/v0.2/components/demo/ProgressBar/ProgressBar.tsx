import React from 'react';
import { useRef } from 'react';
import { useRAF } from '../hooks/use-raf.hook';
import { PROGRESS_BAR_STYLE } from './ProgressBar.constants';

export interface ProgressBarProps {
  start: number;
  duration: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ start, duration }) => {
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useRAF(() => {
    const progressBar = progressBarRef.current;

    if (!progressBar) return;

    const end = start + duration;
    const progress = (end - Date.now()) / duration;
    const progressPercent = 100 * Math.min(1, 1 - progress);

    progressBar.style.width = `${progressPercent}%`;

    if (progressPercent === 100) {
      progressBar.style.setProperty('--progressBarAccent', '#000');
    } else if (progressPercent > 95) {
      progressBar.style.setProperty('--progressBarAccent', '#F00');
    } else if (progressPercent < 1) {
      progressBar.style.setProperty('--progressBarAccent', '#4569D4');
    }
  }, !!start);

  return <div style={PROGRESS_BAR_STYLE} ref={progressBarRef}></div>;
};
