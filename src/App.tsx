import { useState, useRef, useEffect } from "react";
import * as React from 'react'
import logo from "./logo.svg";
import "./App.css";
import Title from "./Title/title";
import { ReactDOM } from "react";
import {convertToRaw, Editor, EditorState, RichUtils, DraftInlineStyle, ContentState, Modifier, convertFromRaw, getDefaultKeyBinding, KeyBindingUtil} from "draft-js";
import "draft-js/dist/Draft.css";
import InlineStyleControls, { inlineStyles } from "./InlineStylesControls";

const { hasCommandModifier } = KeyBindingUtil;
function App() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
      // handleKeyCommand = handleKeyCommand.bind();
      const savedContentState = localStorage.getItem('editorState');
      if(savedContentState != null)
      {
        const deserializedContentState = JSON.parse(savedContentState);
        const updateState = EditorState.createWithContent(convertFromRaw(deserializedContentState));
        setEditorState(updateState);
      }
    }, [])

    //on Editor Change
    const handleEditorChange = (newState: any) => {
        setEditorState(newState);
        const rawContentState = convertToRaw(newState.getCurrentContent());
        // let text = rawContentState.blocks[0].text;
        let text= '';
        rawContentState.blocks.forEach(block => {
          text = block.text;


          let subString, subString2, subString3, last;
          last = text.substring(text.length-1, text.length);
          let value = last.valueOf();
            subString = text.substring(text.length-2, text.length);
          subString2 = text.substring(text.length-3, text.length);
          subString3 = text.substring(text.length-4, text.length);
          if(subString3 == "*** ")
            delteLastCharacters(4, text, "UNDERLINE");
          else if(subString2 == "** ")
            delteLastCharacters(3, text, "FONT_RED");
          else {
            if(subString == "* ")
              delteLastCharacters(2, text, "BOLD");
            else if(subString == "# ")
              delteLastCharacters(2, text, "FONT_SIZE_30");
          }
        });

    }


    //on Save button clicked
    const onSave = () => {
      const contentState  = editorState.getCurrentContent();
      const serializedContentState = JSON.stringify(convertToRaw(contentState));
      localStorage.setItem('editorState', serializedContentState);
    }
    
    //Set Style as customize
    const delteLastCharacters = (len: number, text: string, style: string) => {
        toggleInlineStyle(style);
        const currentInlineStyle = editorState.getCurrentInlineStyle;
        text = `${text.slice(0, text.length-len)}`;
        console.log(text);

        const contentState  = editorState.getCurrentContent();
        const selectionState  = editorState.getSelection();
        const lastTwoChars = contentState.getBlockForKey(selectionState.getAnchorKey())
                          .getText()
                          .slice(len * -1 + 1);

        const newSelection = selectionState.merge({
          anchorOffset: selectionState.getFocusOffset() - len + 1,
          focusOffset: selectionState.getFocusOffset(),
        })
        const newContentState = Modifier.replaceText(
          contentState,
          newSelection,
          '',
        );
        
        // Create a new EditorState with the new ContentState and selection
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          'remove-range'
        )
        let updatedEditorState = EditorState.forceSelection(
            newEditorState, 
            newContentState.getSelectionAfter()
          );

          const newState = RichUtils.toggleInlineStyle(updatedEditorState, style);
          const newState2 = RichUtils.toggleBlockType(newState, "header-one");
          setEditorState(newState2);
    }

    const keyBindingFn = (e: any) => {
      // if(e.keyCode == 13)
      //   return 'default-style';
      return getDefaultKeyBinding(e);
    }

    const handleKeyCommand = (command: string) => {
      if(command === 'default-style')
      {
        console.log("asdfa");
        // Remove all inline styles from the editor
       
        return "handled";
      }
      return 'not-handled';
    }

    const editor = useRef<any>(null);
    const focusEditor = () => {
        editor.current?.focus();
    };

    const customStyleMap = {
      STRIKETHROUGH: {
        textDecoration: "line-through"
      },
      FONT_SIZE_30: {
        fontSize: "30px"
      },
      FONT_RED: {
        color: "red"
      }
    };

    const toggleInlineStyle = (inlineStyle: string) => {
      const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
      const newState2 = RichUtils.toggleBlockType(newState, "header-one");
      setEditorState(newState2);
    };

    return (
        <div className="App">
            <Title onSave={onSave} text={editorState}/>
            <div className="m-10"
                style={{
                    border: "1px solid black",
                    minHeight: "6em",
                    cursor: "text",
                }}
                onClick={focusEditor}
            >
              <InlineStyleControls
                currentInlineStyle={editorState.getCurrentInlineStyle()}
                onToggle={toggleInlineStyle}
              />

                <Editor
                    ref={editor}
                    customStyleMap={customStyleMap}
                    editorState={editorState}
                    onChange={handleEditorChange}
                    keyBindingFn={keyBindingFn}
                    handleKeyCommand={handleKeyCommand}
                    placeholder="Write something!"
                />
            </div>
        </div>
    );
}

export default App;
