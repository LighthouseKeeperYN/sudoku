const initial = [
  [6, 5, 0, 7, 3, 0, 0, 8, 0],
  [0, 0, 0, 4, 8, 0, 5, 3, 0],
  [8, 4, 0, 9, 2, 5, 0, 0, 0],
  [0, 9, 0, 8, 0, 0, 0, 0, 0],
  [5, 3, 0, 2, 0, 9, 6, 0, 0],
  [0, 0, 6, 0, 0, 0, 8, 0, 0],
  [0, 0, 9, 0, 0, 0, 0, 0, 6],
  [0, 0, 7, 0, 0, 0, 0, 5, 0],
  [1, 6, 5, 3, 9, 0, 4, 7, 0]
];

function solveSudoku(matrix) {

  function getPossibleNumbers(matrixInput, y, x) {
    let result = [];

    for (let num = 1; num < 10; num++) {
      if (matrixInput[y].indexOf(num) === -1) {
        for (let col = 0; col < 9; col++) {
          if (matrixInput[col][x] === num) break
          else if (col === 8) {
            let boxY = Math.floor(y / 3) * 3;
            let boxX = Math.floor(x / 3) * 3;
            let token = true;

            for (let boxCol = 0; boxCol < 3; boxCol++) {
              for (let boxRow = 0; boxRow < 3; boxRow++) {
                if (matrixInput[boxY + boxCol][boxX + boxRow] === num) {
                  token = false;
                  break;
                }
              }
              if (!token) break;
            }
            if (token) result.push(num);
          }
        }
      }
    }

    return result;
  }

  function run(matrixInput) {
    let matrixOutput = matrixInput;

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (matrixOutput[y][x] === 0) {
          let posNum = getPossibleNumbers(matrixOutput, y, x);

          if (posNum.length === 1) {
            matrixOutput[y][x] = posNum[0];
            run(matrixOutput);
          }
        }
      }
    }

    return matrixOutput;
  }


  function getPossibleNumbersAll(matrixInput) {
    let result = [];

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (matrixInput[y][x] !== 0) continue;

        result.push([y, x, getPossibleNumbers(matrixInput, y, x)]);
      }
    }

    return result;
  }

  function isFinished(matrixInput) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (matrixInput[y][x] === 0) return false;
      }
    }

    return true;
  }

  function isValid(numArrInput) {
    for (let i = 0; i < numArrInput.length; i++) {
      if (numArrInput[i][2].length === 0) return false;
    }

    return true
  }

  function makeAGuess(matrixInput, numIndex, numCount) {
    let y = numArr[numIndex][0];
    let x = numArr[numIndex][1];
    let num = numArr[numIndex][2][numCount];

    matrixInput[y][x] = num;

    return matrixInput;
  }

  function tryToSolve(matrixInput, numArrInput) {
    if (isFinished(matrixInput)) return matrixInput;

    let matrixOutput = matrixInput;
    let numArrOutput = numArrInput;

    if (isValid(numArrOutput)) {
      matrixOutput = run(matrixOutput);

      if (isFinished(matrixOutput)) return matrixOutput;
      else matrixOutput = makeAGuess(matrixOutput, currentNumPointer, numCountPointer);
    }

    return matrixOutput;
  }

  matrix = run(matrix);

  let numArr = getPossibleNumbersAll(matrix);

  let currentNumPointer = 0;
  let numCountPointer = 0;

  tryToSolve(matrixInput, numberCount)

  if (isFinished(matrix)) return matrix;

  if (isValid(numArr)) {
    matrix = makeAGuess(matrix, numArr[0][0], numArr[0][1], 0, 0);
  }


  return matrix
}
console.log(solveSudoku(initial))

// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 8, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0]

// [ [ 6, 5, 2, 7, 3, 1, 9, 8, 4 ],
//   [ 9, 7, 1, 4, 8, 6, 5, 3, 2 ],
//   [ 8, 4, 3, 9, 2, 5, 0, 0, 0 ],
//   [ 0, 9, 4, 8, 0, 0, 0, 0, 0 ],
//   [ 5, 3, 8, 2, 0, 9, 6, 0, 0 ],
//   [ 0, 0, 6, 0, 0, 0, 8, 0, 0 ],
//   [ 0, 0, 9, 0, 0, 0, 0, 0, 6 ],
//   [ 0, 0, 7, 0, 0, 0, 0, 5, 0 ],
//   [ 1, 6, 5, 3, 9, 2, 4, 7, 8 ] ]