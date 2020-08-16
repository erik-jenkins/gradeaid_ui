import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '../../app/actions/deleteCategory';
import { editCategory as editCategoryAction } from '../../app/actions/editCategory';
import { RootState } from '../../app/store';
import ConfirmButton from '../ConfirmButton';
import CritListItem from '../Crit';
import AddCrit from '../Crit/AddCrit';
import './Category.scss';
import EditCategory from './EditCategory';
import { getDndId } from './types';

interface CategoryProps {
  id: string;
  index: number;
  assignmentId: string;
  showEditControls: boolean;
}

const Category: React.FC<CategoryProps> = ({
  id,
  index,
  assignmentId,
  showEditControls,
}: CategoryProps) => {
  const category = useSelector(
    (state: RootState) => state.categories.categoriesByID[id]
  );

  const [editCategory, setEditCategory] = useState(category);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const dispatch = useDispatch();

  const onEditCategoryClick = () => setShowEditCategory(true);

  const onSaveCategoryClick = () => {
    dispatch(editCategoryAction({ category: editCategory }));
    setShowEditCategory(false);
  };

  const onCancelCategoryClick = () => {
    setEditCategory(category);
    setShowEditCategory(false);
  };

  const onDeleteCategoryClick = () => {
    dispatch(deleteCategory({ categoryId: id, assignmentId }));
  };

  return (
    <Draggable
      draggableId={getDndId(category)}
      index={index}
      isDragDisabled={!showEditControls}
    >
      {(provided) => (
        <Card
          className="mb-3 category"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Card.Header {...provided.dragHandleProps}>
            <h4>{category.name}</h4>
            {showEditControls && (
              <div className="category-edit-controls">
                <Button
                  variant="light"
                  size="sm"
                  className="mr-1"
                  onClick={onEditCategoryClick}
                >
                  Edit category
                </Button>
                <ConfirmButton
                  defaultStateText="Delete Category"
                  confirmStateText="Confirm"
                  onConfirmClick={onDeleteCategoryClick}
                  resetOnMouseBlur
                  buttonProps={{
                    variant: 'light',
                    size: 'sm',
                  }}
                />
              </div>
            )}
          </Card.Header>
          <Card.Body>
            <Droppable droppableId={getDndId(category)} type="crit">
              {(provided) => (
                <ListGroup ref={provided.innerRef} {...provided.droppableProps}>
                  {showEditCategory && (
                    <EditCategory
                      editCategory={editCategory}
                      setEditCategory={setEditCategory}
                      onSaveClick={onSaveCategoryClick}
                      onCancelClick={onCancelCategoryClick}
                    />
                  )}
                  {category.critIds.length > 0 ? (
                    category.critIds.map((critId, index) => (
                      <CritListItem
                        id={critId}
                        key={critId}
                        index={index}
                        categoryId={id}
                        showEditControls={showEditControls}
                      />
                    ))
                  ) : (
                    <ListGroupItem>
                      There's nothing here yet... please add a comment!
                    </ListGroupItem>
                  )}
                  {provided.placeholder}
                  {showEditControls && <AddCrit categoryId={id} />}
                </ListGroup>
              )}
            </Droppable>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default Category;
