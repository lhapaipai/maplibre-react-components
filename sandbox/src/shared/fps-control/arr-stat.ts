export function max(array: number[]) {
  return Math.max.apply(null, array);
}

export function min(array: number[]) {
  return Math.min.apply(null, array);
}

export function range(array: number[]) {
  return max(array) - min(array);
}

export function midrange(array: number[]) {
  return range(array) / 2;
}

export function sum(array: number[]) {
  let num = 0;
  for (let i = 0, l = array.length; i < l; i++) num += array[i];
  return num;
}

export function average(array: number[]) {
  return sum(array) / array.length;
}

export function median(array: number[]) {
  array.sort(function (a, b) {
    return a - b;
  });
  const mid = array.length / 2;
  return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
}

export function modes(array: number[]) {
  if (!array.length) return [];
  const modeMap: {
    [key: number]: number;
  } = {};
  let maxCount = 0,
    modes: number[] = [];

  array.forEach(function (val) {
    if (!modeMap[val]) modeMap[val] = 1;
    else modeMap[val]++;

    if (modeMap[val] > maxCount) {
      modes = [val];
      maxCount = modeMap[val];
    } else if (modeMap[val] === maxCount) {
      modes.push(val);
      maxCount = modeMap[val];
    }
  });
  return modes;
}

export function variance(array: number[]) {
  const mean = average(array);
  return average(
    array.map(function (num) {
      return Math.pow(num - mean, 2);
    }),
  );
}

export function standardDeviation(array: number[]) {
  return Math.sqrt(variance(array));
}

export function meanAbsoluteDeviationexpor(array: number[]) {
  const mean = average(array);
  return average(
    array.map(function (num) {
      return Math.abs(num - mean);
    }),
  );
}

export function zScores(array: number[]) {
  const mean = average(array);
  const deviation = standardDeviation(array);
  return array.map(function (num) {
    return (num - mean) / deviation;
  });
}
