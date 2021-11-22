import {SlideElement} from "../types";

const mockEditor = {
    mode: 'edit',
    presentation: {
        name: 'Oladushek',
        slidesList: [
            {
                background: {
                    src: '',
                    color: '#ff0000',
                },
                elementsList: [
                    {
                        size: {
                            width: 100,
                            height: 250,
                        },
                        opacity: 0.8,
                        content: {
                            src: './imgs/JasonReborn',
                        },
                        startPoint: {
                            x: 5,
                            y: 8,
                        },
                    },
                    {
                        size: {
                            width: 150,
                            height: 200,
                        },
                        opacity: 0.7,
                        content: {
                            src: './imgs/apocalypse',
                        },
                        startPoint: {
                            x: 15,
                            y: 38,
                        },
                    }
                ]
            },
            {
                background: {
                    src: '',
                    color: '#ff0000',
                },
                elementsList: [
                    {
                        size: {
                            width: 100,
                            height: 250,
                        },
                        opacity: 0.8,
                        content: {
                            src: './imgs/JasonReborn',
                        },
                        startPoint: {
                            x: 5,
                            y: 8,
                        },
                    },
                    {
                        size: {
                            width: 150,
                            height: 200,
                        },
                        opacity: 0.7,
                        content: {
                            src: './imgs/apocalypse',
                        },
                        startPoint: {
                            x: 15,
                            y: 38,
                        },
                    }
                ]
            }
        ],
    },

    history: {
        currState: 1,
        states: [
            {
                name: 'Oladushek',
                slidesList: [
                    {
                        background: {
                            src: '',
                            color: '#ff0000',
                        },
                        elementsList: [
                            {
                                size: {
                                    width: 100,
                                    height: 250,
                                },
                                opacity: 0.8,
                                content: {
                                    src: './imgs/JasonReborn',
                                },
                                startPoint: {
                                    x: 5,
                                    y: 8,
                                },
                            },
                            {
                                size: {
                                    width: 150,
                                    height: 200,
                                },
                                opacity: 0.7,
                                content: {
                                    src: './imgs/apocalypse',
                                },
                                startPoint: {
                                    x: 15,
                                    y: 38,
                                },
                            }
                        ]
                    },
                    {
                        background: {
                            src: '',
                            color: '#ff0000',
                        },
                        elementsList: [
                            {
                                size: {
                                    width: 100,
                                    height: 250,
                                },
                                opacity: 0.8,
                                content: {
                                    src: './imgs/JasonReborn',
                                },
                                startPoint: {
                                    x: 5,
                                    y: 8,
                                },
                            },
                            {
                                size: {
                                    width: 150,
                                    height: 200,
                                },
                                opacity: 0.7,
                                content: {
                                    src: './imgs/apocalypse',
                                },
                                startPoint: {
                                    x: 15,
                                    y: 38,
                                },
                            }
                        ]
                    }
                ],
            },
            {
                name: 'Oladushek',
                slidesList: [
                    {
                        background: {
                            src: '',
                            color: '#ff0000',
                        },
                        elementsList: [
                            {
                                size: {
                                    width: 100,
                                    height: 250,
                                },
                                opacity: 0.8,
                                content: {
                                    src: './imgs/JasonReborn',
                                },
                                startPoint: {
                                    x: 5,
                                    y: 8,
                                },
                            },
                            {
                                size: {
                                    width: 150,
                                    height: 200,
                                },
                                opacity: 0.7,
                                content: {
                                    src: './imgs/apocalypse',
                                },
                                startPoint: {
                                    x: 15,
                                    y: 38,
                                },
                            }
                        ]
                    },
                    {
                        background: {
                            src: '',
                            color: '#ff0000',
                        },
                        elementsList: [
                            {
                                size: {
                                    width: 100,
                                    height: 250,
                                },
                                opacity: 0.8,
                                content: {
                                    src: './imgs/JasonReborn',
                                },
                                startPoint: {
                                    x: 5,
                                    y: 8,
                                },
                            }
                        ]
                    }
                ],
            }
        ],
    },
    selectedSlidesIndexes: [0],
    selectedSlideElementsIndexes: [1],
}
const History = {
    currState: 1,
    states: [
        {
            name: 'Oladushek',
            slidesList: [
                {
                    background: {
                        src: '',
                        color: '#ff0000',
                    },
                    elementsList: [
                        {
                            size: {
                                width: 100,
                                height: 250,
                            },
                            opacity: 0.8,
                            content: {
                                src: './imgs/JasonReborn',
                            },
                            startPoint: {
                                x: 5,
                                y: 8,
                            },
                        },
                        {
                            size: {
                                width: 150,
                                height: 200,
                            },
                            opacity: 0.7,
                            content: {
                                src: './imgs/apocalypse',
                            },
                            startPoint: {
                                x: 15,
                                y: 38,
                            },
                        }
                    ]
                },
                {
                    background: {
                        src: '',
                        color: '#ff0000',
                    },
                    elementsList: [
                        {
                            size: {
                                width: 100,
                                height: 250,
                            },
                            opacity: 0.8,
                            content: {
                                src: './imgs/JasonReborn',
                            },
                            startPoint: {
                                x: 5,
                                y: 8,
                            },
                        },
                        {
                            size: {
                                width: 150,
                                height: 200,
                            },
                            opacity: 0.7,
                            content: {
                                src: './imgs/apocalypse',
                            },
                            startPoint: {
                                x: 15,
                                y: 38,
                            },
                        }
                    ]
                }
            ],
        },
        {
            name: 'Oladushek',
            slidesList: [
                {
                    background: {
                        src: '',
                        color: '#ff0000',
                    },
                    elementsList: [
                        {
                            size: {
                                width: 100,
                                height: 250,
                            },
                            opacity: 0.8,
                            content: {
                                src: './imgs/JasonReborn',
                            },
                            startPoint: {
                                x: 5,
                                y: 8,
                            },
                        },
                        {
                            size: {
                                width: 150,
                                height: 200,
                            },
                            opacity: 0.7,
                            content: {
                                src: './imgs/apocalypse',
                            },
                            startPoint: {
                                x: 15,
                                y: 38,
                            },
                        }
                    ]
                },
                {
                    background: {
                        src: '',
                        color: '#ff0000',
                    },
                    elementsList: [
                        {
                            size: {
                                width: 100,
                                height: 250,
                            },
                            opacity: 0.8,
                            content: {
                                src: './imgs/JasonReborn',
                            },
                            startPoint: {
                                x: 5,
                                y: 8,
                            },
                        },
                        {
                            size: {
                                width: 150,
                                height: 200,
                            },
                            opacity: 0.7,
                            content: {
                                src: './imgs/apocalypse',
                            },
                            startPoint: {
                                x: 15,
                                y: 38,
                            },
                        }
                    ]
                }
            ],
        }
    ],
}

