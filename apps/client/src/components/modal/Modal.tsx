// @ts-ignore
import React, { FC, PropsWithChildren } from "react";
import { Dialog } from "primereact/dialog";

type ModalDialogProps = {
  isOpen: boolean;
  close: () => void;
  heading: string;
};

export const ModalDialog: FC<PropsWithChildren<ModalDialogProps>> = ({
  isOpen,
  close,
  heading,
  children,
}) => {
  return (
    <Dialog header={heading} visible={isOpen} onHide={close} draggable={false}>
      <div>
        <div>{children}</div>
      </div>
    </Dialog>
  );
};
