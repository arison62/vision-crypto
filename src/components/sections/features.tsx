import { useLang } from "@/context/lang-context";
import banner2 from "@/assets/images/banner.webp";
import World from "../world";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";

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

// Composant pour animer l'apparition
const AnimatedSection: React.FC<{ className?: string, children?: ReactNode }> = ({ children, className }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
          className="mt-20 flex justify-between items-center"
        >
          <AnimatedSection className="rounded-tr-3xl p-4 sm:flex sm:flex-1/2 hidden bg-gray-500">
            <img src={banner2} alt="security" className="w-[50%] mx-auto" />
          </AnimatedSection>
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
