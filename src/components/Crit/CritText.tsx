import marked from 'marked';
import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import sanitizeHtml from 'sanitize-html';
import { Crit } from './critsSlice';
import './CritText.scss';

interface CritTextProps {
  crit: Crit;
  showEditForms: boolean;
  editCrit: Crit;
  setEditCrit: Function;
}

const parseAndSanitize = (text: string): string => {
  const dirty = marked(text);
  return sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img']),
  });
};

const CritText: React.FC<CritTextProps> = ({
  crit,
  showEditForms,
  editCrit,
  setEditCrit,
}) => {
  const editTextArea = useRef(null);

  const critHtml = parseAndSanitize(crit.text);

  // have to rerender MathJax after editing
  useEffect(() => {
    const MathJax: any = window['MathJax'];
    if (MathJax.typeset) {
      MathJax.typeset();
    }
  }, [showEditForms, crit.text]);

  useEffect(() => {
    if (editTextArea?.current) {
      let textArea: any = editTextArea.current;
      textArea.style.height = '';
      textArea.style.height = textArea.scrollHeight + 10 + 'px';
    }
  }, [showEditForms, editCrit.text]);

  return (
    <>
      {showEditForms ? (
        <Form.Control
          as="textarea"
          placeholder="Enter item text here."
          value={editCrit.text}
          className="edit-crit-text"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setEditCrit({ ...editCrit, text: e.target.value });
          }}
          style={{ fontFamily: 'monospace' }}
          ref={editTextArea}
        />
      ) : (
        <div
          className="crit-text"
          dangerouslySetInnerHTML={{
            __html: critHtml,
          }}
        ></div>
      )}
    </>
  );
};

export default CritText;
