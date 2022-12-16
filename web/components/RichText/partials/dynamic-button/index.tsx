import React, { Fragment, MouseEvent } from "react";

import { Editor } from "@/libs/tiptap";
import { IconButton, Button, Box } from "@mui/material";
import { PickerType } from "@/components/RichText/shared";
import {
  getColor,
  getVariant,
  runChainedCommand,
  checkChainedCommand,
} from "@/components/RichText/partials/dynamic-button/util";

type DynamicButtonProps = {
  id: string;
  type?: string;
  editor: Editor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
  option?: { [key: string]: number | string };
};

const iconSize = "1.2rem";

const DynamicButton = ({
  id,
  Icon,
  type,
  editor,
  option,
}: DynamicButtonProps) => {
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget.dataset;
    if (id && editor) {
      return runChainedCommand(id, editor.chain().focus());
    }
  };

  if (type === PickerType.FontFamily) {
    return (
      <Button
        data-id={id}
        size="small"
        onClick={onButtonClick}
        variant={getVariant(id, editor)}
      >
        {id}
      </Button>
    );
  }

  return (
    <IconButton
      data-id={id}
      onClick={onButtonClick}
      color={getColor(id, editor, option)}
      disabled={checkChainedCommand(id, editor)}
    >
      <Icon size={iconSize} />
    </IconButton>
  );
};

export default DynamicButton;
