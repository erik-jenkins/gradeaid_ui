import React from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { Category } from './types';

interface EditCategoryProps {
  editCategory: Category;
  setEditCategory: (editCategory: Category) => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
}

const EditCategory = ({
  editCategory,
  setEditCategory,
  onSaveClick,
  onCancelClick,
}: EditCategoryProps) => {
  return (
    <ListGroup.Item variant="secondary">
      <h4>Edit Category</h4>
      <Form>
        <Form.Group controlId="edit-category-name">
          <Form.Label>Category name</Form.Label>
          <Form.Control
            placeholder="Enter category name."
            value={editCategory.name}
            onChange={(e) =>
              setEditCategory({ ...editCategory, name: e.target.value })
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
    </ListGroup.Item>
  );
};

export default EditCategory;
