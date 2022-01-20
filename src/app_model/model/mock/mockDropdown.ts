import { generateUUId } from '../utils/uuid';
import { DropdownMenuProps } from '../../../components/common/DropdownMenu/DropdownMenu';

const mockDropdown: DropdownMenuProps = {
    data: {
        mainButton: { id: generateUUId(), text: 'Самая верхняя кнопка, на которую пользователь нажмет' },
        nestedButtons: [
            {
                mainButton: { id: generateUUId(), text: 'hello text' },
                nestedButtons: [
                    {
                        mainButton: { id: generateUUId(), text: 'nest1' },
                        nestedButtons: [],
                    },
                    {
                        mainButton: { id: generateUUId(), text: 'nest2' },
                        nestedButtons: [
                            {
                                mainButton: { id: generateUUId(), text: 'nestnest1' },
                                nestedButtons: [],
                            },
                        ],
                    },
                ],
            },
            {
                mainButton: { id: generateUUId(), text: 'hello text2' },
                nestedButtons: [
                    {
                        mainButton: { id: generateUUId(), text: '!nested' },
                        nestedButtons: [],
                    },
                ],
            },
        ],
    },
    position: 'under',
};
export { mockDropdown };
