import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: "LOG-082",
      quote: "The solid brass weight bar completely removes high-frequency chassis reverberation. The Morandi linear acoustic curve is exceptionally deep and clean.",
      author: "Julian Thorne",
      role: "Acoustic Engineer & Sound Designer",
      specimen: "AXIS-65 AL // MORANDI LINEAR"
    },
    {
      id: "LOG-114",
      quote: "Configuring the 3D model with exploded layers gave me total confidence in the internal gasket stack and poron tolerances before commissioning.",
      author: "Elena Rostova",
      role: "Principal Product Designer",
      specimen: "GHOST-65 // FR4 PLATE"
    },
    {
      id: "LOG-237",
      quote: "The electrophoretic white finish on the Cipher65 feels like smooth ceramic stone. The tightest machining tolerances on any keyboard in my studio.",
      author: "Marcus Chen",
      role: "Systems Architect",
      specimen: "CIPHER-75 // E-WHITE FINISH"
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Technical Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[10.5px] font-mono text-zinc-700 uppercase tracking-widest">
              <span>SHEET 04 // FIELD REPORTS</span>
              <span className="h-2 w-2 bg-zinc-300 rounded-full" />
              <span>COMMISSION VERIFICATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-zinc-900 tracking-tight mt-1.5">
              Verified by engineers, sound designers, and architects.
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-600 bg-[#fafaf9] border border-zinc-200 px-3.5 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>4.95 / 5.0 RATING ACROSS 480 COMMISSIONS</span>
          </div>
        </div>

        {/* Technical Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-6 border border-zinc-200 bg-[#fafaf9] flex flex-col justify-between relative group hover:border-zinc-400 transition-colors"
            >
              {/* Top report header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-700 border-b border-zinc-200 pb-2">
                  <span>{r.id}</span>
                  <span className="flex items-center gap-1 text-zinc-700">
                    <CheckCircle2 className="w-3 h-3 text-zinc-700" />
                    VERIFIED OWNER
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-normal">
                  "{r.quote}"
                </p>
              </div>

              {/* Bottom spec and author footer */}
              <div className="pt-6 mt-6 border-t border-zinc-200 space-y-2">
                <div>
                  <div className="text-xs font-medium text-zinc-900">
                    {r.author}
                  </div>
                  <div className="text-[10.5px] text-zinc-500 font-mono">
                    {r.role}
                  </div>
                </div>
                <div className="text-[9.5px] font-mono text-zinc-700 pt-1">
                  SPECIMEN: {r.specimen}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Blueprint Footer Annotation */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-700 border-t border-zinc-200">
          <span>ALL COMMISSIONS ARE MANUFACTURED TO ORDER IN LOW-VOLUME RUNS</span>
          <span>QUALITY AUDIT COMPLIANT ISO 9001 TOLERANCE STANDARDS</span>
        </div>

      </div>
    </section>
  );
};
