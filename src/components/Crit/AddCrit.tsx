import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createCrit } from '../../app/actions';
import EditCrit from './EditCrit';
import { Crit } from './types';

const editCritInitialState: Crit = {
  id: '',
  text: '',
  pointValue: 1,
  occurs: 0,
  isComment: false,
};

interface AddCritProps {
  categoryId: string;
}

const AddCrit = ({ categoryId }: AddCritProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editCrit, setEditCrit] = useState(editCritInitialState);
  const dispatch = useDispatch();

  const onAddClick = () => {
    setShowEditForm(true);
  };

  const onSaveClick = (event: React.MouseEvent<HTMLFormElement>) => {
    dispatch(createCrit({ crit: editCrit, categoryId }));
    setEditCrit(editCritInitialState);
    setShowEditForm(false);
  };

  const onCancelClick = () => {
    // TODO: prompt if editCrit != initial state
    setShowEditForm(false);
    setEditCrit(editCritInitialState);
  };

  return (
    <ListGroup.Item variant="secondary">
      {showEditForm ? (
        <EditCrit
          editCrit={editCrit}
          setEditCrit={setEditCrit}
          onSaveClick={onSaveClick}
          onCancelClick={onCancelClick}
        />
      ) : (
        <Button variant="secondary" size="lg" block onClick={onAddClick}>
          Add a new item
        </Button>
      )}
    </ListGroup.Item>
  );
};

export default AddCrit;
