import React from 'react';
import { Card } from 'react-bootstrap';
import CritList from '../CritList';
import './CategoryListItem.scss';

const CategoryListItem: React.FC = () => (
  <Card className="mb-3">
    <Card.Header>
      <h4>General Requirements</h4>
    </Card.Header>
    <Card.Body>
      <CritList />
    </Card.Body>
  </Card>
);

export default CategoryListItem;
