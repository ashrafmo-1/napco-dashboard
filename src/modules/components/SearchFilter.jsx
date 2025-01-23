import React from "react";
import { useTranslation } from "react-i18next";

export const SearchFilter = ({ search }) => {
  const { t } = useTranslation();

  return (
      <input
        type="search"
        name="search"
        className="border rounded outline-none py-1 px-3 w-full sm:w-[400px]"
        id="search"
        placeholder={t("globals.search")}
        onChange={(e) => search(e.target.value)}
      />
  );
};
