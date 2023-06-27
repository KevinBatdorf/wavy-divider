<?php

defined('ABSPATH') || exit;

add_action('init', function () {
    if (function_exists('register_block_pattern_category')) {
        register_block_pattern_category(
            'wavy-dividers',
            ['label' => __('Wavy Dividers', 'wavy-divier') ]
        );
    }

    if (function_exists('register_block_pattern')) {
        register_block_pattern('wavy/wavy-1', [
            'title' => 'Wavy Divider 1',
            'categories' => ['wavy-dividers'],
            'content' => file_get_contents(__DIR__ . '/defaults/wavy-1.html'),
        ]);
        register_block_pattern('wavy/wavy-2', [
            'title' => 'Wavy Divider 2',
            'categories' => ['wavy-dividers'],
            'content' => file_get_contents(__DIR__ . '/defaults/wavy-2.html'),
        ]);
        register_block_pattern('wavy/wavy-3', [
            'title' => 'Wavy Divider 3',
            'categories' => ['wavy-dividers'],
            'content' => file_get_contents(__DIR__ . '/defaults/wavy-3.html'),
        ]);

        // Gradient Patterns
        register_block_pattern('wavy/gradient-1', [
            'title' => 'Wavy Divider Gradient 1',
            'categories' => ['wavy-dividers'],
            'content' => file_get_contents(__DIR__ . '/gradients/gradient-1.html'),
        ]);
        register_block_pattern('wavy/gradient-2', [
            'title' => 'Wavy Gradient 2',
            'categories' => ['wavy-dividers'],
            'content' => file_get_contents(__DIR__ . '/gradients/gradient-2.html'),
        ]);
        register_block_pattern('wavy/gradient-3', [
            'title' => 'Wavy Gradient 3',
            'categories' => ['wavy-dividers'],
            'content' => file_get_contents(__DIR__ . '/gradients/gradient-3.html'),
        ]);
    }
});
