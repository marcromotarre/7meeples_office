export const isRecommended = (votes) => {
  const { best, no, recommended } = votes;
  const total = best + no + recommended;
  if ((recommended + best) / total >= 0.7) return true;
  return false;
};

export const isBest = (votes) => {
  const { best, no, recommended } = votes;
  const total = best + no + recommended;
  if (best / total >= 0.5) return true;
  return false;
};
