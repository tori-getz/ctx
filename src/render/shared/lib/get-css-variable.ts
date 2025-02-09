export const getCSSVariable = (varName: string): string => {
  const style = window.getComputedStyle(document.body);
  return style.getPropertyValue(varName);
};
