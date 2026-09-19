import getLabel from '../utils/getLabel';
import ICON, { STATES_OFF, UNAVAILABLE_STATES } from '../const';

export default class ClimateObject {
  constructor(hass, config, entity) {
    this.hass = hass || {};
    this.config = config || {};
    this.entity = entity || {};
    this.state = entity.state;
    this.attr = {
      friendly_name: '',
      temperature: 16,
      current_temperature: 24,
      fan_mode: '',
      hvac_modes: [],
      target_temp_step: undefined,
      min_temp: undefined,
      max_temp: undefined,
      hvac_action: '',
      fan_modes: [],
      ...entity.attributes || {},
    };
  }

  /**
   * Home Assistant exposes `hass.formatEntityState()` (2023.4) and
   * `hass.formatEntityAttributeValue()` (2023.9). They resolve the translations
   * of the integration that owns the entity, including custom hvac modes and
   * fan modes of third party integrations, which the hard coded translation
   * keys of `getLabel()` cannot do. `getLabel()` is the fallback for older
   * Home Assistant versions.
   */
  formatState(state, labels) {
    const { hass, entity } = this;

    if (!entity.entity_id || typeof hass.formatEntityState !== 'function')
      return getLabel(hass, labels, state);

    const name = hass.formatEntityState(entity, state);

    return name || getLabel(hass, labels, state);
  }

  formatAttributeValue(attribute, value, labels) {
    const { hass, entity } = this;

    if (value === undefined || value === null || !entity.entity_id
      || typeof hass.formatEntityAttributeValue !== 'function')
      return getLabel(hass, labels, value);

    const name = hass.formatEntityAttributeValue(entity, attribute, value);

    return name || getLabel(hass, labels, value);
  }

  get lastChanged() {
    return this.entity.last_changed;
  }

  get lastUpdated() {
    return this.entity.last_updated;
  }

  get hvacAction() {
    const source = (this.config.secondary_info && this.config.secondary_info.source) || {};
    const action = this.attr.hvac_action;
    let item = { id: action };
    item.name = this.formatAttributeValue('hvac_action', action, [
      `component.climate.entity_component._.state_attributes.hvac_action.state.${action}`,
      `state_attributes.climate.hvac_action.${action}`,
    ]);

    if (action in source) {
      if (typeof source[action] === 'string')
        item.name = source[action];
      else
        item = { ...item, ...source[action] };
    }

    return item;
  }

  get mode() {
    return this._hvac_mode;
  }

  set mode(value) {
    this._hvac_mode = value;
  }

  get defaultHvacModes() {
    const hvacModes = this.attr.hvac_modes;
    const source = [];

    for (let i = 0; i < hvacModes.length; i += 1) {
      const hvacMode = hvacModes[i];
      const labels = [
        `component.climate.entity_component._.state.${hvacMode}`,
        `component.climate.state._.${hvacMode}`,
        `state.climate.${hvacMode}`,
      ];
      const item = { id: hvacMode, name: this.formatState(hvacMode, labels) };
      const iconId = hvacMode.toString().toUpperCase();
      if (iconId in ICON)
        item.icon = ICON[iconId];

      source.push(item);
    }
    return source;
  }

  get defaultFanModes() {
    const fanModes = this.attr.fan_modes;
    const source = {};

    for (let i = 0; i < fanModes.length; i += 1) {
      const mode = fanModes[i];
      source[mode] = this.formatAttributeValue('fan_mode', mode, [
        `component.climate.entity_component._.state_attributes.fan_mode.state.${mode}`,
        `state_attributes.climate.fan_mode.${mode}`,
      ]);
    }
    return source;
  }

  get id() {
    return this.entity.entity_id;
  }

  get icon() {
    return this.attr.icon;
  }

  get name() {
    return this.attr.friendly_name || '';
  }

  get isOff() {
    return this.entity !== undefined
      && STATES_OFF.includes(this.state)
      && !UNAVAILABLE_STATES.includes(this.state);
  }

  get isActive() {
    return (this.isOff === false && this.isUnavailable === false) || false;
  }

  get isUnavailable() {
    return this.entity === undefined || UNAVAILABLE_STATES.includes(this.state);
  }

  get isOn() {
    return this.entity !== undefined
      && !STATES_OFF.includes(this.state)
      && !UNAVAILABLE_STATES.includes(this.state);
  }

  callService(domain, service, inOptions) {
    return this.hass.callService(domain, service, {
      entity_id: this.config.entity,
      ...inOptions,
    });
  }
}
