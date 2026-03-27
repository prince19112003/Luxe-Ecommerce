import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = targetDate || new Date(Date.now() + 8 * 60 * 60 * 1000);
    const tick = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) { setTimeLeft({ hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5">
      {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((unit, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="countdown-digit w-9 h-9 flex items-center justify-center text-sm rounded-lg">
            {unit}
          </div>
          {i < 2 && <span className="text-white font-black text-sm">:</span>}
        </div>
      ))}
    </div>
  );
}
