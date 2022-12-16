import React, { useRef, Fragment, useEffect } from "react";

import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Subscript from "@tiptap/extension-subscript";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import FontFamily from "@tiptap/extension-font-family";
import Superscript from "@tiptap/extension-superscript";

import DynamicButton from "@/components/RichText/partials/dynamic-button";

import {
  Root,
  Label,
  Legend,
  Toolbar,
  Fieldset,
  ToolbarLine,
  RichTextBase,
  RichTextControl,
  UIEditorContent,
} from "@/components/RichText/styled";
import { useEditor } from "@/libs/tiptap";
import { Box, FormHelperText } from "@mui/material";
import { ButtonType, toolbarLines } from "@/components/RichText/shared";

export type RichTextProps = {
  label: string;
  value?: string;
  needForce?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
};

export const RichText = ({
  label,
  value,
  onChange,
  errorMessage,
}: RichTextProps): JSX.Element => {
  const editor = useEditor({
    extensions: [
      TaskList,
      TaskItem,
      Underline,
      TextStyle,
      Subscript,
      StarterKit,
      Typography,
      FontFamily,
      Superscript,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: [ButtonType.Headding, ButtonType.Paragraph],
      }),
    ],
    content: value,
    onUpdate: ({ editor: e }) => {
      if (typeof onChange === "function") {
        onChange(e.getHTML());
      }
    },
  });

  const isError = !!errorMessage;
  const checker = useRef<boolean>(false);

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (value && checker.current === false) {
      checker.current = true;
      editor.commands.setContent(value, false, {
        preserveWhitespace: "full",
      });
    }
  }, [editor, value]);

  if (!editor) {
    return <Fragment></Fragment>;
  }

  return (
    <Root fullWidth={true} error={!!errorMessage}>
      <Toolbar>
        <Fragment>
          {toolbarLines.map((buttons, index) => {
            return (
              <ToolbarLine key={`line-${index}`}>
                <Fragment>
                  {buttons.map(({ id, Icon, option, type }) => {
                    return (
                      <DynamicButton
                        id={id}
                        key={id}
                        Icon={Icon}
                        type={type}
                        editor={editor}
                        option={option}
                      />
                    );
                  })}
                </Fragment>
              </ToolbarLine>
            );
          })}
        </Fragment>
      </Toolbar>
      <RichTextControl>
        <Label
          component="label"
          isError={isError}
          isEmpty={editor.isEmpty}
          isFocused={editor.isFocused}
        >
          {label}
        </Label>
        <RichTextBase>
          <Fieldset
            isError={isError}
            component="fieldset"
            isFocused={editor.isFocused}
          >
            <Legend
              component="legend"
              isEmpty={editor.isEmpty}
              isFocused={editor.isFocused}
            >
              <Box component="span">{label}</Box>
            </Legend>
          </Fieldset>
          <UIEditorContent editor={editor} />
        </RichTextBase>
      </RichTextControl>
      {!!isError && <FormHelperText>{errorMessage}</FormHelperText>}
    </Root>
  );
};
