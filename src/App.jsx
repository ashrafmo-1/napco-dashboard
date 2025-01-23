import React, {useEffect} from "react";
import {TOKEN} from "./helpers";
import {SideBar} from "./components/SideBar";
import {ToastContainer} from "react-toastify";
import {BarsOutlined} from "@ant-design/icons";
import {AppRoutes} from "./routes/Routes";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {MAINPATH} from "./constant/MAINPATH.js";
import {UserProfile} from "./modules/auth-module/page/UserProfile.jsx";
import {ToggleLanguageSwicher} from "./common/ToggleLanguageSwicher.jsx";

function App() {
    const {i18n} = useTranslation();
    const navigate = useNavigate();
    useEffect(() => {
        const currentPath = window.location.pathname;
        const [, mainPath, currentLang, ...rest] = currentPath.split("/");
        const newPath = `/${MAINPATH}/${i18n.language}/${rest.join("/")}`;

        currentLang !== i18n.language && navigate(newPath, {replace: true});
        !TOKEN && navigate(`/${MAINPATH}/authentication`, {replace: true});
    }, [i18n.language, navigate, TOKEN]);

    const [active, setActive] = React.useState(true);
    const toggleSideBar = () => {
        setActive(!active);
    };

    return (
        <main className="flex w-full">
            {TOKEN && (
                <div className={`sticky top-0 w-[80px] sm:w-[300px] h-[99vh] ${active ? "block" : "hidden"}`}>
                    <SideBar/>
                </div>
            )}

            <div
                className={`${TOKEN ? `relative overflow-x-auto w-full ${active ? "sm:w-[calc(100%-300px)]" : ""}  sm:px-8 px-3 pb-2 mt-2 sm:rounded-lg` : "w-full"}`}>
                {TOKEN && (
                    <>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={8000}
                            pauseOnFocusLoss={false}
                            pauseOnHover={false}
                            closeOnClick
                        />
                        <div
                            className="header bg-[#fafafa] px-4 py-2 rounded-lg mb-4 flex items-center justify-between">
                            <BarsOutlined className="cursor-pointer bg-blue-200 p-1 text-2xl rounded-xl"
                                          onClick={toggleSideBar}/>
                            {/* user profile */}
                            <div className={"flex gap-3 items-center"}>
                                <ToggleLanguageSwicher/>
                                <UserProfile/>
                            </div>
                        </div>
                    </>
                )}
                <AppRoutes/>
            </div>
        </main>
    );
}

export default App;
