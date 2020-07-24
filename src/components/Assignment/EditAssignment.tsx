import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './EditAssignment.scss';
import { Assignment } from './types';

interface EditAssignmentProps {
  editAssignment: Assignment;
  setEditAssignment: (editAssignment: Assignment) => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
}

const EditAssignment = ({
  editAssignment,
  setEditAssignment,
  onSaveClick,
  onCancelClick,
}: EditAssignmentProps) => {
  return (
    <Card className="edit-assignment mb-3">
      <Card.Header>
        <h4>Edit Assignment Details</h4>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="edit-assignment-name">
            <Form.Label className="text-muted">Assignment name</Form.Label>
            <Form.Control
              placeholder="Enter assignment name."
              value={editAssignment.name}
              onChange={(e) =>
                setEditAssignment({ ...editAssignment, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="edit-assignment-max-score">
            <Form.Label className="text-muted">
              Maximum possible score
            </Form.Label>
            <Form.Control
              type="number"
              min={0}
              placeholder="Enter maximum score."
              value={editAssignment.maxScore}
              onChange={(e) =>
                setEditAssignment({
                  ...editAssignment,
                  maxScore: +e.target.value,
                })
              }
            />
          </Form.Group>

          <hr />

          <Form.Group controlId="edit-assignment-use-mastery">
            <Form.Check
              type="checkbox"
              label="Use mastery scoring"
              checked={editAssignment.useMasteryScoring}
              className="text-muted"
              onChange={() =>
                setEditAssignment({
                  ...editAssignment,
                  useMasteryScoring: !editAssignment.useMasteryScoring,
                })
              }
            />
          </Form.Group>

          {editAssignment.useMasteryScoring && (
            <Form.Group controlId="edit-assignment-mastery-points">
              <Form.Label className="text-muted">Mastery Points</Form.Label>
              <Form.Control
                type="number"
                min={0}
                placeholder="Enter number of mastery points."
                value={editAssignment.masteryPoints}
                disabled={!editAssignment.useMasteryScoring}
                onChange={(e) =>
                  setEditAssignment({
                    ...editAssignment,
                    masteryPoints: +e.target.value,
                  })
                }
              />
            </Form.Group>
          )}

          <div className="edit-assignment-controls">
            <Button variant="light mr-1" size="sm" onClick={onSaveClick}>
              Save
            </Button>
            <Button variant="light" size="sm" onClick={onCancelClick}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditAssignment;
