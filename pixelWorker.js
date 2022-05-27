(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Particles {
    static Air = 0;
    static Dust = 1;
    static Stone = 2;
    static Water = 3;
    static Metal = 4;
    static Rust = 5;
    static Lava = 6;
    static Void = 7;
    static Fire = 8;
    static Steam = 9;
    static Steel = 10;
    static Acid = 11;
    static AcidVapor = 12;
    static Clone = 13;
    static Oil = 14;


    static getId(name) {
        return Particles[name];
    }

    static isFluid(id) {
        return [
            Particles.Water,
            Particles.Lava,
            Particles.Steam,
            Particles.Acid,
            Particles.AcidVapor,
            Particles.Oil,
        ].includes(id);
    }

    static isHidden(id) {
        return [
            Particles.Rust,
            Particles.Steam,
            Particles.AcidVapor
        ].includes(id);
    }

    static isStatic(id) {
        return [
            Particles.Air,
            Particles.Metal,
            Particles.Steel,
            Particles.Void,
            Particles.Clone,
        ].includes(id);
    }
}

const Names = []
Names[Particles.Air] = 'Air';
Names[Particles.Dust] = 'Dust';
Names[Particles.Stone] = 'Stone';
Names[Particles.Water] = 'Water';
Names[Particles.Metal] = 'Metal';
Names[Particles.Rust] = 'Rust';
Names[Particles.Lava] = 'Lava';
Names[Particles.Void] = 'Void';
Names[Particles.Fire] = 'Fire';
Names[Particles.Steam] = 'Steam';
Names[Particles.Steel] = 'Steel';
Names[Particles.Acid] = 'Acid';
Names[Particles.AcidVapor] = 'Acid-Vapor';
Names[Particles.Clone] = 'Clone';
Names[Particles.Oil] = 'Oil';



const Colors = [];
Colors[Particles.Air] = [20, 20, 20];
Colors[Particles.Dust] = [242, 189, 107];
Colors[Particles.Stone] = [128, 128, 128];
Colors[Particles.Water] = [64, 64, 255];
Colors[Particles.Metal] = [64, 64, 64];
Colors[Particles.Rust] = [121, 79, 58];
Colors[Particles.Lava] = [255, 102, 51];
Colors[Particles.Void] = [0, 0, 0];
Colors[Particles.Fire] = [255, 50, 50];
Colors[Particles.Steam] = [204, 204, 204];
Colors[Particles.Steel] = [169, 173, 174];
Colors[Particles.Acid] = [204, 255, 0];
Colors[Particles.AcidVapor] = [120, 120, 0];
Colors[Particles.Clone] = [144, 112, 16];
Colors[Particles.Oil] = [128, 48, 32];

const Density = [];
Density[Particles.Air] = 0.002;
Density[Particles.Dust] = 1.5;
Density[Particles.Stone] = 3.0;
Density[Particles.Water] = 1;
Density[Particles.Metal] = 4;
Density[Particles.Rust] = Density[Particles.Dust];
Density[Particles.Lava] = 2.5;
Density[Particles.Void] = 9999999;
Density[Particles.Fire] = 0;
Density[Particles.Steam] = 0.1;
Density[Particles.Steel] = Density[Particles.Metal] * 8;
Density[Particles.Acid] = 1.1;
Density[Particles.AcidVapor] = Density[Particles.Steam];
Density[Particles.Clone] = Density[Particles.Void];
Density[Particles.Oil] = Density[Particles.Water] / 2;

const InitialState = [];
InitialState[Particles.Air] = [Particles.Air, 0, 0, 0];
InitialState[Particles.Dust] = [Particles.Dust, 0, 0, 50];
InitialState[Particles.Stone] = [Particles.Stone, 0, 0, 0];
InitialState[Particles.Water] = [Particles.Water, 0, 0, 25];
InitialState[Particles.Metal] = [Particles.Metal, 0, 0, 0];
InitialState[Particles.Rust] = [Particles.Rust, 0, 0, 0];
InitialState[Particles.Lava] = [Particles.Lava, 0, 0, 200];
InitialState[Particles.Void] = [Particles.Void, 0, 0, 0];
InitialState[Particles.Fire] = [Particles.Fire, 0, 0, 0];
InitialState[Particles.Steam] = [Particles.Steam, 0, 0, 80];
InitialState[Particles.Steel] = [Particles.Steel, 0, 0, 0];
InitialState[Particles.Acid] = [Particles.Acid, 0, 0, 0];
InitialState[Particles.AcidVapor] = [Particles.AcidVapor, 0, 0, 80];
InitialState[Particles.Clone] = [Particles.Clone, 0, 0, 0];
InitialState[Particles.Oil] = [Particles.Oil, 0, 0, 0];

const Movements = [];
Movements[Particles.Air] = 0;
Movements[Particles.Dust] = 3;
Movements[Particles.Stone] = 2;
Movements[Particles.Water] = 2;
Movements[Particles.Metal] = 0;
Movements[Particles.Rust] = Movements[Particles.Dust];
Movements[Particles.Lava] = Movements[Particles.Dust];
Movements[Particles.Void] = 0;
Movements[Particles.Fire] = 3;
Movements[Particles.Steam] = 3;
Movements[Particles.Steel] = Movements[Particles.Metal];
Movements[Particles.Acid] = Movements[Particles.Water];
Movements[Particles.AcidVapor] = Movements[Particles.Steam];
Movements[Particles.Clone] = Movements[Particles.Void];
Movements[Particles.Oil] = 2;


module.exports = {
    Particles,
    Names,
    Colors,
    Density,
    InitialState,
    Movements,
}

},{}],2:[function(require,module,exports){
class Random {

    static int(min, max) {
        // return random integer
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomRGB() {
        return [Random.int(0, 255), Random.int(0, 255), Random.int(0, 255)];
    }

    static direction() {
        return Math.random() > 0.5 ? 1 : -1;
    }

    static float (min, max) {
        return Math.random() * (max - min) + min;
    }

    static number() {
        // just a wrapper for Math.random()
        return Math.random();
    }

    static string(size) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < size; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}

module.exports = Random;
},{}],3:[function(require,module,exports){
const {
  Colors,
  Particles,
  Density,
  InitialState,
  Movements,
} = require('./Particles/Particles');
const Random = require('./Utils/Random');

let pixelData;
let canvas;
let startX;
let startY;
let endX;
let endY;
let pixelDataSize;
let screenWidth;
let screenHeight;

let lineOrder = [];

let width;
let height;

let onPhysics = false;

onmessage = function (e) {
  handleMessage(e.data);
}

function handleMessage(message) {
  switch (message.type) {
    case 'init': initPixelGrid(message.data); break;
    case 'doPhysics': doPhysics(); break;
    case 'updatePixels': updatePixels(message.data); break;
  }
}

function initPixelGrid(data) {
  pixelData = new Int16Array(data.sharedBuffer);
  canvas = data.canvas;
  startX = data.startX;
  startY = data.startY;
  endX = data.endX;
  endY = data.endY;
  width = endX - startX;
  height = endY - startY;
  pixelDataSize = data.pixelDataSize;
  screenWidth = data.screenWidth;
  screenHeight = data.screenHeight;

  computeUpdateOrderRadomness();

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x += 4) {
      lineOrder[y].push(x);
      const index = coordsToIndex(x, y);
      setPixel(index, Particles.Air);
    }
  }

  ctx = canvas.getContext('2d', { alpha: false });
  requestAnimationFrame(render);
}

function computeUpdateOrderRadomness() {
  for (let y = startY; y < endY; y++) {
    lineOrder[y] = [];
    for (let x = startX; x < endX; x++) {
      lineOrder[y].push(x);
    }
    shuffleArray(lineOrder[y]);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Random.number() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function render() {

  let imagedata = ctx.createImageData(width, height);
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      try {
        const pixelIndex = coordsToIndex(x, y);

        // Map the index to the actual position without offset
        const imageIndex = (x - startX + (y - startY) * width) * 4;

        let color = Colors[pixelData[pixelIndex]];

        // add a pixel
        imagedata.data[imageIndex] = color[0];
        imagedata.data[imageIndex + 1] = color[1];
        imagedata.data[imageIndex + 2] = color[2];
        imagedata.data[imageIndex + 3] = 255;
      } catch (e) {

      }
    }
  }

  ctx.putImageData(imagedata, 0, 0);

  if (!onPhysics) {
    // do here heavy stuff that takes a long time and should not interfere with the physics
    computeUpdateOrderRadomness();
  }

  requestAnimationFrame(render);
}



function coordsToIndex(x, y) {
  // On a array of size screenWidth * screenHeight
  // Find the index of the pixel determined by the x and y coordinates

  return (x + y * screenWidth) * pixelDataSize;
}


function doPhysics() {
  onPhysics = true;
  // shuffleArray(lineOrder);
  // for each pixel of the Tile from end to start
  for (let y = endY - 1; y >= startY; y--) {
    // for (let x = endX - 1; x >= startX; x--) {
    for (let x of lineOrder[y]) {
      processPixel(x, y);
    }
  }

  postMessage({
    type: 'donePhysics',
  });
  onPhysics = false;
}


function processPixel(x, y) {
  let index = coordsToIndex(x, y);

  if (pixelData[index] === Particles.Air) {
    return;
  }
  try {
    [index, x, y] = processReactions(index, x, y);

    if (!Particles.isStatic(pixelData[index])) {
      [index, x, y] = executeBouyancy(index, x, y);
    }
    executeVectors(index, x, y);
  } catch (e) {
    let errorStr = `${e.message}\n${x}-${y}-${index}`;
    for (let i = 0; i < pixelDataSize; i++) {
      errorStr += ` ${pixelData[index + i]}`;
    }

    alert(`An error occured. Please report the error message to the developer (include a save if possible):\n\n${errorStr}`);

    throw e;
  }
}

function isInBounds(x, y) {
  // check if a pixel is within the screen space
  return x >= 0 && x < screenWidth && y >= 0 && y < screenHeight;
}

function isEmpty(x, y, ignoreFire = true) {
  if (!isInBounds(x, y)) return false;
  const index = coordsToIndex(x, y);
  return pixelData[index] === Particles.Air || (ignoreFire && pixelData[index] === Particles.Fire);
}

function shouldSink(index, targetIndex) {
  // returns true is the particle should be able to sink on the target
  // Note: just because it is hevyer doesn't mean it will sink on this frame. It just increases the chance
  if (Density[pixelData[index]] > Density[pixelData[targetIndex]]) {
    const difficult = Math.pow(Density[pixelData[index]], 2) - Math.pow(Density[pixelData[targetIndex]], 2);
    const normalizedDifficult = difficult / (difficult + 1);
    return Random.number() < normalizedDifficult;
  }
  return false;
}

function executeVectors(index, x, y) {
  let i = 0;
  while (i < 3) {
    const vectorX = pixelData[index + 1];
    const vectorY = pixelData[index + 2];
    if (vectorX === 0 && vectorY === 0) {
      break;
    }

    // a movement step is a step in the direction of the vector
    // it only moves one unity in X and Y

    let movementX = 0;
    let movementY = 0;

    if (vectorX > 0) {
      movementX = 1;
    } else if (vectorX < 0) {
      movementX = -1;
    }

    if (vectorY > 0) {
      movementY = 1;
    } else if (vectorY < 0) {
      movementY = -1;
    }

    const targetX = x + movementX;
    const targetY = y + movementY;

    if (!isEmpty(targetX, targetY)) {
      break;
    }

    pixelData[index + 1] -= movementX;
    pixelData[index + 2] -= movementY;
    const targetIndex = coordsToIndex(targetX, targetY);
    x += movementX;
    y += movementY;
    movePixel(index, targetIndex);
    index = targetIndex;
    i++;
  }

  return [index, x, y];
}

function executeBouyancy(index, x, y) {
  // check if the pixel should sink down
  const indexBellow = coordsToIndex(x, y + 1);
  if (!isEmpty(x, y + 1) && Particles.isFluid(pixelData[indexBellow])) {
    if (shouldSink(index, indexBellow)) {
      swapPixel(index, indexBellow);
      y++;
      return [indexBellow, x, y];
    }
  }

  // check if the pixel should float up
  const indexAbove = coordsToIndex(x, y - 1);
  if (!isEmpty(indexAbove) && Particles.isFluid(pixelData[indexAbove])) {
    if (shouldSink(indexAbove, index)) {
      swapPixel(indexAbove, index);
      y--;
      return [index, x, y];
    }
  }

  return [index, x, y];
}


function processReactions(index, x, y) {
  switch (pixelData[index]) {
    case Particles.Dust: { return reactionDust(index, x, y); }
    case Particles.Stone: { return reactionStone(index, x, y); }
    case Particles.Water: { return reactionWater(index, x, y); }
    case Particles.Metal: { return reactionMetal(index, x, y); }
    case Particles.Rust: { return reactionRust(index, x, y); }
    case Particles.Lava: { return reactionLava(index, x, y); }
    case Particles.Void: { return reactionVoid(index, x, y); }
    case Particles.Fire: { return reactionFire(index, x, y); }
    case Particles.Steam: { return reactionSteam(index, x, y); }
    case Particles.Steel: { return reactionSteel(index, x, y); }
    case Particles.Acid: { return reactionAcid(index, x, y); }
    case Particles.AcidVapor: { return reactionAcidVapor(index, x, y); }
    case Particles.Clone: { return reactionClone(index, x, y); }
    case Particles.Oil: { return reactionOil(index, x, y); }
  }
}

function reactionOil(index, x, y) {
  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];


  for (let [targetX, targetY] of adjacent) {
    if (!isInBounds(targetX, targetY)) continue;
    const targetIndex = coordsToIndex(targetX, targetY);
    if (
      pixelData[targetIndex] === Particles.Fire ||
      pixelData[targetIndex] === Particles.Lava
    ) {
      pixelData[index + 3] = pixelData[index + 3] >= 300 ? 300 : pixelData[index + 3] + 50;
    }
  }


  if (pixelData[index + 3] >= 50) {
    // the particle is on fire it wil attempt to emmit a Fire particle at the first adjacent empty space
    shuffleArray(adjacent);
    let emmited = false;
    for (let [targetX, targetY] of adjacent) {
      if (!isEmpty(targetX, targetY)) continue;
      const targetIndex = coordsToIndex(targetX, targetY);
      setPixel(targetIndex, Particles.Fire);
      emmited = true;

      // random chance to burn out
      if (Random.number() < 0.1) {
        setPixel(index, Particles.Fire);
      }

      break;
    }
    if (!emmited) {
      pixelData[index + 3] -= 20;
    }
  }


  let i = 0;
  let direction = Random.direction() * 2;

  do {
    const targetIndex = coordsToIndex(x + direction, y);
    if (isEmpty(x + direction, y) || (pixelData[targetIndex] != Particles.Oil && Particles.isFluid(pixelData[targetIndex]))) {
      x += direction;
      swapPixel(index, targetIndex);
      index = targetIndex;
    }
  } while (++i < 1);

  i = 0;
  let canMove = true;
  do {
    if (isEmpty(x, y + 1)) {
      y++;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
      index = targetIndex;
    } else {
      canMove = false;
    }
  } while (++i < 1 && canMove);

  return [index, x, y];
}

