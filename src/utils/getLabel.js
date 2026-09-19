/**
 * Resolve the first translation that is available for the given keys.
 *
 * Home Assistant removed `hass.resources` (the translation map this card used
 * to read from), so translations have to be resolved through `hass.localize()`.
 * `hass.localize()` returns an empty string for keys it does not know, which
 * makes it safe to probe several candidate keys: the current translation keys
 * first, the legacy ones as a fallback.
 */
const getLabel = (hass, labels, fallback = 'unknown') => {
  if (!hass || typeof hass.localize !== 'function')
    return fallback;

  const keys = Array.isArray(labels) ? labels : [labels];

  for (let i = 0; i < keys.length; i += 1) {
    const label = hass.localize(keys[i]);

    if (label)
      return label;
  }

  return fallback;
};

export default getLabel;
