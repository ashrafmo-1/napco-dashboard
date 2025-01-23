import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import AddNewsLetter from "./AddNewsLetter";
import EditNewsLetter from "./EditNewsLetter";
import DeleteNewsLetter from "./DeleteNewsLetter";
import useNewsLetterHook from "./hooks/useNewsLetterHook";
import { Status } from "../../components/Status";
import { SearchFilter } from "../../components/SearchFilter";
import { MailOutlined } from "@ant-design/icons";

export const NewsLetter = () => {
  const { t } = useTranslation();
  const { pageCount, newsletters, setSearchTerm, setCurrentPage } =
    useNewsLetterHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
        <MailOutlined />
        {t("NewsLetter.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <AddNewsLetter />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("NewsLetter.table.subject")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("NewsLetter.table.isSent")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {newsletters &&
              newsletters.map((newsletter, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {newsletter.subject}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Status
                      value={newsletter.isSent}
                      activeText={"yes"}
                      inactiveText={"no"}
                    />
                  </th>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteNewsLetter newsletterId={newsletter.newsletterId} />
                    <EditNewsLetter
                      newsletterId={newsletter.newsletterId}
                      initialValues={newsletter}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          current={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