function reactionDust(index, x, y) {
  pixelData[index + 3] = pixelData[index + 3] < 0 ? 0 : pixelData[index + 3];
  pixelData[index + 3] = pixelData[index + 3] > 100 ? 100 : pixelData[index + 3];

  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  for (let [targetX, targetY] of adjacent) {
    // check if it is touching lava or fire
    const targetIndex = coordsToIndex(targetX, targetY);
    if (
      isInBounds(targetX, targetY) &&
      (
        pixelData[targetIndex] === Particles.Lava ||
        pixelData[targetIndex] === Particles.Fire
      )
    ) {
      // random chance
      if (Random.number() < 0.46) {
        // set the dust to fire
        pixelData[index] = Particles.Fire;
        return [index, x, y];
      }
    }
  }

  if (pixelData[index + 3] <= 0) { // The particle is settled
    // count how many of the pixels touching the particle (including diagonals) are dust
    let count = 0;
    let i = 0;
    const adjacentDust = [
      [x - 1, y], // left
      [x + 1, y], // right
      [x, y - 1], // up
      [x - 1, y - 1], // up left
      [x + 1, y - 1], // up right
      [x, y + 1], // down
      [x + 1, y + 1], // down left
      [x - 1, y + 1], // down right

    ];
    do {
      const [targetX, targetY] = adjacentDust[i];
      if (!isInBounds(targetX, targetY)) {
        count++;
      } else {
        const targetIndex = coordsToIndex(targetX, targetY);
        if (pixelData[targetIndex] === Particles.Dust) {
          count++;
        }
      }
    } while (++i < adjacentDust.length);

    if (count >= 4) {
      // if there are 4 or more dust particles touching the particle it doesn't need to move
      return [index, x, y];
    } else if (count <= 3) {
      pixelData[index + 3] += 3;
    }
  }

  let i = 0;
  let canMoveDown = true;
  do {
    if (isEmpty(x, y + 1)) {
      // moving down also gives energy to the dust above
      const aboveIndex = coordsToIndex(x, y - 1);
      if (isInBounds(x, y - 1) && pixelData[aboveIndex] === Particles.Dust) {
        pixelData[aboveIndex + 3]++;
      }

      pixelData[index + 3] += 2;

      y++;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
      index = targetIndex;
    } else {
      pixelData[index + 3] -= 2;
      canMoveDown = false;
    }
  } while (++i <= 2 && canMoveDown);

  if (pixelData[index + 3] <= 0) return [index, x, y];

  // chooses left or right
  const direction = Random.direction();
  if (isEmpty(x + direction, y)) {
    x += direction;
    const targetIndex = coordsToIndex(x, y);
    movePixel(index, targetIndex);
    index = targetIndex;
  } else {
    // dust can move sideways even on liquids
    // check if the pixel in the desired spot is liquid
    if (Particles.isFluid(pixelData[coordsToIndex(x + direction, y)])) {
      // it is a liquid, in that case swap instead of moving
      swapPixel(x, y, x + direction, y);
    }
  }

  return [index, x, y];
}

