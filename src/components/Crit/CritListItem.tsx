import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './Crit.scss';
import { setCrit } from './critsSlice';
import EditCrit from './EditCrit';
import ShowCrit from './ShowCrit';

interface CritProps {
  id: string;
  index: number;
}

const CritListItem: React.FC<CritProps> = ({ id, index }: CritProps) => {
  const crit = useSelector((state: RootState) => state.crits.critsById[id]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editCrit, setEditCrit] = useState(crit);
  const dispatch = useDispatch();

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

  const onSaveClick = () => {
    dispatch(setCrit(editCrit));
    setShowEditForm(false);
  };

  const onCancelClick = () => {
    // TODO - alert if crit != editCrit
    setEditCrit(crit);
    setShowEditForm(false);
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
              editCrit={editCrit}
              setEditCrit={setEditCrit}
              onSaveClick={onSaveClick}
              onCancelClick={onCancelClick}
            />
          ) : (
            <ShowCrit crit={crit} setShowEditForm={setShowEditForm} />
          )}
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

export default CritListItem;