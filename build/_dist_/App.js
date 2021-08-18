import React, {useEffect, useState} from "../web_modules/react.js";
import "./App.css.proxy.js";
const App = () => {
  const [cellArray, setCellArray] = useState([
    {id: Math.random(), cellPlayer: "", serialNo: 0},
    {id: Math.random(), cellPlayer: "", serialNo: 1},
    {id: Math.random(), cellPlayer: "", serialNo: 2},
    {id: Math.random(), cellPlayer: "", serialNo: 3},
    {id: Math.random(), cellPlayer: "", serialNo: 4},
    {id: Math.random(), cellPlayer: "", serialNo: 5},
    {id: Math.random(), cellPlayer: "", serialNo: 6},
    {id: Math.random(), cellPlayer: "", serialNo: 7},
    {id: Math.random(), cellPlayer: "", serialNo: 8}
  ]);
  const combArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [restart, setRestart] = useState(false);
  const [winner, setWinner] = useState(false);
  const [xTurn, setXTurn] = useState(false);
  const [cell, setCell] = useState({});
  const [result, setResult] = useState("");
  const circleClass = "o";
  const xClass = "x";
  const currentClass = xTurn ? xClass : circleClass;
  useEffect(() => {
    const checkWin = () => {
      return combArr.map((comb) => {
        const [a, b, c] = comb;
        const checkDraw = () => {
          if (cellArray[a].cellPlayer && cellArray[a].cellPlayer !== cellArray[b].cellPlayer && cellArray[a].cellPlayer !== cellArray[c].cellPlayer) {
            return cellArray.every((cell2) => {
              return cell2.cellPlayer !== "";
            });
          }
        };
        if (cellArray[a].cellPlayer && cellArray[a].cellPlayer === cellArray[b].cellPlayer && cellArray[a].cellPlayer === cellArray[c].cellPlayer) {
          setResult(`Player ${cellArray[a].cellPlayer} won`);
          setRestart(true);
          setWinner(true);
        }
        if (checkDraw()) {
          setResult("Game is drawn");
          setRestart(true);
        }
      });
    };
    checkWin();
  }, [cellArray, xTurn, currentClass]);
  const handleClick = (d, i) => {
    if (d.cellPlayer !== "")
      return null;
    setCell(d);
    filledCell(i);
    setXTurn((x) => !x);
  };
  const filledCell = (d) => {
    const newCells = [...cellArray];
    if (newCells[d].cellPlayer !== "")
      return;
    newCells[d].cellPlayer = currentClass;
    setCellArray(newCells);
  };
  const handleRestart = () => {
    setWelcomeScreen(true);
    setRestart((res) => !res);
    setCellArray((arr) => arr.map((d) => {
      return {
        ...d,
        cellPlayer: ""
      };
    }));
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "gameParent"
  }, /* @__PURE__ */ React.createElement("div", {
    className: xTurn ? `gameContainer ${xClass}` : `gameContainer ${circleClass}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "playerTurn"
  }, /* @__PURE__ */ React.createElement("div", {
    className: xTurn ? "player active" : "player"
  }, /* @__PURE__ */ React.createElement("h1", null, "Player X")), /* @__PURE__ */ React.createElement("div", {
    className: xTurn ? "player" : "player active"
  }, /* @__PURE__ */ React.createElement("h1", null, "Player O"))), /* @__PURE__ */ React.createElement("div", {
    className: "gameWrapper"
  }, cellArray.map((d, i) => /* @__PURE__ */ React.createElement(React.Fragment, {
    key: i
  }, /* @__PURE__ */ React.createElement("div", {
    className: `gameCells ${d.cellPlayer}`,
    onClick: () => handleClick(d, i)
  })))))), restart && /* @__PURE__ */ React.createElement("div", {
    className: "restartContainer"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "restartWrapper"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "restartBtn"
  }, result !== "" && /* @__PURE__ */ React.createElement("h1", null, result), /* @__PURE__ */ React.createElement("button", {
    onClick: handleRestart
  }, "Restart")))), welcomeScreen && /* @__PURE__ */ React.createElement("div", {
    className: "welcomeParent"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "welcomeWrapper"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "playerChoose"
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      setWelcomeScreen(false);
      setXTurn(true);
    }
  }, "Player X")), /* @__PURE__ */ React.createElement("div", {
    className: "playerChoose"
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      setWelcomeScreen(false);
      setXTurn(false);
    }
  }, "Player O")))));
};
export default App;
