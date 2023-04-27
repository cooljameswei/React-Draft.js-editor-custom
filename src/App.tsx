import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Title from "./Title/title";
import { ReactDOM } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

function App() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const editor = useRef<any>(null);
    const focusEditor = () => {
        editor.current?.focus();
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
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder="Write something!"
                />
            </div>
        </div>
    );
}

export default App;
