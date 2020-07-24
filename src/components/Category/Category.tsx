import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editCategory as editCategoryAction } from '../../app/actions/editCategory';
import { RootState } from '../../app/store';
import CritListItem from '../Crit';
import AddCrit from '../Crit/AddCrit';
import './Category.scss';
import EditCategory from './EditCategory';

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

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Card
          className="mb-3 category"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Card.Header {...provided.dragHandleProps}>
            <h4>{category.name}</h4>
            {showEditControls && (
              <Button variant="light" size="sm" onClick={onEditCategoryClick}>
                Edit category
              </Button>
            )}
          </Card.Header>
          <Card.Body>
            <Droppable droppableId={id} type="crit">
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
