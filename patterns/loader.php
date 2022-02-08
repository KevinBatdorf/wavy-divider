<?php

defined('ABSPATH') || exit;

register_block_pattern_category(
    'wavy-dividers',
    ['label' => __('Wavy Dividers', 'wavy-divier') ]
);

$today = new DateTime();
// Valentines Day
if (strtotime('15 january this year') <= time() &&
    time() <= strtotime('16 february this year')) {
    register_block_pattern('wavy/valentines-1', [
        'title' => 'Valentine\'s Day',
        'categories' => ['wavy-dividers'],
        'content' => file_get_contents(__DIR__ . '/seasonal/valentines-1.html'),
    ]);
}

register_block_pattern('wavy/acid-burn', [
    'title' => 'Acid Burn',
    'categories' => ['wavy-dividers'],
    'content' => file_get_contents(__DIR__ . '/gradients/acid-burn.html'),
]);
register_block_pattern('wavy/leaf-on-the-wind', [
    'title' => 'A Leaf on the Wind',
    'categories' => ['wavy-dividers'],
    'content' => file_get_contents(__DIR__ . '/defaults/leaf-on-the-wind.html'),
]);
register_block_pattern('wavy/the-mystery-of-life', [
    'title' => 'The Mystery of Life',
    'categories' => ['wavy-dividers'],
    'content' => file_get_contents(__DIR__ . '/gradients/the-mystery-of-life.html'),
]);
register_block_pattern('wavy/earth-was-here', [
    'title' => 'The Earth Was Once Here',
    'categories' => ['wavy-dividers'],
    'content' => file_get_contents(__DIR__ . '/defaults/earth-was-here.html'),
]);
