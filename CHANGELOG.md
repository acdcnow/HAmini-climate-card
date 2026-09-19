# Changelog

All notable changes to this project are documented in this file.
The format is based on the version tags of this repository; the unabridged, per-release notes are kept in [`release_notes/`](release_notes).

## v2.8.0

First stable release of this fork: full **Home Assistant 2026.9** compatibility (tested against
`home-assistant-frontend 20260826.7`). Consolidates `v2.8.0-beta.1` and `v2.8.0-beta.2` — no functional
change since `v2.8.0-beta.2`.

### FIXED
- **Mode names / labels were not resolved**: `getLabel()` read the removed `hass.resources` map;
  translations now go through `hass.localize()`.
- **`more-info` / `navigate` tap actions did nothing**: `hass-more-info` and `location-changed` were
  fired without `bubbles: true`, so they never reached the `home-assistant` element listening for them.
- **`target_temperature.change_action` received an undefined `climate_entity`**
  (`this.hass[this.config.entity]` → `this.hass.states[this.config.entity]`).
- **Icon buttons rendered at the new 48 px default size**: `--mdc-icon-button-size` →
  `--ha-icon-button-size`.
- `--more-info` was applied even with `tap_action: none`, and a string `tap_action` was not normalized.

### ADDED
- `action: perform-action` (`perform_action` / `data` / `target`) and `url_path` — the spellings
  introduced in HA 2024.8. `call-service` / `service` / `service_data` / `url` keep working.
- Mode names resolved with `hass.formatEntityState()` / `hass.formatEntityAttributeValue()` when available.
- Modern theme variable `--state-icon-color` and the current translation keys for mode labels.

### CHANGED
- Repository renamed `HAmini-climate-card` → `mini-climate-card`.
- `hacs.json`: `hide_default_branch` — HACS installs from releases instead of the default branch.
- GitHub Actions: Node 24 based action versions; tags containing `-` publish pre-releases.

## v2.8.0-beta.2

Repository renamed to `mini-climate-card` and documentation refreshed. The only change that affects the
built card is the repository URL used by the card picker.

### CHANGED
- The GitHub repository was renamed `acdcnow/HAmini-climate-card` → `acdcnow/mini-climate-card`.
  GitHub redirects the old URLs; HACS installs go to `www/community/mini-climate-card`.
- The card picker `documentationURL` points at the new repository name — the only difference in
  `mini-climate-card-bundle.js` compared to `v2.8.0-beta.1`.
- `README.md`: badges, install/update/`wget`/clone URLs and the custom-repository instructions updated
  for the new repository name; the current pre-release is listed in the notice.
- `info.md` (the file HACS displays): the version badge now includes pre-releases, the changelog link
  points at the release page, and the 2026.9 highlights are summarised.
- `package.json`: `repository`/`homepage`/`bugs` point at the new repository name.

### NOTE
- Pre-release: enable *Show beta versions* in HACS to install it, or download the release asset.

## v2.8.0-beta.1

Home Assistant **2026.9** compatibility release (tested against `home-assistant-frontend 20260826.7`).

### FIXED
- **Mode names were not rendered / labels could not be resolved**: `getLabel()` read the translations
  from `hass.resources`, a map that no longer exists in the Home Assistant frontend. Translations are
  now resolved through `hass.localize()`.
- **`more-info` and `navigate` tap actions did nothing**: the `hass-more-info` and `location-changed`
  events were dispatched with `composed: true` but without `bubbles: true`, so they never reached the
  `home-assistant` element listening for them.
- **Custom `target_temperature.change_action` received an undefined `climate_entity`**
  (`this.hass[this.config.entity]` → `this.hass.states[this.config.entity]`).
- **Icon buttons were rendered in the new 48px default size**: `ha-icon-button` replaced
  `--mdc-icon-button-size` with `--ha-icon-button-size`.
- `--more-info` was applied even with `tap_action: none`, and the string form of `tap_action` was not normalized.

### ADDED
- `action: perform-action` support (`perform_action`, `data`, `target`) — the spelling introduced in HA 2024.8.
  `call-service`, `service` and `service_data` keep working.
- `url_path` support for the `url` tap action (`url` keeps working).
- Mode names are resolved with `hass.formatEntityState()` / `hass.formatEntityAttributeValue()` when available.
- Modern theme variables are preferred: `--state-icon-color`.

