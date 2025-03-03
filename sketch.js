let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // 創建畫布 
  textAlign(LEFT, TOP);

  // 在畫面左上角創建一個文字框
  input = createInput();
  input.position(10, 25);
  input.size(200, 40); // 設置文字框的大小
  input.value('淡江大學');
  input.style('font-size', '20px'); // 設置文字框內文字的大小

  // 在文字框的右側創建一個滑桿
  slider = createSlider(28, 50, 32);
  slider.position(input.x + input.width + 10, 35); // 設置滑桿的位置
  slider.style('width', '150px'); // 設置滑桿的寬度

  // 在滑桿的右側創建一個按鈕
  button = createButton('跳動');
  button.position(slider.x + slider.width + 10, 25); // 設置按鈕的位置
  button.size(100, 40); // 設置按鈕的大小
  button.style('font-size', '20px');
  button.mousePressed(toggleBounce);

  // 在按鈕的右側創建一個下拉式選單
  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 25); // 設置下拉式選單的位置
  dropdown.size(120, 40); // 設置下拉式選單的大小
  dropdown.style('font-size', '20px'); // 設置下拉式選單內文字的大小
  dropdown.option('教育科技系');
  dropdown.option('第三周作品');
  dropdown.option('第三周講義');
  dropdown.changed(handleDropdownChange);

  // 初始化偏移量
  for (let i = 0; i < 1000; i++) {
    offsets.push(random(0, 1000));
  }

  // 創建 iframe
  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.style('border', 'none');
}

function draw() {
  background(255);
  let inputText = input.value();
  let textSizeValue = slider.value();
  textSize(textSizeValue);
  
  // 將輸入的文字排滿整個畫面
  let y = 0;
  let lineHeight = textAscent() + textDescent() + 10; // 增加行間距
  let rowCount = 0;
  let offsetIndex = 0;
  
  while (y < height) {
    let x = 0;
    while (x < width) {
      if (rowCount >= 2) { // 隱藏前兩排文字
        let bounce = 0;
        if (isBouncing) {
          bounce = sin((frameCount + offsets[offsetIndex]) * 0.1) * 10;
        }
        text(inputText, x, y + bounce);
        offsetIndex++;
      }
      x += textWidth(inputText);
    }
    y += lineHeight;
    rowCount++;
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === '教育科技系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === '第三周作品') {
    iframe.attribute('src', 'https://stella0808.github.io/20250303/');
  } else if (selected === '第三周講義') {
    iframe.attribute('src', 'https://hackmd.io/@PMQvdaUjQhiyuBOw7P0pgQ/S1qQMtfskl');
  }
}

