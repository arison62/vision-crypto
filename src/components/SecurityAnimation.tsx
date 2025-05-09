import { useState, useEffect, useRef } from "react";
import {
  Fingerprint,
  Lock,
  Shield,
  Key,
  ArrowUpCircle,
  CheckCircle,
  Bitcoin,
  RefreshCw,
} from "lucide-react";

export default function CryptoAppAnimation() {
  // États pour gérer les différentes vues de l'application
  const [appState, setAppState] = useState("fingerprintScan"); // 'fingerprintScan', 'appHome', 'encrypting', 'sent'
  const [matrixChars, setMatrixChars] = useState<
    { char: string; delay: number; duration: number; x: number; y: number }[]
  >([]);
  const [showNotification, setShowNotification] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [phoneDate, ] = useState(new Date());

  // Génération des caractères Matrix lors du cryptage
  useEffect(() => {
    if (appState === "encrypting") {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?";
      const matrix = [];

      for (let i = 0; i < 50; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        const delay = Math.random() * 2;
        const duration = 1 + Math.random() * 1.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        matrix.push({ char, delay, duration, x, y });
      }
      setMatrixChars(matrix);
      setShowNotification(false);

      // Simulation de la durée du cryptage et de l'envoi
      const encryptionTimer = setTimeout(() => {
        setAppState("sent");
        setMatrixChars([]);
      }, 4000);

      return () => clearTimeout(encryptionTimer);
    } else {
      setMatrixChars([]);
    }
  }, [appState]);

  // Affichage de la notification après l'envoi et retour à l'accueil
  useEffect(() => {
    if (appState === "sent") {
      const notificationTimer = setTimeout(() => {
        setShowNotification(true);
      }, 500);

      const returnHomeTimer = setTimeout(() => {
        setShowNotification(false);
        setAppState("appHome"); // Revenir à l'accueil de l'application
      }, 5000); // La notif disparaît et on revient à l'accueil après 5s au total

      return () => {
        clearTimeout(notificationTimer);
        clearTimeout(returnHomeTimer);
      };
    }
  }, [appState]);

  // Effet de pulsation pour l'empreinte
  useEffect(() => {
    let pulseInterval: NodeJS.Timeout | null = null;
    if (appState === "fingerprintScan" && phoneRef.current) {
      const fingerprintElement = phoneRef.current.querySelector(
        ".fingerprint-icon-container"
      );
      if (fingerprintElement) {
        pulseInterval = setInterval(() => {
          fingerprintElement.classList.add("animate-pulse");
          setTimeout(() => {
            fingerprintElement.classList.remove("animate-pulse");
          }, 1000);
        }, 3000);
      }
    }
    return () => {
      if (pulseInterval) clearInterval(pulseInterval);
    };
  }, [appState]);

  const handleFingerprintClick = () => {
    setAppState("appHome");
  };

  const handleSendClick = () => {
    setAppState("encrypting");
  };

  // Interface de l'application Crypto (Thème Clair)
  const CryptoAppInterface = () => (
    <div className="flex flex-col  bg-white text-gray-800 p-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Vision Crypto</h2>
        <Bitcoin size={24} className="text-yellow-500" />
      </div>

      <div className="mb-6 p-4 bg-emerald-50 rounded-lg shadow">
        <p className="text-sm text-emerald-700">Total Balance</p>
        <p className="text-2xl font-semibold text-emerald-900">$1,234.56</p>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2 text-gray-700">Assets</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-100 rounded shadow-sm">
            <div>
              <p className="font-medium text-gray-800">Bitcoin (BTC)</p>
              <p className="text-xs text-gray-500">0.05 BTC</p>
            </div>
            <p className="text-green-600 font-medium">$980.20</p>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-100 rounded shadow-sm">
            <div>
              <p className="font-medium text-gray-800">Ethereum (ETH)</p>
              <p className="text-xs text-gray-500">1.2 ETH</p>
            </div>
            <p className="text-red-600 font-medium">$254.36</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex space-x-3">
        <button
          onClick={handleSendClick}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-sm text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center transition-colors duration-200 shadow hover:shadow-md"
        >
          <ArrowUpCircle size={12} className="mr-2" />
          Send
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center transition-colors duration-200 shadow hover:shadow-md">
          <RefreshCw size={12} className="mr-2" />
          Exchange
        </button>
      </div>
    </div>
  );

  // Écran d'empreinte (Thème Clair)
  const FingerprintScreen = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative bg-gray-50">
      {" "}
      {/* Changed to justify-center and light bg */}
      <div
        className="fingerprint-icon-container cursor-pointer mb-6 p-4 rounded-full hover:bg-emerald-100 transition-all"
        onClick={handleFingerprintClick}
      >
        <Fingerprint size={64} className="text-emerald-600" />
      </div>
      <p className="text-emerald-700 text-sm">Scan fingerprint to unlock</p>
    </div>
  );

  // Notification (Conserve un thème sombre pour le contraste)
  const Notification = () => (
    <div
      className={`absolute top-8 left-1/2 -translate-x-1/2 w-11/12 bg-gray-800/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl transition-all duration-500 ease-out ${
        showNotification
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10"
      }`}
      style={{ pointerEvents: showNotification ? "auto" : "none" }}
    >
      <div className="flex items-center">
        <CheckCircle
          size={20}
          className="text-emerald-400 mr-2 flex-shrink-0"
        />
        <div>
          <p className="font-semibold text-sm">Transaction Sent!</p>
          <p className="text-xs text-gray-300">
            Your crypto has been securely sent.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      {/* Téléphone */}
      <div ref={phoneRef} className="relative">
        {/* Corps du téléphone */}
        <div
          className="relative flex justify-center h-[620px] w-[320px] border-[12px] border-black rounded-[40px] bg-slate-50" // Phone body light gray
          style={{ boxShadow: "8px 8px 10px 0px rgba(0,0,0,0.2)" }} // Softer shadow
        >
          {/* Encoche/Dynamic Island */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 mt-1.5 bg-black w-[80px] h-[20px] rounded-full z-30"></span>{" "}
          {/* z-30 to be above status bar */}
          {/* Boutons latéraux (purement décoratifs) */}
          <span className="absolute -left-[12px] top-20 border-[2px] border-t-gray-800 border-b-gray-800 border-l-gray-800 bg-gray-300 h-8 w-1 rounded-l-sm"></span>
          <span className="absolute -left-[12px] top-32 border-[2px] border-t-gray-800 border-b-gray-800 border-l-gray-800 bg-gray-300 h-10 w-1 rounded-l-sm"></span>
          <span className="absolute -right-[12px] top-24 border-[2px] border-t-gray-800 border-b-gray-800 border-r-gray-800 bg-gray-300 h-10 w-1 rounded-r-sm"></span>
          {/* Écran du téléphone */}
          <div
            className={
              `absolute top-[10px] left-[10px] right-[10px] bottom-[10px] rounded-[28px] overflow-hidden flex flex-col
            ${appState === "encrypting" ? "bg-black" : "bg-gray-50"}` // Dynamic background for screen
            }
          >
            {/* Barre d'état en haut de l'écran (simplifiée) */}
            <div
              className={
                `w-full h-6 flex items-center justify-between px-4 absolute top-0 left-0 z-20 pointer-events-none
              ${appState === "encrypting" ? "text-white" : "text-gray-700"}` // Dynamic text color for status bar
              }
            >
              <div className="text-xs font-bold">{
                phoneDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                }</div>
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20v-6M6 20v-2M18 20v-4" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16v12H4zM2 8v8" />
                  <path d="M20 7V6c0-1.1-.9-2-2-2H6C4.9 4 4 4.9 4 6v1" />
                </svg>
              </div>
            </div>

            {/* Contenu de l'écran */}
            <div className="flex-1 flex flex-col relative pt-6">
              {appState === "fingerprintScan" && <FingerprintScreen />}
              {appState === "appHome" && <CryptoAppInterface />}

              {/* Matrix Animation & Crypting Message (Conserve le thème sombre) */}
              {appState === "encrypting" && (
                <div className="absolute inset-0 bg-black text-emerald-400 overflow-hidden z-10">
                  {" "}
                  {/* z-10, below status bar */}
                  {matrixChars.map((item, index) => (
                    <div
                      key={index}
                      className="absolute text-xs font-mono animate-matrixRain"
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        animationDelay: `${item.delay}s`,
                        animationDuration: `${item.duration}s`,
                        opacity: 0,
                      }}
                    >
                      {item.char}
                    </div>
                  ))}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                    {" "}
                    {/* z-20 above matrix */}
                    <Lock
                      size={32}
                      className="text-emerald-400 animate-pulse mb-3"
                    />
                    <p className="text-lg">Encrypting Transaction...</p>
                    <p className="text-xs text-gray-400">Please wait</p>
                  </div>
                </div>
              )}

              {/* Notification (s'affiche par-dessus le contenu actuel, géré par z-index dans son composant) */}
              {(appState === "sent" ||
                (appState === "appHome" && showNotification)) && (
                <Notification />
              )}

              {/* Cryptographic line animation (peut être affichée pendant le cryptage) */}
              {appState === "encrypting" && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-52 h-12 z-20">
                  {" "}
                  {/* z-20 to be above matrix */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-gradient-to-r from-emerald-600 via-yellow-500 to-emerald-600 rounded-full">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <Key size={10} className="text-white" />
                        </div>
                      </div>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full"
                          style={{
                            animation: `moveCryptoLine 1.5s linear ${
                              i * 0.5
                            }s infinite`,
                            left: "5px",
                          }}
                        ></div>
                      ))}
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <Shield size={10} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes moveCryptoLine {
          0% {
            transform: translateX(0px) translateY(-50%);
            opacity: 0;
          }
          10%,
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(188px) translateY(-50%);
            opacity: 0;
          }
        }

        @keyframes animate-matrixRain {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          10% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateY(50px);
          }
        }

        .animate-matrixRain {
          animation-name: animate-matrixRain;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        /* Ensure fingerprint pulse is visible on light theme */
        .fingerprint-icon-container.animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
