let maze = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],

  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],

  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],

  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

function findIndex(valueToSearch, theArray, currentIndex) {
  if (currentIndex == undefined) currentIndex = 0;
  if (Array.isArray(theArray)) {
    for (let i = 0; i < theArray.length; i++) {
      if (Array.isArray(theArray[i])) {
        newIndex = findIndex(valueToSearch, theArray[i], currentIndex + i);
        if (newIndex) return newIndex;
      } else if (theArray[i] == valueToSearch) {
        return { y: currentIndex, x: i };
      }
    }
  } else if (theArray == valueToSearch) {
    return { y: currentIndex, x: i };
  }
  return false;
}

let startingPoint = findIndex("0", maze);
// console.log(startingPoint)
function checkPath(start, end) {
  maze[start.y][start.x] = "v";
  let steps = tossBreadcrumbs(start);

  if (steps.length > 0) {
    for (let i = 0; i < steps.length; i++) {
      const current = steps[i];
      console.log(`%c${current.path}`, "color: fuchsia");
      const isSolved = current.x === end.x && current.y === end.y;
      const notVisited = maze[current.y][current.x] !== "v";

      if (isSolved || (notVisited && checkPath(current, end))) {
        return true;
      }
    }
  }
  return false;
}

function tossBreadcrumbs(cord) {
  const { x, y } = cord;

  let cords = [];

  if (maze[y - 1] !== undefined) {
    cords.push({ x: x, y: y - 1, val: maze[y - 1][x], path: "top" });
  }
  if (maze[y + 1] !== undefined) {
    cords.push({ x: x, y: y + 1, val: maze[y + 1][x], path: "bottom" });
  }
  if (maze[y][x - 1] !== undefined) {
    cords.push({ x: x - 1, y: y, val: maze[y][x - 1], path: "left" });
  }
  if (maze[y][x + 1] !== undefined) {
    cords.push({ x: x + 1, y: y, val: maze[y][x + 1], path: "right" });
  }

  return cords.filter((crd) => crd.val === "+");
}

console.log(checkPath(startingPoint, { x: 0, y: 3 }));
console.log(maze)
