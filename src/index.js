import { useBlockProps as blockProps } from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'
import './style.scss'
import { blockIcon } from './icons'
import { Wave } from './Wave'
import { Controls } from './Controls'
import { __ } from '@wordpress/i18n'
import * as blockConfig from '../block.json'

registerBlockType(
    'wavy/wavy-divider',
    Object.assign(
        {
            icon: blockIcon,
            title: __('Wavy Divider', 'wavy-divider'),
            example: {
                attributes: {
                    points: 4,
                    direction: 'bottom',
                    opacity: 1,
                    height: 200,
                    fill: '#bbbbbb',
                    path:
                        'M 0,141.02860048635554 S 15.5,149.62576844884103 22,44.38429499729722, S 35.5,109.49785734826821 42,112.37437978662143, S 55.5,81.82622726454179 65,71.25365594766248, S 75.5,108.62068964175967 82,167.8899588207349, S 95.5,118.85814344229925 102,75.32845414857354 V 200 H 0 Z',
                },
            },
            edit: ({ attributes, setAttributes }) => {
                return (
                    <>
                        <Controls
                            attributes={attributes}
                            setAttributes={setAttributes}
                        />
                        <div {...blockProps()}>
                            <Wave {...attributes} />
                        </div>
                    </>
                )
            },
            save: ({ attributes }) => {
                return (
                    <div {...blockProps.save()}>
                        <Wave {...attributes} />
                    </div>
                )
            },
        },
        blockConfig,
    ),
)
