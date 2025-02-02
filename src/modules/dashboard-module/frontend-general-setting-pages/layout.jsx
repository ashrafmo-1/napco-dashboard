import React from "react";
import {useTranslation} from "react-i18next";
import {Tabs} from "antd";
import {GeneralPortfolioSettings} from "./components/GeneralPortfolioSettings.jsx";

export const Layout = () => {
    const {t} = useTranslation();

    return (
        <React.Fragment>
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
                {t("siteSettings.title")}
            </h1>

            <Tabs defaultActiveKey="1"
                  items={[
                      {
                          label: t("General Portfolio Settings"),
                          key: "1",
                          children: <GeneralPortfolioSettings />,
                      },
                      {
                          label: t("siteSettings.portfolioPages"),
                          key: "2",
                          // children: <PortfolioPages/>,
                      }
                  ]}
            />
        </React.Fragment>
    );
};