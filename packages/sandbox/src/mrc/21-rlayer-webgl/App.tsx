import {
  CustomRenderMethodInput,
  Map,
  MercatorCoordinate,
} from "maplibre-gl";
import "./App.css";
import "maplibre-theme/icons.default.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/dist/style.css";
import { RLayer, RMap } from "maplibre-react-components";
import { useRef, useState } from "react";

const norway = { lng: 7.5, lat: 58 };

class WebGLLayer {
  declare program: WebGLProgram;
  declare aPos: GLint;
  declare buffer: WebGLBuffer;

  onAdd = (_map: Map, gl: WebGLRenderingContext | WebGL2RenderingContext) => {
    // create GLSL source for vertex shader
    const vertexSource = `#version 300 es
  
        uniform mat4 u_matrix;
        in vec2 a_pos;
        void main() {
            gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
        }`;

    // create GLSL source for fragment shader
    const fragmentSource = `#version 300 es
  
        out highp vec4 fragColor;
        void main() {
            fragColor = vec4(1.0, 0.0, 0.0, 0.5);
        }`;

    // create a vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);

    // create a fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);

    // link the two shaders into a WebGL program
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    this.aPos = gl.getAttribLocation(this.program, "a_pos");

    // define vertices of the triangle to be rendered in the custom style layer
    const helsinki = MercatorCoordinate.fromLngLat({
      lng: 25.004,
      lat: 60.239,
    });
    const berlin = MercatorCoordinate.fromLngLat({ lng: 13.403, lat: 52.562 });
    const kyiv = MercatorCoordinate.fromLngLat({ lng: 30.498, lat: 50.541 });

    // create and initialize a WebGLBuffer to store vertex and color data
    this.buffer = gl.createBuffer();
    const coords = [helsinki.x, helsinki.y, berlin.x, berlin.y, kyiv.x, kyiv.y];
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
  };

  render = (
    gl: WebGLRenderingContext | WebGL2RenderingContext,
    args: CustomRenderMethodInput,
  ) => {
    gl.useProgram(this.program);
    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.program, "u_matrix"),
      false,
      args.defaultProjectionData.mainMatrix,
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.enableVertexAttribArray(this.aPos);
    gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
  };
}

const customLayer = new WebGLLayer();

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);

  return (
    <>
      {showMap && (
        <RMap ref={mapRef} initialCenter={norway} initialZoom={3}>
          <RLayer
            type="custom"
            key="triangle"
            id="triangle"
            render={customLayer.render}
            onAdd={customLayer.onAdd}
          />
        </RMap>
      )}
      <div className="sidebar">
        <div>
          <button onClick={() => console.log(mapRef)}>info</button>
        </div>
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>
            counter {counter}
          </button>
        </div>
        <div>
          <button onClick={() => setShowMap((s) => !s)}>
            {showMap ? "masquer" : "afficher"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
