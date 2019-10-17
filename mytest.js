

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

  function crossScan(matrixInput, numInput, row, col) {
    for (let i = 0; i < 9; i++) {
      if (matrixInput[row][i] === numInput) return false;
      if (matrixInput[i][col] === numInput) return false;
    }

    return true;
  }

  function squareScan(matrixInput, numInput, row, col) {
    let squareY = Math.floor(row / 3) * 3;
    let squareX = Math.floor(col / 3) * 3;

    for (let squareRow = 0; squareRow < 3; squareRow++) {
      for (let squareCol = 0; squareCol < 3; squareCol++) {
        if (row === 6 && col === 0) {
        }

        if (matrixInput[squareY + squareRow][squareX + squareCol] === numInput) return false;
      }
    }

    return true;
  }

  function getPossibleNumbers(matrixInput, y, x) {
    let matrixOutput = matrixInput;
    let result = [];

    for (let num = 1; num < 10; num++) {
      if (crossScan(matrixOutput, num, y, x) && squareScan(matrixOutput, num, y, x)) {
        result.push(num);
      }
    }

    return result;
  }

  function* generatePossibleNumber(matrixInput, y, x) {
    let matrixOutput = matrixInput;

    for (let num = 1; num < 10; num++) {
      if (crossScan(matrixOutput, num, y, x) && squareScan(matrixOutput, num, y, x)) {
        yield num;
      }

      return false;
    }
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

  function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
      const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const n = 3 * Math.floor(col / 3) + i % 3;
      if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
        return false;
      }
    }
    return true;
  }


  function solve(matrix) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (matrix[y][x] === 0) {
          for (let num = 1; num < 10; num++) {
            if (crossScan(matrix, num, y, x) && squareScan(matrix, num, y, x)) {
              matrix[y][x] = num;

              if (solve(matrix)) return true;
              else matrix[y][x] = 0;
            }
          }

          return false;
        }
      }
    }

    return true;
  }

  solve(matrix);

  return matrix;
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

