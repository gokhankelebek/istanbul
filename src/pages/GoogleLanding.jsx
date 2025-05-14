import React from "react";
import LandingTemplate from "./LandingTemplate";

export default function GoogleLanding() {
  return (
    <LandingTemplate
      source="google"
      hero="/menu/bowls/beef-lamb.webp"
      headline={
        <>
          Searching lunch on the Strip? <br /> Grab the{" "}
          <span className="text-amber-400">Beef & Lamb Döner Bowl</span>
        </>
      }
      subhead="Fresh halal gyro carved to order—ready in minutes."
      reviewQuotes={[
        { quote: "Best lunch spot near the Strip!", author: "Google Reviewer" },
        { quote: "Delicious and quick service.", author: "Another Google User" },
      ]}
    />
  );
}
