

let correctNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

var input = [
  [4, 3, 5], [2, 6, 9], [7, 8, 1],
  [6, 8, 2], [5, 7, 1], [4, 9, 3],
  [1, 9, 7], [8, 3, 4], [5, 6, 2],
  [8, 2, 6], [1, 9, 5], [3, 4, 7],
  [3, 7, 4], [6, 8, 2], [9, 1, 5], 
  [9, 5, 1], [7, 4, 3], [6, 2, 8],
  [5, 1, 9], [3, 2, 6], [8, 7, 4],
  [2, 4, 8], [9, 5, 7], [1, 3, 6],
  [7, 6, 3], [4, 1, 8], [2, 5, 9]
]

const groupColumnsVertically = (horizontalRows) => {
  let columns = new Array(9).fill([])
  horizontalRows.forEach((row, index) => {
    columns[index][index] = row[index]
  })
  return columns
}

const flattenRow = (threeArrays) => {
  return threeArrays.flat().sort()
}

const groupRowsHorizontally = (input) => {
  //add an extra empty element to allow for grabbing previous 3
  input.push([])
  let groupedBlocks = []
  let groupedRows = []

  input.forEach((blockOfThree, index) => {
    if (index % 3 === 0 && index !== 0) {
      groupedBlocks.push(input[index-3])
      groupedBlocks.push(input[index-2])
      groupedBlocks.push(input[index-1])
      let flattenedRow = flattenRow(groupedBlocks)
      groupedRows.push(flattenedRow);
      groupedBlocks=[]
    }
  })

  return groupedRows
}

groupRowsHorizontally(input)

const checkRow = (flattenedRow) => {
  let result = true;
  for (i = 0; i < input.length; i++) {
    if (flattenedRow[i] !== correctNums[i]) {
      result = false;
    } 
  }
  return result
}

const isValidSudoku = (input) => {
  let groupedHorizontalRows = groupRowsHorizontally(input);
  
  let horizontalValid = groupedHorizontalRows.map(row => checkRow(row))
  // can put in row index here when returning final result
  // for more specificity
  let failingHorizontalRow = horizontalValid.find(row => row === false)

  if (!failingHorizontalRow) {
    console.log('all horizontal rows are valid')

    let groupedColumns = groupColumnsVertically(groupedHorizontalRows);
    let columnValid = groupedColumns.map(column => checkRow(column))

    let failingColumn = columnValid.find(column => column === false)

    if (!failingColumn) {
      console.log('all columns are valid')

      // then check all blocks
      //
    }
  } else {
    return false
  }
  

}


isValidSudoku(input)