### CHANGED
- Repository, CI and release links point to this fork; `hacs.json` and `info.md` updated.
- GitHub Actions modernized; tags with a `-` suffix are published as pre-releases.

## v2.7.4
- fix: translations are resolved with `hass.localize()` instead of the removed `hass.resources` by @wolfie6

## v2.7.3
- fix: custom `change_action` for `target_temperature` did not work #165 by @regevbr

## v2.7.2
- fix: `target_temperature` unit not working #151 by @regevbr

## v2.7.1
- feature: Add ability to override `ha-card-box-shadow` #122 by @regevbr

## v2.7.0
- fix: Update to new lit version #137 by @regevbr

## v2.6.2
- fix: Dropdown not working in android app #124 by @regevbr

## v2.6.1
- fix: remove border when in group mode #122 by @regevbr

## v2.6.0
- feature: add custom style functionality to indicators value by @regevbr

## v2.5.0
- feature: add hide functionality to indicators by @regevbr and @adi90x
- feature: hide can now be a function by @regevbr

## v2.4.5
- fix: Buttons style not updated on entity state #113 by @regevbr

## v2.4.4
- fix: frontend border to match new HA styles by @SanchosPancho

## v2.4.3
- fix: Icon color wont change with state when on by @regevbr

## v2.4.2
- fix: Border when embedded since 2022.11.0 #106 by @regevbr
- fix: Icon color wont change with state when on #108 by @regevbr

## v2.4.1
- fix: fix support for fire-dom-event action to interact with browser mod by @regevbr

## v2.4.0
- feature: add support for fire-dom-event action to interact with browser mod by @regevbr

## v2.3.1
- fix: target temperature shows NaN with 0.x step size by @regevbr

## v2.3.0
- feature: hide secondary_info option by @regevbr

## v2.2.1
- task: move ci to Github Actions by @regevbr

## v2.2.0
- feature: you can now add the card from the card picker by @regevbr

## v2.1.3
- fix: race condition caused icons not to render by @regevbr

## v2.1.2
- implemented #39: Ability to hide current temperature by @mishnz
- updated Lit dependencies by @regevbr

## v2.1.1
- implemented #78: Add last-updated as an option for secondary_info type by @parrel

## v2.1.0
- fix #51: Add ability to swap target and actual temperature by @parrel

## v2.0.3
- fix #37: 'style' option has no effect by @regevbr

## v2.0.2
- fix #72: selected value in dropdown lists is not highlighted by @regevbr

## v2.0.1
- fix: mobile popup issues by @regevbr

## v2.0.0
- fix #66: 2022.3.X Breaks dropdown #67 by @regevbr

## v1.2.10
- fix: icons not showing in new HA version #53 by @regevbr
- add heat-cool, supported by Nest Thermostat #52 by @GuyLewin

## v1.2.9
- fix: show a placeholder ('-') when no target temperature #50 by @GuyLewin

## v1.2.8
- fix: forced TargetTemperature as Float #48 by @straccio

## v1.2.7
- fix: for ha >= 0.113.0 added theme variable `--card-background-color`

## v1.2.6
- fix: variable `ha-card-border-radius` added to styles, for rounding the edges of the card in various themes

## v1.2.5
- added sort order for dropdown

## v1.2.4
- fix: styles fixed #23 (when the toggle_button is hidden)

## v1.2.3
- added the ability to hide `hvac_mode` #15

## v1.2.2
- added the ability to set a fixed number of decimal places for temperature

## v1.2.1
- added new `secondary_info` types: `hvac-action` #9 and `fan-mode-dropdown` #10
- added the ability to make buttons on the main screen

## v1.1.0
- fix: smoothness of change of the set temperature
- automatic calculation of the max-width of the entity name #6
- added an instant state change with an `action_timeout` rollback (default `2000` ms)
- added indicator `tap_action` configuration #5
- added `secondary_info` types `[last-changed, fan-mode, hvac-mode]`, default `fan-mode`

## v1.0.3
- fix: temperature config #3

## v1.0.2
- added group property for display in `entities` container
- added toggle button configuration
- fix: Cannot set property '__init' of undefined #2

## v1.0.1
- initial release
