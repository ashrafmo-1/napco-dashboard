import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";

export const useEditSliderHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ slideId, formData }) => {
      formData.append("_method", "PUT");
      await axios.post(
        `${i18n.language}/admin/sliders/update?slideId=${slideId}`,
        formData
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sliders");
        toast.success("slider edited successfully.");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message;
        if (typeof errorMessage === "object") {
          Object.entries(errorMessage).forEach(([messages]) => {
            messages.forEach((msg) => {
              toast.error(msg);
            });
          });
        } else {
          toast.error(errorMessage || "Error editing slider");
        }
      },
    }
  );

  return { editSlider: mutation.mutate };
};