# Table Auto Width

**Adds an "Automatic width by content" option to the Table block.**

## Description

This WordPress plugin extends the core `core/table` block by adding a new configuration option: **Automatic width by content**.

When enabled, this option applies `width: auto;` to the table, allowing the table's width to adjust based on its content rather than being forced to fixed layouts or full width.

## Installation

1. Upload the plugin files to the `/wp-content/plugins/auto-width-wp-core-table` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Edit any post or page, insert a Table block, and look for the "Automatic width by content" toggle in the block settings sidebar.

## Development

This plugin is built using `@wordpress/scripts`.

### Build

```bash
npm run build
```

### Start

```bash
npm run start
```

## License

GPLv2 or later
