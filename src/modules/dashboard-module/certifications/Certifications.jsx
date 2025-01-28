import {useTranslation} from "react-i18next";
import {FileTextOutlined, UserOutlined} from "@ant-design/icons";
import {SearchFilter} from "../../components/SearchFilter.jsx";
import {Button, Image, Pagination} from "antd";
import {Status} from "../../components/Status.jsx";
import {DeleteBlog} from "../blogs/DeleteBlog.jsx";
import {useCertificationsHook} from "./hooks/useCertificationsHook.js";
import {AddNewCertifications} from "./AddNewCertifications.jsx";
import {EditCertification} from "./EditCertification.jsx";
import {DeleteCertifications} from "./DeleteCertifications.jsx";

export const Certifications = () => {
    const {t} = useTranslation();
    const { pageCount, setSearchTerm, setCurrentPage, certifications } = useCertificationsHook();
    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
                <FileTextOutlined/>
                {t("certifications")}
            </h1>

            <div className="filter mb-6 shadow p-4 rounded-lg">
                <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
                <div className="flex items-center gap-4">
                    <SearchFilter search={setSearchTerm}/>
                </div>
            </div>

            <AddNewCertifications />

            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 capitalize bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            {t("image")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("title")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("isPublished")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("actions")}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {certifications && certifications.map((certification, index) => (
                        <tr className="bg-white border-b" key={index}>
                            <th scope="row" className="px-6 py-4 font-medium w-20 text-gray-900 whitespace-nowrap">
                                {certification.image ? (<Image className="w-full" src={certification.image} alt={certification.title}/>) : (<UserOutlined/>)}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{certification.title}</th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <Status value={certification.isPublished} activeText={"active"} inactiveText={"inActive"} />
                            </th>
                            <td className="px-6 py-4 flex gap-3">
                                <EditCertification certificationId={certification.certificationId} />
                                <DeleteCertifications certificationId={certification.certificationId} />
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
    )
}