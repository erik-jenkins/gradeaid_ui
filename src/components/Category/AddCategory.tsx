import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../app/actions/createCategory';
import './AddCategory.scss';
import { Category } from './types';

interface AddCategoryProps {
  assignmentId: string;
}

const initialCategoryState: Category = {
  id: '',
  name: '',
  critIds: [],
};

const AddCategory = ({ assignmentId }: AddCategoryProps) => {
  const [categoryToAdd, setCategoryToAdd] = useState(initialCategoryState);
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();

  const onAddClick = () => setShowAddForm(true);

  const onSaveClick = () => {
    dispatch(createCategory({ category: categoryToAdd, assignmentId }));
    setCategoryToAdd(initialCategoryState);
    setShowAddForm(false);
  };

  const onCancelClick = () => {
    setShowAddForm(false);
  };

  return (
    <div className="add-category mb-3">
      {showAddForm ? (
        <Card className="edit-category">
          <Card.Header>
            <h4>Add new category</h4>
          </Card.Header>
          <Card.Body className="mb-2">
            <Form>
              <Form.Group controlId="edit-category-name">
                <Form.Label>Category name</Form.Label>
                <Form.Control
                  placeholder="Enter category name."
                  value={categoryToAdd.name}
                  onChange={(e) =>
                    setCategoryToAdd({
                      ...categoryToAdd,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <div className="edit-category-controls">
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
      ) : (
        <Button variant="secondary" size="lg" block onClick={onAddClick}>
          Add a new category
        </Button>
      )}
    </div>
  );
};

export default AddCategory;
