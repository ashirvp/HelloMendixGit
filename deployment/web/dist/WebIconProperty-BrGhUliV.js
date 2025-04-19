import { AssertionError, asResult, dynAvailable, getStaticResourceUrl } from './index-C0bqjiJG.js';

const WebIconProperty = ({ icon }) => {
  if (!icon)
    throw new AssertionError();
  switch (icon.type) {
    case "image":
      return asResult(dynAvailable({ type: icon.type, iconUrl: getStaticResourceUrl(icon.iconUrl) }));
    case "glyph":
    case "icon":
      return asResult(dynAvailable(icon));
  }
};

export { WebIconProperty };
