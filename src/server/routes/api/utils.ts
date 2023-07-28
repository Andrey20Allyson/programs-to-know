export type Result<D, E = unknown> = {
  ok: true;
  data: D;
} | {
  ok: false;
  error: E;
};