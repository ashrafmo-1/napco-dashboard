import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { MAINPATH } from "../constant/MAINPATH";

const SideBarLink = ({ endPoint, content, iconComp }) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  const isActive = location.pathname.includes(
    `/${MAINPATH}/${i18n.language}/${endPoint}`
  );

  return (
    <Link
      to={`/${MAINPATH}/${i18n.language}/${endPoint}`}
      className={`capitalize side-link flex gap-2 py-1 px-4 rounded-md justify-center sm:justify-start ${
        isActive ? "bg-[#E20413] text-white" : "hover:bg-[#383838]"
      }`}
    >
      {iconComp}
      <span className="hidden sm:block">{content}</span>
    </Link>
  );
};

SideBarLink.propTypes = {
  endPoint: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  iconComp: PropTypes.element.isRequired,
};

export default SideBarLink;