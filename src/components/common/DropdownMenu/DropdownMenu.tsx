import { Button, ButtonProps } from '../Button/Button';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import React, { useEffect, useRef, useState } from 'react';
import styles from './DropdownMenu.module.css';
import ArrowBack from '../icons/ArrowBack/ArrowBack';
import { Triangle } from '../icons/Triangle/Triangle';
import { joinClassNames } from '../../utils/joinClassNames';

export type DropDownMenuItem = {
    mainButton: ButtonProps;
    nestedButtons: DropDownMenuItem[];
};

type PositionType = 'default' | 'left';

export type DropdownMenuProps = {
    data: DropDownMenuItem;
    position: PositionType;
};

type DropdownStateType = {
    prevButtonIds: string[];
    currButtonId: string;
};

function getCurrButton(id: string, data: DropDownMenuItem): DropDownMenuItem | undefined {
    let button: DropDownMenuItem | undefined;
    if (data.mainButton.id === id) {
        button = data;
    } else {
        data.nestedButtons.forEach((dropdownItem) => {
            if (!button) {
                button = getCurrButton(id, dropdownItem);
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
                iconRight={pair.nestedButtons[0] && <Triangle width={10} height={10} color={'black'} />}
            />
        </li>
    );
}

type DropdownListProps = {
    dropdownState: DropdownStateType;
    handleClickBack: () => void;
    handleClickForward: (pair: DropDownMenuItem) => void;
    handleClickOutside: () => void;
    currButton: DropDownMenuItem | undefined;
    position: PositionType;
};

function DropdownList(props: DropdownListProps) {
    const { dropdownState, handleClickBack, handleClickForward, handleClickOutside, currButton, position } = props;
    const dropdownListRef = useRef<HTMLUListElement>(null);
    const backButton = (
        <Button
            id={generateUUId()}
            type={'in-list'}
            text={'Назад'}
            key={generateUUId()}
            iconLeft={<ArrowBack key={generateUUId()} />}
            onMouseUp={() => handleClickBack()}
        />
    );

    useEffect(() => {
        function onMouseDown(e: MouseEvent) {
            if (!dropdownListRef.current?.contains(e.target as Node)) {
                handleClickOutside();
            }
        }
        window.addEventListener('mousedown', onMouseDown);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
        };
    }, [handleClickOutside]);

    return (
        <ul
            ref={dropdownListRef}
            className={joinClassNames([styles['dropdown-list'], styles[`dropdown-list--${position}`] ?? ''])}
        >
            {dropdownState.prevButtonIds.length > 1 && backButton}
            {currButton?.nestedButtons.map((pair, index) => {
                return (
                    <DropdownListItem
                        key={generateUUId()}
                        pair={pair}
                        index={index}
                        handleClickForward={handleClickForward}
                    />
                );
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
    const currButton = getCurrButton(dropdownState.currButtonId, props.data);

    function handleClickOutside() {
        setOpen(false);
        setDropdownState(initialDropdownState);
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
        if (pair.nestedButtons.length > 0) {
            setDropdownState((prevState) => {
                return {
                    prevButtonIds: [...prevState.prevButtonIds, prevState.currButtonId],
                    currButtonId: pair.mainButton.id ?? '',
                };
            });
        }
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

    return (
        <div ref={dropdownRef} className={styles['dropdown-control-button']}>
            <Button
                id={props.data.mainButton.id}
                text={props.data.mainButton.text}
                onMouseUp={() => handleToggleMenu()}
                iconLeft={props.data.mainButton.iconLeft}
            />
            {open && (
                <DropdownList
                    currButton={currButton}
                    dropdownState={dropdownState}
                    handleClickBack={handleClickBack}
                    handleClickForward={handleClickForward}
                    handleClickOutside={handleClickOutside}
                    position={props.position}
                />
            )}
        </div>
    );
}
