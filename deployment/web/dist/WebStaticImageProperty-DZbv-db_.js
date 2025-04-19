import { asProperty, fromConstant$, dynAvailable, getStaticResourceUrl } from './index-C0bqjiJG.js';

const WebStaticImageProperty = asProperty((config) => {
  return fromConstant$(dynAvailable({ uri: getStaticResourceUrl(config.image.uri), name: (uri = config.image.uri, /([^/$]+?)(\?|$)/.exec(uri)?.[1] ?? "") }));
  var uri;
});

export { WebStaticImageProperty };
