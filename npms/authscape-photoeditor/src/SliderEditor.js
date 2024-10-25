import React from 'react'
import Slider from '@mui/material/Slider';

export function SliderEditor({ min, max, value, handleChange}) {
  return (
    <div className="slider-container">
      {/* <input
        type="range"
        className="slider"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      /> */}


    <Slider
      size="small"
      // defaultValue={70}
      aria-label="Small"
      valueLabelDisplay="auto"

      className="slider"
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
    />

    </div>
  )
}