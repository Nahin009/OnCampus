"use client";

import dynamic from "next/dynamic"; // Dynamic import for JoditEditor
import { useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const config = {
  readonly: false,
  placeholder: "Start typings...",
  autofocus: true,
  iframe: true,
  spellcheck: true,
  disablePlugins:
    "about,drag-and-drop,drag-and-drop-element,file,image,image-processor,image-properties,media,video,speech-recognize",

  buttons:
    "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,classSpan,spellcheck,cut,copy,paste,selectall,copyformat,hr,table,link,symbols,indent,outdent,left,brush,undo,redo,find,source,fullsize,preview,print",

  showPlaceholder: true,
  height: 300,
  allowResizeY: false,
  width: 800,
};

const config2 = {
  readonly: false,
  placeholder: "Start typings...",
  autofocus: true,
  iframe: true,
  spellcheck: true,
  disablePlugins:
    "about,drag-and-drop,drag-and-drop-element,file,image,image-processor,image-properties,media,video,speech-recognize",

  buttons: "bold,italic,underline,ul,ol,font,fontsize,cut,copy,paste,selectall",

  showPlaceholder: true,
  height: 300,
  allowResizeY: false,
  width: 800,
};

function Editor() {
  const [content, setContent] = useState("");

  return (
    <div>
      <JoditEditor
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </div>
  );
}

function SmallEditor() {
  const [content, setContent] = useState("");

  return (
    <div>
      <JoditEditor
        value={content}
        config={config2}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </div>
  );
}

export { Editor, SmallEditor };
