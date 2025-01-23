import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "axios";

export const useEditCustomerHook = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ customerId, values }) => {
      await axios.put(`${i18n.language}/admin/customers/update?customerId=${customerId}`, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
        toast.success("User edited successfully.");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message;
        if (typeof errorMessage === "object") {
          Object.entries(errorMessage).forEach(([field, messages]) => {
            messages.forEach((msg) => {
              console.error(msg);
            });
          });
        } else {
          toast.error(errorMessage || "Failed to edit customer.");
        }
      },
    }
  );

  return { editCustomers: mutation.mutate };
};
