import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './CritControls.scss';
import {
  addFeedbackCrit,
  Crit,
  removeFeedbackCrit,
  setCrit,
} from './critsSlice';

interface CritControlsProps {
  crit: Crit;
  showEditForms: boolean;
  setShowEditForms: Function;
  editCrit: Crit;
  setEditCrit: Function;
}

const CritControls: React.FC<CritControlsProps> = ({
  crit,
  showEditForms,
  setShowEditForms,
  editCrit,
  setEditCrit,
}: CritControlsProps) => {
  const dispatch = useDispatch();

  const onAddClick = () => {
    dispatch(addFeedbackCrit(crit.id));
  };

  const onRemoveClick = () => {
    dispatch(removeFeedbackCrit(crit.id));
  };

  const onEditClick = () => {
    setShowEditForms(true);
  };

  const onSaveClick = () => {
    dispatch(setCrit(editCrit));
    setShowEditForms(false);
  };

  const onCancelClick = () => {
    // TODO - alert if crit != editCrit
    setEditCrit(crit);
    setShowEditForms(false);
  };

  return (
    <div className="crit-controls">
      <div className="crit-add-remove">
        {!crit.isComment && (
          <>
            <Button
              variant="outline-primary"
              size="sm"
              className="mr-1"
              onClick={onAddClick}
            >
              Add
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              className="mr-1"
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
          </>
        )}
      </div>

      <div className="crit-edit-save">
        {showEditForms ? (
          <>
            <Button
              variant="success"
              size="sm"
              className="mr-1"
              onClick={onSaveClick}
            >
              Save
            </Button>
            <Button variant="danger" size="sm" onClick={onCancelClick}>
              Cancel
            </Button>
          </>
        ) : (
          <div className="crit-edit">
            <Button
              variant={`${crit.isComment ? '' : 'outline-'}warning`}
              size="sm"
              onClick={onEditClick}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CritControls;
