import { ActionType } from "../action-types/types";

interface KeepHistoryAction {
    type: ActionType.KEEP
}

interface UndoHistoryAction {
    type: ActionType.UNDO
}

interface RedoHistoryAction {
    type: ActionType.REDO
}

export type HistoryActions = KeepHistoryAction | UndoHistoryAction | RedoHistoryAction;