const Presentation = {
    name: 'Oladushek',
    slidesList: [
        {
            background: {
                src: '',
                color: '#ff0000',
            },
            elementsList: [
                {
                    size: {
                        width: 100,
                        height: 250,
                    },
                    opacity: 0.8,
                    content: {
                        src: './imgs/JasonReborn',
                    },
                    startPoint: {
                        x: 5,
                        y: 8,
                    },
                },
                {
                    size: {
                        width: 150,
                        height: 200,
                    },
                    opacity: 0.7,
                    content: {
                        src: './imgs/apocalypse',
                    },
                    startPoint: {
                        x: 15,
                        y: 38,
                    },
                }
            ]
        },
        {
            background: {
                src: '',
                color: '#ff0000',
            },
            elementsList: [
                {
                    size: {
                        width: 100,
                        height: 250,
                    },
                    opacity: 0.8,
                    content: {
                        src: './imgs/JasonReborn',
                    },
                    startPoint: {
                        x: 5,
                        y: 8,
                    },
                },
                {
                    size: {
                        width: 150,
                        height: 200,
                    },
                    opacity: 0.7,
                    content: {
                        src: './imgs/apocalypse',
                    },
                    startPoint: {
                        x: 15,
                        y: 38,
                    },
                }
            ]
        }
    ],
}

const Slide = {
    background: {
        src: '',
        color: '#ff0000',
    },
    elementsList: [
        {
            size: {
                width: 100,
                height: 250,
            },
            opacity: 0.8,
            content: {
                src: './imgs/JasonReborn',
            },
            startPoint: {
                x: 5,
                y: 8,
            },
        },
        {
            size: {
                width: 150,
                height: 200,
            },
            opacity: 0.7,
            content: {
                src: './imgs/apocalypse',
            },
            startPoint: {
                x: 15,
                y: 38,
            },
        }
    ]
}

const mockText: SlideElement = {
    id: '1',
    startPoint: {
        x: 100,
        y: 100,
    },
    size: {
        width: 50,
        height: 50,
    },
    opacity: 1,
    content: {
        content: 'Привет, мир',
        fontSize: 20,
        fontColor: '#ff0000',
        fontStyle: 'italic'
    }
}

export {
    mockEditor,
    mockText,
}