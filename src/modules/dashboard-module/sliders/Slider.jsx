import { FileTextOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { SearchFilter } from "../../components/SearchFilter";
import { Pagination } from "antd";
import { useSliderHook } from "./hooks/useSliderHook";
import { DeleteSlider } from "./DeleteSlider";
import { AddNewSlider } from "./AddNewSlider";
import { EditSlider } from "./EditSlider";

export const Slider = () => {
  const { t } = useTranslation();
  const { pageCount, setSearchTerm, setCurrentPage, sliders } = useSliderHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
        <FileTextOutlined />
        {t("sliders")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <AddNewSlider />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                title
              </th>
              <th scope="col" className="px-6 py-3">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sliders &&
              sliders.map((slide, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {slide.title}
                  </th>
                  <td className="px-6 py-4 flex gap-3">
                    <EditSlider
                      slideId={slide.slideId}
                      sliderItemId={slide.sliderItem.map(item => item.slideItemId)}
                    />
                    <DeleteSlider slideId={slide.slideId} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          defaultCurrent={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          showQuickJumper
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
