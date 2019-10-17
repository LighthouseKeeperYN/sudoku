module.exports = function solveSudoku(matrix) {

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
        if (matrixInput[squareY + squareRow][squareX + squareCol] === numInput) return false;
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