import { loremIpsum } from 'lorem-ipsum';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './CritListItem.scss';

const CritListItem: React.FC = () => (
  <ListGroup.Item>{loremIpsum()}</ListGroup.Item>
);

export default CritListItem;
