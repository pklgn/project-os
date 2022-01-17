import { modelReducers } from './model_reducer';
import { combineReducers } from 'redux';
import { viewModelReducers } from './view_reducer';

const reducers = combineReducers({
    model: modelReducers,
    viewModel: viewModelReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
