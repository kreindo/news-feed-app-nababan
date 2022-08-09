import React from 'react';import { useState, useEffect } from 'react';
const Feeds = () => {
  const [state, setState] = useState({
    name: '',
    age: 0,
    isMarried: null,
  });

  const handleState = () => {
    setState((currentState.age) => currentState.age + 1);
  };

  return (
    <>
      <h2>react hooks</h2>
      <p>{state.name}</p>
      <p>{state.age}</p>
      <button onClick={() => handleState()}>age ++</button>
      <p>{JSON.stringify(state.isMarried)}</p>
    </>
  );
};

export default Feeds;
