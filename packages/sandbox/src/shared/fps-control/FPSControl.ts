/*
    by Dag Jomar Mersland
    @dagjomar
*/

const INTERVAL = 500;

import { Map } from "maplibre-gl";
import { median, average, standardDeviation, variance } from "./arr-stat.ts";

const now = function () {
  if (window && window.performance) {
    return window.performance.now();
  }

  return Date.now();
};

export class FPSMeasurer {
  framesCounter: number;
  lastFPSTimestamp: number | null;
  lastFPSMeasure: number;
  measurements: number[];
  lastMeasurementTimestamp: number | null;
  started: boolean;

  constructor() {
    this.framesCounter = 0;
    this.lastFPSTimestamp = null;
    this.lastFPSMeasure = 0;

    this.measurements = [];
    this.lastMeasurementTimestamp = null;

    this.started = false;
  }

  startMeasuring(time?: number) {
    this.started = true;
    this.updateFPS();

    if (time && !isNaN(time) && time > 0) {
      setTimeout(this.stopMeasuring.bind(this), time);
    }
  }

  stopMeasuring() {
    this.started = false;
  }

  registerRenderFrame = () => {
    if (!this.started) {
      return;
    }

    this.framesCounter++;
    this.updateFPS();
  };

  getLastMeasurement() {
    const last = this.measurements.length ? this.measurements[this.measurements.length - 1] : 0;
    return last;
  }

  updateFPS() {
    if (this.lastFPSTimestamp === null) {
      this.lastFPSTimestamp = now();
    }
    const timestamp = now(); //console.log('@@ updateFPS', timestamp, this);
    const delta = timestamp - this.lastFPSTimestamp;

    if (delta > INTERVAL) {
      const fps = Math.round((this.framesCounter / (delta / 1000)) * 10) / 10; // Round to 1 decimal
      this.lastFPSTimestamp = timestamp;
      this.framesCounter = 0; // Reset the framesCounter

      this.recordMeasurement(fps);
    }
  }

  recordMeasurement(fps: number) {
    this.measurements.push(fps);
  }

  getMeasurements() {
    const copy = this.measurements.slice();
    return copy;
  }

  getMeasurementsReport() {
    const measurements = this.getMeasurements();
    const report = {
      measurements: measurements,
      median: Number(median(measurements).toFixed(1)),
      average: Number(average(measurements).toFixed(1)),
      variance: Number(variance(measurements).toFixed(1)),
      stdDev: Number(standardDeviation(measurements).toFixed(1)),
    };

    return report;
  }
}

export class FPSControl {
  measurer: FPSMeasurer;
  lastFPSMeasure: number | null;
  _map?: Map;
  _container: HTMLDivElement;

  constructor() {
    this.measurer = new FPSMeasurer();

    this.lastFPSMeasure = null;

    this._container = document.createElement("div");
    this._container.className = "fps-control maplibregl-ctrl-group maplibregl-ctrl";
  }

  updateFPSCounter = () => {
    const fps = this.measurer.getLastMeasurement();
    if (fps === this.lastFPSMeasure) {
      return;
    }
    this._container.innerHTML = fps.toFixed(1);
  };

  onAdd(map: Map) {
    this._map = map;

    this.addEventListeners();
    this.measurer.startMeasuring();
    return this._container;
  }

  remove() {
    this.onRemove();
  }

  onRemove() {
    this.removeEventListeners();
    this.measurer.stopMeasuring();
    this._container.remove();
  }

  addEventListeners() {
    this._map?.on("render", this.measurer.registerRenderFrame);
    this._map?.on("render", this.updateFPSCounter);
    // this.updateInterval = setInterval( this.updateFPSCounter.bind(this), 1000);
  }

  removeEventListeners() {
    this._map?.off("render", this.measurer.registerRenderFrame);
    this._map?.off("render", this.updateFPSCounter);
  }
}
