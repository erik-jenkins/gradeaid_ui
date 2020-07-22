import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import CritListItem from '../Crit';
import AddCrit from '../Crit/AddCrit';
import './Category.scss';

interface CategoryProps {
  id: string;
  index: number;
}

const Category: React.FC<CategoryProps> = ({ id, index }: CategoryProps) => {
  const category = useSelector(
    (state: RootState) => state.categories.categoriesByID[id]
  );

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
          </Card.Header>
          <Card.Body>
            <Droppable droppableId={id} type="crit">
              {(provided) => (
                <ListGroup ref={provided.innerRef} {...provided.droppableProps}>
                  {category.critIds.length > 0 ? (
                    category.critIds.map((critId, index) => (
                      <CritListItem
                        id={critId}
                        key={critId}
                        index={index}
                        categoryId={id}
                      />
                    ))
                  ) : (
                    <ListGroupItem>
                      There's nothing here yet... please add a comment!
                    </ListGroupItem>
                  )}
                  {provided.placeholder}
                  <AddCrit categoryId={id} />
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
