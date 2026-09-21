import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      quote: "The brass weight bar completely removes high frequency table ping. The Morandi linear switch sound is exceptionally deep and satisfying.",
      author: "Julian Thorne",
      role: "Audio Engineer & Sound Designer",
      verified: true
    },
    {
      quote: "Configuring the 3D model with exploded layers gave me total confidence in the internal gasket stack before purchasing.",
      author: "Elena Rostova",
      role: "Principal Product Designer",
      verified: true
    },
    {
      quote: "The electrophoretic white finish on the Cipher65 feels like smooth ceramic stone. The best typing instrument on my desk.",
      author: "Marcus Chen",
      role: "Systems Architect",
      verified: true
    }
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#070709]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              Community Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Trusted by Typists and Audio Artisans
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>4.95 / 5.0 Average Across 480+ Commissions</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#101116] border border-white/5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star key={starIdx} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <span>{r.author}</span>
                  {r.verified && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Verified Owner" />
                  )}
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                  {r.role}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
