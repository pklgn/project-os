import { DropdownMenuProps } from '../common/DropdownMenu/DropdownMenu';
import { generateUUId } from '../../app_model/model/utils/uuid';
import { FullscreenIcon } from '../common/icons/Fullscreen/Fullscreen';

const FullScreenDropdownMenu: DropdownMenuProps = {
    data: {
        mainButton: { id: generateUUId(), iconLeft: FullscreenIcon({ color: '#ffa322' }) },
        nestedButtons: [
            {
                mainButton: { id: generateUUId(), text: 'С первого слайда' },
                nestedButtons: [],
            },
            {
                mainButton: { id: generateUUId(), text: 'С текущего слайда' },
                nestedButtons: [],
            },
        ],
    },
    position: 'left',
};

export { FullScreenDropdownMenu };
