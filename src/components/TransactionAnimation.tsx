import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import Phone from "./Phone";

export function TransactionAnimation() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTransactionActive, setIsTransactionActive] = useState(false);

  const startTransaction = () => {
    setShowSuccess(false);
    setIsTransactionActive(true);

    // Simule la fin de la transaction après 6 secondes
    setTimeout(() => {
      setIsTransactionActive(false);
      setShowSuccess(true);
    }, 6000);
  };

  // Lancer la première transaction automatiquement
  useEffect(() => {
    startTransaction();

    // Répéter toutes les 10 secondes
    const interval = setInterval(() => {
      startTransaction();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full  bg-white rounded-xl overflow-hidden flex items-center justify-center gap-16 px-8">
      {/* Left Phone */}
      <Phone
        side="left"
        showNotification={isTransactionActive}
        isTransactionActive={isTransactionActive}
        showSuccess={showSuccess}
        label="ENVOI"
        icon={ShieldCheck}
      />

      {/* Speed lines */}
      {isTransactionActive && (
        <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-4 bg-emerald-400 rounded"
              animate={{ y: [0, -14, 0], opacity: [1, 0.3, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}

      {/* Success checkmark */}
      {showSuccess && (
        <motion.div
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-green-500 text-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          ✅
        </motion.div>
      )}

      {/* Right Phone */}
      <Phone
        side="right"
        showNotification={isTransactionActive}
        isTransactionActive={isTransactionActive}
        showSuccess={showSuccess}
        label="REÇU"
        icon={ShieldCheck}
      />
    </div>
  );
}
