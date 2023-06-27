export const randomNext = (prev) => {
    // if going up
    if (prev < 0.7 && Math.random() > 0.5) {
        return random(0.3, Math.min(prev + 0.3, 0.9))
    }

    return random(Math.max(prev - 0.3, 0.1), Math.min(prev + 0.3, 0.9))
}
const random = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100
}

const buildLines = ({ points, height, peaks, endingPeak }) => {
    return [...Array(points)]
        .map((_, i) => {
            const point =
                i + 1 === points
                    ? height - height * endingPeak
                    : height - height * peaks[i][0]
            return ` L ${(((i + 1) / points) * 100).toFixed(0)},${point.toFixed(
                0,
            )}`
        })
        .join('')
}

const buildCurves = ({ points, height, peaks, startingPeak, endingPeak }) => {
    // Special case for 1 point
    if (points === 1) {
        const startingPoint = height * (1 - startingPeak)
        const endingPoint = height * (1 - endingPeak)
        const controlY = -height - startingPoint - height - endingPoint
        const centerPointY = controlY * (peaks[0][0] / 2) + height
        return ` Q 50,${centerPointY} 100,${(
            height -
            height * endingPeak
        ).toFixed(0)}`
    }

    let previousX = 0
    return [...Array(points)]
        .map((_, i) => {
            // Column height
            const start = height - height * peaks[i][0]
            const end =
                i + 1 === points
                    ? height - height * endingPeak
                    : height - height * peaks[i][1]

            // Column position
            const smoothness = Math.max(10 / points, 0.1)
            const spread = Math.min(points / 2, 5)
            const x = ((i + 1) / points) * 100
            const startX = Math.max(x - smoothness - spread, previousX)
            const endX = Math.max(x + smoothness, previousX)
            previousX = endX
            return ` S ${startX.toFixed(0)},${start.toFixed(0)} ${Math.min(
                endX.toFixed(0),
                100,
            )},${end.toFixed(0)}`
        })
        .join('')
}

export const calculateVariations = ({ startingPeak, points }) => {
    if (points < 1) return []
    const variations = Array.from({ length: points }).reduce((acc, _, i) => {
        const previous = acc[i - 1]?.length ? acc[i - 1][0] : startingPeak
        const from = randomNext(previous)
        const end = randomNext(from)

        return [...acc, [from, end]]
    }, [])
    return variations
}

export const reconcilePeaks = ({ startingPeak, peaks, points }) => {
    const neededPoints = points - peaks.length
    return [
        ...peaks,
        ...calculateVariations({
            startingPeak: peaks?.at(-1)?.length
                ? peaks?.at(-1)[1]
                : startingPeak[1],
            points: neededPoints,
        }),
    ]
}

export const buildPath = ({
    height,
    points,
    direction,
    smoothness,
    peaks,
    startingPeak,
    endingPeak,
}) => {
    const startingPosition = `M 0,${(height - height * startingPeak).toFixed(
        0,
    )}`
    const curves =
        smoothness === 'rigid'
            ? buildLines({ points, height, peaks, endingPeak })
            : buildCurves({
                  points,
                  height,
                  peaks,
                  startingPeak,
                  endingPeak,
              })

    const endingPosition = ` V ${direction === 'bottom' ? height : 0} H 0 Z`

    return `${startingPosition}${curves}${endingPosition}`
}
