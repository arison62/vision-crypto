import { useState, useEffect, useRef } from "react";
import { useLang } from "@/context/lang-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getDownloadLink } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react"; // Importez les icônes nécessaires
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import logoImg from "../assets/images/logo.png";


const Header = () => {
  const { messages, langName, lang, setLang } = useLang();
  const downloadLink = getDownloadLink();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Ferme le drawer lorsque l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      data-lang-id="header"
      className="border-b border-emerald-100 fixed top-0 left-0 right-0 z-50 bg-emerald-50 opacity-95"
    >
      <div className="max-container flex justify-between py-4 items-center">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
            <img src={logoImg} alt="Logo vision crypto" className="h-12 w-12" />
            {messages.header.title}
          </h1>
        </div>

        {/* Menu Burger pour mobile */}
        <div className="sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="text-emerald-900 hover:bg-emerald-100"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                ref={drawerRef}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 10,
                  duration: 0.2,
                }}
                className={cn(
                  "fixed top-0 left-0 h-full w-full bg-emerald-50 border-r border-emerald-100",
                  "z-50 p-4 flex flex-col gap-4 shadow-lg",
                  "max-w-[80%] sm:max-w-[300px]" // Ajustez la largeur maximale
                )}
              >
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMobileMenu}
                    className="text-emerald-900 hover:bg-emerald-100"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <Select defaultValue={lang} onValueChange={setLang}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={langName} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <a
                  href={downloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >
                  <Button
                    className="bg-emerald-900 text-white hover:bg-emerald-800 w-full flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)} // Ferme le menu après la sélection
                  >
                    <Download className="w-4 h-4" />
                    {messages.header.button_text}
                  </Button>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Desktop */}
        <div className="hidden sm:flex items-center gap-4">
          <Select defaultValue={lang} onValueChange={setLang}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={langName} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <a href={downloadLink} target="_blank" rel="noreferrer">
            <Button className="bg-emerald-900 text-white hover:bg-emerald-800 flex items-center gap-2">
              <Download className="w-4 h-4" />
              {messages.header.button_text}
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
