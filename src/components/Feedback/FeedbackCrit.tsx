import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ListGroupItem } from 'react-bootstrap';
import { Crit } from '../Crit/types';

interface FeedbackCritProps {
  crit: Crit;
  index: number;
}

const FeedbackCrit = ({ crit, index }: FeedbackCritProps) => (
  <Draggable draggableId={'feedback-' + crit.id} index={index}>
    {(provided, snapshot) => (
      <ListGroupItem
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        variant={snapshot.isDragging ? 'dark' : ''}
      >
        <div className="feedback-crit-text">{crit.text}</div>
        {crit.occurs > 1 && (
          <div className="feedback-crit-occurrences text-muted">
            ({crit.occurs} times)
          </div>
        )}
      </ListGroupItem>
    )}
  </Draggable>
);

export default FeedbackCrit;
