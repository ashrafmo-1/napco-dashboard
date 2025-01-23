import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

export const useAddNewCareer = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const addCareer = async (faqData) => {
    await axios.post(`/${i18n.language}/admin/careers/create`, faqData);
  };

  const mutation = useMutation(addCareer, {
    onSuccess: () => {
      queryClient.invalidateQueries("careers");
      toast.success("career added successfully.");
    },
    onError: () => {
      toast.error("Failed to add career.");
    },
  });

  return {addCareer: mutation.mutate};
};