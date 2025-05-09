import { DollarSign } from "lucide-react";

export default function Phone({
  side,
  showNotification,
  isTransactionActive,
  showSuccess,
  label,
  icon: Icon,
}: {
  side: "left" | "right";
  showNotification: boolean;
  isTransactionActive: boolean;
  showSuccess: boolean;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className={`relative z-10 transition-transform duration-500 ${
        side === "left" ? "-translate-x-4" : "translate-x-4"
      }`}
    >
      <div
        className="relative flex justify-center h-60 w-28 border-4 border-black rounded-2xl bg-gray-50"
        style={{ boxShadow: "3px 3px 2px 3px rgb(209, 218, 218)" }}
      >
        {/* Structure écran */}
        <div className="absolute top-4 left-2 right-2 bottom-4 bg-emerald-100 rounded-lg overflow-hidden">
          {/* Barre du haut */}
          <div className="w-full h-6 bg-emerald-600 flex items-center px-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white mx-1" />
            ))}
          </div>

          {/* Contenu animé */}
          <div className="flex flex-col justify-center items-center h-full">
            {showNotification && (
              <div className="animate-bounce bg-yellow-500 text-white p-1 rounded-full mb-2">
                <Icon size={16} />
              </div>
            )}
            {isTransactionActive && (
              <div className="flex flex-col items-center">
                <DollarSign className="text-emerald-600" size={24} />
                <div className="text-xs font-bold mt-1">{label}</div>
                <div className="mt-2 h-1 bg-emerald-600 rounded-full transition-all duration-500 w-6"></div>
              </div>
            )}
            {showSuccess && (
              <div className="flex flex-col items-center text-emerald-600">
                <div className="text-xs font-bold">
                  {label === "ENVOI" ? "ENVOYÉ" : "REÇU"}
                </div>
                <div className="mt-1 text-lg">✓</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
