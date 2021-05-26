import React, { useState, useEffect } from 'react';
import prints from '../prints.json';
import SideTalk from './sidetalk.js';
import Button from './button.js';

export default function Grid() {
  const [smallBox, setSmallBox] = useState(40); // width of a single box in pixels
  const [bigBox, setBigBox] = useState(8); // how many small boxes in a big box to make a big box?
  const [bigBoxHeight, setBigBoxHeight] = useState(11); //optional height of boxes
  const [border, setBorder] = useState(2); // border size
  const [maxWidth, setMaxWidth] = useState(600); // max width of the main grid container
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [borderColor, setBorderColor] = useState('lightgray');
  const [imageBorderColor, setImageBorderColor] = useState('black');
  const [imageBorder, setImageBorder] = useState(12);
  const [controlsOff, setControlsOff] = useState(true);

  const m = prints.length;

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // call on window resize or any of the variables change
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    const floored = Math.floor(windowWidth / smallBox - 4); // how many small boxes in the row on resize? page width divided by small boxes, minus four to get some space // (1440 / 32) - 4 => 41
    setMaxWidth(floored * smallBox + 1 * border); // 41 * 32 + 1 => 1313 // the actual width of te grid.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth, smallBox, bigBox, border]);

  //how many squares will fit into defined width?
  const bigBoxWidth = bigBox * smallBox; // 8 * 32 pixels
  const boxesInRow = Math.floor(maxWidth / smallBox); // 1313 / 32 => 41.
  const bigBoxesInRow = Math.floor((boxesInRow - 1) / bigBox); // 40 / 8 => 5. first remove one extra as there always should be an outer border. then divide with one extra for the other border.
  const bigBoxesInColumn = Math.ceil(m / bigBoxesInRow); // 6 / 5 => 2
  const boxesInColumn = bigBoxesInColumn * (bigBoxHeight + 1) + 1; // 2 * 12 + 1 => 25 big box will always have one extra as a border
  const boxesTotal = boxesInColumn * boxesInRow; // 25 * 41 => 1025

  return (
    <div className='grid-holder' style={{ maxWidth: maxWidth }}>
      <SideTalk />
      <h1>SHOP</h1>
      <div className='controls'>
        <h6 onClick={() => setControlsOff(!controlsOff)}>Style the Grid</h6>
        <p className={`controls-text ${controlsOff && `controls-off`}`}>
          <Button
            item={smallBox}
            funct={setSmallBox}
            name={'Grid size in pixels'}
            min={10}
            max={100}
          />
          <Button
            item={bigBox}
            funct={setBigBox}
            name={'Image Width:'}
            min={3}
            max={16}
          />
          <Button
            item={bigBoxHeight}
            funct={setBigBoxHeight}
            name={'Image Height:'}
            min={3}
            max={16}
          />
          <Button
            item={border}
            funct={setBorder}
            name={'Border:'}
            min={1}
            max={12}
          />
          <Button
            item={imageBorder}
            funct={setImageBorder}
            name={'Image Border:'}
            min={1}
            max={20}
          />
          {/*
          <Button
            item={imageBorderColor}
            funct={setImageBorderColor}
            name={'Image Border Color:'}
            values={['blue', 'red', 'gray']}
          />
          */}
        </p>
      </div>
      <div className='flex-between'>
        <p className='tiny'>
          anetacamo <i>prints</i> <br />
          following images can be ordered in a4 / 350dkk a3 / 450dkk plus
          shipping. <br />
          Also possible to hand in Aarhus
          <br />
        </p>
        <p className='tiny'>
          SHOP //{' '}
          <a
            href='https://anetacamo.github.io'
            rel='noreferrer'
            target='_blank'
          >
            <i>HOME</i>
          </a>
        </p>
      </div>
      <div
        className='flex main-grid'
        style={{
          borderWidth: border,
          borderColor: borderColor,
        }}
      >
        {[...Array(boxesTotal)].map((e, i) => (
          <div
            className='square'
            style={{
              width: smallBox,
              height: smallBox,
              borderWidth: border,
              borderColor: borderColor,
            }}
            key={i}
          ></div>
        ))}

        <div className='flex grid-larger' style={{ padding: smallBox / 2 }}>
          {prints.map((e, i) => (
            <div
              className='square-larger'
              key={i}
              style={{
                backgroundImage: `url(${e.image}`,
                width: bigBoxWidth + border,
                height: bigBoxHeight * smallBox + border,
                borderWidth: imageBorder,
                borderColor: imageBorderColor,
                marginLeft: smallBox / 2,
                marginBottom: smallBox / 2 - border,
                marginRight: smallBox / 2 - border,
                marginTop: smallBox / 2,
              }}
            >
              <p className='tiny'>{e.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
