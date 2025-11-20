import React from "react";

// Explicit SVG re-exports (add more if you have more files)
import Exclude1 from "./Exclude1.svg";
import Notch from "./Notch.svg";
import MobileSignal from "./Mobile-Signal.svg";
import RecordingIndicator from "./Recording-Indicator.svg";
import IconChevronLeft from "./Icon-Chevron-Left.svg";
// If other svg files exist in assets (BatteryBody, CombinedShape, etc.), add them here:
// import BatteryBody from "./Battery-Body.svg";
// import CombinedShape from "./Combined-Shape.svg";
// import BatteryTerminal from "./Battery-Terminal.svg";

/**
 * Safe placeholder component used for generic imports like:
 * import Component from "../assets/";
 * This prevents Metro resolution errors and keeps UIs from crashing.
 * Replace placeholders with concrete SVG exports above when ready.
 */
const Placeholder = (props) => {
  // Return null (no visual output). Accepts props so JSX usage like <Component width=.../> won't crash.
  return null;
};

// Named exports for actual SVGs
export { Exclude1, Notch, MobileSignal, RecordingIndicator, IconChevronLeft };

// Export placeholders for generic imports used across files
export const Component = Placeholder;
export const Component1 = Placeholder;
export const Component2 = Placeholder;

// Default export is a React component (keeps `import X from "../assets/";` usage safe)
export default Placeholder;
