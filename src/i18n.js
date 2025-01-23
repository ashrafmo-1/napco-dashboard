import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locals/en.json";
import arJSON from "./locals/ar.json";

i18n.use(initReactI18next)
  .use(initReactI18next)
  .init({resources: {
      en: { translation: enJSON },
      ar: { translation: arJSON },
    },
    lng: "en",
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    react: {
      useSuspense: true,
    },
  }).then(() => {
    const currentLng = i18n.language || "en";
    const isRTL = currentLng === "ar";
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", currentLng);
  });

i18n.on("languageChanged", (lng) => {
  const isRTL = lng === "ar";
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lng);

  if (typeof localStorage !== "undefined" && (lng === "en" || lng === "ar")) {
    localStorage.setItem("i18nextLng", lng);
  }
});

i18n.on("failedLoading", (lng, ns, msg) => {
  console.error(`Failed to load translation for ${lng}/${ns}: ${msg}`);
});

export default i18n;