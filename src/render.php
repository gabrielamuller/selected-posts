<?php
/**
 * Display post content.
 *
 * @package create-block
 */

?>

<div
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<?php
	foreach ( $attributes['postList'] as $article_id ) : ?>
	<div class="single-post">
		<?php echo get_the_post_thumbnail( $article_id, 'large' ); ?>

		<div class="post-details">
			<h3><?php echo esc_html( get_the_title( $article_id ) ); ?></h3>
			<p class="post-date"><?php echo esc_html( get_the_date( 'd.m.Y', $article_id ) ); ?></p>
			<p class="post-category">
				<?php
				foreach ( get_the_category( $article_id ) as $category ) {
					echo esc_html( $category->name ) . ' ';}
				?>
			</p>
			<hr>
			<a class="post-link" href="<?php echo esc_url( get_permalink( $article_id ) ); ?>"><?php esc_html_e( 'Read more', 'selected-posts' ); ?></a>
		</div>

	</div>
	<?php endforeach; ?>
</div>
