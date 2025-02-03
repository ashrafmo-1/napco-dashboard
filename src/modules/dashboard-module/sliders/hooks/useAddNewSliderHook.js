import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useAddNewSliderHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addNewSlider = async (sliderData) => {
    await axios.post(`${i18n.language}/admin/sliders/create`, sliderData);
  };

  const mutation = useMutation(addNewSlider, {
    onSuccess: () => {
      queryClient.invalidateQueries("sliders");
      toast.success("add slider successfully.");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (typeof errorMessage === "object") {
        for (const [messages] of Object.entries(errorMessage)) {
          messages.forEach((msg) => {
            toast.error(msg);
          });
        }
      } else {
        toast.error(errorMessage || "Failed to add slider.");
      }
    },
  });

  return { addNewSlider: mutation.mutate };
};