// pages/markdown.js
import React from 'react';
import Markdown from 'react-markdown'

const MarkdownPage = () => {

const markdown = '# Hi, *Pluto*!'


  return (
    <div>
      <Markdown>{markdown}</Markdown>
    </div>
  );
};

export default MarkdownPage;
