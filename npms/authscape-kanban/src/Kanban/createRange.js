import React, {useCallback, useEffect, useRef, useState} from 'react';

export function createRange(
  length,
  initializer) {
  return [...new Array(length)].map((_, index) => initializer(index));
}