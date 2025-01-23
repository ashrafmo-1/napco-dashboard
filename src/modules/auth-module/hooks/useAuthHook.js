import Cookies from "js-cookie";
import axios from "axios";
import {toast} from "react-toastify";
import {useMutation} from "react-query";

export const useAuthHook = () => {
    const logOutTime = new Date(Date.now() + 60000 * 60 * 10);
    return useMutation({
        mutationFn: (data) => {
            return axios.post("admin/auth/login", data);
        },
        onSuccess: (response) => {
            const {data} = response;
            Cookies.set("napco-token-dashborad", data.token);
            Cookies.set("profile", data.profile);
            localStorage.setItem("permissions", JSON.stringify(data.permissions));
            Cookies.set("role", data.role);
            Cookies.set("logoutTime", logOutTime);
            window.location.href = "/dashboard";
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
                for (const [field, messages] of Object.entries(errorMessage)) {
                    messages.forEach((msg) => {
                        toast.error(msg);
                    });
                }
            }
        },
    });
}