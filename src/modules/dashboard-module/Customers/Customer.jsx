import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useCustomerHook } from "./Hooks/useCustomerHook";
import { AddNewCustomer } from "./NewCustomer";
import { EditCustomer } from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import { ShoppingOutlined } from "@ant-design/icons";
import { SearchFilter } from "../../components/SearchFilter";

export const Customers = () => {
  const { t } = useTranslation();
  const { pageCount, setSearchTerm, customers, setCurrentPage } =
    useCustomerHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 capitalize mb-8 flex gap-2 items-center">
        <ShoppingOutlined />
        {t("customers.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className="capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <AddNewCustomer />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("customers.name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("customers.email")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("customers.phone")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr className="bg-white border-b" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {customer.name}
                </th>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4 flex gap-3">
                  <DeleteCustomer customerId={customer.customerId} />
                  <EditCustomer
                    customerId={customer.customerId}
                    initialValues={customer}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          className="mb-4 mt-10 flex justify-center items-center"
          defaultCurrent={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
