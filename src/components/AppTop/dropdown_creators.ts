import { l18nType } from '../../l18n/l18n';

import { DropdownMenuProps } from '../common/DropdownMenu/DropdownMenu';

import { generateUUId } from '../../app_model/model/utils/uuid';

import { FullscreenIcon } from '../common/icons/Fullscreen/Fullscreen';
import { GlobeIcon } from '../common/icons/GlobeInternationalization/GlobeInternationalizationIcon';

export type FullScreenDropdownProps = {
    locale: l18nType;
    firstSlideStartHandler: () => void;
    currSlideStartHandler: () => void;
};

export const getFullScreenDropdownMenu = (props: FullScreenDropdownProps): DropdownMenuProps => {
    return {
        data: {
            mainButton: { id: generateUUId(), iconLeft: FullscreenIcon({ color: '#ffa322' }) },
            nestedButtons: [
                {
                    mainButton: {
                        id: generateUUId(),
                        text: props.locale.localization.dropdown.fullscreen.firstSlideStart,
                        onMouseUp: props.firstSlideStartHandler,
                    },
                    nestedButtons: [],
                },
                {
                    mainButton: {
                        id: generateUUId(),
                        text: props.locale.localization.dropdown.fullscreen.currSlideStart,
                        onMouseUp: props.currSlideStartHandler,
                    },
                    nestedButtons: [],
                },
            ],
        },
        position: 'left',
    };
};

export type FileDropdownMenuProps = {
    locale: l18nType;
    handleScreenRatio: {
        handle16To10Ratio: () => void;
        handle16To9Ratio: () => void;
        handle4To3Ratio: () => void;
    };
    handleOpenFile: () => void;
    handleSaveFile: () => void;
    handleSavePdf: () => void;
    handleUploadImage: () => void;
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

export const getFileDropdownMenu = (props: FileDropdownMenuProps): DropdownMenuProps => {
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
                    mainButton: {
                        id: generateUUId(),
                        text: locale.localization.dropdown.file.exportPDF,
                        onMouseUp: props.handleSavePdf,
                    },
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

export type ChangeLocaleDropDownPropsType = {
    locale: l18nType;
    setEnglishLocale: () => void;
    setRussianLocale: () => void;
};

export const getChangeLocaleDropDownMenu = (props: ChangeLocaleDropDownPropsType): DropdownMenuProps => {
    return {
        data: {
            mainButton: {
                id: generateUUId(),
                iconLeft: GlobeIcon({
                    width: 28,
                    height: 28,
                    color: '#ffa322',
                }),
                cssMix: { margin: '0 5px' },
                type: 'round',
            },
            nestedButtons: [
                {
                    mainButton: {
                        id: generateUUId(),
                        text: props.locale.localization.dropdown.locale.ruRU,
                        onMouseUp: props.setRussianLocale,
                    },
                    nestedButtons: [],
                },
                {
                    mainButton: {
                        id: generateUUId(),
                        text: props.locale.localization.dropdown.locale.enEN,
                        onMouseUp: props.setEnglishLocale,
                    },
                    nestedButtons: [],
                },
            ],
        },
        position: 'left',
    };
};
