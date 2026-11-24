// FSRS-4.5 spaced-repetition scheduler (open-spaced-repetition, default weights).
// Ratings: 1 = again (wrong), 2 = hard (almost), 3 = good, 4 = easy.
const W = [0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474, 0.1367,
  1.0461, 2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755];
const DECAY = -0.5, FACTOR = 19 / 81, DAY = 864e5;
const clampD = d => Math.min(10, Math.max(1, d));

export const retrievability = (card, now = Date.now()) =>
  card.s ? Math.pow(1 + FACTOR * Math.max(0, now - card.last) / DAY / card.s, DECAY) : 0;

const initD = g => clampD(W[4] - (g - 3) * W[5]);

export function interval(s, retention) {
  const days = (s / FACTOR) * (Math.pow(retention, 1 / DECAY) - 1);
  return Math.min(3650, Math.max(1, Math.round(days)));
}

export function review(card, g, retention = 0.9, now = Date.now()) {
  const c = { ...card };
  if (!c.s) {
    c.s = W[g - 1];
    c.d = initD(g);
  } else {
    const r = retrievability(c, now);
    const d = clampD(c.d - W[6] * (g - 3));
    c.d = clampD(W[7] * initD(4) + (1 - W[7]) * d);
    if (g === 1) {
      c.s = Math.min(c.s, W[11] * Math.pow(card.d, -W[12]) * (Math.pow(c.s + 1, W[13]) - 1) * Math.exp(W[14] * (1 - r)));
      c.lapses = (c.lapses || 0) + 1;
    } else {
      const hard = g === 2 ? W[15] : 1, easy = g === 4 ? W[16] : 1;
      c.s = c.s * (Math.exp(W[8]) * (11 - card.d) * Math.pow(c.s, -W[9]) * (Math.exp(W[10] * (1 - r)) - 1) * hard * easy + 1);
    }
  }
  c.reps = (c.reps || 0) + 1;
  c.last = now;
  // A miss comes back within the same day-ish window; otherwise use the FSRS interval.
  c.due = g === 1 ? now + 10 * 60e3 : now + interval(c.s, retention) * DAY;
  return c;
}
