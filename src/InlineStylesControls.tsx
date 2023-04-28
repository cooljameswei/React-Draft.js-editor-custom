import React from "react";

export const inlineStyles = [
  { label: "B", desc: "font-bold", style: "BOLD" },
  { label: "I", desc: "italic", style: "ITALIC" },
  { label: "U", desc: "underline", style: "UNDERLINE" },
  { label: "S", desc: "line-through", style: "STRIKETHROUGH" },
  { label: "H1", style: "FONT_SIZE_30", desc:  "heading" },
  { label: "R", style: "FONT_RED", desc: "text-red-600"}
];


interface InlineStyleControlsProps {
      currentInlineStyle: any;
      onToggle: (inlineStyle: string) => void;
    }

const InlineStyleControls = ({ currentInlineStyle, onToggle}:  InlineStyleControlsProps) => {
  return (
    <div>
      {inlineStyles.map(type => (
        <button
          key={type.label}
          onMouseDown={e => {
            e.preventDefault();
            onToggle(type.style);
          }}
          className="border-[1px] pl-2 pr-2 mr-3 border-blue-500 hover:bg-blue-500 visited:bg-blue-300"
        >
            {<p className={type.desc}>{type.label}</p>}

          

        </button>
      ))}
    </div>
  );
};

export default InlineStyleControls;
