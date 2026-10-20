# uab-badge – «Utviklet av Ut av Boksen»

Footer-badge for nettsider levert av Ut av Boksen. Ett script, én HTML-tag – fungerer i WordPress (Elementor), Webflow og vanlig HTML. Stilene ligger i Shadow DOM, så temaet på siden kan ikke ødelegge badgen.

## Installasjon

**1. Scriptet (én gang per nettsted)**

```html
<script src="https://cdn.jsdelivr.net/gh/kevojuice/uab-badge@main/uab-badge.min.js" defer></script>
```

- WordPress: WPCode → ny snippet, type HTML, plassering «Site Wide Footer».
- Webflow: Site settings → Custom code → Footer code.

**2. Badgen (der den skal vises, vanligvis nederst i footeren)**

```html
<uab-badge theme="light"></uab-badge>   <!-- lys bakgrunn -->
<uab-badge theme="dark"></uab-badge>    <!-- mørk bakgrunn -->
```

- Elementor: legg til et **HTML**-element i footer-malen og lim inn taggen.
- Webflow: **Embed**-element.

## Valg

| Attributt | Verdi | Standard |
|---|---|---|
| `theme` | `light` / `dark` | `light` |
| `align` | `left` / `center` / `right` – hvor tooltipen festes (bruk `right` når badgen står helt til høyre) | `center` |
| `size` | ikonhøyde i px | `30` |
| `nofollow` | legger til `rel="nofollow"` på lenken | av |

Teksten «Utviklet av:» arver skrifttypen og -størrelsen fra nettstedet.

## Oppdatering

Scriptet hentes fra `@main`, så alt som pushes til `main` går ut til alle nettsteder automatisk (jsDelivr cacher i opptil 12 timer – tøm cachen på https://www.jsdelivr.com/tools/purge for å få det ut med en gang).

Vil du heller låse versjoner: lag en Release `v1.0.0` på GitHub og bytt adressen til `@1` – da får sidene bare oppdateringer som tagges `v1.x.y`.

Bygg etter endringer:

```bash
npx terser uab-badge.js -c -m --comments '/^!/' -o uab-badge.min.js
```

## Lenke

Lenker til https://utavboksen.no/nettside med `utm_source=<domenet>&utm_medium=referral&utm_campaign=utviklet-av`, så man ser i Analytics hvilke kundesider som sender besøk.
