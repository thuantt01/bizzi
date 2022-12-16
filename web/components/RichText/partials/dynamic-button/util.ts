import { ChainedCommands, Editor } from "@/libs/tiptap";
import { ButtonType, TextStyle } from "@/components/RichText/shared";

export const getVariant = (id: string, chain: Editor) => {
  const isActive = chain.isActive("textStyle", { fontFamily: id });

  return isActive ? "contained" : "outlined";
};

export const getColor = (
  id: string,
  chain: Editor,
  option?: { [key: string]: number | string }
) => {
  let key = id;
  if (key.includes(ButtonType.Headding)) {
    key = ButtonType.Headding;
  }

  let isActive = chain.isActive(key, option);
  if (
    [
      ButtonType.TextAlignLeft,
      ButtonType.TextAlignRight,
      ButtonType.TextAlignCenter,
      ButtonType.TextAlignJustify,
    ].includes(id as ButtonType)
  ) {
    isActive = chain.isActive({ textAlign: id });
  }

  return isActive ? "primary" : "inherit";
};

export const runChainedCommand = (
  id: string,
  chained: ChainedCommands,
  option?: { hex?: string; src?: string }
) => {
  const { hex, src } = option || {};

  switch (id) {
    case TextStyle.Inter:
    case TextStyle.Serif:
    case TextStyle.Cursive:
    case TextStyle.Monospace:
    case TextStyle.ComicSansMS:
      return chained.setFontFamily(id).run();
    case ButtonType.Bold:
      return chained.toggleBold().run();
    case ButtonType.Italic:
      return chained.toggleItalic().run();
    case ButtonType.Underline:
      return chained.toggleUnderline().run();
    case ButtonType.Strike:
      return chained.toggleStrike().run();
    case ButtonType.SetHighlight:
      if (!hex) {
        break;
      }
      return chained.setHighlight({ color: hex }).run();
    case ButtonType.UnsetAllMarks:
      return chained.unsetAllMarks().run();
    case ButtonType.Code:
      return chained.toggleCode().run();
    case ButtonType.Blockquote:
      return chained.toggleBlockquote().run();
    case ButtonType.TextAlignLeft:
    case ButtonType.TextAlignCenter:
    case ButtonType.TextAlignRight:
    case ButtonType.TextAlignJustify:
      return chained.setTextAlign(id).run();
    case ButtonType.Paragraph:
      return chained.setParagraph().run();
    case ButtonType.Heading1:
      return chained.toggleHeading({ level: 1 }).run();
    case ButtonType.Heading2:
      return chained.toggleHeading({ level: 2 }).run();
    case ButtonType.Heading3:
      return chained.toggleHeading({ level: 3 }).run();
    case ButtonType.Heading4:
      return chained.toggleHeading({ level: 4 }).run();
    case ButtonType.Heading5:
      return chained.toggleHeading({ level: 5 }).run();
    case ButtonType.Heading6:
      return chained.toggleHeading({ level: 6 }).run();
    case ButtonType.Subscript:
      return chained.toggleSubscript().run();
    case ButtonType.Superscript:
      return chained.toggleSuperscript().run();
    case ButtonType.BulletList:
      return chained.toggleBulletList().run();
    case ButtonType.OrderedList:
      return chained.toggleOrderedList().run();
    case ButtonType.TaskList:
      return chained.toggleTaskList().run();
    case ButtonType.CodeBlock:
      return chained.toggleCodeBlock().run();
    case ButtonType.HorizontalRule:
      return chained.setHorizontalRule().run();
    case ButtonType.Redo:
      return chained.redo().run();
    case ButtonType.Undo:
      return chained.undo().run();
    default:
      break;
  }
};

export const checkChainedCommand = (id: string, editor: Editor) => {
  switch (id) {
    case ButtonType.Bold:
      return !editor.can().chain().focus().toggleBold().run();
    case ButtonType.Italic:
      return !editor.can().chain().focus().toggleItalic().run();
    case ButtonType.Strike:
      return !editor.can().chain().focus().toggleStrike().run();
    case ButtonType.Code:
      return !editor.can().chain().focus().toggleCode().run();
    case ButtonType.Redo:
      return !editor.can().chain().focus().redo().run();
    case ButtonType.Undo:
      return !editor.can().chain().focus().undo().run();
    default:
      return false;
  }
};
