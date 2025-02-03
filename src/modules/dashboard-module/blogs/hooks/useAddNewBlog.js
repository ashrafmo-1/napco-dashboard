import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { MAINPATH } from "../../../../constant/MAINPATH";
import { useNavigate } from "react-router-dom";

export const useAddNewBlog = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addNewBlog = async (blogData) => {
    await axios.post(`/${i18n.language}/admin/blogs/create`, blogData);
  };

  const mutation = useMutation(addNewBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
            navigate(`/${MAINPATH}/${i18n.language}/blogs`);
      toast.success("add blog successfully.");
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
        toast.error(errorMessage || "Failed to add blog.");
      }
    },
  });

  return { addNewBlog: mutation.mutate };
};
