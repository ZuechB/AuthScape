import React, { useState, useEffect } from "react";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from 'next/dynamic';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

  export const RichTextEditor = ({html, onSave, height = 400, isDisabled = false}) => {
    
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
  };

  useEffect(() => {

    if (html != null)
    {
      const contentBlock = convertFromHTML(html);
      if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
      }
    }

  }, [html])
  
  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        readOnly={isDisabled}
        editorStyle={{height:height}}
        onEditorStateChange={onEditorStateChange}
        // mention={{
        //   separator: " ",
        //   trigger: "@",
        //   suggestions: [
        //     { text: "APPLE", value: "apple" },
        //     { text: "BANANA", value: "banana", url: "banana" },
        //     { text: "CHERRY", value: "cherry", url: "cherry" },
        //     { text: "DURIAN", value: "durian", url: "durian" },
        //     { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
        //     { text: "FIG", value: "fig", url: "fig" },
        //     { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
        //     { text: "HONEYDEW", value: "honeydew", url: "honeydew" }
        //   ]
        // }}
      />
        <hr/>
        <Box sx={{textAlign:"right"}}>
            <Button variant="contained" disabled={isDisabled} onClick={async () => {

                await onSave(draftToHtml(convertToRaw(editorState.getCurrentContent())));
            
            }}>Save</Button>
        </Box>
    </>
  );
}