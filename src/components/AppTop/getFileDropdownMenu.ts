import { generateUUId } from '../../app_model/model/utils/uuid';
import { DropdownMenuProps } from '../common/DropdownMenu/DropdownMenu';
import { l18nType } from '../../l18n/l18n';
import { FigureShape } from '../../app_model/model/types';

export type FileDropdownMenuProps = {
    locale: l18nType;
    handleScreenRatio: {
        handle16To10Ratio: () => void;
        handle16To9Ratio: () => void;
        handle4To3Ratio: () => void;
    };
    handleOpenFile: () => void;
    handleSaveFile: () => void;
    handleInsert: {
        text: () => void;
        image: () => void;
        figure: {
            circle: () => void;
            triangle: () => void;
            rectangle: () => void;
        };
    };
};

const getFileDropdownMenu = (props: FileDropdownMenuProps): DropdownMenuProps => {
    const { locale } = props;
    return {
        data: {
            mainButton: { id: generateUUId(), text: locale.localization.dropdown.file.file },
            nestedButtons: [
                {
                    mainButton: {
                        id: generateUUId(),
                        text: locale.localization.dropdown.file.openFile,
                        onMouseUp: props.handleOpenFile,
                    },
                    nestedButtons: [],
                },
                {
                    mainButton: { id: generateUUId(), text: locale.localization.dropdown.file.saveFile },
                    nestedButtons: [
                        {
                            mainButton: { id: generateUUId(), text: '.json', onMouseUp: props.handleSaveFile },
                            nestedButtons: [],
                        },
                    ],
                },
                {
                    mainButton: { id: generateUUId(), text: locale.localization.dropdown.file.insertElement },
                    nestedButtons: [
                        {
                            mainButton: {
                                id: generateUUId(),
                                text: locale.localization.elements.text,
                                onMouseUp: props.handleInsert.text,
                            },
                            nestedButtons: [],
                        },
                        {
                            mainButton: {
                                id: generateUUId(),
                                text: locale.localization.elements.picture,
                                onMouseUp: props.handleInsert.image,
                            },
                            nestedButtons: [],
                        },
                        {
                            mainButton: { id: generateUUId(), text: locale.localization.elements.figure.generic },
                            nestedButtons: [
                                {
                                    mainButton: {
                                        id: generateUUId(),
                                        text: locale.localization.elements.figure.rectangle,
                                        onMouseUp: props.handleInsert.figure.rectangle,
                                    },
                                    nestedButtons: [],
                                },
                                {
                                    mainButton: {
                                        id: generateUUId(),
                                        text: locale.localization.elements.figure.circle,
                                        onMouseUp: props.handleInsert.figure.circle,
                                    },
                                    nestedButtons: [],
                                },
                                {
                                    mainButton: {
                                        id: generateUUId(),
                                        text: locale.localization.elements.figure.triangle,
                                        onMouseUp: props.handleInsert.figure.triangle,
                                    },
                                    nestedButtons: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    mainButton: { id: generateUUId(), text: locale.localization.dropdown.file.exportPDF },
                    nestedButtons: [],
                },
                {
                    mainButton: { id: generateUUId(), text: locale.localization.dropdown.file.changeAspectRatio },
                    nestedButtons: [
                        {
                            mainButton: {
                                id: generateUUId(),
                                text: '16:9',
                                onMouseUp: props.handleScreenRatio.handle16To9Ratio,
                            },
                            nestedButtons: [],
                        },
                        {
                            mainButton: {
                                id: generateUUId(),
                                text: '16:10',
                                onMouseUp: props.handleScreenRatio.handle16To10Ratio,
                            },
                            nestedButtons: [],
                        },
                        {
                            mainButton: {
                                id: generateUUId(),
                                text: '4:3',
                                onMouseUp: props.handleScreenRatio.handle4To3Ratio,
                            },
                            nestedButtons: [],
                        },
                    ],
                },
            ],
        },
        position: 'default',
    };
};

export { getFileDropdownMenu };
