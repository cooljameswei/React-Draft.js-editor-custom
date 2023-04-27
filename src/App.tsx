import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Title from "./Title/title";
import { ReactDOM } from "react";
import { convertToRaw, Editor, EditorState, RichUtils, DraftInlineStyle } from "draft-js";
import "draft-js/dist/Draft.css";
import InlineStyleControls from "./InlineStylesControls";

function App() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );


    const handleEditorChange = (newState: any) => {
        setEditorState(newState);
        const rawContentState = convertToRaw(newState.getCurrentContent());
        const text = rawContentState.blocks[0].text;
        console.log(text);
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
      }
    };

    const toggleInlineStyle = (inlineStyle: string) => {
      const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
      const newState2 = RichUtils.toggleBlockType(newState, "header-one");
      setEditorState(newState2);
    };

    return (
        <div className="App">
            <Title />
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
                    placeholder="Write something!"
                />
            </div>
        </div>
    );
}

export default App;
