import { Editor } from './types';

export function changePresentationName(editor: Editor, name: string): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name,
        },
    };
}
