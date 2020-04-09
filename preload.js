// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { dialog, screen, globalShortcut, BrowserWindow } = require('electron').remote
var robot = require("robotjs");

function click(x, y) {
  // var el = document.elementFromPoint(x, y)
  robot.mouseClick();
}

globalShortcut.register('F8', () => {
  var point = screen.getCursorScreenPoint()
  click(point.x, point.y)
  // document.elementFromPoint(point.x, point.y).click();

  console.log(point)
})

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
