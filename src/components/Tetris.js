import React, { useState } from "react";
import {createStage } from '../gameHelpers';

import { usePlayer } from "../Hooks/usePlayer";
import { useStage } from "../Hooks/useStage";

import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log("re-render");

const movePlayer = dir => { 
    updatePlayerPos({ x: dir, y: 0 })
}

const startGame = ()=>{
    setStage(createStage());
    resetPlayer();
}

const drop =()=>{
    updatePlayerPos({ x: 0, y: 1, collided: false})
}

const dropPlayer =()=>{
    drop();
}

const move = ({keyCode})=>{
    if (!gameOver){
        if (keyCode=== 37){
            movePlayer(-1);
        }
        else if (keyCode === 39){
            movePlayer(1);
        }
        else if (keyCode === 40){
           dropPlayer(); 
        }
    }
}

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Levels: ${level}`} />
            </div>
          )}
          <StartButton onClick={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
