// グローバル変数
var score = 0;
var time = 60;
var grid = [];

// ブロックの色の配列
var colors = ["red", "blue", "green", "yellow", "purple", "orange"];

// ページの読み込みが完了したら実行
window.onload = function() {
  // グリッドを初期化
  initGrid();

  // ゲームの開始
  setInterval(updateTime, 1000);
};

// グリッドを初期化する関数
function initGrid() {
  // グリッドを生成
  var container = document.getElementById("container");
  for (var i = 0; i < 25; i++) {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block-" + i;
    block.addEventListener("click", function() {
      swapBlocks(this);
    });
    container.appendChild(block);
    grid.push(block);
  }

  // ブロックの色をランダムに設定
  for (var i = 0; i < grid.length; i++) {
    var color = colors[Math.floor(Math.random() * colors.length)];
    grid[i].style.backgroundColor = color;
  }
}

// ブロックを交換する関数
function swapBlocks(block) {
  // 選択されたブロックとその右隣のブロックを交換
  var index = grid.indexOf(block);
  if (index < 24) {
    var rightBlock = grid[index + 1];
    grid[index] = rightBlock;
    grid[index + 1] = block;
    var temp = rightBlock.style.backgroundColor;
    rightBlock.style.backgroundColor = block.style.backgroundColor;
    block.style.backgroundColor = temp;

    // ブロックをチェックして、3つ以上並ん
    function checkBlocks() {
var matches = findMatches();

// 3つ以上並んだブロックがある場合、得点を加算してブロックを消す
if (matches.length > 0) {
score += matches.length;
updateScore();
removeBlocks(matches);
}
}

// 並んだブロックを検索する関数
function findMatches() {
var matches = [];

// 同じ色のブロックが3つ以上並んでいる場合、matches配列に追加
for (var i = 0; i < grid.length; i++) {
var color = grid[i].style.backgroundColor;
if (color !== "") {
if (i < 23 && grid[i + 1].style.backgroundColor === color && grid[i + 2].style.backgroundColor === color) {
matches.push([i, i + 1, i + 2]);
} else if (i < 24 && grid[i + 1].style.backgroundColor === color && grid[i - 1].style.backgroundColor === color) {
matches.push([i, i + 1, i - 1]);
} else if (i < 22 && grid[i + 1].style.backgroundColor === color && grid[i + 3].style.backgroundColor === color) {
matches.push([i, i + 1, i + 3]);
} else if (i < 21 && grid[i + 1].style.backgroundColor === color && grid[i + 4].style.backgroundColor === color) {
matches.push([i, i + 1, i + 4]);
}
}
}

return matches;
}

// 並んだブロックを消す関数
function removeBlocks(matches) {
// matches配列に含まれるブロックを消す
for (var i = 0; i < matches.length; i++) {
for (var j = 0; j < matches[i].length; j++) {
var index = matches[i][j];
grid[index].style.backgroundColor = "";
}
}

// ブロックを下に詰める
moveBlocksDown();

// ブロックの色をランダムに設定
for (var i = 0; i < grid.length; i++) {
if (grid[i].style.backgroundColor === "") {
var color = colors[Math.floor(Math.random() * colors.length)];
grid[i].style.backgroundColor = color;
}
}

// 並んだブロックがあるか再度チェック
setTimeout(checkBlocks, 500);
}

// ブロックを下に詰める関数
function moveBlocksDown() {
// 空いた場所を上から順番に埋める
for (var i = 0; i < grid.length - 5; i++) {
if (grid[i].style.backgroundColor === "" && grid[i + 5].style.backgroundColor !== "") {
grid[i].style.backgroundColor = grid[i + 5].style.backgroundColor;
grid[i + 5].style.backgroundColor = "";
}
}

// 繰り返し呼び出してブロックを下に詰める
if (findMatches().length === 0) {
return;
} else {
setTimeout(moveBlocksDown, 100);
}
}
checkBlocks();
}

// ブロックをチェックして、3つ以上並んでいる場合は消す関数
function checkBlocks() {
var chains = [];

// 横方向にチェック
for (var i = 0; i < grid.length; i++) {
var chainLength = 1;
var color = grid[i].style.backgroundColor;
for (var j = i + 1; j < grid.length; j++) {
if (grid[j].style.backgroundColor == color) {
chainLength++;
} else {
break;
}
}
if (chainLength >= 3) {
for (var k = i; k < i + chainLength; k++) {
grid[k].style.backgroundColor = "";
score++;
}
chains.push(chainLength);
i = i + chainLength - 1;
}
}

// 縦方向にチェック
for (var i = 0; i < 5; i++) {
for (var j = i; j < i + 20; j = j + 5) {
var chainLength = 1;
var color = grid[j].style.backgroundColor;
for (var k = j + 5; k < i + 25; k = k + 5) {
if (grid[k].style.backgroundColor == color) {
chainLength++;
} else {
break;
}
}
if (chainLength >= 3) {
for (var k = j; k < j + chainLength * 5; k = k + 5) {
grid[k].style.backgroundColor = "";
score++;
}
chains.push(chainLength);
}
}
}

// スコアを更新
updateScore();

// チェーン数を表示
if (chains.length > 1) {
var chainText = "";
for (var i = 0; i < chains.length; i++) {
chainText = chainText + chains[i] + " Chain! ";
}
var chainDiv = document.getElementById("chain");
chainDiv.innerHTML = chainText;
setTimeout(function() {
chainDiv.innerHTML = "";
}, 3000);
}
}

// スコアを更新する関数
function updateScore() {
var scoreDiv = document.getElementById("score");
scoreDiv.innerHTML = "Score: " + score;
}

// 時間を更新する関数
function updateTime() {
time--;
var timeDiv = document.getElementById("time");
timeDiv.innerHTML = "Time: " + time;
if (time == 0) {
endGame();
}
}

// ゲーム終了時の処理を行う関数
function endGame() {
// メッセージを表示
var messageDiv = document.getElementById("message");
messageDiv.innerHTML = "Time is up! Final score: " + score;

// グリッドをリセット
for (var i = 0; i < grid.length; i++) {
var color = colors[Math.floor(Math.random() * colors.length)];
grid[i].style.backgroundColor = color;
}

// スコアと時間をリセット
score = 0;
time = 60;
updateScore();
updateTime();
// ブロックをチェックして、3つ以上並んでいる場合は削除する
function checkBlocks() {
for (var i = 0; i < grid.length; i++) {
var color = grid[i].style.backgroundColor;
var count = 1;
var j = i + 1;
while (j < grid.length && grid[j].style.backgroundColor == color) {
count++;
j++;
}
if (count >= 3) {
// 3つ以上並んでいる場合は削除する
for (var k = i; k < j; k++) {
grid[k].style.backgroundColor = "";
}
score += count;
}
i = j - 1;
}
updateScore();
}

// スコアを更新する関数
function updateScore() {
var scoreText = document.getElementById("score");
scoreText.innerHTML = "Score: " + score;
}

// 時間を更新する関数
function updateTime() {
time--;
var timeText = document.getElementById("time");
timeText.innerHTML = "Time: " + time;
if (time == 0) {
// ゲームオーバー
clearInterval(intervalId);
alert("Game over! Your score is " + score);
}
}

// ゲームの開始
var intervalId = setInterval(updateTime, 1000);

// ブロックをランダムに入れ替える関数
function shuffleBlocks() {
for (var i = 0; i < grid.length; i++) {
var randomIndex = Math.floor(Math.random() * grid.length);
var temp = grid[i].style.backgroundColor;
grid[i].style.backgroundColor = grid[randomIndex].style.backgroundColor;
grid[randomIndex].style.backgroundColor = temp;
}
}

// ゲームをリセットする関数
function resetGame() {
score = 0;
time = 60;
updateScore();
updateTime();
shuffleBlocks();
}

// リセットボタンをクリックしたときの処理
var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);
// ゲームの開始ボタンをクリックしたときの処理
var startButton = document.getElementById("start");
startButton.addEventListener("click", function() {
// ゲームを開始する前に、グリッドを初期化する
initGrid();

// ゲームを開始する
intervalId = setInterval(function() {
// ブロックをランダムに入れ替える
shuffleBlocks();
// ブロックをチェックして削除する
checkBlocks();

// 時間を更新する
updateTime();
}, 1000);
});

// ゲームの終了ボタンをクリックしたときの処理
var endButton = document.getElementById("end");
endButton.addEventListener("click", function() {
// ゲームを終了する
clearInterval(intervalId);
alert("Game over! Your score is " + score);
});
