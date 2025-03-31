import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSplotch } from "react-icons/fa";

const Stars: FC = () => {
  const [isActive, setIsActive] = useState(false);
  const snowflakes = Array(20).fill(0); // Увеличил количество звезд

  // Автоматическая анимация каждые 20 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 10000); // Анимация длится 3 секунды
    }, 5000); // Повтор каждые 20 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Чтобы не перекрывать клики по другим элементам
        zIndex: 1000,
      }}
    >
      <AnimatePresence>
        {isActive &&
          snowflakes.map((_, i) => (
            <motion.div
              key={`star-${i}`}
              initial={{
                opacity: 0,
                y: -10,
                x: Math.random() * window.innerWidth,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, window.innerHeight * 0.8],
                x:
                  Math.random() * window.innerWidth +
                  (Math.random() * 200 - 100),
                rotate: 360,
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                ease: "linear",
                repeat: 0,
              }}
              style={{
                position: "absolute",
                color: "#FFFDCE",
                zIndex: 1000,
                fontSize: `${Math.random() * 10 + 5}px`,
              }}
            >
              <FaSplotch />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Stars;
