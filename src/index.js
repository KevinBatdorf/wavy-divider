import { useBlockProps as blockProps } from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'
import './style.scss'
import { blockIcon } from './icons'
import { Wave } from './Wave'
import { Controls } from './Controls'
import { __ } from '@wordpress/i18n'

registerBlockType('wavy/wavy-divider', {
    icon: blockIcon,
    title: __('Wavy Divider', 'wavy-divider'),
    attributes: {
        path: {
            type: 'string',
            default:
                'M 0,119.35212059460474 S 4,85.16571336505325 11,141.35683616138658, S 14,192.04456179374984 21,181.3599385574178, S 24,78.45356016565023 31,177.40802259902048, S 34,85.59356919060087 41,57.69293841042929, S 44,179.1166368575346 51,220.44227524613638, S 54,241.09972530754055 61,173.1681642777189, S 64,131.7494653131286 71,160.98512462466036, S 74,270.2457275188618 81,171.93163471852463, S 84,273.66613606102914 91,333.11691727207926, S 94,272.6528417908621 101,210.06832704680085 V 400 H 0 Z',
        },
        height: {
            type: 'number',
            default: 400,
        },
        direction: {
            type: 'string',
            default: 'bottom',
        },
        fill: {
            type: 'string',
            default: '',
        },
        opacity: {
            type: 'number',
            default: 1,
        },
        points: {
            type: 'number',
            default: 7,
        },
        smoothness: {
            type: 'string',
            default: 'smooth',
        },
        align: {
            type: 'string',
            default: 'full',
        },
    },
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
})
