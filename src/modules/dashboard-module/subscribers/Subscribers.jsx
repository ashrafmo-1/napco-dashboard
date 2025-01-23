import { Pagination } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import useSubscribersHook from "./hooks/useSubscribersHook";
import { DelereSebscriper } from "./DelereSebscriper";
import { Status } from "../../components/Status";
import { SearchFilter } from "../../components/SearchFilter";
import { UserAddOutlined } from "@ant-design/icons";

export const Subscribers = () => {
  const { t } = useTranslation();

  const { subscribers, pageCount, setSearchTerm, setCurrentPage } =
    useSubscribersHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-10 flex gap-2 items-center">
        <UserAddOutlined />
        {t("subscribers.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("subscribers.table.email")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("subscribers.table.isSubscribed")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers &&
              subscribers.map((subscriber, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {subscriber.email}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Status
                      value={subscriber.isSubscribed}
                      activeText={"done"}
                      inactiveText={"no"}
                    />
                  </th>
                  <td className="px-6 py-4 flex gap-3">
                    <DelereSebscriper subscriberId={subscriber.subscriberId} />
                    {/* <EditSubscriper subscriberId={subscriber.faqId} /> */}
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
