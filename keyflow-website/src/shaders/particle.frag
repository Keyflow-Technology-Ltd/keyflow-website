precision highp float;

uniform vec3 uColor;
varying float vAlpha;

void main() {
  // Soft circle
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  float alpha = vAlpha * smoothstep(0.5, 0.2, dist);
  gl_FragColor = vec4(uColor, alpha);
}
