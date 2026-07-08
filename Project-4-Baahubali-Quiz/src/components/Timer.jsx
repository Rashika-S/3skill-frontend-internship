import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Timer({ currentQuestion, onTimeUp }) {
  const [time, setTime] = useState(20);

  useEffect(() => {
    setTime(20);
  }, [currentQuestion]);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeUp]);

    return (
        <div className="flex justify-center mb-8">

            <div className="relative w-24 h-24">

            <svg className="w-24 h-24 rotate-\[-90deg]\">

                <circle
                cx="48"
                cy="48"
                r="42"
                stroke="#444"
                strokeWidth="8"
                fill="none"
                />

                <motion.circle
                cx="48"
                cy="48"
                r="42"
                stroke={
                    time > 10
                    ? "#22c55e"
                    : time > 5
                    ? "#facc15"
                    : "#ef4444"
                }
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={264}
                animate={{
                    strokeDashoffset: 264 - (time / 20) * 264,
                }}
                transition={{ duration: 1 }}
                />

            </svg>

            <div className="absolute inset-0 flex items-center justify-center">

                <span
                className={`text-3xl font-bold ${
                    time > 10
                    ? "text-green-400"
                    : time > 5
                    ? "text-yellow-400"
                    : "text-red-400 animate-pulse"
                }`}
                >
                {time}
                </span>

            </div>

            </div>

        </div>
    );
}

export default Timer;