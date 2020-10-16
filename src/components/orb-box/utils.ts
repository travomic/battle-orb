import { FLAT_XYS, paletteTones } from './consts';

export function faceStyle(faceIndex: number): CSSStyleDeclaration | any {
  return {
    [`--fg-color`]: paletteTones[faceIndex],
  }
}

// Generate the transformed positions for each tile of a single sphere-face.
export function getTiles(rows: number, scale: number) {
  const RAD = rows * scale;

  const angX = 90 / rows - 1 - 1;
  let rotX = -angX + angX / 2.5;
  let rotY = 0;
  let rotZ = 0;
  const tranZ = RAD;

  const tiles = [];

  for (let row = 0, endRow = Math.ceil(rows); row <= endRow; ++row) {
    const angZ = 60 / row;

    if (row > 1) {
      rotX -= angX;
    }
    rotY = 60 / row;
    rotZ = 0;

    for (let col = 0; col < row; col++) {
      const [flatX, flatY] = getFlatXY(tiles.length);
      const [valA, valB] = getPathVals(tiles.length);

      tiles.push({
        style: `
          --val-a: ${valA};
          --val-b: ${valB};
          --flat-x: ${flatX};
          --flat-y: ${flatY};
          --rot-x: ${rotX};
          --rot-y: ${rotY};
          --rot-z: ${rotZ};
          --tran-z: ${tranZ};
        `,
        opacity: row * 0.1,
        glyph: "⬡"
      });

      rotZ -= angZ;
    }
  }

  return tiles;
}

export function getPathVals(idx: number) {
  return [
    1 - idx * 0.1, // Math.floor(Math.random() * 9),
    1 - idx * 0.1 // Math.floor(Math.random() * 9)
  ];
}

export function randomTone() {
  return paletteTones[Math.floor(Math.random() * paletteTones.length)];
}

export function getTone(i: number) {
  return `#${i}${i}${i}`;
}

export function getFlatXY(idx: number) {
  return FLAT_XYS[idx];
}