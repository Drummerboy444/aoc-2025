const lines = Deno.readTextFileSync("days/01/input.txt").split("\n");

type Direction = "L" | "R";

const instructions = lines.map((line) => {
  const direction = line[0] as Direction;
  const magnitude = parseInt(line.slice(1));
  return { direction, magnitude };
});

const modulo = (a: number, b: number) => {
  const answer = a % b;
  return answer >= 0 ? answer : answer + b;
};

const part1 = (() => {
  let position = 50;
  let zeroCount = 0;
  instructions.forEach(({ direction, magnitude }) => {
    switch (direction) {
      case "L": {
        position = modulo(position - magnitude, 100);
        break;
      }
      case "R": {
        position = modulo(position + magnitude, 100);
      }
    }
    if (position === 0) zeroCount++;
  });
  return zeroCount;
})();

const part2 = (() => {
  let position = 50;
  let zeroCount = 0;
  instructions.forEach(({ direction, magnitude }) => {
    for (let i = 0; i < magnitude; i++) {
      switch (direction) {
        case "L": {
          position = modulo(position - 1, 100);
          break;
        }
        case "R": {
          position = modulo(position + 1, 100);
        }
      }
      if (position === 0) zeroCount++;
    }
  });
  return zeroCount;
})();

console.log(part1);
console.log(part2);
