import React from "react";
import { useTranslation } from "react-i18next";
// import { Status } from "../../components/Status";
import { Pagination } from "antd";
import { useCareers } from "./hooks/useCareers";
import DeleteCareer from "./DeleteCareer";
import AddNewCareer from "./AddNewCareer";
import EditAllCareers from "./EditAllCareers";
import { SearchFilter } from "../../components/SearchFilter";
import { WechatWorkOutlined } from "@ant-design/icons";
import {Status} from "../../components/Status.jsx";

export const AllCareers = () => {
  const { t } = useTranslation();
  const { careers, pageCount, setSearchTerm, setCurrentPage } = useCareers();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
        <WechatWorkOutlined />
        {t("careers.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <AddNewCareer />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("careers.table.jobTitle")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("careers.table.description")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("careers.table.isActive")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {careers &&
              careers.map((career, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {career.title}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {career.description}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Status
                      value={career.isActive}
                      activeText={"done"}
                      inactiveText={"no"}
                    />
                  </th>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteCareer careerId={career.careerId} />
                    <EditAllCareers careerId={career.careerId} />
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