import React, {forwardRef} from 'react';
import classNames from 'classnames';

/// use in testing
// import { Handle } from './Handle';
// import { Remove } from './Remove';


export const Container = forwardRef(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      containerStyles,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      disableHandle = false,
      disableDelete = false,
      unstyled,
      ...props
    },
    ref
  ) => {
    const Component = onClick ? 'button' : 'div';

    return (
      <Component
        {...props}
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns,
          }
        }
        className={classNames(
          containerStyles.Container,
          unstyled && containerStyles.unstyled,
          horizontal && containerStyles.horizontal,
          hover && containerStyles.hover,
          placeholder && containerStyles.placeholder,
          scrollable && containerStyles.scrollable,
          shadow && containerStyles.shadow
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className={"Header"}>
            {label}
            <div className={"Actions"}>

              {!disableDelete &&
                <>
                  {onRemove ? <Remove onClick={onRemove} /> : undefined}
                </>
              }

              {!disableHandle &&
                <Handle {...handleProps} />
              }
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul style={{paddingLeft:"10px", paddingRight:"10px", marginTop:"5px", paddingBottom:"10px"}}>{children}</ul>}
      </Component>
    );
  }
);