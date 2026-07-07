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
    <div className="mb-8">

      <div className="flex justify-between mb-2">
        <span>Time Left</span>
        <span>{time}s</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-3">

        <motion.div
            animate={{
                width: `${(time / 20) * 100}%`,
            }}
            transition={{ duration: 1 }}
            className={`h-3 rounded-full ${
              time > 10
                ? "bg-green-500"
                : time > 5
                ? "bg-yellow-400"
                : "bg-red-500"
            }`}
        />

      </div>

    </div>
  );
}

export default Timer;