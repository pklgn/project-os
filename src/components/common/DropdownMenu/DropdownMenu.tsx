import { Button, ButtonProps } from '../Button/Button';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import { useEffect, useState } from 'react';
import { mockDropdown } from '../../../app_model/model/mock/mockDropdown';

export type DropDownMenuItem = {
    mainButton: ButtonProps;
    nestedButtons: DropDownMenuItem[];
};

export type DropdownMenuProps = {
    data: DropDownMenuItem[];
    position: 'above' | 'left' | 'under';
};

export function DropdownMenu(props: DropdownMenuProps) {
    const [open, setOpen] = useState(true);
    const [currButtonId, setCurrButtonId] = useState('');
    const currButton: DropDownMenuItem | undefined = mockDropdown.data.find((element) => {
        return element.mainButton.id === currButtonId;
    });
    useEffect(() => {
        console.log(currButton);
    });
    return (
        <div>
            <Button
                id={generateUUId()}
                text={'Раскрывающийся дропдаун'}
                onMouseUp={() => {
                    setOpen(!open);
                }}
            />
            <ul>
                {open && currButton
                    ? currButton.nestedButtons.map((pair, index) => {
                          return (
                              <li key={index}>
                                  <Button {...pair.mainButton} onClick={() => setCurrButtonId(pair.mainButton.id)} />
                              </li>
                          );
                      })
                    : mockDropdown.data.map((pair, index) => {
                          return (
                              <li key={index}>
                                  <Button {...pair.mainButton} onClick={() => setCurrButtonId(pair.mainButton.id)} />
                              </li>
                          );
                      })}
            </ul>
        </div>
    );
}
