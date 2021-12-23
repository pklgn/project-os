export type Actions = TitleAction;

type TitleAction = {
    type: string,
    title: string
}

export function changePresentationTitle(title: string): TitleAction {
    return {
        type: 'CHANGE_PRESENTATION_TITLE',
        title
    }
}