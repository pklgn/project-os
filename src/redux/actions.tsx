import { ActionType } from "./action-types/types"

interface DepositAction {
    type: ActionType.DEPOSIT,
    payload: number
}

interface WithdrawAction {
    type: ActionType.WITHDRAW,
    payload: number
}

interface BankruptAction {
    type: ActionType.BANKRUPT
}

interface AddSlide {
    type: ActionType.ADD_SLIDE
}

export type Action = DepositAction | WithdrawAction | BankruptAction | AddSlide;