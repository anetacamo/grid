import React from 'react';

const Button = ({ item, funct, name, min, max, values }) => {
  return (
    <>
      {values && (
        <select name='colors'>
          {values.map((value, index) => (
            <option
              value={value}
              onSelect={() => console.log(value)}
              onChange={() => console.log(value)}
              onClick={() => console.log(value)}
            >
              {value}
            </option>
          ))}
          )
        </select>
      )}
      <span>
        {name} <b>{item}</b>
      </span>
      {max && (
        <button onClick={() => (item < max ? funct(item + 1) : funct(item))}>
          +
        </button>
      )}
      {min && (
        <button onClick={() => (item > min ? funct(item - 1) : funct(item))}>
          -
        </button>
      )}
      <br />
    </>
  );
};
export default Button;
