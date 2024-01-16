/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

import { useEntityRecords } from '@wordpress/core-data'

import { FormTokenField } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes: { postList }, setAttributes} ) {

	const blockProps = useBlockProps();

	// Get posts 
	const postRequest = useEntityRecords( 'postType', 'post');

	if ( postRequest.isResolving ) {
		return (
			<div { ...blockProps}>Loading...</div>
		)
	}

	const displayList = postRequest?.records
		?.filter( ( item ) => postList?.includes( item.id ) )
		.map( ( item ) => item.title.rendered );

	return (
		<div 
			{ ...blockProps }
		>
       <BlockControls>
          <AlignmentToolbar
            onChange={(newVal) => setAttributes({alignment: newVal})} />
        </BlockControls>
			<FormTokenField
				value={ displayList }
				suggestions={ postRequest?.records?.map( ( post ) => post.title.rendered
				)}
				onChange={( newList ) => {
					const newPostList = postRequest?.records
					?.filter( ( item ) => 
						newList.includes( item.title.rendered )
					)
					.map( ( item ) => item.id );
					setAttributes( { postList: newPostList } );
				}}
			>
			</FormTokenField>
		</div>
	);
}
