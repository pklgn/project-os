import { generateUUId } from '../utils/uuid';
import { DropdownMenuProps } from '../../../components/common/DropdownMenu/DropdownMenu';

const mockDropdown: DropdownMenuProps = {
    data: {
        mainButton: { id: generateUUId(), text: 'Файл' },
        nestedButtons: [
            {
                mainButton: { id: generateUUId(), text: 'Открыть' },
                nestedButtons: [],
            },
            {
                mainButton: { id: generateUUId(), text: 'Сохранить' },
                nestedButtons: [
                    {
                        mainButton: { id: generateUUId(), text: '.json' },
                        nestedButtons: [],
                    },
                ],
            },
            {
                mainButton: { id: generateUUId(), text: 'Экспортировать в PDF' },
                nestedButtons: [],
            },
            {
                mainButton: { id: generateUUId(), text: 'Показ слайдов' },
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
        ],
    },
    position: 'default',
};
export { mockDropdown };
