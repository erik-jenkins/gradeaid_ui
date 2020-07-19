import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './Crit.scss';
import { addFeedbackCrit, removeFeedbackCrit } from './critsSlice';

interface CritProps {
  id: string;
  index: number;
}

const Crit: React.FC<CritProps> = ({ id, index }: CritProps) => {
  const crit = useSelector((state: RootState) => state.crits.critsById[id]);

  const dispatch = useDispatch();

  const onAddClick = () => {
    dispatch(addFeedbackCrit(crit.id));
  };

  const onRemoveClick = () => {
    dispatch(removeFeedbackCrit(crit.id));
  };

  return (
    <Draggable draggableId={crit.id} index={index}>
      {(provided, snapshot) => (
        <ListGroup.Item
          variant={snapshot.isDragging ? 'dark' : ''}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="crit"
        >
          <div className="crit-text mb-2">{crit.text}</div>
          <div className="crit-controls">
            <div className="crit-add-remove">
              <Button
                variant="outline-primary"
                size="sm"
                className="mr-1"
                onClick={onAddClick}
              >
                Add
              </Button>
              <Button
                variant="outline-primary mr-1"
                size="sm"
                onClick={onRemoveClick}
              >
                Remove
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="crit-pointvalue"
                disabled
              >
                {crit.pointValue} point{crit.pointValue === 1 ? '' : 's'}
              </Button>
            </div>
            <div className="crit-edit">
              <Button variant="outline-warning" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

export default Crit;
