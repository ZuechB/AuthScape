import React, {forwardRef, CSSProperties} from 'react';
// import classNames from 'classnames';

export const Action = forwardRef(
  ({active, className, cursor, icon, style, ...props}, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={"Action"}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            '--fill': active?.fill,
            '--background': active?.background,
          }
        }
      >
        {icon()}
      </button>
    );
  }
);