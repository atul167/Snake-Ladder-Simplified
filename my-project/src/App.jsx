import React, { useState } from 'react';

function App({ n = 5 }) {
  const arr = [];
  const [aiMove, setAiMove] = useState(2);
  const colorCode = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
  const name = ['Pankaj', 'Atul', 'Harsh', 'Aryan', 'AI Boss'];
  for (let i = 0; i < n; i++) {
    const obj = {
      id: i,
      score: 0,
      color: colorCode[i],
      name: name[i]
    };
    arr.push(obj);
  }
  const finalScore = 50;
  const [playerdata, setPlayerData] = useState(arr);
  const [player, setPlayer] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);
  const [winner, setWinner] = useState(null);

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  }

  const move = () => {
    if (winner) return;

    const roll = rollDice();
    setDiceRoll(roll);
    const newPlayerData = [...playerdata];

    if (newPlayerData[player].name === 'AI Boss') {
      const newScore = newPlayerData[player].score + aiMove;
      if (newScore <= finalScore) {
        newPlayerData[player].score = newScore;
        if (newScore === finalScore) {
          setWinner(newPlayerData[player].name);
        }
      }
    } else {
      const newScore = newPlayerData[player].score + roll;
      if (newScore <= finalScore) {
        newPlayerData[player].score = newScore;
        if (newScore === finalScore) {
          setWinner(newPlayerData[player].name);
        }
      }
    }

    newPlayerData.forEach((p, index) => {
      if (index !== player && p.score === newPlayerData[player].score && p.name !== 'AI Boss' && p.score !== finalScore) {
        p.score = 0;
      }
    });

    setPlayerData(newPlayerData);
    setPlayer((prevPlayer) => (prevPlayer + 1) % playerdata.length);
  }

  function resetGame() {
    const resetData = playerdata.map((p) => (
      { ...p, score: 0 }
    ));
    setPlayerData(resetData);
    setPlayer(0);
    setDiceRoll(null);
    setWinner(null);
  }

  const renderBoard = () => {
    const boxes = [];
    for (let i = 1; i <= finalScore; i++) {
      const playersHere = playerdata.filter(player => player.score === i);
      boxes.push(
        <div key={i} className="w-8 h-8 border border-solid border-black flex items-center justify-center shadow-sm">
          {playersHere.length > 0 ? (
            <div className="flex space-x-1">
              {playersHere.map(p => (
                <div key={p.id} className={`w-4 h-4 ${p.color} rounded-full`} />
              ))}
            </div>
          ) : (
            i
          )}
        </div>
      );
    }
    return (
      <div className="flex flex-wrap max-w-3xl mb-4">
        {boxes}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">My Game</h1>
      <div className="mb-4 space-x-2">
        <button onClick={() => setAiMove(1)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Easy AI</button>
        <button onClick={() => setAiMove(2)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Medium AI</button>
        <button onClick={() => setAiMove(5)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Hard AI</button>
      </div>
      <p className="mb-4">Current AI Difficulty: {aiMove === 1 ? 'Easy' : aiMove === 2 ? 'Medium' : 'Hard'}</p>
      {renderBoard()}
      <div className='mb-4'>
        {playerdata.map((p, index) => (
          <div key={p.id} className={`${index === player ? 'font-bold' : 'font-normal'} ${p.color} w-[200px] p-2 mb-2 rounded`}>
            {p.name}: Position {p.score}
          </div>
        ))}
      </div>
      <div className="mb-4">
        {winner ? (
          <h2 className="text-xl font-semibold">Winner: {winner}</h2>
        ) : (
          <div>
              <p>Current Player: {playerdata[player].name}</p>
              <p>Last move: {diceRoll}</p>
            <button
              onClick={move}
              className="mr-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Roll Dice
            </button>
          </div>
        )}
        <button onClick={resetGame} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-2">Reset Game</button>
      </div>
    </div>
  )
}

export default App;