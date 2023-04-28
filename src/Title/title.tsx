import { convertToRaw } from "draft-js";
import React from "react";



interface titleProps {
      onSave: () => void;
      text: any;
}

const Title = (props: titleProps) => {
      const onSave = () => {      
            const contentState  = props.text.getCurrentContent();
            const serializedContentState = JSON.stringify(convertToRaw(contentState));
            localStorage.setItem('editorState', serializedContentState);
      }
      return (
            <>
                  <div className="flex justify-center items-center p-10">
                      <h1 className="ml-auto"> Demo editor by Bryan</h1>
                      <div className="border-[1px] border-blue-700 pl-2 pr-2 hover:bg-blue-300 ml-auto">
                            <button className="" onClick={onSave}>Save</button>
                      </div>
                  </div>
            </>
      );
}

export default Title;