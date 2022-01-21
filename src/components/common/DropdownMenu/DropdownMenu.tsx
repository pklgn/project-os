import { Button, ButtonProps } from '../Button/Button';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import { BaseSyntheticEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './DropdownMenu.module.css';
import { Triangle } from '../icons/Triangle/Triangle';
import ArrowBack from '../icons/ArrowBack/ArrowBack';

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
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownListRef = useRef<HTMLUListElement>(null);
    const [open, setOpen] = useState(false);
    const [dropdownState, setDropdownState] = useState({
        prevButtonIds: [''],
        currButtonId: props.data.mainButton.id,
    });
    const currButton = getButton(dropdownState.currButtonId, props.data);
    useEffect(() => {
        console.log('getButton', getButton(dropdownState.currButtonId, props.data));
    });
    function handleClickOutside(e: MouseEvent) {
        if (e.target instanceof HTMLElement && !dropdownRef.current?.contains(e.target as Node)) {
            setOpen(false);
        }
    }
    useLayoutEffect(() => {
        if (open) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [open]);
    const backButton = (
        <Button
            id={generateUUId()}
            type={'in-list'}
            text={'slowly back'}
            key={generateUUId()}
            iconLeft={<ArrowBack key={generateUUId()} />}
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
        <div ref={dropdownRef} className={styles['dropdown-control-button']}>
            <Button
                id={props.data.mainButton.id}
                text={props.data.mainButton.text}
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
            {open && (
                <ul ref={dropdownListRef} className={styles['dropdown-list']}>
                    {dropdownState.prevButtonIds.length > 1 && open && backButton}
                    {currButton?.nestedButtons.map((pair, index) => {
                        return (
                            <li key={index} className={styles['dropdown-item']}>
                                <Button
                                    type={'in-list'}
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
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
