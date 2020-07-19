import moment from 'moment';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Crit, resetFeedbackCrits } from '../Crit/critsSlice';
import FeedbackCrit from '../FeedbackCrit';
import './Feedback.scss';

const punctuationTypes = ['.', ',', ':', '!', '?'];

/**
 * Find the index of the last consecutive punctuation mark. Punctuation marks
 * are defined as the array ['.', ',', ':', '!', '?']. "Consecutive" in this case
 * refers to ellipses at the end of the string, e.g. "hello...", which would return 5.
 * @param str
 * @returns Index of first punctuation at the end of str, or -1 if there is no
 *          punctuation at the end of the str.
 */
const findLastPunctuationIndex = (str: string): number => {
  // quit early if str doesn't end with punctuation
  if (!punctuationTypes.some((punct) => str.endsWith(punct))) {
    return -1;
  }

  for (let index = str.length - 1; index >= 0; index--) {
    const char = str.charAt(index);
    if (!punctuationTypes.includes(char)) {
      return index + 1;
    }
  }

  return -1;
};

export const constructFeedbackText = (feedbackCrits: Crit[]): string => {
  let feedbackText = '';

  if (feedbackCrits.length > 0) {
    feedbackText += `[${moment().format('DD MMM YYYY, h:mm a')}] `;
  }

  feedbackText += feedbackCrits.reduce((accumulator, crit) => {
    let textToAdd = '';
    const lastPunctuationIndex = findLastPunctuationIndex(crit.text);

    if (crit.occurs > 1) {
      if (lastPunctuationIndex < 0) {
        textToAdd = `${crit.text.trim()} (${crit.occurs} times).`;
      } else if (lastPunctuationIndex >= 0) {
        const prePunctuation = crit.text
          .substring(0, lastPunctuationIndex)
          .trim();
        const punctuation = crit.text.substring(lastPunctuationIndex).trim();
        textToAdd = `${prePunctuation} (${crit.occurs} times)${punctuation}`;
      }
    } else {
      textToAdd = crit.text.trim();
    }

    if (punctuationTypes.some((punct) => accumulator.endsWith(punct))) {
      textToAdd = ` ${textToAdd}`;
    }

    return accumulator + textToAdd;
  }, '');

  return feedbackText;
};

const Feedback = () => {
  const feedbackCrits: Crit[] = useSelector((state: RootState) =>
    state.crits.feedbackCritIds.map((critId) => state.crits.critsById[critId])
  );

  const feedbackText = constructFeedbackText(feedbackCrits);

  const dispatch = useDispatch();

  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const onCopyClick = () => {
    if (feedbackText.length > 0) {
      navigator.clipboard.writeText(feedbackText).then(() => {
        setCopyButtonText('Copied!');
        window.setTimeout(() => setCopyButtonText('Copy'), 5000);
      });
    }
  };

  const onResetClick = () => {
    dispatch(resetFeedbackCrits());
  };

  return (
    <div className="sticky-top" style={{ top: '10px' }}>
      <Row className="mb-1">
        <Col className="feedback-controls">
          <Button variant="primary" id="copy-button" onClick={onCopyClick}>
            {copyButtonText}
          </Button>
          <Button variant="danger" id="reset-button" onClick={onResetClick}>
            Reset
          </Button>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Feedback will appear here once added..."
            value={feedbackText}
            disabled
            className="feedback-textarea"
          />
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <Droppable droppableId="feedback-crits-droppable" type="feedback">
            {(provided) => (
              <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                {feedbackCrits.map((crit, index) => (
                  <FeedbackCrit key={crit.id} crit={crit} index={index} />
                ))}
                {provided.placeholder}
              </ListGroup>
            )}
          </Droppable>
        </Col>
      </Row>
      {feedbackCrits.length > 1 && (
        <Row>
          <Col>
            <div className="feedback-list-help text-muted">
              Items in this list can be reordered to change the order of the
              feedback.
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Feedback;
