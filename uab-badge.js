/*!
 * Ut av Boksen – «Utviklet av»-badge  v1.0.1
 * https://github.com/kevojuice/uab-badge
 *
 * Bruk:
 *   <script src="https://cdn.jsdelivr.net/gh/kevojuice/uab-badge@main/uab-badge.min.js" defer></script>
 *   <uab-badge theme="light"></uab-badge>   (lys bakgrunn)
 *   <uab-badge theme="dark"></uab-badge>    (mørk bakgrunn)
 *
 * Valgfrie attributter:
 *   align="left|center|right"  – plassering av tooltip-pilen (standard: center)
 *   size="30"                  – høyde på ikonet i px (standard 30)
 *   nofollow                   – legger til rel="nofollow" på lenken
 */
(function () {
  'use strict';
  if (window.customElements && customElements.get('uab-badge')) return;

  var VERSION = '1.0.1';
  var LINK = 'https://utavboksen.no/nettside';
  var LABEL = 'Utviklet av:';
  var TOOLTIP = 'Skal vi jobbe sammen?';

  // Logo-SVG-er fra Ut av Boksen (fargene styres med CSS-variabler, så de kan byttes per tema)
  var ICON =
    '<svg class="icon" viewBox="0 0 77.91 89.71" aria-hidden="true" focusable="false">' +
    '<polygon class="a" points="17.04 12.64 36.07 23.85 19.05 33.52 0 22.64 17.04 12.64"/>' +
    '<polygon class="b" points="19.06 78.48 0 67.25 0 22.64 19.06 33.61 19.06 78.48"/>' +
    '<polygon class="b" points="38.88 89.71 38.88 67.71 21.77 57.89 21.77 80 38.88 89.71"/>' +
    '<polygon class="c" points="77.68 45.46 77.91 67.2 38.88 89.71 38.88 67.71 77.68 45.46"/>' +
    '<polygon class="c" points="77.7 22.64 77.91 42.31 58.7 53.1 58.7 33.61 77.7 22.64"/>' +
    '<polygon class="a" points="19.88 10.84 38.62 0 77.7 22.64 58.7 33.61 19.88 10.84"/>' +
    '</svg>';

  var WORDMARK =
    '<svg class="word" viewBox="0 0 200.27 90.06" role="img" aria-label="Ut av Boksen">' +
    '<g class="t1">' +
    '<path d="M91.25,0v26.54c0,10.22-8.65,14.99-17.31,14.99s-17.31-4.76-17.31-14.99V0h7.43v25.32c0,6.1,4.94,9,9.87,9s9.87-2.9,9.87-9V0h7.43Z"/>' +
    '<path d="M121.92,0v7.26h-11.79v33.4h-7.61V7.26h-11.79V0h31.19Z"/>' +
    '<path d="M168.97,40.66h-8.19l-2.61-6.45h-5.17c-7.49,0-13.88.75-16.15,6.45h-8.19L145.15,0h7.32l16.5,40.66ZM155.32,27.24l-6.51-16.15-7.84,19.4c3.43-2.5,7.43-3.25,12.02-3.25h2.32Z"/>' +
    '<path d="M200.27,0l-16.5,40.66h-7.32L159.96,0h8.19l11.96,29.56L192.08,0h8.19Z"/>' +
    '</g><g class="t2">' +
    '<path d="M15.45,49.05c4.72,0,8.38.93,10.98,2.79,2.59,1.86,3.89,4.49,3.89,7.9,0,2.52-.7,4.55-2.09,6.1-1.39,1.55-3.37,2.56-5.92,3.02,3.02.39,5.35,1.36,7,2.9,1.65,1.55,2.47,3.72,2.47,6.51,0,3.56-1.36,6.36-4.07,8.39-2.71,2.03-6.54,3.05-11.5,3.05H0v-40.66h15.45ZM8.71,65.78h6.97c1.86,0,3.31-.44,4.36-1.34,1.05-.89,1.57-2.09,1.57-3.6s-.52-2.71-1.57-3.6c-1.05-.89-2.5-1.34-4.36-1.34h-6.97v9.87ZM8.71,82.8h7.55c2.09,0,3.71-.44,4.85-1.34,1.14-.89,1.71-2.13,1.71-3.72s-.58-2.95-1.74-3.86c-1.16-.91-2.77-1.37-4.82-1.37h-7.55v10.28Z"/>' +
    '<path d="M69.29,79.98c-1.7,3.16-4.09,5.63-7.14,7.41-3.06,1.78-6.54,2.67-10.46,2.67s-7.4-.89-10.46-2.67c-3.06-1.78-5.44-4.25-7.14-7.41-1.7-3.16-2.56-6.69-2.56-10.6s.85-7.44,2.56-10.6c1.7-3.16,4.08-5.62,7.14-7.41,3.06-1.78,6.54-2.67,10.46-2.67s7.4.89,10.46,2.67c3.06,1.78,5.44,4.25,7.14,7.41,1.7,3.16,2.56,6.69,2.56,10.6s-.85,7.44-2.56,10.6ZM41.82,76.24c.93,2.01,2.25,3.59,3.95,4.73,1.7,1.14,3.68,1.71,5.92,1.71s4.16-.57,5.87-1.71c1.7-1.14,3.02-2.72,3.95-4.73.93-2.01,1.39-4.3,1.39-6.85s-.46-4.84-1.39-6.85c-.93-2.01-2.25-3.59-3.95-4.73-1.7-1.14-3.66-1.71-5.87-1.71s-4.22.57-5.92,1.71c-1.7,1.14-3.02,2.72-3.95,4.73-.93,2.01-1.39,4.3-1.39,6.85s.46,4.84,1.39,6.85Z"/>' +
    '<path d="M72.78,49.11h8.71v18.24l16.26-18.24h10.57l-14.93,16.73,15.92,23.87h-10.45l-11.62-17.13-5.75,6.45v10.69h-8.71v-40.6Z"/>' +
    '<path d="M112.68,76.47c.15,2.01.98,3.63,2.47,4.85,1.49,1.22,3.47,1.83,5.95,1.83,2.05,0,3.73-.44,5.02-1.31,1.3-.87,1.95-2.08,1.95-3.63,0-1.08-.36-1.95-1.07-2.58-.72-.64-1.72-1.14-3.02-1.51-1.3-.37-3.3-.82-6.01-1.36-2.67-.5-4.92-1.15-6.74-1.95-1.82-.79-3.3-1.97-4.44-3.54-1.14-1.57-1.71-3.65-1.71-6.24,0-2.36.65-4.47,1.95-6.33,1.3-1.86,3.1-3.32,5.4-4.39,2.3-1.06,4.91-1.6,7.81-1.6s5.66.55,8.04,1.66c2.38,1.1,4.26,2.62,5.63,4.56,1.37,1.94,2.08,4.12,2.12,6.56h-8.54c-.19-1.74-.93-3.15-2.21-4.21-1.28-1.06-2.96-1.6-5.05-1.6-1.94,0-3.48.41-4.65,1.22-1.16.81-1.74,1.98-1.74,3.49,0,1.08.35,1.93,1.05,2.53.7.6,1.68,1.08,2.96,1.45,1.28.37,3.25.8,5.92,1.31,2.71.5,5,1.13,6.85,1.89,1.86.76,3.36,1.9,4.5,3.43,1.14,1.53,1.71,3.57,1.71,6.13s-.68,4.7-2.03,6.65c-1.36,1.96-3.24,3.49-5.66,4.62-2.42,1.12-5.14,1.68-8.16,1.68-3.25,0-6.15-.59-8.68-1.77-2.54-1.18-4.52-2.82-5.95-4.91-1.43-2.09-2.17-4.43-2.21-7.03l8.54.12Z"/>' +
    '<path d="M137.72,49.05h27.3v7.49h-18.59v9.12h15.1v7.14h-15.1v9.41h19.23v7.49h-27.94v-40.66Z"/>' +
    '<path d="M166.53,89.71v-40.66h7.9l17.25,25.62v-25.62h8.6v40.66h-7.96l-17.25-25.62v25.62h-8.54Z"/>' +
    '</g></svg>';

  var CSS =
    ':host{display:inline-block;line-height:1;vertical-align:middle;' +
    '--uab-label:#2d3337;--uab-t1:#016676;--uab-t2:#03aca8;' +
    '--uab-ic-a:#03aca8;--uab-ic-b:#062430;--uab-ic-c:#016676;' +
    '--uab-tip-bg:#062430;--uab-tip-fg:#03aca8;--uab-size:30px}' +
    // Mørk versjon: logoen beholder originalfargene – bare teksten og tooltipen endres
    ':host([theme="dark"]){--uab-label:rgba(255,255,255,.82);' +
    '--uab-tip-bg:#ffffff;--uab-tip-fg:#016676}' +
    'a{position:relative;display:inline-flex;align-items:center;gap:10px;color:var(--uab-label);' +
    'text-decoration:none;font:inherit;font-size:inherit;-webkit-tap-highlight-color:transparent}' +
    'a:focus-visible{outline:2px solid var(--uab-t2);outline-offset:4px;border-radius:4px}' +
    '.label{white-space:nowrap}' +
    '.word{height:calc(var(--uab-size)*.78);width:auto;display:block}' +
    '.word .t1{fill:var(--uab-t1)}.word .t2{fill:var(--uab-t2)}' +
    '.icon{height:var(--uab-size);width:auto;display:block;animation:uab-spin 6s linear infinite;transform-origin:50% 50%}' +
    '.icon .a{fill:var(--uab-ic-a)}.icon .b{fill:var(--uab-ic-b)}.icon .c{fill:var(--uab-ic-c)}' +
    '@keyframes uab-spin{to{transform:rotate(360deg)}}' +
    '.tip{position:absolute;bottom:calc(100% + 12px);left:50%;transform:translate(-50%,6px) scale(.9);' +
    'opacity:0;pointer-events:none;transition:opacity .2s ease,transform .25s cubic-bezier(.2,.8,.2,1);' +
    'background:var(--uab-tip-bg);color:var(--uab-tip-fg);font-size:.75rem;font-weight:500;letter-spacing:.01em;' +
    'padding:.75em 1.4em;border-radius:10px;white-space:nowrap;box-shadow:0 6px 20px rgba(0,0,0,.18)}' +
    '.tip::after{content:"";position:absolute;top:100%;left:50%;width:8px;height:8px;background:var(--uab-tip-bg);' +
    'transform:translate(-50%,-50%) rotate(45deg)}' +
    ':host([align="right"]) .tip{left:auto;right:0;transform:translateY(6px) scale(.9);transform-origin:100% 100%}' +
    ':host([align="right"]) .tip::after{left:auto;right:18px;transform:translateY(-50%) rotate(45deg)}' +
    ':host([align="left"]) .tip{left:0;transform:translateY(6px) scale(.9);transform-origin:0 100%}' +
    ':host([align="left"]) .tip::after{left:18px;transform:translateY(-50%) rotate(45deg)}' +
    'a:hover .tip,a:focus-visible .tip{opacity:1;transform:translate(-50%,0) scale(1)}' +
    ':host([align="right"]) a:hover .tip,:host([align="right"]) a:focus-visible .tip,' +
    ':host([align="left"]) a:hover .tip,:host([align="left"]) a:focus-visible .tip{transform:translateY(0) scale(1)}' +
    '@media (prefers-reduced-motion:reduce){.icon{animation:none}.tip{transition:none}}';

  function buildHref() {
    var host = (location.hostname || '').replace(/^www\./, '');
    var sep = LINK.indexOf('?') === -1 ? '?' : '&';
    return LINK + sep + 'utm_source=' + encodeURIComponent(host || 'ukjent') +
      '&utm_medium=referral&utm_campaign=utviklet-av';
  }

  var Badge = function () { return Reflect.construct(HTMLElement, [], Badge); };
  Badge.prototype = Object.create(HTMLElement.prototype);
  Badge.prototype.constructor = Badge;
  Object.setPrototypeOf(Badge, HTMLElement);
  Object.defineProperty(Badge, 'observedAttributes', { get: function () { return ['size', 'nofollow']; } });

  Badge.prototype.connectedCallback = function () {
    if (this.shadowRoot) return;
    var root = this.attachShadow({ mode: 'open' });
    var rel = 'noopener' + (this.hasAttribute('nofollow') ? ' nofollow' : '');
    root.innerHTML =
      '<style>' + CSS + '</style>' +
      '<a part="link" href="' + buildHref() + '" target="_blank" rel="' + rel + '" aria-label="' + LABEL + ' Ut av Boksen – ' + TOOLTIP + '">' +
      '<span class="label" part="label">' + LABEL + '</span>' + WORDMARK + ICON +
      '<span class="tip" part="tooltip" aria-hidden="true">' + TOOLTIP + '</span>' +
      '</a>';
    this.applySize();
    this.setAttribute('data-uab-version', VERSION);
  };

  Badge.prototype.attributeChangedCallback = function () { this.applySize(); };

  Badge.prototype.applySize = function () {
    var s = parseFloat(this.getAttribute('size'));
    if (s > 0) this.style.setProperty('--uab-size', s + 'px');
  };

  customElements.define('uab-badge', Badge);
})();
