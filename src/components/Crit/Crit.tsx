import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './Crit.scss';
import CritControls from './CritControls';
import { Crit as CritType } from './critsSlice';
import CritText from './CritText';

interface CritProps {
  id: string;
  index: number;
}

const Crit: React.FC<CritProps> = ({ id, index }: CritProps) => {
  const crit = useSelector((state: RootState) => state.crits.critsById[id]);

  const computeListGroupItemVariant = (isDragging: boolean): string => {
    if (crit.isComment) return 'info';
    if (isDragging) return 'dark';
    return '';
  };

  const [showEditForms, setShowEditForms] = useState(false);
  const [editCrit, setEditCrit] = useState<CritType>(crit);

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
          <CritText
            crit={crit}
            showEditForms={showEditForms}
            editCrit={editCrit}
            setEditCrit={setEditCrit}
          />
          <div className="mt-2">
            <CritControls
              crit={crit}
              showEditForms={showEditForms}
              setShowEditForms={setShowEditForms}
              editCrit={editCrit}
              setEditCrit={setEditCrit}
            />
          </div>
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

export default Crit;
