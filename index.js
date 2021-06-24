let maze = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],

  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],

  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "#", "#", "#", "#", "+", "#"],

  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

const start = () => {
  const XMarksTheSpot = () => {
    for (let i = 0; i < maze.length; i++) {
      let lastindex = maze[i].length - 1;

      if (maze[i][0] === "+") {
        maze[i][0] = "x";
      }
      if (maze[i][lastindex] === "+") {
        maze[i][lastindex] = "x";
      }
      for (let j = 0; j < maze[i].length; j++) {
        let lastindex = maze.length - 1;
        if (maze[0][j] === "+") {
          maze[0][j] = "x";
        }
        if (maze[lastindex][j] === "+") {
          maze[lastindex][j] = "x";
        }
      }
    }
    return false;
  };

  XMarksTheSpot();

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
  let endingPoint = findIndex("x", maze);

  let way = [];
  function checkPath(start, end) {
    if (end === false) return "No way from dat maze";
    maze[start.y][start.x] = "v";
    maze[end.y][end.x] = "+";
    let steps = tossBreadcrumbs(start);

    if (steps.length > 0) {
      for (let i = 0; i < steps.length; i++) {
        const current = steps[i];
        way.push(current.path);
        const isSolved = current.x === end.x && current.y === end.y;
        const notVisited = maze[current.y][current.x] !== "v";
        if (isSolved || (notVisited && checkPath(current, end)) ) {
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

  checkPath(startingPoint, endingPoint);
  console.log(maze);
  // console.log(endingPoint);
  return way;
};

console.log(start());
