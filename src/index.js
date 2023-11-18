import { useBlockProps as blockProps } from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'
import './style.scss'
import { blockIcon } from './icons'
import { Wave } from './Wave'
import { Controls } from './Controls'
import { __ } from '@wordpress/i18n'
import blockConfig from '../block.json'

registerBlockType('wavy/wavy-divider', {
    ...blockConfig,
    icon: blockIcon,
    title: __('Wavy Divider', 'wavy-divider'),
    example: {
        attributes: {
            points: 4,
            direction: 'bottom',
            opacity: 1,
            height: 200,
            fill: '#bbbbbb',
            viewBoxOffset: 0,
            path: 'M 0,180 S 21,138 28,87 S 46,141 53,144 S 71,141 78,141 S 96,162 100,198 V 300 H 0 Z',
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
})
