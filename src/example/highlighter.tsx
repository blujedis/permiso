/**
 * @see https://www.npmjs.com/package/react-syntax-highlighter
 */

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Highlighter = ({ language, content, visible }: { language?: string, content: string, visible?: boolean }) => {

  content = content || '';
  language = language || 'typescript';

  return (
    !visible ? null :
      <div style={{ marginTop: '18px' }}>
        <SyntaxHighlighter language={language} style={okaidia}>
          {content}
        </SyntaxHighlighter>
      </div>

  );

};

export default Highlighter;