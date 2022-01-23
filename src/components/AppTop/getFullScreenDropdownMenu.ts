import { DropdownMenuProps } from '../common/DropdownMenu/DropdownMenu';
import { generateUUId } from '../../app_model/model/utils/uuid';
import { FullscreenIcon } from '../common/icons/Fullscreen/Fullscreen';
import { l18nType } from '../../l18n/l18n';

export type FullScreenDropdownProps = {
    locale: l18nType;
    firstSlideStartHandler: () => void;
    currSlideStartHandler: () => void;
};

const getFullScreenDropdownMenu = (props: FullScreenDropdownProps): DropdownMenuProps => {
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

export { getFullScreenDropdownMenu };
