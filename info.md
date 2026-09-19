[![Last Version](https://img.shields.io/github/v/release/acdcnow/mini-climate-card?label=release&include_prereleases)](https://github.com/acdcnow/mini-climate-card/releases)
[![CI](https://github.com/acdcnow/mini-climate-card/actions/workflows/ci.yml/badge.svg)](https://github.com/acdcnow/mini-climate-card/actions/workflows/ci.yml)

A minimalistic yet customizable climate card for [Home Assistant](https://github.com/home-assistant/home-assistant) Lovelace UI.

**Current release: [v2.8.0-beta.2](https://github.com/acdcnow/mini-climate-card/releases)** (pre-release — enable *Show beta versions* in HACS to install it)

Updated for **Home Assistant 2026.9**:

- translations are resolved with `hass.localize()` (`hass.resources` no longer exists)
- `tap_action` supports the `perform-action` spelling (`perform_action` / `data` / `target`) and `url_path`
- `more-info`, `navigate` and `fire-dom-event` work again (the events are fired with `bubbles: true`)
- icon buttons use the current `--ha-icon-button-size` and `--state-icon-color` theme variables

<p align="center">
  <img src="https://raw.githubusercontent.com/acdcnow/mini-climate-card/master/images/preview.png" />
</p>

**Check the [repository](https://github.com/acdcnow/mini-climate-card) for all card options and example configurations, and the [releases](https://github.com/acdcnow/mini-climate-card/releases) for the changelog.**
