import './style.scss';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Add 'hasAutoWidth' attribute to core/table.
 */
function addAutoWidthAttribute(settings, name) {
    if (name !== 'core/table') {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            hasAutoWidth: {
                type: 'boolean',
                default: false,
            },
        },
    };
}

addFilter(
    'blocks.registerBlockType',
    'auto-width-wp-core-table/add-auto-width-attribute',
    addAutoWidthAttribute
);

/**
 * Add control to the inspector.
 */
const withAutoWidthControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/table') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { hasAutoWidth } = attributes;

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title={__('Table settings', 'auto-width-wp-core-table')}>
                        <ToggleControl
                            label={__('Automatic width by content', 'auto-width-wp-core-table')}
                            checked={!!hasAutoWidth}
                            onChange={(newValue) => setAttributes({ hasAutoWidth: newValue })}
                            help={
                                hasAutoWidth
                                    ? __('Table width adjusts to content.', 'auto-width-wp-core-table')
                                    : __('Table width is constrained.', 'auto-width-wp-core-table')
                            }
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withAutoWidthControl');

addFilter(
    'editor.BlockEdit',
    'auto-width-wp-core-table/with-auto-width-control',
    withAutoWidthControl
);

/**
 * Add class to the block in the editor and on save.
 * Note: 'blocks.getSaveContent.extraProps' modifies the props passed to the save element.
 * 
 * We also need to make sure the class is applied in the editor. 
 * The 'editor.BlockListBlock' filter adds props to the wrapper in the editor (the block list item). 
 * But core/table renders the table inside. 
 * 
 * Actually, modifying `extraProps` in `getSaveContent` handles the frontend (save).
 * For the editor, `core/table` usually applies attributes to its main wrapper or we might need `editor.BlockListBlock`.
 * However, since we want to target `.wp-block-table.has-auto-width`, we need to ensure that class is there.
 * 
 * Let's try to trust that `extraProps` handles the saved output.
 */

function addAutoWidthClass(extraProps, blockType, attributes) {
    if (blockType.name !== 'core/table') {
        return extraProps;
    }

    const { hasAutoWidth } = attributes;

    if (hasAutoWidth) {
        // Use classnames utility pattern if possible, or simple string concat
        extraProps.className = (extraProps.className || '') + ' has-auto-width';
        extraProps.className = extraProps.className.trim();
    }

    return extraProps;
}

addFilter(
    'blocks.getSaveContent.extraProps',
    'auto-width-wp-core-table/add-auto-width-class',
    addAutoWidthClass
);

/**
 * Add class to the block in the editor.
 */
const withAutoWidthClassEditor = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        if (props.name !== 'core/table') {
            return <BlockListBlock {...props} />;
        }

        const { attributes } = props;
        const { hasAutoWidth } = attributes;

        if (hasAutoWidth) {
            return (
                <BlockListBlock
                    {...props}
                    className={(props.className || '') + ' has-auto-width'}
                />
            );
        }

        return <BlockListBlock {...props} />;
    };
}, 'withAutoWidthClassEditor');

addFilter(
    'editor.BlockListBlock',
    'auto-width-wp-core-table/with-auto-width-class-editor',
    withAutoWidthClassEditor
);
