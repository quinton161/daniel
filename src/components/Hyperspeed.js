import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';

import './Hyperspeed.css';

const Hyperspeed = ({ effectOptions = {
  onSpeedUp: () => { },
  onSlowDown: () => { },
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xFFFFFF,
    brokenLines: 0xFFFFFF,
    leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
    rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
    sticks: 0x03B3C3,
  }
} }) => {
  const hyperspeed = useRef(null);

  useEffect(() => {
    const mountainUniforms = {
      uFreq: { value: new THREE.Vector3(3, 6, 10) },
      uAmp: { value: new THREE.Vector3(30, 30, 20) }
    };

    const xyUniforms = {
      uFreq: { value: new THREE.Vector2(5, 2) },
      uAmp: { value: new THREE.Vector2(25, 15) }
    };

    const LongRaceUniforms = {
      uFreq: { value: new THREE.Vector2(2, 3) },
      uAmp: { value: new THREE.Vector2(35, 10) }
    };

    const turbulentUniforms = {
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
      uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }
    };

    const deepUniforms = {
      uFreq: { value: new THREE.Vector2(4, 8) },
      uAmp: { value: new THREE.Vector2(10, 20) },
      uPowY: { value: new THREE.Vector2(20, 2) }
    };

    let nsin = val => Math.sin(val) * 0.5 + 0.5;

    const distortions = {
      mountainDistortion: {
        uniforms: mountainUniforms,
        getDistortion: `
          uniform vec3 uAmp;
          uniform vec3 uFreq;
          #define PI 3.14159265358979
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
              nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
            );
          }
        `,
        getJS: (progress, time) => {
          let movementProgressFix = 0.02;
          let uFreq = mountainUniforms.uFreq.value;
          let uAmp = mountainUniforms.uAmp.value;
          let distortion = new THREE.Vector3(
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
            Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
            nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -
            nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,
            nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -
            nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z
          );
          let lookAtAmp = new THREE.Vector3(2, 2, 2);
          let lookAtOffset = new THREE.Vector3(0, 0, -5);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        }
      },
      // ... (rest of the distortions code)
    };

    // Shader code
    const roadBaseFragment = `
      #define USE_FOG;
      varying vec2 vUv; 
      uniform vec3 uColor;
      uniform float uTime;
      #include <roadMarkings_vars>
      ${THREE.ShaderChunk["fog_pars_fragment"]}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        #include <roadMarkings_fragment>
        gl_FragColor = vec4(color, 1.);
        ${THREE.ShaderChunk["fog_fragment"]}
      }
    `;

    const roadMarkings_vars = `
      uniform float uLanes;
      uniform vec3 uBrokenLinesColor;
      uniform vec3 uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
    `;

    const roadMarkings_fragment = `
      uv.y = mod(uv.y + uTime * 0.1, 1.);
      float brokenLineWidth = uBrokenLinesWidthPercentage;
      float lineWidth = 1. / uLanes;
      float brokenLines = step(1. - brokenLineWidth, fract(uv.x * uLanes)) * 
                         step(uBrokenLinesLengthPercentage, fract(uv.y * 100.));
      float shoulderLines = step(1. - uShoulderLinesWidthPercentage, uv.x) + 
                           step(uv.x, uShoulderLinesWidthPercentage);
      color = mix(color, uBrokenLinesColor, brokenLines);
      color = mix(color, uShoulderLinesColor, shoulderLines);
    `;

    const roadFragment = roadBaseFragment
      .replace("#include <roadMarkings_vars>", roadMarkings_vars)
      .replace("#include <roadMarkings_fragment>", roadMarkings_fragment);

    const islandFragment = roadBaseFragment
      .replace("#include <roadMarkings_vars>", "")
      .replace("#include <roadMarkings_fragment>", "");

    const roadVertex = `
      #define USE_FOG;
      uniform float uTime;
      ${THREE.ShaderChunk["fog_pars_vertex"]}
      uniform float uTravelLength;
      varying vec2 vUv;
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x;
        transformed.z += distortion.y;
        transformed.y += -1. * distortion.z;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${THREE.ShaderChunk["fog_vertex"]}
      }
    `;

    const carLightsFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_fragment"]}
      varying vec3 vColor;
      varying vec2 vUv;
      uniform vec2 uFade;
      void main() {
        vec3 color = vec3(vColor);
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(color, alpha);
        if (gl_FragColor.a < 0.0001) discard;
        ${THREE.ShaderChunk["fog_fragment"]}
      }
    `;

    const carLightsVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_vertex"]}
      attribute vec3 aOffset;
      attribute vec3 aMetrics;
      attribute vec3 aColor;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vColor;
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        float radius = aMetrics.r;
        float myLength = aMetrics.g;
        float speed = aMetrics.b;
        transformed.xy *= radius;
        transformed.z *= myLength;
        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
        transformed.xy += aOffset.xy;
        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        vColor = aColor;
        ${THREE.ShaderChunk["fog_vertex"]}
      }
    `;

    const sideSticksFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_fragment"]}
      varying vec3 vColor;
      void main() {
        vec3 color = vec3(vColor);
        gl_FragColor = vec4(color, 1.);
        ${THREE.ShaderChunk["fog_fragment"]}
      }
    `;

    const sideSticksVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_vertex"]}
      attribute float aOffset;
      attribute vec3 aColor;
      attribute vec2 aMetrics;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec3 vColor;
      #include <getDistortion_vertex>
      
      void main() {
        vec3 transformed = position.xyz;
        float width = aMetrics.x;
        float height = aMetrics.y;
        transformed.xy *= vec2(width, height);
        transformed.z += -mod(uTime * 60. * 2. + aOffset, uTravelLength);
        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);
        transformed.y += height / 2.;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${THREE.ShaderChunk["fog_vertex"]}
      }
    `;

    class App {
      constructor(container, options = {}) {
        // ... (previous App class code remains the same)
      }
      // ... (rest of App class methods remain the same)
    }

    // Initialize the app
    const container = hyperspeed.current;
    if (!container) return;

    effectOptions.distortion = distortions[effectOptions.distortion];
    const app = new App(container, effectOptions);
    app.loadAssets().then(app.init);

    return () => {
      if (app) {
        app.dispose();
      }
    };
  }, [effectOptions]);

  return (
    <div id="lights" ref={hyperspeed}></div>
  );
};

export default Hyperspeed; 