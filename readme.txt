=== Wavy Divider ===
Contributors:      kbat82
Tags:              hr, waves, divider, block, wavy, separator, svg, gradient
Tested up to:      6.4
Stable tag:        1.6.0
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
- Fine tune curves and lines with built-in controls
- Supports top or bottom shapes
- Stack multiple dividers with group block (see below)
- Gradients - easy to use (see below)
- Control height, number of points, and direction
- Use a single, smooth point to give you a curved divider

= Gradients =

To use a gradient, you need to wrap the wavy divider in a group block and apply the gradient to the group block. After that, create a wavy shape and apply a color that matches your content background (e.g. white). You can then switch the direction of the divider (under settings) to give a mirrored effect. This way the gradient is applied to the group block and the wavy divider acts as a mask.

= Group Block =

If nesting the wavy divider in a group block, you may want to remove the padding and margins so that the wavy divider will not have spacing around it. To handle this, select the group block, and under "Advanced" (at the bottom of the settings area) add these two classes:

- `wavy-divider-remove-margin`
- `wavy-divider-remove-padding`

= Patterns =

Within the block inserter, under the Patterns tab, select 'Wavy Divider' from the dropdown menu to view some example patterns.

== Installation ==

1. Install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Screenshots ==

1. Separate content with wavy dividers
1. Add gradients in combination with group blocks
1. Set 1 peak to create a single smooth curve

== Changelog ==

= 1.6.0 =
- Feature: Add viewBox fine tuning to fix instances where a tiny pixel gap my appear

= 1.5.0 =
- Feature: Center wave when only 1 point is selected and is smooth

= 1.4.0 =
* Update: Updated the patterns to work with 6.2
* Tweak: Load patterns in init and check for function_exists
* Tweak: Prevent attempting to load patterns if function doesn't exist
* Removed seasonal patterns
* Added one new pattern

= 1.3.4 =
* Chore: Update npm packages + test for WP 6.2

= 1.3.3 =
* Fix: Remove lock file to save space

= 1.3.2 =
* Fix: Update spacer block in example to be compatible when Gutenberg plugin is disabled

= 1.3.0 =
* Feature: Add controls to fine tuning
* Feature: Add better line control
* Feature: Allow single peak curves
* Tweak: Adjust height, points, etc without changing peaks

= 1.2.0 =
* Fix: Add pattern examples, including Valentine's Day themed

= 1.1.4 =
* Fix: Swap fill-opacity attribute with opacity styling.
* Tweak: Clamp default state to integers

= 1.1.3 =
* Fix: Move default attributes to index.js file - block.json isn't currently being loaded when imported from block library interface.

= 1.1.2 =
* Fix: Fix missing build files

= 1.1.1 =
* Fix: Disable examples until feature is more stable

= 1.1.0 =
* Feature: Add two examples tot he pattern library
* Enhancement: Add wp_set_script_translations
* Tweak: Change shuffle button to secondary button styling
* Fix: Add title prop to `registerBlockType`

= 1.0.0 =
* Initial release
