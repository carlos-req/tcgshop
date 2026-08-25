import { ImageResponse } from "next/og";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

export function renderSiteOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#15130f",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #221d16 0%, #15130f 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 600,
            color: "#c89b3c",
            letterSpacing: -2,
          }}
        >
          X-Spelled
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "#ede6d6",
          }}
        >
          Sealed. Authenticated. Yours to open.
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
}
