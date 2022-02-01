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
import { buildPath } from './functions'
import { dice } from './icons'

export const Controls = ({ attributes, setAttributes }) => {
    return (
        <InspectorControls>
            <PanelBody title={__('Settings', 'wavy-divider')}>
                <BaseControl>
                    <Button
                        style={{ width: '100%' }}
                        isLarge
                        isPrimary
                        onClick={() =>
                            setAttributes({
                                path: buildPath({ ...attributes }),
                            })
                        }
                        icon={<Icon icon={dice()} />}
                    >
                        {__('Shuffle waves', 'wavy-divider')}
                    </Button>
                </BaseControl>
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
                        min={100}
                        max={1000}
                        value={attributes.height}
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
                        value={attributes.points}
                        onChange={(points) =>
                            setAttributes({
                                points,
                                path: buildPath({ ...attributes, points }),
                            })
                        }
                    />
                    <RangeControl
                        label={__('Opacity', 'wavy-divider')}
                        step={0.1}
                        min={0}
                        max={1}
                        value={attributes.opacity}
                        onChange={(opacity) => setAttributes({ opacity })}
                    />
                </BaseControl>
                <InfoTip />
            </PanelBody>
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
        isBlock
    >
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
        isBlock
    >
        <ToggleGroupControlOption value="smooth" label="Smooth" />
        <ToggleGroupControlOption value="rigid" label="Rigid" />
    </ToggleGroupControl>
)

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
