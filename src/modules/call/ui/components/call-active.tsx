"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CallControls,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

interface Props {
  onLeave: () => void;
  onEnd: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, onEnd, meetingName }: Props) => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const participantCount = participants.length;
  const [isMobile, setIsMobile] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 backdrop-blur-xl bg-slate-950/40 border-b border-white/5">
        <div className="px-4 py-3">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between">
            <Link href="/" className="group flex items-center justify-center p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
              <Image src="/logo.svg" alt="logo" width={28} height={28} />
            </Link>

            <div className="flex-1 mx-4">
              <h1 className="text-xl font-bold truncate bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                {meetingName}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium"
              >
                👥 {participantCount}
              </button>
              <button
                onClick={onEnd}
                className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-sm font-medium"
              >
                End
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Link href="/" className="group p-1.5 bg-white/5 rounded-lg">
                <Image src="/logo.svg" alt="logo" width={24} height={24} />
              </Link>
              <h1 className="text-base font-bold truncate flex-1 mx-2 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {meetingName}
              </h1>
              <button
                onClick={onEnd}
                className="text-red-400 text-sm font-medium px-2 py-1"
              >
                End
              </button>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {participantCount} people
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          top: isMobile ? "7rem" : "5.5rem",
          bottom: isMobile ? "5.5rem" : "6rem",
          right: isMobile || !showParticipants ? 0 : "14rem",
        }}
      >
        <div className="w-full h-full px-2 md:px-4 py-2 flex items-center justify-center">
          <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl ring-1 ring-white/10 bg-black/40 backdrop-blur-md">
            <SpeakerLayout />
          </div>
        </div>
      </div>

      {/* Participants Panel - Slide in on mobile, static on desktop */}
      {showParticipants && (
        <div
          className={`absolute z-20 backdrop-blur-xl bg-slate-950/60 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
            isMobile
              ? "inset-x-4 bottom-24 h-48"
              : "right-4 top-24 bottom-24 w-48"
          }`}
        >
          <div className="p-3 md:p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs md:text-sm font-semibold text-white/70 uppercase tracking-wider">
                Participants
              </h3>
              {!isMobile && (
                <button
                  onClick={() => setShowParticipants(false)}
                  className="text-white/50 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="space-y-2 max-h-32 md:max-h-none overflow-y-auto pr-1">
              {participants.map((participant, index) => (
                <div
                  key={participant.userId || index}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] md:text-xs font-bold text-white">
                      {participant.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <span className="text-[11px] md:text-xs font-medium text-white/85 truncate">
                    {participant.name || "Participant"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 backdrop-blur-xl bg-gradient-to-t from-slate-950/80 to-slate-950/40 border-t border-white/5">
        <div className="flex items-center justify-center py-3 px-3 gap-3">
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-full border border-white/10 p-3 shadow-xl">
            <div className="flex justify-center gap-2 md:gap-4 [&>button]:w-12 md:[&>button]:w-14 [&>button]:h-12 md:[&>button]:h-14 [&>button]:rounded-full [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:bg-white/10 [&>button]:backdrop-blur-md [&>button]:text-white [&>button]:transition-all [&>button]:duration-200 hover:[&>button]:bg-white/20">
              <CallControls onLeave={onLeave} />
            </div>
          </div>

          <button
            onClick={onLeave}
            className="px-4 py-2.5 text-xs md:text-sm rounded-full bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-medium whitespace-nowrap"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};