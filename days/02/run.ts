const lines = Deno.readTextFileSync("days/02/input.txt").split("\n");

const idRanges = lines.flatMap((line) => line.split(",")).map((item) => {
  const parts = item.split("-").map(Number);
  const from = parts[0];
  const to = parts[1];
  if (from === undefined || to === undefined) throw new Error();
  return { from, to };
});

const isValidIdPart1 = (id: number) => {
  const stringId = id.toString();
  if (stringId.length % 2 !== 0) return true;
  if (
    stringId.slice(0, stringId.length / 2) ===
      stringId.slice(stringId.length / 2)
  ) return false;
  return true;
};

const part1 = (() => {
  const invalidIds: number[] = [];
  idRanges.forEach(({ from, to }) => {
    for (let i = from; i <= to; i++) {
      if (!isValidIdPart1(i)) {
        invalidIds.push(i);
      }
    }
  });
  return invalidIds.reduce((a, b) => a + b, 0);
})();

const isValidIdPart2 = (id: number) => {
  const stringId = id.toString();
  for (let i = 1; i < stringId.length; i++) {
    if (stringId.length % i !== 0) continue;
    const parts = new Set<string>();
    for (let j = 0; j < stringId.length; j += i) {
      parts.add(stringId.slice(j, j + i));
    }
    if (parts.size === 1) {
      return false;
    }
  }
  return true;
};

const part2 = (() => {
  const invalidIds: number[] = [];
  idRanges.forEach(({ from, to }) => {
    for (let i = from; i <= to; i++) {
      if (!isValidIdPart2(i)) {
        invalidIds.push(i);
      }
    }
  });
  return invalidIds.reduce((a, b) => a + b, 0);
})();

console.log(part1);
console.log(part2);
