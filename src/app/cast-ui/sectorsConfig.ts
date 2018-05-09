export const SectorsConfig = [
  {
    startAngle: -Math.PI / 2.2,
    endAngle: -Math.PI / 21,
    color: `#55493D`,
    name: 'earth'
  },
  {
    startAngle: -Math.PI / 21,
    endAngle: Math.PI / 2 - Math.PI / 7.5,
    color: `#6ddace`,
    name: 'water'
  },
  {
    startAngle: Math.PI / 2 + Math.PI / 7.5,
    endAngle: Math.PI + Math.PI / 21,
    color: `#B13600`,
    name: 'fire'
  },
  {
    startAngle: Math.PI + Math.PI / 21,
    endAngle: Math.PI + Math.PI / 2.2,
    color: `#56bddd`,
    name: 'air'
  }
];


export const countOfType = 7;
export const angleStep = (Math.PI / 2.2 - Math.PI / 21) / (countOfType + 1);
