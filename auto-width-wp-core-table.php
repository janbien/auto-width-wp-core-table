<?php
/**
 * Plugin Name: Auto width table option
 * Description: Adds an "Automatic width by content" option to the Table block.
 * Version: 1.0.0
 * Author: Jan Bien
 * Author URI: https://www.bien.cz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue editor scripts. 
 */
function auto_width_wp_core_table_enqueue_assets() {
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_enqueue_script(
		'auto-width-wp-core-table-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_enqueue_style(
		'auto-width-wp-core-table-style',
		plugins_url( 'build/style-index.css', __FILE__ ),
		array(),
		$asset_file['version']
	);
}
add_action( 'enqueue_block_editor_assets', 'auto_width_wp_core_table_enqueue_assets' );

/**
 * Enqueue frontend styles. 
 */
function auto_width_wp_core_table_enqueue_frontend_assets() {
	wp_enqueue_style(
		'auto-width-wp-core-table-frontend-style',
		plugins_url( 'build/style-index.css', __FILE__ ),
		array(),
		'1.0.0'
	);
}
add_action( 'wp_enqueue_scripts', 'auto_width_wp_core_table_enqueue_frontend_assets' );
