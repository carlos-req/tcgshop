import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderSiteOgImage,
} from "./og-image";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = "X-Spelled — Sealed. Authenticated. Yours to open.";

export default function Image() {
  return renderSiteOgImage();
}
