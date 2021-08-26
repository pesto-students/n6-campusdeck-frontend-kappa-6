function compactNumber(num) {
  // setting the maximum range for each number group
  const ranges = [
    { divider: 1e9, suffix: "g" },
    { divider: 1e6, suffix: "m" },
    { divider: 1e3, suffix: "k" }
  ];

  // for negative numbers, prepend the negative signs
  if (num < 0) {
    return `-${compactNumber(-num)}`;
  }

  /* loop through the ranges and identify the range in which 'num' falls and
  append the appropriate suffix */
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];

    if (num >= range.divider) {
      return `${(num / range.divider).toFixed(1)}${range.suffix}`;
    }
  }

  return num;
}

export { compactNumber };
