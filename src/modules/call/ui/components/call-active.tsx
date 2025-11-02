"use client";
import Link from "next/link";
import Image from "next/image";
import {
    CallControls,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk"


interface Props {
    onEnd: () => void;
    meetingName: string;
    onLeave: () => void;
};

export const CallActive = ({onEnd, onLeave, meetingName}: Props) => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const participantCount = participants.length;
     return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Cosmic ambient glow */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 -left-1/4 w-[700px] h-[700px] bg-indigo-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 -right-1/4 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[100px]"></div>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between backdrop-blur-sm bg-black/30">
        <Link href="/" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <Image src="/logo.svg" alt="logo" width={28} height={28} />
        </Link>

        <div className="text-center flex-1 mx-3">
          <h1 className="text-base font-bold truncate max-w-[160px] bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {meetingName}
          </h1>
          <div className="mt-1 flex justify-center items-center text-xs text-emerald-400 font-medium">
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
              Live • {participantCount} {participantCount === 1 ? "person" : "people"}
            </span>
          </div>
        </div>

        <button
          onClick={onEnd}
          className="p-2 rounded-xl bg-red-500/20 border border-red-500/30 text-white hover:bg-red-500/30 active:scale-95 transition-all"
          aria-label="End meeting"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Video stage — spacious and adaptive */}
      <div className="absolute inset-0 pt-20 pb-24 px-3 flex items-center justify-center">
        <div className="w-full max-w-4xl h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black/20 backdrop-blur-sm">
          <SpeakerLayout />
        </div>
      </div>

      {/* Control deck */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-[92%] max-w-md">
        <div className="bg-black/50 backdrop-blur-2xl rounded-3xl border border-white/10 p-3.5 shadow-2xl">
          <div className="flex justify-center gap-3 [&>button]:w-14 [&>button]:h-14 sm:[&>button]:w-16 sm:[&>button]:h-16 [&>button]:rounded-2xl [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:bg-white/10 [&>button]:backdrop-blur-xl [&>button]:text-white [&>button]:transition-all [&>button]:active:scale-95 hover:[&>button]:bg-white/20">
            <CallControls onLeave={onLeave} />
          </div>
        </div>
      </div>
    </div>
  );
}