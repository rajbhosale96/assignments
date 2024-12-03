function isCompatibleDimensions(matrixA, matrixB) {
  for (let index = 0; index < matrixA.length; index++) {
    if (matrixA[index].length !== matrixB.length) {
      return false;
    }
  }

  return true;
}

function rowMultiplication(matrixA, matrixB, row) {
  const productOfRow = [];

  for (let index = 0; index < matrixA.length; index++) {
    let element = 0;

    for (let rowIndex = 0; rowIndex < matrixA[index].length; rowIndex++) {
      element += matrixA[row][rowIndex] * matrixB[rowIndex][index];
    }

    productOfRow.push(element);
  }

  return productOfRow;
}

function multiplyMatrices(matrixA, matrixB) {
  const product = [];

  if (!isCompatibleDimensions(matrixA, matrixB)) {
    return NaN;
  }

  for (let index = 0; index < matrixA.length; index++) {
    product.push(rowMultiplication(matrixA, matrixB, index));
  }

  return product;
}

function getBrackets(msg) {
  return "[" + msg + "]";
}

function areEachElementEqual(arr1, arr2) {
  for (let index = 0; index < arr1.length; index++) {
    if (!arr2.includes(arr1[index])) {
      return false;
    }
  }

  return true;
}

function areElementsEqual(array1, array2, index) {
  if (index === array1.length) {
    return true;
  }

  if (!areEachElementEqual(array1[index], array2[index])) {
    return false;
  }

  return areElementsEqual(array1, array2, index + 1);
}

function areEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  return areElementsEqual(array1, array2, 1);
}

function getMark(actual, expected) {
  if (isNaN(actual) && isNaN(expected)) {
    return "✅";
  }

  return areEqual(actual, expected) ? "✅" : "❌";
}

function testMultiplyMatrices(matrixA, matrixB, expected) {
  const actual = multiplyMatrices(matrixA, matrixB);
  const mark = getMark(actual, expected);

  console.log(mark, "Matrices : ", matrixA, "*", matrixB);
  console.log("Expected :", expected, " Actual :", actual, "\n");
}

function nanTestCases() {
  testMultiplyMatrices([[]], [[]], NaN);
  testMultiplyMatrices([[1]], [[1], [1]], NaN);
  testMultiplyMatrices([[1, 2]], [[1]], NaN);
  testMultiplyMatrices([[1, 2], [4, 5, 3]], [[7], [9],], NaN);
}

function singleDArrayTestCase() {
  testMultiplyMatrices([[1]], [[1]], [[1]]);
  testMultiplyMatrices([[1]], [[2]], [[2]]);
}

function testCases() {
  singleDArrayTestCase();
  testMultiplyMatrices([[0, 0]], [[0], [0]], [[0]]);
  testMultiplyMatrices([[1, 2]], [[3], [4]], [[11]]);
  testMultiplyMatrices([[1, 2], [4, 5]], [[7], [9]], [[25], [73]]);
  testMultiplyMatrices([[1, 2, 3], [4, 5, 6]], [[7, 8], [9, 10],
  [11, 12]], [[58, 64], [139, 154]]);
  nanTestCases();
}

testCases();
