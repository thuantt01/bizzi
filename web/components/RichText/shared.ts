import {
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiBold,
  RiText,
  RiItalic,
  IconType,
  RiUnderline,
  RiSubscript,
  RiAlignLeft,
  RiSeparator,
  RiAlignRight,
  RiListCheck2,
  RiAlignCenter,
  RiFormatClear,
  RiSuperscript,
  RiListOrdered,
  RiAlignJustify,
  RiTerminalLine,
  RiStrikethrough,
  RiListUnordered,
  RiDoubleQuotesL,
  RiTerminalBoxLine,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from "@/libs/icon";

export enum PickerType {
  Color = "color",
  Image = "image",
  Default = "default",
  FontFamily = "fontFamily",
}

export enum TextStyle {
  Inter = "Inter",
  Serif = "serif",
  Cursive = "cursive",
  Monospace = "monospace",
  ComicSansMS = "Comic Sans MS, Comic Sans",
}

export enum ButtonType {
  Bold = "bold",
  Code = "code",
  Undo = "undo",
  Redo = "redo",
  Italic = "italic",
  Strike = "strike",
  Headding = "heading",
  TaskList = "taskList",
  Heading1 = "heading-1",
  Heading2 = "heading-2",
  Heading3 = "heading-3",
  Heading4 = "heading-4",
  Heading5 = "heading-5",
  Heading6 = "heading-6",
  TextAlignLeft = "left",
  Underline = "underline",
  Subscript = "subscript",
  Paragraph = "paragraph",
  CodeBlock = "codeBlock",
  TextAlignRight = "right",
  BulletList = "bulletList",
  Blockquote = "blockquote",
  TextAlignCenter = "center",
  Superscript = "superscript",
  OrderedList = "orderedList",
  TextAlignJustify = "justify",
  SetHighlight = "setHighlight",
  UnsetAllMarks = "unsetAllMarks",
  HorizontalRule = "horizontalRule",
}

type ToolbarLines = Array<
  Array<{
    Icon?: IconType;
    id: TextStyle | ButtonType;
    type?: PickerType;
    option?: { [key: string]: string | number };
  }>
>;

export const toolbarLines: ToolbarLines = [
  [
    { id: TextStyle.Serif, type: PickerType.FontFamily },
    { id: TextStyle.Inter, type: PickerType.FontFamily },
    { id: TextStyle.Cursive, type: PickerType.FontFamily },
    { id: TextStyle.Monospace, type: PickerType.FontFamily },
    { id: TextStyle.ComicSansMS, type: PickerType.FontFamily },
  ],
  [
    { Icon: RiBold, id: ButtonType.Bold },
    { Icon: RiItalic, id: ButtonType.Italic },
    { Icon: RiUnderline, id: ButtonType.Underline },
    { Icon: RiStrikethrough, id: ButtonType.Strike },
    { Icon: RiFormatClear, id: ButtonType.UnsetAllMarks },
    { Icon: RiAlignLeft, id: ButtonType.TextAlignLeft },
    { Icon: RiAlignCenter, id: ButtonType.TextAlignCenter },
    { Icon: RiAlignRight, id: ButtonType.TextAlignRight },
    { Icon: RiAlignJustify, id: ButtonType.TextAlignJustify },
    { Icon: RiText, id: ButtonType.Paragraph },
    { Icon: RiH1, id: ButtonType.Heading1, option: { level: 1 } },
    { Icon: RiH2, id: ButtonType.Heading2, option: { level: 2 } },
    { Icon: RiH3, id: ButtonType.Heading3, option: { level: 3 } },
    { Icon: RiH4, id: ButtonType.Heading4, option: { level: 4 } },
    { Icon: RiH5, id: ButtonType.Heading5, option: { level: 5 } },
    { Icon: RiH6, id: ButtonType.Heading6, option: { level: 6 } },
  ],
  [
    { Icon: RiSubscript, id: ButtonType.Subscript },
    { Icon: RiSuperscript, id: ButtonType.Superscript },
    { Icon: RiListUnordered, id: ButtonType.BulletList },
    { Icon: RiListOrdered, id: ButtonType.OrderedList },
    { Icon: RiListCheck2, id: ButtonType.TaskList },
    { Icon: RiDoubleQuotesL, id: ButtonType.Blockquote },
    { Icon: RiTerminalLine, id: ButtonType.Code },
    { Icon: RiTerminalBoxLine, id: ButtonType.CodeBlock },
    { Icon: RiSeparator, id: ButtonType.HorizontalRule },
  ],
  [
    { Icon: RiArrowGoBackLine, id: ButtonType.Undo },
    { Icon: RiArrowGoForwardLine, id: ButtonType.Redo },
  ],
];
