import React, {useEffect} from 'react';
import classNames from 'classnames';

/// use in testing
// import { Handle } from './Handle';
// import { Remove } from './Remove';

// import styles from './dist/Item.module.css';
import { Box } from '@mui/material';

export const Item = React.memo(
  React.forwardRef(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        name,
        handle,
        handleProps,
        height,
        itemStyles,
        cardDetail,
        CardTemplate,
        index,
        listeners,
        onRemove,
        onCardClicked,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        handleMoreClick,
        handleMoreClose,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      cardDetail.moreClicked = handleMoreClick;

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          className={classNames(
            itemStyles.Wrapper,
            fadeIn && itemStyles.fadeIn,
            sorting && itemStyles.sorting,
            dragOverlay && itemStyles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(', '),
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': color,
              paddingTop:"10px"
            }
          }
          ref={ref}
        >
          <Box
            className={classNames(
              itemStyles.Item,
              dragging && itemStyles.dragging,
              handle && itemStyles.withHandle,
              dragOverlay && itemStyles.dragOverlay,
              disabled && itemStyles.disabled,
              color && itemStyles.color
            )}
            onClick={(e) => {
              if (onCardClicked != null)
              {
                e.stopPropagation();
                onCardClicked(value);
              }
            }}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}>

              
            {CardTemplate != null &&
             <CardTemplate props={cardDetail} />
            }

            {CardTemplate == null &&
              <Box>
              {name}
              </Box>
            }

            <span className={"Actions"}>
              {onRemove ? (
                <Remove className={"Remove"} onClick={onRemove} />
              ) : null}
              {handle ? <Handle {...handleProps} {...listeners} /> : null}
            </span>
          </Box>
        </li>
      );
    }
  )
);