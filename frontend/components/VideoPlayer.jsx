"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { IoVolumeMedium } from "react-icons/io5";
import { BsFillVolumeMuteFill } from "react-icons/bs";

export default function VideoPlayer({
  src,
  width = "100%",
  aspectRatio = "16/9",
  scale = 1,
  className = "",
  autoPlay = false // added autoplay toggle
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimeoutRef = useRef(null);

  // Show controls on mouse move and hide after inactivity
  const handleMouseMove = () => {
    setControlsVisible(true);
    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Sync playing state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => setPlaying(false);
    const handleLoadedMetadata = () => setDuration(video.duration || 0);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / dur) * 100);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const dur = videoRef.current.duration || 1;
    const newTime = (clickX / rect.width) * dur;
    videoRef.current.currentTime = newTime;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setMuted(vol === 0);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        position: "relative",
      }}
    >
      <div
        className={`relative w-full rounded-xl overflow-hidden shadow-lg bg-black aspect-[${aspectRatio}]`}
      >
        <video
          ref={videoRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          className="relative top-0 left-0 w-full h-full object-cover"
          controls={false}
          autoPlay={autoPlay}
          tabIndex={0}
        />

        {/* Play overlay */}
        {
          <button
            onClick={togglePlay}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#222222c7] text-white rounded-full p-4 focus:outline-none ${controlsVisible ? "opacity-100" : "opacity-0"}`}
          >
            {playing ? <FaPause size={24} className="drop-shadow-md"/>  :  <FaPlay size={24} className="drop-shadow-md"/>}
          </button>
        }

        {/* Controls bar */}
        <div
          className={`absolute flex items-center w-full px-3 py-3 bg-[#5555557a] bottom-0 space-x-4 text-white transition-opacity duration-300 ${
            controlsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="p-2 bg-white hover:text-white transition text-secondary-medium hover:bg-secondary-medium rounded-lg text-sm items-center"
          >
            {playing ? <FaPause size={24} className="drop-shadow-md"/> : <FaPlay size={24} className="drop-shadow-md"/>}
          </button>

          {/* Seek */}
          <div
            onClick={handleSeek}
            className="relative flex-1 h-2 bg-gray-200 rounded cursor-pointer"
          >
            <div
              className="absolute top-0 left-0 h-2 bg-secondary rounded"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Time */}
          <span className="text-xs w-20 text-right">
            {formatTime(currentTime)} | {formatTime(duration)}
          </span>

          {/* Volume */}
          <button
            onClick={toggleMute}
            className="p-2 bg-white hover:text-white transition text-secondary-medium hover:bg-secondary-medium rounded-lg"
          >
            {muted ? <BsFillVolumeMuteFill size={24} className="drop-shadow-md"/> : <IoVolumeMedium size={24} className="drop-shadow-md"/>}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 text-secondary"
          />

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="px-2 py-1 bg-gray-700 hover:bg-gray-800 rounded"
          >
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
}
