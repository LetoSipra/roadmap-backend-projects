type LengthUnit =
  | "millimeter"
  | "centimeter"
  | "meter"
  | "kilometer"
  | "inch"
  | "foot"
  | "yard"
  | "mile";
const lengthToMeter: Record<LengthUnit, number> = {
  millimeter: 0.001,
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

export function convertLength(
  value: number,
  from: LengthUnit,
  to: LengthUnit
): number {
  const meters = value * lengthToMeter[from];
  return meters / lengthToMeter[to];
}

// Weight conversion factors to grams
type WeightUnit = "milligram" | "gram" | "kilogram" | "ounce" | "pound";
const weightToGram: Record<WeightUnit, number> = {
  milligram: 0.001,
  gram: 1,
  kilogram: 1000,
  ounce: 28.349523125,
  pound: 453.59237,
};

export function convertWeight(
  value: number,
  from: WeightUnit,
  to: WeightUnit
): number {
  const grams = value * weightToGram[from];
  return grams / weightToGram[to];
}

// Temperature conversions
type TempUnit = "Celsius" | "Fahrenheit" | "Kelvin";

export function convertTemperature(
  value: number,
  from: TempUnit,
  to: TempUnit
): number {
  let celsius: number;
  switch (from) {
    case "Celsius":
      celsius = value;
      break;
    case "Fahrenheit":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "Kelvin":
      celsius = value - 273.15;
      break;
  }
  switch (to) {
    case "Celsius":
      return celsius;
    case "Fahrenheit":
      return (celsius * 9) / 5 + 32;
    case "Kelvin":
      return celsius + 273.15;
  }
}