function reactionStone(index, x, y) {
  if (pixelData[index + 3] > 100) {
    pixelData[index] = Particles.Lava;
    return [index, x, y];
  }

  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  // if adjacent to lava or fire, heatUp
  for (let [targetX, targetY] of adjacent) {
    if (!isInBounds(targetX, targetY)) continue;
    const targetIndex = coordsToIndex(targetX, targetY);
    if (
      pixelData[targetIndex] === Particles.Lava ||
      pixelData[targetIndex] === Particles.Fire
    ) {
      if (Random.number() < 0.1) {
        pixelData[index + 3]++;
        return [index, x, y];
      }
    }
  }

  // check if the pixel below is empty
  let i = 0;
  let canMove = true;
  do {
    if (isEmpty(x, y + 1)) {
      y++;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
      index = targetIndex;
    } else {
      canMove = false;
    }
  } while (++i <= 3 && canMove);

  return [index, x, y];
}

function reactionWater(index, x, y) {
  if (pixelData[index + 3] >= 100) {
    // turn into Steam
    pixelData[index] = Particles.Steam;
    return [index, x, y];
  }

  let i = 0;
  let direction = Random.direction() * 2;

  do {
    const targetIndex = coordsToIndex(x + direction, y);
    if (isEmpty(x + direction, y) || (pixelData[targetIndex] != Particles.Water && Particles.isFluid(pixelData[targetIndex]))) {
      x += direction;
      swapPixel(index, targetIndex);
      index = targetIndex;
    } else {
      direction *= -1;
      continue;
    }
  } while (++i < 2);

  i = 0;
  let canMove = true;
  do {
    if (isEmpty(x, y + 1)) {
      y++;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
      index = targetIndex;
    } else {
      canMove = false;
    }
  } while (++i < 2 && canMove);

  return [index, x, y];
}

