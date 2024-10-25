import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

export function ColorPicker({name, defaultColor, onColorChanged}) {

    const [rgbColor, setColor] = useState(null);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [completedColor, setCompletedColor] = useState(null);
    const [timeoutToken, setTimeoutToken] = useState(null);

    const styles = reactCSS({
        'default': {
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: rgbColor != null ? `rgba(${ rgbColor.r }, ${ rgbColor.g }, ${ rgbColor.b }, ${ rgbColor.a })` : defaultColor,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        },
    });

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (color) => {
        setColor(color.rgb);
    };


    useEffect(() => {

      if (!displayColorPicker && completedColor != null)
      {
        clearTimeout(timeoutToken);
        setTimeoutToken(setTimeout(() => {
          
          onColorChanged(name, completedColor);

        }, 500));
      }

      if (!displayColorPicker && completedColor == null && defaultColor != null)
      {
        setColor(defaultColor);
      }

    }, [displayColorPicker, completedColor, defaultColor]);


    return (
        <div>
        <div style={ styles.swatch } onClick={ handleClick }>
          <div style={ styles.color } />
        </div>
        { displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ handleClose }/>
          <SketchPicker color={ rgbColor != null ? rgbColor : "#fff" } onChange={ handleChange } onChangeComplete={() => {
            setCompletedColor(`rgba(${ rgbColor.r }, ${ rgbColor.g }, ${ rgbColor.b }, ${ rgbColor.a })`);
          }} />
        </div> : null }

      </div>
    );
}