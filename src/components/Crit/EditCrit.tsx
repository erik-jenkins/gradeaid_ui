import React, { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import './EditCrit.scss';
import { Crit } from './types';

// TODO: add validation
// Validation can be added by taking in an error interface for this specific form

interface EditCritProps {
  editCrit: Crit;
  setEditCrit: (editCrit: Crit) => void;
  onSaveClick: (event: React.MouseEvent<HTMLFormElement>) => void;
  onCancelClick: () => void;
}

const EditCrit = ({
  editCrit,
  setEditCrit,
  onSaveClick,
  onCancelClick,
}: EditCritProps) => {
  const editCritTextarea = useRef(null);

  useEffect(() => {
    if (editCritTextarea?.current) {
      let textArea: any = editCritTextarea.current;
      textArea.style.height = '';
      textArea.style.height = textArea.scrollHeight + 10 + 'px';
    }
  }, [editCrit.text]);

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
          required
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
            type="submit"
            variant="light"
            size="sm"
            className="mr-1"
            onClick={onSaveClick}
          >
            Save
          </Button>
          <Button variant="light" size="sm" onClick={onCancelClick}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCrit;
