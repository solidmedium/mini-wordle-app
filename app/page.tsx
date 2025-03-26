"use client"

import React, { useState } from 'react';

export default function Home() {
  const answer = 'TABLE';
  // const [answer, setAnswer] = useState<string>('TABLE');
  const [guess, setGuess] = useState<string>('');
  const [wordArray, setWordArray] = useState<string[]>([]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const handleSubmit = () => {
    setWordArray([guess, ...wordArray]);
    setGuess('');
  };

  const RenderRows = () => {
    return wordArray.map((row, index) => {
      return (
        <div key={index}>
          <RenderWords  word={row} />
        </div>
      );
    });
  };

  const RenderWords = (word: { word: string }) => {
    const splitWords = word.word.split('');
    const splitAnswer = answer.split('');
    
    return splitWords.map((value, index) => {
      let isMatch = ''
      if (splitAnswer.includes(value)) isMatch = 'yellow'
      splitAnswer.map((ansVal, ind) => {
        if(ansVal === value && ind === index) isMatch = 'green'
      })
      return <span style={{ backgroundColor: isMatch }} key={index}>{value}</span>;
    });
  };

  return (
    <div>
      <p>Guess the word</p>
      <input onChange={(e) => handleOnchange(e)} maxLength={5} value={guess} />
      <button onClick={() => handleSubmit()}>Submit</button>
      <RenderRows />
    </div>
  );
}
