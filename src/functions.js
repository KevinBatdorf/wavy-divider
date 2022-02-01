const randomNext = (prev) => {
    // if going up
    if (prev < 0.7 && Math.random() > 0.5) {
        return random(0.3, Math.min(prev + 0.3, 0.9))
    }

    return random(Math.max(prev - 0.3, 0.1), Math.min(prev + 0.3, 0.9))
}
const random = (min, max) => {
    return Math.random() * (max - min) + min
}

const buildLines = ({ points, height, variations }) => {
    return [...Array(points)]
        .map((_, i) => {
            const point = height - height * variations[i][0]
            return ` L ${(((i + 1) / points) * 100).toFixed(0)},${point.toFixed(
                0,
            )}`
        })
        .join('')
}

const buildCurves = ({ points, height, variations }) => {
    let previousX = 0
    return [...Array(points)]
        .map((_, i) => {
            const start = height - height * variations[i][0]
            const end = height - height * variations[i][1]
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

export const buildPath = ({ height, points, direction, smoothness }) => {
    const start = height - height * random(0.1, 0.9)
    const variations = Array.from({ length: points }).reduce((acc, _, i) => {
        const previous = acc[i - 1]?.length
            ? acc[i - 1][0]
            : Math.max(start / height, 0.1)
        const from = randomNext(previous)
        const end = randomNext(from)

        return [...acc, [from, end]]
    }, [])
    const startingPosition = `M 0,${(height - start).toFixed(0)}`
    const curves =
        points < 3 || smoothness === 'rigid'
            ? buildLines({ points, height, variations })
            : buildCurves({
                  points,
                  height,
                  variations,
              })

    const endingPosition = ` V ${direction === 'bottom' ? height : 0} H 0 Z`

    return `${startingPosition}${curves}${endingPosition}`
}
