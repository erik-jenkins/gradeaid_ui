import React from 'react';
import { ListGroup } from 'react-bootstrap';
import CritListItem from '../CritListItem';
import './CritList.scss';

const CritList: React.FC = () => {
  return (
    <ListGroup>
      <CritListItem />
      <CritListItem />
      <CritListItem />
      <CritListItem />
      <CritListItem />
    </ListGroup>
  );
};

export default CritList;