function reactionMetal(index, x, y) {
  // metal does not move.
  // if a particle of metal is in contact with water, it has a probability of becoming rust.
  // if a particle of metal is in contact with rust, it has a smaller probability of becoming rust

  if (pixelData[index + 3] > 100) {
    pixelData[index] = Particles.Lava;
    return [index, x, y];
  }

  // check the adjacent pixels
  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  for (let [targetX, targetY] of adjacent) {
    if (!isInBounds(targetX, targetY)) continue;
    const targetIndex = coordsToIndex(targetX, targetY);
    if (pixelData[targetIndex] === Particles.Water) {
      if (Random.number() < 0.01) {
        pixelData[index] = Particles.Rust;
        return [index, x, y];
      }
    } else if (pixelData[targetIndex] === Particles.Rust) {
      if (Random.number() < 0.001) {
        pixelData[index] = Particles.Rust;
        return [index, x, y];
      }
    } else if (pixelData[targetIndex] === Particles.Lava) {
      if (Random.number() < 0.1) {
        pixelData[index + 3]++;
        return [index, x, y];
      }
    }
  }
  return [index, x, y];
}

function reactionRust(index, x, y) {
  return reactionDust(index, x, y);
}

function reactionLava(index, x, y) {
  if (pixelData[index + 3] <= 50) {
    pixelData[index] = Particles.Stone;
    return [index, x, y];
  }

  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  for (let [targetX, targetY] of adjacent) {
    if (!isInBounds(targetX, targetY)) continue;
    const targetIndex = coordsToIndex(targetX, targetY);
    if (
      pixelData[targetIndex] === Particles.Water ||
      pixelData[targetIndex] === Particles.Acid ||
      pixelData[targetIndex] === Particles.Oil
    ) {
      pixelData[targetIndex + 3] += 20;
      pixelData[index + 3] -= 20;
    }
  }

  let i = 0;
  let direction = Random.direction() * 2;

  do {
    const targetIndex = coordsToIndex(x + direction, y);
    if (isEmpty(x + direction, y) || (pixelData[targetIndex] != Particles.Lava && Particles.isFluid(pixelData[targetIndex]))) {
      x += direction;
      swapPixel(index, targetIndex);
      index = targetIndex;
    }
  } while (++i < 1);

  i = 0;
  let canMove = true;
  do {
    if (isEmpty(x, y + 1)) {
      y++;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
      index = targetIndex;
    } else {
      canMove = false;
    }
  } while (++i < 1 && canMove);

  return [index, x, y];
}

