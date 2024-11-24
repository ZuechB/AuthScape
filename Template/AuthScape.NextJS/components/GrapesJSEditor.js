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
  const blocksRef = useRef(null);

  useEffect(() => {
    if (loadedUser && isReady)
    {
      const editor = grapesjs.init({
        container: editorRef.current,
        blockManager: {
          appendTo: blocksRef.current
        },
        plugins: [plugin, ImageEditor, FlexBox, Forms, NavBar, styleBG, StyleFilter, StyleGradient, toolTip, CustomCode, postCSS, webPagePresent, Tabs, Touch, symbols],
        pluginsOpts: {
          [plugin]: { /* options */ }
        }
      });






// // Get the Block Manager module
// const blockManager = editor.Blocks;

// // Get all blocks
// const allBlocks = blockManager.getAll();

// // Loop through all blocks and remove those with the title "Open Blocks"
// allBlocks.forEach(block => {
//   if (block.get('attributes').title === 'Open Blocks') {
//     blockManager.remove(block.get('id'));
//   }
// });












      


      editor.Panels.addButton('options', [{
        id: 'save-db',
        className: 'fa fa-floppy-o',
        command: 'save-db',
        attributes: {title: 'Save DB'}
      }]);

      // Add the command
      editor.Commands.add('save-db', {
        run: function(editor, sender) {
          sender && sender.set('active', 0); // turn off the button
          editor.store();

          var htmldata = editor.getHtml();
          var cssdata = editor.getCss();

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

      // Remove the plus button from the panel
      const panel = editor.Panels.getPanel('options');
      const button = panel.get('buttons').find(btn => btn.id === 'add');
      if (button) {
        panel.get('buttons').remove(button);
      }

      return () => {
        editor.destroy();
      };
    }
  }, [loadedUser, isReady]);

  return (
    <div style={{ display: 'flex' }}>
      <div ref={blocksRef} style={{ width: '200px', background: '#f0f0f0' }}></div>
      <div ref={editorRef} style={{ flex: 1 }}></div>
    </div>
  );
};

export default GrapesJSEditor;
