import React, {useEffect, useState, useRef} from 'react';
import {ColorPicker} from 'authscape'

const Documents = ({loadedUser, currentUser, setIsLoading}) => {

  return (
    <>
      <ColorPicker name="Hello World" defaultColor={"rgba(34, 190, 33, 0.78)"} onColorChanged={(name, selectedColor) => {
        alert(selectedColor)
      }} />

      <ColorPicker name="Empty Field" defaultColor={null} onColorChanged={(name, selectedColor) => {
        alert(selectedColor)
      }} />
      
    </>
  );

};

export default Documents;