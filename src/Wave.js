import PropTypes from 'prop-types'

export const Wave = ({
    height,
    backgroundColor,
    style,
    opacity,
    path,
    fill,
}) => {
    // Fill is passed in only for the example currently
    if (!fill) {
        fill = backgroundColor
            ? `var(--wp--preset--color--${backgroundColor})`
            : style?.color?.background
        fill = fill ?? 'var(--wp--preset--color--secondary, #000)'
    }

    return (
        <svg
            fill="none"
            role="separator"
            viewBox={`0 0 100 ${height}`}
            preserveAspectRatio="none"
            aria-orientation="horizontal"
            aria-hidden={true}
            focusable={false}
            style={{
                height: `${height}px`,
                width: '100%',
                display: 'block',
            }}
        >
            <path
                style={{ transition: 'all .5s ease' }}
                fill={fill}
                fillOpacity={opacity}
                d={path}
            />
        </svg>
    )
}

Wave.propTypes = {
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    style: PropTypes.object,
    opacity: PropTypes.number,
    path: PropTypes.string,
    fill: PropTypes.string,
}
