import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Crit from '../Crit';
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
          className="mb-3"
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
                    category.critIds.map((id, index) => (
                      <Crit id={id} key={id} index={index} />
                    ))
                  ) : (
                    <ListGroupItem variant="secondary">
                      There's nothing here yet... please add a comment!
                    </ListGroupItem>
                  )}
                  {provided.placeholder}
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
