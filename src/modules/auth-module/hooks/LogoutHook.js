import Cookies from "js-cookie";

export const LogoutHook = () => {
  Cookies.remove("napco-token-dashborad");
  Cookies.remove("napco-dashboard-profile");
  sessionStorage.removeItem("logout-time");
  window.location.reload();
};

const setLogoutTime = () => {
  const logOutTime = Date.now() + 60000 * 60 * 10; // 10 hours
  sessionStorage.setItem("logout-time", logOutTime.toString());
};

const checkLogout = () => {
  const savedLogoutTime = sessionStorage.getItem("logout-time");

  if (savedLogoutTime) {
    const currentTime = Date.now();
    const logoutTime = Number(savedLogoutTime);

    if (currentTime >= logoutTime) {
      LogoutHook();
    }
  }
};

const startLogoutChecker = () => {
  if (!sessionStorage.getItem("logout-time")) {
    setLogoutTime();
  }

  setInterval(checkLogout, 60000);
};

startLogoutChecker();