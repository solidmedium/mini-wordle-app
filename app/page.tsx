"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

export default function Home() {
  const answer = 'TABLE';
  // const [answer, setAnswer] = useState<string>('TABLE');
  const [guess, setGuess] = useState<string>('');
  const [wordArray, setWordArray] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    return splitWords.map((value, index) => {
      let isMatch = ''
      if (splitAnswer.includes(value)) isMatch = 'bg-yellow-300'
      splitAnswer.map((ansVal, ind) => {
        if(ansVal === value && ind === index) isMatch = 'bg-green-600'
      })
      return <div className={`border border-slate-300 font-bold rounded-lg flex justify-center items-center w-[50px] h-[50px] ${isMatch}`} key={index}>{value}</div>;
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="max-w-[400px] min-h-[500px] mx-auto p-4">
        <h1 className="text-4xl mb-3">Guess the word</h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input onChange={(e) => handleOnchange(e)} maxLength={5} minLength={5} value={guess} className="uppercase" />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        {errorMessage && <p className="text-red-500 my-3">{errorMessage}</p>}
        <RenderRows />
      </div>
    </div>
  );
}

