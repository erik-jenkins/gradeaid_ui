import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './Crit.scss';
import EditCrit from './EditCrit';
import ShowCrit from './ShowCrit';

interface CritProps {
  id: string;
  index: number;
}

const Crit: React.FC<CritProps> = ({ id, index }: CritProps) => {
  const crit = useSelector((state: RootState) => state.crits.critsById[id]);
  const [showEditForm, setShowEditForm] = useState(false);

  // have to rerender MathJax after editing
  useEffect(() => {
    const MathJax: any = window['MathJax'];
    if (MathJax.typeset) {
      MathJax.typeset();
    }
  }, [showEditForm, crit.text]);

  const computeListGroupItemVariant = (isDragging: boolean): string => {
    if (crit.isComment) return 'info';
    if (isDragging) return 'dark';
    return '';
  };

  return (
    <Draggable draggableId={crit.id} index={index}>
      {(provided, snapshot) => (
        <ListGroup.Item
          variant={computeListGroupItemVariant(snapshot.isDragging)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="crit"
        >
          {showEditForm ? (
            <EditCrit
              crit={crit}
              showEditForm={showEditForm}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <ShowCrit crit={crit} setShowEditForm={setShowEditForm} />
          )}
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

export default Crit;
