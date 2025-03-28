export const lerp = (start: number, end: number, factor: number): number =>
  start + (end - start) * factor;

export const config = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.05,
  BUFFER_SIZE: 15,
  CLEANUP_THRESHOLD: 50,
  MAX_VELOCITY: 120,
  SNAP_DURATION: 500,
};
