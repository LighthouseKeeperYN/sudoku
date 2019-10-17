module.exports = function solveSudoku(matrix) {

  function possibleNumbers(y, x) {
    let result = [];

    for (let num = 1; num < 10; num++) {
      if (matrix[y].indexOf(num) === -1) {
        for (let col = 0; col < 9; col++) {
          if (matrix[col][x] === num) break
          else if (col === 8) {
            let boxY = Math.floor(y / 3) * 3;
            let boxX = Math.floor(x / 3) * 3;
            let token = true;

            for (let boxCol = 0; boxCol < 3; boxCol++) {
              for (let boxRow = 0; boxRow < 3; boxRow++) {
                if (matrix[boxY + boxCol][boxX + boxRow] === num) {
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

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (matrix[y][x] === 0) {
        let posNum = possibleNumbers(y, x);

        if (posNum.length === 1) {
          matrix[y][x] = posNum[0];
          solveSudoku(matrix);
        }
      }
    }

  }
  return matrix
}
