import { Button, ButtonProps } from '../Button/Button';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import React, { useEffect, useRef, useState } from 'react';
import styles from './DropdownMenu.module.css';
import ArrowBack from '../icons/ArrowBack/ArrowBack';

export type DropDownMenuItem = {
    mainButton: ButtonProps;
    nestedButtons: DropDownMenuItem[];
};

export type DropdownMenuProps = {
    data: DropDownMenuItem;
    position: 'above' | 'left' | 'under';
};

type DropdownStateType = {
    prevButtonIds: string[];
    currButtonId: string;
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

type DropdownListItemProps = {
    pair: DropDownMenuItem;
    index: number;
    handleClickForward: (pair: DropDownMenuItem) => void;
};

function DropdownListItem(props: DropdownListItemProps) {
    const { pair, index, handleClickForward } = props;
    return (
        <li key={index} className={styles['dropdown-item']}>
            <Button
                type={'in-list'}
                id={pair.mainButton.id}
                text={pair.mainButton.text}
                onMouseUp={() => handleClickForward(pair)}
            />
        </li>
    );
}

type DropdownListProps = {
    dropdownState: DropdownStateType;
    handleClickBack: () => void;
    handleClickForward: (pair: DropDownMenuItem) => void;
    currButton: DropDownMenuItem | undefined;
};

function DropdownList(props: DropdownListProps) {
    const { dropdownState, handleClickBack, handleClickForward, currButton } = props;
    const dropdownListRef = useRef<HTMLUListElement>(null);
    const backButton = (
        <Button
            id={generateUUId()}
            type={'in-list'}
            text={'slowly back'}
            key={generateUUId()}
            iconLeft={<ArrowBack key={generateUUId()} />}
            onMouseUp={() => handleClickBack()}
        />
    );

    return (
        <ul ref={dropdownListRef} className={styles['dropdown-list']}>
            {dropdownState.prevButtonIds.length > 1 && open && backButton}
            {currButton?.nestedButtons.map((pair, index) => {
                return DropdownListItem({ pair, index, handleClickForward });
            })}
        </ul>
    );
}

export function DropdownMenu(props: DropdownMenuProps) {
    const initialDropdownState = {
        prevButtonIds: [''],
        currButtonId: props.data.mainButton.id,
    };
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [dropdownState, setDropdownState] = useState(initialDropdownState);
    const currButton = getButton(dropdownState.currButtonId, props.data);

    function handleClickOutside(e: MouseEvent) {
        if (e.target instanceof HTMLElement && !dropdownRef.current?.contains(e.target as Node)) {
            setOpen(false);
            setDropdownState(initialDropdownState);
        } else {
            console.log('e.target', e.target);
            console.log('dropdownRef', dropdownRef.current);
        }
    }

    function handleClickBack() {
        setDropdownState((prevState) => {
            return {
                prevButtonIds: prevState.prevButtonIds.slice(0, -1),
                currButtonId: prevState.prevButtonIds[prevState.prevButtonIds.length - 1],
            };
        });
    }

    function handleClickForward(pair: DropDownMenuItem) {
        setDropdownState((prevState) => {
            return {
                prevButtonIds: [...prevState.prevButtonIds, prevState.currButtonId],
                currButtonId: pair.mainButton.id ?? '',
            };
        });
    }

    function handleToggleMenu() {
        setOpen(!open);
        setDropdownState((prevState) => {
            return {
                prevButtonIds: [...prevState.prevButtonIds],
                currButtonId: currButton?.mainButton.id ?? '',
            };
        });
        if (!open) {
            setDropdownState(initialDropdownState);
        }
    }

    useEffect(() => {
        if (open) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }
    }, [open]);
    return (
        <div ref={dropdownRef} className={styles['dropdown-control-button']}>
            <Button
                id={props.data.mainButton.id}
                text={props.data.mainButton.text}
                onMouseUp={() => handleToggleMenu()}
            />
            {open && (
                <DropdownList
                    dropdownState={dropdownState}
                    handleClickBack={handleClickBack}
                    handleClickForward={handleClickForward}
                    currButton={currButton}
                />
            )}
        </div>
    );
}
