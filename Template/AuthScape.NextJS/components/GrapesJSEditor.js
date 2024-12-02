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


const GrapesJSEditor = ({loadedUser, isReady, pageId, plugins = []}) => {
  const editorRef = useRef(null);
  const blocksRef = useRef(null);
  

  useEffect(() => {
    if (loadedUser && isReady)
    {
      plugins.push(plugin);
      plugins.push(ImageEditor);
      plugins.push(FlexBox);
      plugins.push(Forms);
      plugins.push(NavBar);
      plugins.push(styleBG);
      plugins.push(StyleFilter);
      plugins.push(StyleGradient);
      plugins.push(toolTip);
      plugins.push(CustomCode);
      plugins.push(postCSS);
      plugins.push(webPagePresent);
      plugins.push(Tabs);
      plugins.push(Touch);
      plugins.push(symbols);


      const editor = grapesjs.init({
        container: editorRef.current,
        storageManager: false,
        blockManager: {
          appendTo: blocksRef.current
        },
        panels: { defaults: [] }, // Avoid default panels
        plugins: plugins,
        pluginsOpts: {
          [plugin]: { /* options */ }
        },
        assetManager: {
          // upload: {
          //   endpoint: 'https://your-api-endpoint/upload/assets',
          // },
          uploadFile: async (e) => {
            const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
            const formData = new FormData();
  
            if (files.length == 0)
            {
              return;
            }

            for (let i = 0; i < files.length; i++) {
              formData.append('file', files[0]);
            }

            const response = await apiService().post("/ContentManagement/UploadAsset", formData);
            if (response.status == 200)
            {
              const file = response.data;

              const assets = {
                src: file.url,
                name: file.name,
                //type: "image",
                height: file.height,
                width: file.width,
              };
              editor.AssetManager.add(assets);

            }
          },
        },
      });

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
      <div ref={blocksRef} style={{ width: '180px', background: '#f0f0f0' }}></div>
      <div ref={editorRef} style={{ flex: 1 }}></div>
    </div>
  );
};

export default GrapesJSEditor;
