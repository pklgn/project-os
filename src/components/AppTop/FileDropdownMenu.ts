import { generateUUId } from '../../app_model/model/utils/uuid';
import { DropdownMenuProps } from '../common/DropdownMenu/DropdownMenu';

const FileDropdownMenu: DropdownMenuProps = {
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
            {
                mainButton: { id: generateUUId(), text: 'Изменить соотношение сторон' },
                nestedButtons: [
                    {
                        mainButton: { id: generateUUId(), text: '16:9' },
                        nestedButtons: [],
                    },
                    {
                        mainButton: { id: generateUUId(), text: '16:10' },
                        nestedButtons: [],
                    },
                    {
                        mainButton: { id: generateUUId(), text: '4:3' },
                        nestedButtons: [],
                    },
                ],
            },
        ],
    },
    position: 'default',
};

export { FileDropdownMenu };