function reactionVoid(index, x, y) {
  // removes any particle that touches it and is not void

  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  for (let [targetX, targetY] of adjacent) {
    const targetIndex = coordsToIndex(targetX, targetY);
    if (!isEmpty(targetX, targetY) && pixelData[targetIndex] !== Particles.Void) {
      removePixel(targetIndex);
    }
  }
  return [index, x, y];
}

function reactionFire(index, x, y) {
  // probability to expire
  if (Random.number() > 0.95) {
    removePixel(index);
    return [index, x, y];
  }

  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  for (let [targetX, targetY] of adjacent) {
    const adjacentIndex = coordsToIndex(targetX, targetY);
    if (
      pixelData[adjacentIndex] === Particles.Water ||
      pixelData[adjacentIndex] === Particles.Acid ||
      pixelData[adjacentIndex] === Particles.Stone
    ) {
      removePixel(index);
      pixelData[adjacentIndex + 3] += 10;
      return [index, x, y];
    }
  }

  // attempts to go up

  let i = 0;
  let canMove = true;
  do {
    if (isInBounds(x, y - 1) && pixelData[coordsToIndex(x, y - 1)] === Particles.Air) {
      y--;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
      index = targetIndex;
    }
  } while (++i < 2 && canMove);

  const direction = Random.number() > 0.5 ? 1 : -1;
  if (isEmpty(x + direction, y, false)) {
    x += direction;
    const targetIndex = coordsToIndex(x, y);
    movePixel(index, targetIndex);
    index = targetIndex;
  } else if (isEmpty(x - direction, y, false)) {
    x -= direction;
    const targetIndex = coordsToIndex(x, y);
    movePixel(index, targetIndex);
    index = targetIndex;
  } else {
    canMove = false;
  }

  return [index, x, y];
}

