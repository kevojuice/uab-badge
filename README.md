# uab-badge – "Utviklet av Ut av Boksen" credit badge

A footer credit badge for websites built by [Ut av Boksen](https://utavboksen.no). One script and one HTML tag – works in WordPress (any theme or builder), Webflow and plain HTML. It is a web component with Shadow DOM, so the site's theme CSS can't break it.

**Install guide (step by step, with live status per site):** https://claude.ai/artifact/XGymEuPM1goiJbNHhuigSE
**Sites using the badge:** [SITES.md](SITES.md) – every client site, split into WordPress and Webflow.

The badge shows **"Utviklet av:"** + the Ut av Boksen logo with a continuously spinning icon, and a tooltip **"Skal vi jobbe sammen?"** on hover. The visible text is intentionally Norwegian; everything else (code, docs) is in English.

## Install

**1. Load the script (once per site)**

```html
<script src="https://cdn.jsdelivr.net/gh/kevojuice/uab-badge@main/uab-badge.min.js" defer></script>
```

**2. Place the badge where it should appear (usually the footer's bottom row)**

```html
<uab-badge theme="light"></uab-badge>   <!-- light background -->
<uab-badge theme="dark"></uab-badge>    <!-- dark background -->
```

### WordPress (recommended: one WPCode PHP snippet)

Add a **PHP snippet** in the WPCode plugin (Auto Insert → Run Everywhere). It loads the script and registers the shortcode `[uab_badge]`:

```php
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_script(
		'uab-badge',
		'https://cdn.jsdelivr.net/gh/kevojuice/uab-badge@main/uab-badge.min.js',
		array(),
		null,
		array( 'in_footer' => true, 'strategy' => 'defer' )
	);
} );

add_shortcode( 'uab_badge', function ( $atts ) {
	$a = shortcode_atts( array( 'theme' => 'light', 'align' => 'center', 'size' => '' ), $atts, 'uab_badge' );
	$theme = in_array( $a['theme'], array( 'light', 'dark' ), true ) ? $a['theme'] : 'light';
	$align = in_array( $a['align'], array( 'left', 'center', 'right' ), true ) ? $a['align'] : 'center';
	$size  = '' !== $a['size'] ? ' size="' . absint( $a['size'] ) . '"' : '';
	return '<uab-badge theme="' . $theme . '" align="' . $align . '"' . $size . '></uab-badge>';
} );

// Let <uab-badge> through wp_kses, so the tag also survives theme option fields that strip unknown HTML
add_filter( 'wp_kses_allowed_html', function ( $tags ) {
	$tags['uab-badge'] = array( 'theme' => true, 'align' => true, 'size' => true, 'nofollow' => true, 'style' => true );
	return $tags;
} );
```

Then place `[uab_badge theme="dark" align="right"]` in the footer:

| Site built with | Where | Element |
|---|---|---|
| Elementor (Pro) | Theme Builder → Footer | **Shortcode** or **HTML** widget (not a V4 Paragraph/Heading – they strip custom tags) |
| Block theme | Appearance → Editor → Template parts → Footer | **Shortcode** block |
| Classic theme with footer widgets | Appearance → Widgets → footer area | **Shortcode** block |
| Astra / Kadence / Blocksy | Customize → Footer Builder | **HTML** element |
| Flatsome | Customize → Footer → Bottom Text Secondary | text field |
| WoodMart | Theme Settings → Footer → Copyrights text (or the footer HTML Block) | paste the **HTML tag** |
| BeTheme / Cesis | Theme Options → Footer → Copyright text | paste the **HTML tag** |
| TheFox | TheFox → Options → Footer → **Footer message** | paste the **HTML tag** (this field doesn't run shortcodes). Needs the `wp_kses_allowed_html` filter above, otherwise the tag is stripped on save |
| Divi | Theme Builder → Global Footer | **Code** module |
| WPBakery / others | footer template | **Raw HTML** / **Text Block** |

No editable footer? Add a second snippet that prints a slim strip at the very bottom:

```php
add_action( 'wp_footer', function () {
	echo '<div style="display:flex;justify-content:center;padding:14px 16px;background:#062430;font-size:13px">'
		. do_shortcode( '[uab_badge theme="dark"]' ) . '</div>';
}, 5 );
```

### Webflow

1. Site settings → Custom code → **Footer code**: paste the `<script>` tag and save (custom code needs a paid site plan).
2. In the Designer, open the footer (usually a component, so it's edited once) and add a **Code Embed** to the bottom row: `<uab-badge theme="dark" align="right"></uab-badge>`.
3. Publish. The badge only renders on the published site, not in the Designer canvas.

For the Elfag electrician sites, also add it to the **Elfag Master Template** so new clones get it automatically.

## Options

| Attribute | Values | Default | Notes |
|---|---|---|---|
| `theme` | `light` / `dark` | `light` | `dark` makes the label light and the tooltip white. The logo always keeps its original colours. |
| `align` | `left` / `center` / `right` | `center` | Where the tooltip is anchored – use `right` when the badge sits at the far right so the tooltip stays on screen |
| `size` | icon height in px | `30` | |
| `nofollow` | (boolean) | off | Adds `rel="nofollow"` to the link |

The label inherits the font family and size of the surrounding text, e.g. `<uab-badge theme="dark" style="font-size:13px"></uab-badge>`.

Respects `prefers-reduced-motion` (the icon stops spinning).

## Link

Links to https://utavboksen.no/nettside with `utm_source=<site domain>&utm_medium=referral&utm_campaign=utviklet-av`, so Analytics shows which client sites send traffic. Opens in a new tab.

## Development & updates

- Source: `uab-badge.js` (logo SVG sources in `src/`). Build the minified file after changes:

  ```bash
  npx terser uab-badge.js -c -m --comments '/^!/' -o uab-badge.min.js
  ```

- Sites load `@main`, so anything pushed to `main` goes live on every site automatically. jsDelivr caches for up to 12 hours (purge instantly at https://www.jsdelivr.com/tools/purge); browsers may keep the old file for up to 7 days.
- To pin versions instead: create a GitHub Release (e.g. `v1.0.1`) and switch the URL to `@1` – sites then only get releases tagged `v1.x.y`.
- Bump `VERSION` in `uab-badge.js` on every change; the rendered element exposes it as `data-uab-version`, which makes it easy to check what a site is running.
