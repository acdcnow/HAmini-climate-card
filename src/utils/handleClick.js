/**
 * Fire a Home Assistant event.
 *
 * Both `composed` and `bubbles` are needed: the event has to cross the shadow
 * boundaries of the card (composed) *and* it has to bubble up to the
 * `home-assistant` element that is listening for it (bubbles).
 */
const fireEvent = (node, type, detail) => {
  const event = new Event(type, { bubbles: true, composed: true });
  event.detail = detail;
  node.dispatchEvent(event);
};

/**
 * Call a service.
 *
 * Home Assistant 2024.8 renamed the `call-service` action to `perform-action`,
 * `service`/`service_data` became `perform_action`/`data`. Both spellings are
 * supported so existing configurations keep working.
 */
const performAction = (hass, config) => {
  const action = config.perform_action || config.service;

  if (!action)
    return;

  const [domain, service] = action.split('.', 2);
  const serviceData = { ...config.service_data, ...config.data };

  hass.callService(domain, service, serviceData, config.target);
};

export default (node, hass, config, entityId) => {
  if (!config)
    return;

  // eslint-disable-next-line default-case
  switch (config.action) {
    case 'more-info': {
      fireEvent(node, 'hass-more-info', {
        entityId: config.entity || entityId,
      });
      break;
    }
    case 'navigate': {
      if (!config.navigation_path) return;

      // keep HA's history bookkeeping (panel/dialog state) intact
      window.history.pushState({ ...window.history.state }, '', config.navigation_path);
      fireEvent(window, 'location-changed', { replace: false });
      break;
    }
    case 'perform-action':
    case 'call-service': {
      performAction(hass, config);
      break;
    }
    case 'fire-dom-event': {
      fireEvent(node, 'll-custom', { ...config });
      break;
    }
    case 'url': {
      const url = config.url_path || config.url;

      if (!url) return;
      window.location.href = url;
      break;
    }
  }
};