function reactionClone(index, x, y) {
  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  for (let [targetX, targetY] of adjacent) {
    const targetIndex = coordsToIndex(targetX, targetY);

    if (pixelData[targetIndex] == Particles.Clone) {
      if (pixelData[targetIndex + 3] == Particles.Air && pixelData[index + 3] != Particles.Air) {
        // propagate the current cloning particle
        pixelData[targetIndex + 3] = pixelData[index + 3];
      }
    } else if (
      isInBounds(targetX, targetY) &&
      pixelData[targetIndex] != Particles.Air
    ) {
      pixelData[index + 3] = pixelData[targetIndex];
      break;
    }
  }

  // random chance
  if (!pixelData[index + 3] || Random.number() > 0.05) {
    return [index, x, y];
  }

  shuffleArray(adjacent);
  for (let [targetX, targetY] of adjacent) {
    const targetIndex = coordsToIndex(targetX, targetY);
    if (isInBounds(targetX, targetY) && isEmpty(targetX, targetY)) {
      setPixel(targetIndex, pixelData[index + 3]);
      break;
    }
  }


  return [index, x, y];
}

function reactionAcidVapor(index, x, y) {
  // random chance
  if (Random.number() < 0.05) {
    pixelData[index + 3]--;
  }

  if (pixelData[index + 3] <= 10) {
    // turns into water
    pixelData[index] = Particles.Acid;
    return [index, x, y];
  }

  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  for (let [targetX, targetY] of adjacent) {
    const targetIndex = coordsToIndex(targetX, targetY);
    if (
      pixelData[targetIndex] !== Particles.Acid &&
      pixelData[targetIndex] !== Particles.AcidVapor &&
      pixelData[targetIndex] !== Particles.Void &&
      pixelData[targetIndex] !== Particles.Clone &&
      isInBounds(targetX, targetY) &&
      !isEmpty(targetX, targetY)
    ) {
      // diffcult to be corroded is calculated based on the density of the target.
      // it gets exponentially more difficult to corrode the target with higher density
      const diffcultToBeCorroded = Math.pow(Density[pixelData[targetIndex]], 2);

      // normalize the diffcult to be corroded to be between 0 and 1
      const normalizedDiffcultToBeCorroded = diffcultToBeCorroded / (diffcultToBeCorroded + 1);

      if (Random.number() > normalizedDiffcultToBeCorroded) {
        removePixel(targetIndex);
        removePixel(index);
      }

      return [index, x, y];
    }
  }

  const direction = Random.number() > 0.5 ? 1 : -1;
  i = 0;
  do {
    if (isEmpty(x + direction, y)) {
      x += direction;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
      index = targetIndex;
    }
  } while (++i < 1);

  // random chance
  if (Random.number() < 0.3) {
    if (isEmpty(x, y - 1)) {
      y--;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
    }
  }

  return [index, x, y];
}

