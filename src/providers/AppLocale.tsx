import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createContext, ReactNode, useContext, useState } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "../assets/i18n/en.json";
import plMessages from "../assets/i18n/pl.json";
import { SnackbarProvider } from "./AppSnackbar";

type TLocaleProps = {
  locale: string;
  setLocale: (locale: "pl" | "en") => void;
};
type TProps = {
  children: ReactNode;
};

const LocaleContext = createContext<TLocaleProps | undefined>(undefined);

const messages: Record<string, any> = {
  en: enMessages,
  pl: plMessages,
};

const navigatorLocale = navigator.language.split(/[-_]/)[0];

function AppLocale({ children }: TProps) {
  const [locale, setLocale] = useState<string>(
    ["pl", "en"].includes(navigatorLocale) ? navigatorLocale : "pl"
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <SnackbarProvider>
          <LocalizationProvider
            dateAdapter={AdapterLuxon}
            adapterLocale={locale}
          >
            {children}
          </LocalizationProvider>
        </SnackbarProvider>
      </IntlProvider>
    </LocaleContext.Provider>
  );
}

export const useLocale = (): TLocaleProps => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

export default AppLocale;
