import marked from 'marked';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import { addFeedbackCrit, removeFeedbackCrit } from './critsSlice';
import './ShowCrit.scss';
import { Crit } from './types';

const parseAndSanitize = (text: string): string => {
  const dirty = marked(text);
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img']),
  });
};

interface ShowCritProps {
  crit: Crit;
  setShowEditForm: Function;
}

const ShowCrit: React.FC<ShowCritProps> = ({ crit, setShowEditForm }) => {
  const dispatch = useDispatch();

  const critHtml = parseAndSanitize(crit.text);

  const onAddClick = () => {
    dispatch(addFeedbackCrit(crit.id));
  };

  const onRemoveClick = () => {
    dispatch(removeFeedbackCrit(crit.id));
  };

  const onEditClick = () => {
    setShowEditForm(true);
  };

  return (
    <div className="show-crit">
      <div
        className="crit-text"
        dangerouslySetInnerHTML={{
          __html: critHtml,
        }}
      ></div>
      <div className="crit-controls mt-1">
        <div className="crit-add-remove">
          {!crit.isComment && (
            <>
              <Button
                variant="outline-primary"
                size="sm"
                className="mr-1"
                onClick={onAddClick}
              >
                Add
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="mr-1"
                onClick={onRemoveClick}
              >
                Remove
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="crit-pointvalue"
                disabled
              >
                {crit.pointValue} point{crit.pointValue === 1 ? '' : 's'}
              </Button>
            </>
          )}
        </div>

        <div className="crit-edit">
          <Button
            variant={`${crit.isComment ? '' : 'outline-'}warning`}
            size="sm"
            onClick={onEditClick}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowCrit;
