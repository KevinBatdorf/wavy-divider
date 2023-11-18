<?php
/**
 * Plugin Name:       Wavy Divider
 * Description:       A creative, fun, lightweight wavy svg divider block to energize your website with character and pizazz
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.6.0
 * Author:            Kevin Batdorf
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wavy-divider
 */

add_action('init', function () {
    register_block_type(__DIR__);
    wp_set_script_translations('wavy-wavy-divider', 'wavy-divider');
});

include_once __DIR__ . '/patterns/loader.php';
