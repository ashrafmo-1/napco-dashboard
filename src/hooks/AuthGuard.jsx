import {Navigate, Outlet} from "react-router-dom";
import Cookies from "js-cookie";
import {MAINPATH} from "../constant/MAINPATH";
import {useTranslation} from "react-i18next";

const AuthGuard = () => {
    const {i18n} = useTranslation();
    const token = Cookies.get('napco-token-dashborad');
    return token ? <Navigate to={`/${MAINPATH}/${i18n.language}/home`}/> : <Outlet/>
};

export default AuthGuard;