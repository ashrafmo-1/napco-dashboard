import Cookies from "js-cookie";

export const LogoutHook = () => {
    Cookies.remove("napco-token-dashborad");
    Cookies.remove("napco-dashboard-profile");
    localStorage.removeItem("napco-permissions");
    window.location.reload();
}