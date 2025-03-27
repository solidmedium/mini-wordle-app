"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react';

enum GameState {
  Welcome = 'welcome',
  Playing = 'playing',
  PlayerWins = 'playerwins',
  GameOver = 'gameover',
}

export default function Game() {
  const [answer, setAnswer] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [wordArray, setWordArray] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>(GameState.Welcome);

  useEffect(() => {
    if(gameState === GameState.Welcome) {
      const answers = ['TABLE', 'CHAIR', 'LAMPS', 'COUCH', 'SHELF', 'CLOCK'];
      const randomIndex = Math.floor(Math.random() * answers.length);
      setAnswer(answers[randomIndex]);
    } else if (gameState === GameState.PlayerWins) {
      setErrorMessage('You win');
    } else if (gameState === GameState.GameOver) {
      setErrorMessage('Game Over');
    }
  }, [gameState]);



  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameState(GameState.Playing);
    setGuess(e.target.value);
  };

  const handleSubmit = () => {
    if (guess.length !== 5) {
      setErrorMessage('Please enter 5 characters');
      return;
    }
    setErrorMessage('');
    setWordArray([guess.toLocaleUpperCase(), ...wordArray]);
    setGuess('');
  };

  const AlertDestructive = ({ children }: { children: string }) => {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {children}
        </AlertDescription>
      </Alert>
    )
  }

  const RenderRows = () => {
    return (
      wordArray.length > 0 ? (
        wordArray.map((row, index) => (
          <div className="flex space-2 my-5 justify-between" key={index}>
            <RenderWords  word={row} />
          </div>
        ))
      ) : (
        <div className="flex space-2 my-5 justify-between">
          <RenderWords word={'-----'} />
        </div>
      )
    );
  };

  const RenderWords = (word: { word: string }) => {
    const splitWords = word.word.split('');
    const splitAnswer = answer.split('');
    console.log('answer', answer)

    if (wordArray.length > 4) {
      setGameState(GameState.GameOver);
      return;
    };
    
    let matchCount = 0;
    return splitWords.map((value, index) => {
      let isMatch = ''
      if (splitAnswer.includes(value)) isMatch = 'bg-yellow-300'
      splitAnswer.map((ansVal, ind) => {
        if(ansVal === value && ind === index) {
          isMatch = 'bg-green-600'
          matchCount += 1;
          if(matchCount === 5) {
            setGameState(GameState.PlayerWins);
          }
        } 
      })
      return <div className={`border border-slate-300 font-bold rounded-lg flex justify-center items-center w-[50px] h-[50px] ${isMatch}`} key={index}>{value}</div>;
    });
  };

  return answer == null ? (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="max-w-[400px] min-h-[500px] mx-auto p-4">
        <h1 className="text-4xl mb-3">Guess the word</h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input onChange={(e) => handleOnchange(e)} maxLength={5} minLength={5} value={guess} className="uppercase" />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        {errorMessage && <AlertDestructive>{errorMessage}</AlertDestructive>}
        <RenderRows />
      </div>
    </div>
  )
}