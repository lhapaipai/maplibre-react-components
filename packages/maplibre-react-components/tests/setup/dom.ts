import "@testing-library/jest-dom/vitest";

// @ts-ignore
window.URL.createObjectURL = () => {
  return null;
};
