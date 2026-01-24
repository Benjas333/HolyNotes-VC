/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BaseText } from "@components/BaseText";
import { Button } from "@components/Button";
import { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, ModalSize } from "@utils/modal";
import { React, TextInput } from "@webpack/common";

import noteHandler from "../../NoteHandler";

export default (props: ModalProps & { onClose: () => void; }) => {
    const [notebookName, setNotebookName] = React.useState("");

    const handleCreateNotebook = React.useCallback(() => {
        if (notebookName !== "") noteHandler.newNoteBook(notebookName);
        props.onClose();
    }, [notebookName]);

    return (
        <div>
            <ModalRoot className="vc-create-notebook" size={ModalSize.SMALL} {...props}>
                <ModalHeader className="vc-notebook-header">
                    <BaseText tag="h3">Create Notebook</BaseText>
                    <ModalCloseButton onClick={props.onClose} />
                </ModalHeader>
                <ModalContent>
                    <TextInput
                        value={notebookName}
                        placeholder="Notebook Name"
                        onChange={value => setNotebookName(value)}
                        style={{ marginBottom: "10px" }} />
                </ModalContent>
                <ModalFooter>
                    <Button onClick={handleCreateNotebook} variant="positive">Create Notebook</Button>
                </ModalFooter>
            </ModalRoot>
        </div>
    );
};
