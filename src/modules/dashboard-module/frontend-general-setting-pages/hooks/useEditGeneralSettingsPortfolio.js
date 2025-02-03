import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useEditGeneralSettingsPortfolio = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ values }) => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      for (const [key, value] of values.entries()) {
        formData.append(key, value);
      }
      await axios.post(
        `${i18n.language}/admin/main-settings/update?mainSettingId=1`,
        formData
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        toast.success("User edited successfully.");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message;
        if (typeof errorMessage === "object") {
          Object.entries(errorMessage).forEach(([messages]) => {
            messages.forEach((msg) => {
              console.error(msg);
            });
          });
        } else {
          toast.error(errorMessage || "Failed to edit user.");
        }
      },
    }
  );

  return { editGeneralSettingsPortfolio: mutation.mutate };
};
