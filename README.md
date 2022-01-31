# Wavy Divider - A WordPress block

A colorful, fun, lightweight divider block to energize your website with character and pizazz

![alt text](assets/waves.gif "Title")

Generate and add a simple wavy divider to anywhere on your page, giving you the ability to separate blocks of content with an impressive, professional-looking design element.

[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/kevinbatdorf.svg?style=social&label=Follow%20%40kevinbatdorf)](https://twitter.com/kevinbatdorf)

### Features
- Color settings, including opacity.
- Choose between rounded edges and stright lines
- Supports top or bottom shapes
- Stack multiple dividers with group block (see below)
- Gradients - easy to use (see below)
- Control height, number of points, and direction

### Gradients

To use a gradient, you need to wrap the wavy divider in a group block and apply the gradient to the group block. After that, create a wavy shape and apply a color that matches your content background (e.g. white). You can then switch the direction of the divider (under settings) to give a mirrored effect. This way the gradient is applied to the group block and the divider acts as a mask.

### Group Block

If nesting the wavy divider in a group block, you may want to remove the padding and margins so that the wavy divider will not have spacing around it. To handle this, select the group block, and under "Advanced" add these two classes:

- `wavy-divider-remove-margin`
- `wavy-divider-remove-padding`
