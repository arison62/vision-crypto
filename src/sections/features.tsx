import { useLang } from "@/context/lang-context";
import World from "../components/world";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";
import CryptoAppAnimation from "../components/SecurityAnimation";

// Hook personnalisé pour détecter quand un élément est visible
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOnScreen = (ref: any, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si l'élément est visible et n'a pas encore été marqué comme visible
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        rootMargin,
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin, isVisible]);

  return isVisible;
};

interface AnimatedSectionProps {
  className?: string;
  children?: ReactNode;
}


// Composant pour animer l'apparition
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null); // Type correct pour la ref
  const isVisible = useOnScreen(ref);

  // Variantes pour l'animation d'entrée
  const variants = {
    hidden: { opacity: 0, y: 75 }, // Augmentation de y pour un effet plus prononcé
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      // Modification de la transition pour un effet "spring" (élastique)
      transition={{
        type: "spring", // Type de transition
        stiffness: 500, // Rigidité du ressort. Plus élevé = plus rapide et "sec"
        damping: 30, // Amortissement. Plus élevé = moins d'oscillations
        mass: 10, // Masse de l'objet. Plus élevé = plus lent et plus d'inertie
      
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Features = () => {
  const { messages } = useLang();

  return (
    <section className="pt-20">
      <div className="max-container">
        <AnimatedSection
          data-lang-id="our_mission"
          className="space-y-6 flex flex-col items-center"
        >
          <h2
            className="text-xl rounded-xl 
                        text-emerald-900 font-semibold
                        border-emerald-900
                        border-2 w-fit px-4 py-2"
          >
            {messages.our_mission.title}
          </h2>

          <h3
            className="text-3xl sm:text-4xl
                        w-[80%] sm:w-[60%] text-center
                        font-bold text-emerald-900"
          >
            {messages.our_mission.primary_text}
          </h3>
          <p
            className="text-lg sm:text-xl
                        w-[80%] sm:w-[60%] text-center
                        text-emerald-900"
          >
            {messages.our_mission.description_text}
          </p>
        </AnimatedSection>

        <div
          data-lang-id="security"
          className="mt-20 flex flex-col-reverse md:flex-row pt-6 bg-white h-full items-center justify-center gap-1"
        >
        
           <CryptoAppAnimation />
         
          <AnimatedSection className="flex flex-col items-center space-y-6">
            <h2
              className="text-xl rounded-xl 
                        text-emerald-900 font-semibold
                        border-emerald-900
                        border-2 w-fit px-4 py-2"
            >
              {messages.security.title}
            </h2>

            <h3
              className="text-3xl sm:text-4xl
                        w-[80%] sm:w-[60%] text-center
                        font-bold text-emerald-900"
            >
              {messages.security.primary_text}
            </h3>
            <p
              className="text-lg sm:text-xl
                        w-[80%] sm:w-[60%] text-center
                        text-emerald-900"
            >
              {messages.security.description_text}
            </p>
          </AnimatedSection>
        </div>

        <div
          data-lang-id="transactions"
          className="mt-20 flex gap-6 justify-center items-center flex-col xl:flex-row"
        >
          <AnimatedSection className="space-y-6 flex flex-col items-center">
            <h2
              className="text-xl rounded-xl 
                        text-emerald-900 font-semibold
                        border-emerald-900
                        border-2 w-fit px-4 py-2"
            >
              {messages.transactions.title}
            </h2>

            <h3
              className="text-3xl sm:text-4xl
                        w-[80%] sm:w-[60%] text-center
                        font-bold text-emerald-900"
            >
              {messages.transactions.primary_text}
            </h3>
            <p
              className="text-lg sm:text-xl
                        w-[80%] sm:w-[60%] text-center
                        text-emerald-900"
            >
              {messages.transactions.description_text}
            </p>
          </AnimatedSection>

          <AnimatedSection className="hidden md:flex">
            <World />
          </AnimatedSection>
        </div>

        {/* Section FAQ sans animation comme demandé */}
        <div
          data-lang-id="faq"
          className="mt-20 flex flex-col items-center space-y-6"
        >
          <h2
            className="text-xl rounded-xl
                        text-emerald-900 font-semibold
                        border-emerald-900
                        border-2 w-fit px-4 py-2"
          >
            {messages.faqs.title}
          </h2>
          <h3
            className="text-3xl sm:text-4xl
                        w-[80%] sm:w-[60%] text-center
                        font-bold text-emerald-900"
          >
            {messages.faqs.primary_text}
          </h3>
          <p
            className="text-lg sm:text-xl
                        w-[80%] sm:w-[60%] text-center
                        text-emerald-900"
          >
            {messages.faqs.description_text}
          </p>
          <div className="w-full max-w-2xl mt-6">
            <Accordion type="single" collapsible>
              {messages.faqs.faqs.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-emerald-900"
                >
                  <AccordionTrigger className="text-emerald-900 text-lg font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-emerald-900 text-lg">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
