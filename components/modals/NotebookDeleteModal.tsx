/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BaseText } from "@components/BaseText";
import { Button } from "@components/Button";
import ErrorBoundary from "@components/ErrorBoundary";
import { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot, ModalSize } from "@utils/modal";
import { React } from "@webpack/common";

import noteHandler from "../../NoteHandler";
import Error from "./Error";
import { RenderMessage } from "./RenderMessage";

export default ({ onClose, notebook, onChangeTab, ...props }: ModalProps & { onClose: () => void; notebook: string; onChangeTab: React.Dispatch<React.SetStateAction<string>>; }) => {
    const notes = noteHandler.getNotes(notebook);

    const handleDelete = () => {
        onClose();
        onChangeTab("Main");
        noteHandler.deleteNotebook(notebook);
    };

    return (
        <ModalRoot
            {...props}
            className="vc-delete-notebook"
            size={ModalSize.LARGE}>
            <ModalHeader>
                <BaseText tag="h3">Confirm Deletion</BaseText>
                <ModalCloseButton onClick={onClose} />
            </ModalHeader>
            <ModalContent>
                <ErrorBoundary>
                    {notes && Object.keys(notes).length > 0 ? (
                        Object.values(notes).map(note => (
                            <RenderMessage
                                key={note.id}
                                note={note}
                                notebook={notebook}
                                fromDeleteModal={true} />
                        ))
                    ) : (
                        <Error />
                    )}
                </ErrorBoundary>
            </ModalContent>
            <ModalFooter>
                <Button
                    variant="dangerPrimary"
                    onClick={handleDelete}
                >
                    DELETE
                </Button>
            </ModalFooter>
        </ModalRoot>
    );
};
