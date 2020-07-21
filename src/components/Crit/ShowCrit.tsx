import marked from 'marked';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import { deleteCrit } from '../../app/actions/deleteCrit';
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
  categoryId: string;
}

enum DeleteCritSteps {
  DELETE,
  CONFIRM,
}

const ShowCrit: React.FC<ShowCritProps> = ({
  crit,
  setShowEditForm,
  categoryId,
}) => {
  const dispatch = useDispatch();
  const [deleteCritStep, setDeleteCritStep] = useState(DeleteCritSteps.DELETE);

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

  const onDeleteClick = () => {
    if (deleteCritStep === DeleteCritSteps.DELETE) {
      setDeleteCritStep(DeleteCritSteps.CONFIRM);
      return;
    }

    if (deleteCritStep === DeleteCritSteps.CONFIRM) {
      // dispatch the delete request
      dispatch(deleteCrit({ critId: crit.id, categoryId }));
      setDeleteCritStep(DeleteCritSteps.DELETE);
    }
  };

  const resetDeleteState = () => {
    setTimeout(() => setDeleteCritStep(DeleteCritSteps.DELETE), 3000);
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
            className="mr-1"
          >
            Edit
          </Button>
          <Button
            variant={`${crit.isComment ? '' : 'outline-'}danger`}
            size="sm"
            onClick={onDeleteClick}
            onBlur={() => setDeleteCritStep(DeleteCritSteps.DELETE)}
            onMouseLeave={resetDeleteState}
          >
            {deleteCritStep === DeleteCritSteps.DELETE ? 'Delete' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowCrit;
