/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getUserOs = () => {
  const userAgent = window.navigator.userAgent;
  if (userAgent.indexOf("Win") !== -1) return "Windows";
  if (userAgent.indexOf("Mac") !== -1) return "MacOS";
  if (userAgent.indexOf("X11") !== -1 || userAgent.indexOf("Linux") !== -1)
    return "Linux";
  return "Unknown OS";
};

//TODO: Modifier le lien de téléchargement pour chaque OS

export const getDownloadLink = (os?: string) => {
  if (os) {
    if (os === "ios") return "https://apps.apple.com/app/id1234567890";
    return "play.google.com/store/apps/details?id=com.example.app";
  } else {
    const userOs = getUserOs();
    if ( userOs === "MacOS") return "https://apps.apple.com/app/id1234567890";
    return "https://play.google.com/store/apps/details?id=com.example.app";
  }
};
