import { vi } from "vitest";

export function setPerformance() {
  window.performance.mark = vi.fn();
  window.performance.clearMeasures = vi.fn();
  window.performance.clearMarks = vi.fn();
}

export function setMatchMedia() {
  // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function setResizeObserver() {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

export function beforeMapTest() {
  setPerformance();
  setMatchMedia();
  setResizeObserver();
  // remove the following when the following is merged and released: https://github.com/Adamfsk/jest-webgl-canvas-mock/pull/5
  (WebGLRenderingContext.prototype as any).bindVertexArray =
    WebGLRenderingContext.prototype.getExtension("OES_vertex_array_object")?.bindVertexArrayOES;
  (WebGLRenderingContext.prototype as any).createVertexArray =
    WebGLRenderingContext.prototype.getExtension("OES_vertex_array_object")?.createVertexArrayOES;
  if (
    !WebGLRenderingContext.prototype.drawingBufferHeight &&
    !WebGLRenderingContext.prototype.drawingBufferWidth
  ) {
    Object.defineProperty(WebGLRenderingContext.prototype, "drawingBufferWidth", {
      get: vi.fn(),
      configurable: true,
    });
    Object.defineProperty(WebGLRenderingContext.prototype, "drawingBufferHeight", {
      get: vi.fn(),
      configurable: true,
    });
  }
}
