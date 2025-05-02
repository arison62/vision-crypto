import { useState, createContext } from "react";
import French from "../assets/langs/fr.json";
import English from "../assets/langs/en.json";

const local = navigator.language.split("-")[0];
const defaultLang = local === "en" ? "en" : "fr";
const defaultLangName = local === "en" ? "English" : "Français";


const LangContext = createContext({
    lang: defaultLang,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLang: (_lang: string) => {},
    langName: defaultLangName,
    messages: local === "en" ? English : French,
});

export const useLang = () => {
    const context = LangContext;
    if (!context) {
        throw new Error("useLang must be used within a LangProvider");
    }
    return context;
}


export const LangProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLang] = useState<string>(defaultLang);
    const [langName, setLangName] = useState<string>(defaultLangName);

    const changeLang = (lang: string) => {
        setLang(lang);
        setLangName(lang === "en" ? "English" : "Français");
    };
    const messages = lang === "en" ? English : French;
    return (
        <LangContext.Provider value={{ lang, setLang: changeLang, langName, messages }}>
            {children}
        </LangContext.Provider>
    );
};