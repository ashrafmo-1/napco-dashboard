import { useTranslation } from "react-i18next";
import { useContactUs } from "./hooks/useContactUs";
import { Pagination } from "antd";
import DeleteContactUs from "./DeleteContactUs";
import { Status } from "../../components/Status";
import { ReplayMessage } from "./ReplayMessage";
import { MailOutlined } from "@ant-design/icons";
import { SearchFilter } from "../../components/SearchFilter";

export const ContactUs = () => {
  const { t } = useTranslation();
  const { contactUs, pageCount, setSearchTerm, setCurrentPage } =
    useContactUs();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
        <MailOutlined />
        {t("modulesTitle.contactUs")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {" "}
                {t("contactUs.table.name")}{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("contactUs.table.email")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("contactUs.table.phone")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("contactUs.table.status")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("contactUs.table.new messages")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {contactUs && contactUs.length > 0 ? (
              contactUs.map((message, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {message.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {message.email}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {message.phone}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-lg font-semibold">
                      <Status
                        value={message.status}
                        activeText={"active"}
                        inactiveText={"inActive"}
                      />
                    </span>
                  </th>
                  <td className="px-6 py-4">
                    {message.newMessagesCount === 0 ? (`${message.newMessagesCount}`
                    ) : (
                        `${message.newMessagesCount}`
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteContactUs contactUsId={message.contactUsId} />
                    <ReplayMessage contactUsId={message.contactUsId} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  {"4O4"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          defaultCurrent={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
