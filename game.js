const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

const board = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
];

const renderBoard = () => {
  gameBoard.innerHTML = '';
  board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (value !== null) {
        tile.textContent = value;
      } else {
        const tileStack = document.createElement('div');
        tileStack.classList.add('tile-stack');
        const hiddenTile = document.createElement('div');
        hiddenTile.classList.add('hidden-tile');
tileStack.appendChild(hiddenTile);
for (let i = 1; i <= 9; i++) {
const guessTile = document.createElement('div');
guessTile.classList.add('guess-tile');
guessTile.textContent = i;
guessTile.addEventListener('click', () => {
value = i;
tile.removeChild(tileStack);
tile.textContent = value;
});
tileStack.appendChild(guessTile);
}
tile.appendChild(tileStack);
}
gameBoard.appendChild(tile);
});
});
};

const resetBoard = () => {
board.forEach((row, rowIndex) => {
row.forEach((value, colIndex) => {
board[rowIndex][colIndex] = null;
});
});
renderBoard();
};

renderBoard();
resetButton.addEventListener('click', resetBoard);
// プレイヤーがクリックしたときにタイルの値を更新する関数
const updateTileValue = (tile, value) => {
const row = parseInt(tile.dataset.row);
const col = parseInt(tile.dataset.col);
board[row][col] = value;
};

// ゲームボード上で数字が重複していないかを確認する関数
const checkBoardValidity = () => {
// 行のチェック
for (let i = 0; i < 9; i++) {
const row = board[i];
const uniqueRow = new Set(row.filter(val => val !== null));
if (uniqueRow.size !== row.filter(val => val !== null).length) {
return false;
}
}
// 列のチェック
for (let i = 0; i < 9; i++) {
const col = board.map(row => row[i]);
const uniqueCol = new Set(col.filter(val => val !== null));
if (uniqueCol.size !== col.filter(val => val !== null).length) {
return false;
}
}
// サブグリッドのチェック
for (let i = 0; i < 9; i += 3) {
for (let j = 0; j < 9; j += 3) {
const subgrid = [
board[i][j], board[i][j+1], board[i][j+2],
board[i+1][j], board[i+1][j+1], board[i+1][j+2],
board[i+2][j], board[i+2][j+1], board[i+2][j+2],
];
const uniqueSubgrid = new Set(subgrid.filter(val => val !== null));
if (uniqueSubgrid.size !== subgrid.filter(val => val !== null).length) {
return false;
}
}
}
return true;
};

// 勝利メッセージを表示する関数
const showWinMessage = () => {
alert('Congratulations! You have won the game!');
};

// 数字のタイルをクリックしたときの処理
const handleTileClick = (e) => {
const tile = e.target;
const value = parseInt(tile.textContent);
const tileStack = tile.querySelector('.tile-stack');
if (tileStack !== null) {
// タイルスタックがある場合は、最も上にある推測用タイルの値を取得
const guessTiles = tileStack.querySelectorAll('.guess-tile');
let guessValue = null;
guessTiles.forEach(guessTile => {
if (guessTile.style.display !== 'none') {
guessValue = parseInt(guessTile.textContent);
}
});
if (guessValue !== null) {
// 推測用タイルの値を取得できた場合は、それをタイルの値として設定
updateTileValue(tile, guessValue);
tile.removeChild(tileStack);
tile.textContent = guessValue;
if (checkBoardValidity()) {
showWinMessage();
}
}
}
};
// 推測用タイルの値を取得できた場合は、それをタイルの値として設定
updateTileValue(tile, guessValue);
tile.removeChild(tileStack);
tile.textContent = guessValue;
if (checkBoardValidity()) {
showWinMessage();
}
}
}
};

// 推測用タイルをクリックしたときの処理
const handleGuessClick = (e) => {
const guessTile = e.target;
const tileStack = guessTile.parentNode
// タイルスタックにある隠れたタイルの値を取得
const hiddenTile = tileStack.querySelector('.hidden-tile');
const guessValue = hiddenTile.dataset.value;

// 推測用タイルの値を取得できた場合は、それをタイルの値として設定
updateTileValue(guessTile, guessValue);
guessTile.removeChild(tileStack);
guessTile.textContent = guessValue;
if (checkBoardValidity()) {
showWinMessage();
}
};

// ゲームボードの初期化
const initBoard = () => {
// タイルスタックに使用する数字をランダムに生成
const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffleNumberList = shuffleArray(numberList);

// ゲームボードを初期化
board.forEach((row, rowIndex) => {
row.forEach((value, colIndex) => {
const tile = document.createElement('div');
tile.classList.add('tile');
// サブグリッドの背景色を設定
const subgridIndex = getSubgridIndex(rowIndex, colIndex);
tile.classList.add(`subgrid-${subgridIndex}`);

// タイルに値が設定されていない場合は、タイルスタックを設定
if (value === null) {
  const tileStack = document.createElement('div');
  tileStack.classList.add('tile-stack');

  // タイルスタックに隠れたタイルを設定
  const hiddenTile = document.createElement('div');
  hiddenTile.classList.add('hidden-tile');
  hiddenTile.dataset.value = shuffleNumberList.pop();
  tileStack.appendChild(hiddenTile);

  // 推測用タイルを設定
  const guessTile = document.createElement('div');
  guessTile.classList.add('guess-tile');
  guessTile.addEventListener('click', handleGuessClick);
  tileStack.appendChild(guessTile);

  // タイルにタイルスタックを設定
  tile.appendChild(tileStack);
} else {
  tile.textContent = value;
}

// タイルをゲームボードに追加
gameBoard.appendChild(tile);
});
});
};

// リセットボタンのクリックイベント
resetButton.addEventListener('click', () => {
// ゲームボードを再初期化
initBoard();
});

// ゲームボードの初期化
initBoard();
