=== Wavy Divider ===
Contributors:      kbat82
Tags:              hr, separator, svg, divider, gradient, wavy, block
Tested up to:      5.9.0
Stable tag:        1.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A colorful, fun, lightweight divider block to energize your website with character and pizazz

== Description ==

Generate and add a simple wavy divider to anywhere on your page, giving you the ability to separate blocks of content with an impressive, professional-looking design element.

- Follow [@kevinbatdorf](https://twitter.com/kevinbatdorf) on Twitter
- View on [GitHub](https://github.com/KevinBatdorf/wavy-divider)

= Features =
- Color settings, including opacity.
- Choose between wide, normal, and full width
- Choose between rounded edges and stright lines
- Supports top or bottom shapes
- Stack multiple dividers with group block (see below)
- Gradients - easy to use (see below)
- Control height, number of points, and direction

= Gradients =

To use a gradient, you need to wrap the wavy divider in a group block and apply the gradient to the group block. After that, create a wavy shape and apply a color that matches your content background (e.g. white). You can then switch the direction of the divider (under settings) to give a mirrored effect. This way the gradient is applied to the group block and the wavy divider acts as a mask.

= Group Block =

If nesting the wavy divider in a group block, you may want to remove the padding and margins so that the wavy divider will not have spacing around it. To handle this, select the group block, and under "Advanced" (at the bottom of the settings area) add these two classes:

- `wavy-divider-remove-margin`
- `wavy-divider-remove-padding`

== Installation ==

1. Install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Screenshots ==

1. Separate content with wavy dividers
2. Add gradients in combination with group blocks
3. Control height, point count, smoothness, and more.

== Changelog ==

= 1.1.0 =
* Feature: Add two examples tot he pattern library
* Enhancement: Add wp_set_script_translations
* Tweak: Change shuffle button to secondary button styling
* Fix: Add title prop to `registerBlockType`

= 1.0.0 =
* Initial release
