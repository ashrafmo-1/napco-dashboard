import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useContext } from "react";
import { UserContext } from "../../../context/UserProvider";
import { message } from "antd";
import { MAINPATH } from "../../../constant/MAINPATH";
import { useTranslation } from "react-i18next";

export const useAuthHook = () => {
  const { setUser } = useContext(UserContext);
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: (data) => {
      return axios.post("admin/auth/login", data);
    },
    onSuccess: (response) => {
      const { data } = response;
      setUser(response.data.profile);
      const access_token = data.token;
      setUser({ ...response.data, token: access_token, isAuthenticated: true });
      Cookies.set("napco-token-dashborad", access_token, {expires: 0.4167});
      Cookies.set("napco-dashboard-profile", JSON.stringify(data.profile));
      localStorage.setItem(
        "napco-permissions",
        JSON.stringify(data.permissions)
      );
      Cookies.set("role", data.role);
      window.location.href = `/${MAINPATH}/${i18n.language}/home`;
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
          toast.error("hi");
          message.error(errorMessage)
      }
    },
  });
};
