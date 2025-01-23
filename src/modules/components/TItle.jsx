import PropTypes from "prop-types";

export const Title = ({moduleTitle, size}) => {
    return (
        <section>
            <h5 className={`module-title capitalize font-bold text-${size} mb-3`}>{moduleTitle}</h5>
        </section>
    )
}

Title.propTypes = {
    moduleTitle: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
};