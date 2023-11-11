export const generateHex = (): string => {
  const hex = (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
  return "#" + hex;
};