function reactionAcid(index, x, y) {
  if (pixelData[index + 3] >= 80) {
    // turn into Acid Vapor
    pixelData[index] = Particles.AcidVapor;
    return [index, x, y];
  }

  const adjacent = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  for (let [targetX, targetY] of adjacent) {
    const targetIndex = coordsToIndex(targetX, targetY);
    if (
      pixelData[targetIndex] !== Particles.Acid &&
      pixelData[targetIndex] !== Particles.AcidVapor &&
      pixelData[targetIndex] !== Particles.Void &&
      pixelData[targetIndex] !== Particles.Clone &&
      isInBounds(targetX, targetY) &&
      !isEmpty(targetX, targetY)
    ) {
      // diffcult to be corroded is calculated based on the density of the target.
      // it gets exponentially more difficult to corrode the target with higher density
      const diffcultToBeCorroded = Math.pow(Density[pixelData[targetIndex]], 2);

      // normalize the diffcult to be corroded to be between 0 and 1
      const normalizedDiffcultToBeCorroded = diffcultToBeCorroded / (diffcultToBeCorroded + 1);

      if (Random.number() > normalizedDiffcultToBeCorroded) {
        removePixel(targetIndex);
        removePixel(index);
      }

      return [index, x, y];
    }
  }


  let i = 0;
  let direction = Random.direction() * 2;

  do {
    const targetIndex = coordsToIndex(x + direction, y);
    if (isEmpty(x + direction, y) || (pixelData[targetIndex] != Particles.Acid && Particles.isFluid(pixelData[targetIndex]))) {
      x += direction;
      swapPixel(index, targetIndex);
      index = targetIndex;
    } else {
      direction *= -1;
      continue;
    }
  } while (++i < 2);

  i = 0;
  let canMove = true;
  do {
    if (isEmpty(x, y + 1)) {
      y++;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
      index = targetIndex;
    } else {
      canMove = false;
    }
  } while (++i < 2 && canMove);

  return [index, x, y];
}

