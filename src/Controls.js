import {
    PanelBody,
    BaseControl,
    RangeControl,
    Tip,
    Button,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components'
import { Icon } from '@wordpress/icons'
import PropTypes from 'prop-types'
import { __, sprintf } from '@wordpress/i18n'
import { InspectorControls } from '@wordpress/block-editor'
import { safeHTML } from '@wordpress/dom'
import {
    buildPath,
    reconcilePeaks,
    calculateVariations,
    randomNext,
} from './functions'
import { dice } from './icons'

export const Controls = ({ attributes, setAttributes }) => {
    const { points, smoothness, startingPeak, opacity, height, viewBoxOffset } =
        attributes
    const showCenteredCurve = points === 1 && smoothness === 'smooth'
    return (
        <InspectorControls>
            <PanelBody title={__('Settings', 'wavy-divider')}>
                <BaseControl>
                    <SmoothnessControl
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                    <DirectionControl
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                    <RangeControl
                        label={__('Height', 'wavy-divider')}
                        step={50}
                        min={50}
                        max={1000}
                        value={height}
                        onChange={(height) =>
                            setAttributes({
                                height,
                                path: buildPath({ ...attributes, height }),
                            })
                        }
                    />
                    <RangeControl
                        label={__('Points', 'wavy-divider')}
                        step={1}
                        min={1}
                        max={10}
                        value={points}
                        onChange={(points) => {
                            const { startingPeak, peaks: initialPeaks } =
                                attributes
                            const peaks = reconcilePeaks({
                                peaks: initialPeaks,
                                startingPeak,
                                points: points,
                            })
                            setAttributes({
                                points,
                                peaks,
                                path: buildPath({
                                    ...attributes,
                                    points,
                                    peaks,
                                }),
                            })
                        }}
                    />
                    <RangeControl
                        label={__('Opacity', 'wavy-divider')}
                        step={0.1}
                        min={0}
                        max={1}
                        value={opacity}
                        onChange={(opacity) => setAttributes({ opacity })}
                    />
                    <RangeControl
                        label={__('ViewBox offset', 'wavy-divider')}
                        help={__(
                            'Adjust the svg viewBox value to account for tiny pixel offsets.',
                            'wavy-divider',
                        )}
                        step={1}
                        min={-5}
                        max={5}
                        value={attributes.viewBoxOffset || 0}
                        onChange={(viewBoxOffset) => {
                            setAttributes({ viewBoxOffset })
                        }}
                    />
                </BaseControl>
                <InfoTip />
            </PanelBody>
            {showCenteredCurve ? (
                // special case for a single point, sooth curve
                <PanelBody title={__('Single Curve Settings', 'wavy-divider')}>
                    <BaseControl>
                        <RangeControl
                            label={__('Start', 'wavy-divider')}
                            step={1}
                            min={0}
                            max={100}
                            value={Math.round(startingPeak * 100)}
                            onChange={(peak) => {
                                setAttributes({
                                    startingPeak: peak / 100,
                                    path: buildPath({
                                        ...attributes,
                                        startingPeak: peak / 100,
                                    }),
                                })
                            }}
                        />
                        <RangeControl
                            label={__('Center Peak', 'wavy-divider')}
                            step={1}
                            min={0}
                            max={100}
                            value={Math.round(attributes.peaks[0][0] * 100)}
                            onChange={(peak) => {
                                const peaksNew = [...attributes.peaks]
                                peaksNew[0] = [peak / 100, peaksNew[0][1]]
                                const path = buildPath({
                                    ...attributes,
                                    peaks: peaksNew,
                                })
                                setAttributes({ peaks: peaksNew, path })
                            }}
                        />
                        <RangeControl
                            label={__('End', 'wavy-divider')}
                            step={1}
                            min={0}
                            max={100}
                            value={Math.round(attributes.endingPeak * 100)}
                            onChange={(peak) => {
                                setAttributes({
                                    endingPeak: peak / 100,
                                    path: buildPath({
                                        ...attributes,
                                        endingPeak: peak / 100,
                                    }),
                                })
                            }}
                        />
                        <Tip>
                            {__(
                                'This setting area shows when a single, smooth curve is selected.',
                                'wavy-divider',
                            )}
                        </Tip>
                    </BaseControl>
                </PanelBody>
            ) : (
                <PanelBody title={__('Waves', 'wavy-divider')}>
                    <BaseControl>
                        <Button
                            style={{ width: '100%' }}
                            variant="secondary"
                            onClick={() => {
                                const peaks = calculateVariations({
                                    startingPeak: startingPeak,
                                    points: points,
                                })
                                const endingPeak = peaks.at(-1)[1]
                                const path = buildPath({
                                    ...attributes,
                                    peaks,
                                    endingPeak,
                                })
                                setAttributes({ endingPeak, peaks, path })
                            }}
                            icon={<Icon icon={dice()} />}>
                            {__('Shuffle', 'wavy-divider')}
                        </Button>
                    </BaseControl>
                    <BaseControl>
                        <RangeControl
                            label={__('Start', 'wavy-divider')}
                            step={1}
                            min={0}
                            max={100}
                            value={Math.round(startingPeak * 100)}
                            onChange={(peak) => {
                                setAttributes({
                                    startingPeak: peak / 100,
                                    path: buildPath({
                                        ...attributes,
                                        startingPeak: peak / 100,
                                    }),
                                })
                            }}
                        />
                        {[...Array(points).keys()].map((point) => {
                            if (smoothness === 'rigid') {
                                return (
                                    <LineControl
                                        key={point}
                                        attributes={attributes}
                                        point={point}
                                        lastPoint={point === points - 1}
                                        setAttributes={setAttributes}
                                    />
                                )
                            }
                            return (
                                <CurveControl
                                    key={point}
                                    attributes={attributes}
                                    point={point}
                                    lastPoint={point === points - 1}
                                    setAttributes={setAttributes}
                                />
                            )
                        })}
                    </BaseControl>
                </PanelBody>
            )}
        </InspectorControls>
    )
}

const DirectionControl = ({ attributes, setAttributes }) => (
    <ToggleGroupControl
        onChange={(direction) =>
            setAttributes({
                direction,
                path: buildPath({ ...attributes, direction }),
            })
        }
        label={__('Direction', 'wavy-divider')}
        value={attributes.direction}
        isBlock>
        <ToggleGroupControlOption value="top" label="Top" />
        <ToggleGroupControlOption value="bottom" label="Bottom" />
    </ToggleGroupControl>
)

const SmoothnessControl = ({ attributes, setAttributes }) => (
    <ToggleGroupControl
        onChange={(smoothness) =>
            setAttributes({
                smoothness,
                path: buildPath({ ...attributes, smoothness }),
            })
        }
        label={__('Smoothness', 'wavy-divider')}
        value={attributes.smoothness}
        isBlock>
        <ToggleGroupControlOption value="smooth" label="Smooth" />
        <ToggleGroupControlOption value="rigid" label="Rigid" />
    </ToggleGroupControl>
)

const CurveControl = ({ attributes, point, setAttributes, lastPoint }) => {
    return (
        <div
            style={{
                background: '#f0f0f0',
                padding: '0.5rem 0.5rem 0.25rem',
                marginBottom: '1rem',
            }}>
            <RangeControl
                label={sprintf(__('Peak %s Curve', 'wavy-divider'), point + 1)}
                step={1}
                min={0}
                max={100}
                value={Math.round(attributes.peaks[point][0] * 100)}
                onChange={(peak) => {
                    const peaksNew = [...attributes.peaks]
                    peaksNew[point] = [peak / 100, peaksNew[point][1]]
                    const path = buildPath({
                        ...attributes,
                        peaks: peaksNew,
                    })
                    setAttributes({ peaks: peaksNew, path })
                }}
            />
            {!lastPoint ? (
                <RangeControl
                    step={1}
                    min={0}
                    max={100}
                    value={Math.round(attributes.peaks[point][1] * 100)}
                    onChange={(peak) => {
                        const peaksNew = [...attributes.peaks]
                        peaksNew[point] = [peaksNew[point][0], peak / 100]
                        const path = buildPath({
                            ...attributes,
                            peaks: peaksNew,
                        })
                        setAttributes({ peaks: peaksNew, path })
                    }}
                />
            ) : (
                <RangeControl
                    step={1}
                    min={0}
                    max={100}
                    value={Math.round(attributes.endingPeak * 100)}
                    onChange={(peak) => {
                        setAttributes({
                            endingPeak: peak / 100,
                            path: buildPath({
                                ...attributes,
                                endingPeak: peak / 100,
                            }),
                        })
                    }}
                />
            )}
        </div>
    )
}

const LineControl = ({ attributes, point, setAttributes, lastPoint }) => {
    return !lastPoint ? (
        <RangeControl
            label={sprintf(__('Peak %s', 'wavy-divider'), point + 1)}
            step={1}
            min={0}
            max={100}
            value={Math.round(attributes.peaks[point][0] * 100)}
            onChange={(peak) => {
                const peaksNew = [...attributes.peaks]
                peaksNew[point] = [peak / 100, randomNext(peak / 100)]
                const path = buildPath({
                    ...attributes,
                    peaks: peaksNew,
                })
                setAttributes({ peaks: peaksNew, path })
            }}
        />
    ) : (
        <RangeControl
            label={__('End', 'wavy-divider')}
            step={1}
            min={0}
            max={100}
            value={Math.round(attributes.endingPeak * 100)}
            onChange={(peak) => {
                setAttributes({
                    endingPeak: peak / 100,
                    path: buildPath({
                        ...attributes,
                        endingPeak: peak / 100,
                    }),
                })
            }}
        />
    )
}

const InfoTip = () => (
    <Tip>
        <span
            dangerouslySetInnerHTML={{
                __html: safeHTML(
                    sprintf(
                        __(
                            'View the %1$sreadme%2$s for tips on creating gradients, using group blocks, and more.',
                            'wavy-divider',
                        ),
                        '<a target="_blank" rel="noopener noreferrer" href="https://github.com/KevinBatdorf/wavy-divider">',
                        '</a>',
                    ),
                ),
            }}
        />
    </Tip>
)

CurveControl.propTypes = {
    attributes: PropTypes.object,
    point: PropTypes.number,
    setAttributes: PropTypes.func,
    lastPoint: PropTypes.bool,
}

LineControl.propTypes = {
    attributes: PropTypes.object,
    point: PropTypes.number,
    setAttributes: PropTypes.func,
    lastPoint: PropTypes.bool,
}

SmoothnessControl.propTypes = {
    attributes: PropTypes.object.isRequired,
    setAttributes: PropTypes.func.isRequired,
}
DirectionControl.propTypes = {
    attributes: PropTypes.object.isRequired,
    setAttributes: PropTypes.func.isRequired,
}
Controls.propTypes = {
    attributes: PropTypes.object,
    setAttributes: PropTypes.func,
}
