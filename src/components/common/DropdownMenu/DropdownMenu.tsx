import { Button, ButtonProps } from '../Button/Button';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import { useEffect, useState } from 'react';

export type DropDownMenuItem = {
    mainButton: ButtonProps;
    nestedButtons: DropDownMenuItem[];
};

export type DropdownMenuProps = {
    data: DropDownMenuItem;
    position: 'above' | 'left' | 'under';
};

function getButton(id: string, data: DropDownMenuItem): DropDownMenuItem | undefined {
    let button: DropDownMenuItem | undefined;
    if (data.mainButton.id === id) {
        console.log('data.mainButton.id', data.mainButton.id);
        console.log('id', id);
        button = data;
    } else {
        data.nestedButtons.forEach((dropdownItem) => {
            console.log(dropdownItem);
            if (!button) {
                button = getButton(id, dropdownItem);
            }
        });
    }
    return button;
}

export function DropdownMenu(props: DropdownMenuProps) {
    const [open, setOpen] = useState(false);
    const [dropdownState, setDropdownState] = useState({
        prevButtonIds: [''],
        currButtonId: props.data.mainButton.id,
    });
    const currButton = getButton(dropdownState.currButtonId, props.data);
    useEffect(() => {
        console.log('getButton', getButton(dropdownState.currButtonId, props.data));
    });
    const backButton = (
        <Button
            id={generateUUId()}
            text={'slowly back'}
            key={generateUUId()}
            onMouseUp={() => {
                setDropdownState((prevState) => {
                    return {
                        prevButtonIds: prevState.prevButtonIds.slice(0, -1),
                        currButtonId: prevState.prevButtonIds[prevState.prevButtonIds.length - 1],
                    };
                });
            }}
        />
    );
    return (
        <>
            <Button
                id={props.data.mainButton.id}
                text={'Раскрывающийся дропдаун'}
                onMouseUp={() => {
                    setOpen(!open);
                    setDropdownState((prevState) => {
                        return {
                            prevButtonIds: [...prevState.prevButtonIds],
                            currButtonId: currButton?.mainButton.id ?? '',
                        };
                    });
                }}
            />
            <ul>
                {dropdownState.prevButtonIds.length > 1 && backButton}
                {open &&
                    currButton?.nestedButtons.map((pair, index) => {
                        return (
                            <>
                                <li key={index}>
                                    <Button
                                        id={pair.mainButton.id}
                                        text={pair.mainButton.text}
                                        onMouseUp={() =>
                                            setDropdownState((prevState) => {
                                                return {
                                                    prevButtonIds: [...prevState.prevButtonIds, prevState.currButtonId],
                                                    currButtonId: pair.mainButton.id ?? '',
                                                };
                                            })
                                        }
                                    />
                                </li>
                            </>
                        );
                    })}
            </ul>
        </>
    );
}
