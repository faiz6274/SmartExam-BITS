import { Dimensions } from "react-native";

/**
 * Get responsive screen dimensions that update on orientation change
 * Usage: const { screenWidth, screenHeight } = useResponsiveDimensions();
 */
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get("window");
  return {
    screenWidth: width,
    screenHeight: height,
  };
};

/**
 * Calculate responsive percentage-based dimensions
 * @param {number} percentage - Percentage of screen dimension (0-100)
 * @param {string} dimension - 'width' or 'height'
 */
export const getResponsiveSize = (percentage, dimension = "width") => {
  const { width, height } = Dimensions.get("window");
  const baseSize = dimension === "width" ? width : height;
  return (baseSize * percentage) / 100;
};