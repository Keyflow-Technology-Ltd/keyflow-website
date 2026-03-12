precision highp float;

uniform float uTime;
uniform float uTransition; // 0-1 blend between formations
uniform vec2 uMouse;

attribute float aRandom;
attribute vec3 aTarget;

varying float vAlpha;

void main() {
  vec3 pos = position;

  // Ambient drift
  float drift = sin(uTime * 0.5 + aRandom * 6.28) * 0.1;
  pos.x += drift;
  pos.y += cos(uTime * 0.3 + aRandom * 3.14) * 0.08;

  // Blend toward target formation
  pos = mix(pos, aTarget, uTransition);

  // Mouse repulsion (subtle parallax)
  vec2 mouseDir = pos.xy - uMouse;
  float mouseDist = length(mouseDir);
  if (mouseDist < 1.0) {
    pos.xy += normalize(mouseDir) * (1.0 - mouseDist) * 0.3;
  }

  vAlpha = 0.3 + aRandom * 0.7;
  float size = 1.5 + aRandom * 2.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
