export default function random(bpm, duration) {
  return [...Array(Math.floor(bpm / 60) * duration)].map(() => {
    const numbers = [0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2];
    const amount = numbers[Math.floor(Math.random(numbers) * numbers.length)];

    let group = [false, false, false, false];

    if (amount === 0) {
      return group;
    } else if (amount === 1) {
      group[Math.floor(Math.random([...group.keys()]) * group.length)] = true;
      return group;
    } else if (amount === 2) {
      const firstIndex = Math.floor(
        Math.random([...group.keys()]) * group.length
      );
      group[firstIndex] = true;

      let secondIndex = Math.floor(
        Math.random([...group.keys()]) * group.length
      );
      while (secondIndex === firstIndex) {
        secondIndex = Math.floor(Math.random([...group.keys()]) * group.length);
      }
      group[secondIndex] = true;

      return group;
    }
  });
}