function reactionSteel(index, x, y) {
  return [index, x, y];
}

function reactionSteam(index, x, y) {
  // random chance
  if (Random.number() < 0.05) {
    pixelData[index + 3]--;
  }

  if (pixelData[index + 3] <= 50) {
    if (pixelData[index + 3] <= 0) {
      pixelData[index + 3] = 0;
    }
    // turns into water
    pixelData[index] = Particles.Water;
    return [index, x, y];
  }

  const direction = Random.number() > 0.5 ? 1 : -1;
  i = 0;
  do {
    if (isEmpty(x + direction, y)) {
      x += direction;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
      index = targetIndex;
    }
  } while (++i < 1);

  // random chance
  if (Random.number() < 0.3) {
    if (isEmpty(x, y - 1)) {
      y--;
      const targetIndex = coordsToIndex(x, y);
      movePixel(index, targetIndex);
    }
  }

  return [index, x, y];
}

function removePixel(index) {
  for (let i = 0; i < pixelDataSize; i++) {
    pixelData[index + i] = InitialState[Particles.Air][i];
  }
}

function movePixel(fromIndex, toIndex) {
  for (let i = 0; i < pixelDataSize; i++) {
    pixelData[toIndex + i] = pixelData[fromIndex + i];
    pixelData[fromIndex + i] = InitialState[Particles.Air][i];
  }
}

function setPixel(index, type) {
  for (let i = 0; i < pixelDataSize; i++) {
    pixelData[index + i] = InitialState[type][i];
  }
}

function swapPixel(index1, index2) {
  let temp;
  for (let i = 0; i < pixelDataSize; i++) {
    temp = pixelData[index1 + i];
    pixelData[index1 + i] = pixelData[index2 + i];
    pixelData[index2 + i] = temp;
  }
}




function log(data) {
  postMessage({
    type: 'debug',
    data: data,
  });
}

function alert(data) {
  postMessage({
    type: 'error',
    data: data,
  });
}
},{"./Particles/Particles":1,"./Utils/Random":2}]},{},[3]);
