import React, { useRef, useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { apiService } from 'authscape';

// blocks
import plugin from 'grapesjs-blocks-basic';
import ImageEditor from 'grapesjs-tui-image-editor';
import FlexBox from 'grapesjs-blocks-flexbox';
import Forms from 'grapesjs-plugin-forms';
import NavBar from 'grapesjs-navbar';
import styleBG from 'grapesjs-style-bg';
import StyleFilter from 'grapesjs-style-filter';
import StyleGradient from 'grapesjs-style-gradient';
// import LorySlider from 'grapesjs-lory-slider';
import Tabs from 'grapesjs-tabs';
import toolTip from 'grapesjs-tooltip';
import CustomCode from 'grapesjs-custom-code';
import Touch from 'grapesjs-touch';
import postCSS from 'grapesjs-parser-postcss';
// import fonts from '@silexlabs/grapesjs-fonts';
import symbols from '@silexlabs/grapesjs-symbols';
// import newsletter from 'grapesjs-preset-newsletter';
import webPagePresent from 'grapesjs-preset-webpage';
// import CkEditor from 'gjs-plugin-ckeditor';
// import grapesJSMJML from 'grapesjs-mjml'


const GrapesJSEditor = ({loadedUser, isReady, pageId}) => {
  const editorRef = useRef(null);
  

  useEffect(() => {
    if (loadedUser && isReady)
    {
      const editor = grapesjs.init({
        container: editorRef.current,
        // your GrapesJS configurations here
        plugins: [plugin, ImageEditor, FlexBox, Forms, NavBar, styleBG, StyleFilter, StyleGradient, toolTip, CustomCode, postCSS, webPagePresent, Tabs, Touch, symbols],
        pluginsOpts: {
          [plugin]: { /* options */ }
        }
      });



      editor.Panels.addButton
      ('options',
        [{
          id: 'save-db',
          className: 'fa fa-floppy-o',
          command: 'save-db',
          attributes: {title: 'Save DB'}
        }]
      );

    // Add the command
    editor.Commands.add
    ('save-db',
    {
        run: function(editor, sender)
        {
          sender && sender.set('active', 0); // turn off the button
          editor.store();

          var htmldata = editor.getHtml();
          var cssdata = editor.getCss();
          // console.log(htmldata);
          // console.log(cssdata);

          const sendData = async (htmldata, cssdata) => {
            await apiService().post("/ContentManagement/SavePageContent", {
              pageId: pageId,
              htmlData: htmldata,
              cssData: cssdata
            });
          }
          sendData(htmldata, cssdata);
          

        }
    });


















      return () => {
        editor.destroy();
      };
    }
  }, [loadedUser, isReady]);

  return (
    <div ref={editorRef} />
  );
};

export default GrapesJSEditor;