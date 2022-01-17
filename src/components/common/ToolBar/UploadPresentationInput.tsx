import { BaseSyntheticEvent, LegacyRef } from 'react';
import { bindActionCreators } from 'redux';
import {
    keepModelAction,
    setSelectedIdInEditor,
    uploadPresentationFromJson,
} from '../../../redux/action-creators/editorActionCreators';
import { UploadFileInput } from '../UploadFileInput/UploadFileInput';
import { useDispatch } from 'react-redux';
import { store } from '../../../redux/store';

type UploadPresentationInputProps = {
    inputRef: LegacyRef<HTMLInputElement> | null;
};

function UploadPresentationInput(props: UploadPresentationInputProps) {
    const dispatch = useDispatch();
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const dispatchUploadPresentationFromJSONAction = bindActionCreators(uploadPresentationFromJson, dispatch);
    const dispatchSetSelectedIdInEditorAction = bindActionCreators(setSelectedIdInEditor, dispatch);

    const uploadPresentationFromJsonFunction = (e: BaseSyntheticEvent) => {
        const reader = new FileReader();

        reader.onload = function () {
            if (typeof reader.result === 'string') {
                dispatchUploadPresentationFromJSONAction(reader.result);
            }
            dispatchSetSelectedIdInEditorAction({
                selectedSlidesIds: [store.getState().model.presentation.slidesList[0].id],
                selectedSlideElementsIds: [],
            });
            dispatchKeepModelAction();
        };

        reader.readAsText(e.target.files[0]);
    };

    return (
        <UploadFileInput
            inputRef={props.inputRef}
            onChange={uploadPresentationFromJsonFunction}
            extensions={['.json']}
        />
    );
}

export { UploadPresentationInput };
