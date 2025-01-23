import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useAddUserHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewUser = async (userData) => {
      await axios.post(`/${i18n.language}/admin/users/create`, userData);
  };

  const mutation = useMutation(addNewUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("User added successfully.");
    },

    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") { 
        for (const [field, messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      } else {
        toast.error(errorMessage || "Failed to add user.");
      }
    },
  });

  return { addNewUser: mutation.mutate };
};
