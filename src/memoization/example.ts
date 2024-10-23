const memoization: any = {};

const memoize = (n: number) => {
  if (memoization[n]) {
    return memoization[n];
  }

  if (n === 10) {
    for (let i = 0; i <= 10000000000; i++) {
      // delay
      //console.log(i)
    }
  }
  memoization[n] = n + 1;

  return n + 1;
};
console.time("memoize");
const result = memoize(10);
console.log(result);
console.timeEnd("memoize");
