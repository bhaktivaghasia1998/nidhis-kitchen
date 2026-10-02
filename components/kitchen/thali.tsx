// A photo of a full Gujarati thali, in a tilted photo frame,
// with steam rising from it and whole spices floating around it.
import Spices from './spices';
import { asset } from '@/lib/recipes';

// Three wavy lines of steam. Each one rises and fades at a different time.
function Steam() {
  return (
    <svg className="steam pointer-events-none absolute bottom-[92%] left-1/2 h-[34%] w-[40%] -translate-x-1/2" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      {[30, 60, 90].map((x, i) => (
        <path
          key={x}
          d={`M${x} 115 C ${x - 14} 95, ${x + 14} 80, ${x} 60 S ${x - 12} 25, ${x + 4} 5`}
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}
    </svg>
  );
}

export default function Thali() {
  return (
    <div className="relative mx-auto w-[min(100%,360px)] md:w-[min(100%,520px)] 2xl:w-[min(100%,640px)]">
      <Spices />
      <div className="thali-spin overflow-hidden rounded-[28px] border-[6px] border-leaf-foreground bg-leaf-foreground shadow-[0_30px_50px_-20px_rgba(0,0,0,.55)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/photos/gujarati-thali.jpg')}
          alt="A full Gujarati thali with rotli, puri, rice, dal, kadhi, shaak, farsan and sweets in steel katoris"
          className="block aspect-[900/679] w-full object-cover"
        />
      </div>
      <span className="absolute -top-[9%] right-[2%] rotate-6 font-hand text-2xl font-bold whitespace-nowrap">today&apos;s lunch!</span>
      <span className="absolute -bottom-[11%] left-[0%] -rotate-[5deg] font-hand text-2xl font-bold whitespace-nowrap">Gujarati thali ↗</span>
      <Steam />
    </div>
  );
}
