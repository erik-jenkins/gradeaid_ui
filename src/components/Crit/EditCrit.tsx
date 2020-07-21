import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Crit, setCrit } from './critsSlice';
import './EditCrit.scss';

interface EditCritProps {
  crit: Crit;
  showEditForm: boolean;
  setShowEditForm: (show: boolean) => void;
}

const EditCrit = ({ crit, showEditForm, setShowEditForm }: EditCritProps) => {
  const [editCrit, setEditCrit] = useState<Crit>(crit);
  const dispatch = useDispatch();
  const editCritTextarea = useRef(null);

  useEffect(() => {
    if (editCritTextarea?.current) {
      let textArea: any = editCritTextarea.current;
      textArea.style.height = '';
      textArea.style.height = textArea.scrollHeight + 10 + 'px';
    }
  }, [showEditForm, editCrit.text]);

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
    <div className="edit-crit">
      <div className="crit-text">
        <Form.Control
          as="textarea"
          placeholder="Enter item text here."
          value={editCrit.text}
          className="edit-crit-text"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setEditCrit({ ...editCrit, text: e.target.value });
          }}
          style={{ fontFamily: 'monospace' }}
          ref={editCritTextarea}
        />
      </div>
      <div className="crit-controls mt-1">
        <Form inline className="edit-crit-pointvalue-comment-form">
          <Form.Label className="mr-2">Points</Form.Label>
          <Form.Control
            className="mr-2 edit-crit-pointvalue"
            size="sm"
            placeholder="5"
            value={editCrit.pointValue}
            disabled={editCrit.isComment}
            type="number"
            min={0}
            onChange={(e) =>
              setEditCrit({ ...editCrit, pointValue: +e.target.value })
            }
          />
          <Form.Check
            type="checkbox"
            className="mr-2"
            label="Comment"
            checked={editCrit.isComment}
            onChange={() =>
              setEditCrit({ ...editCrit, isComment: !editCrit.isComment })
            }
          />
        </Form>

        <div className="crit-edit-save">
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
        </div>
      </div>
    </div>
  );
};

export default EditCrit;
