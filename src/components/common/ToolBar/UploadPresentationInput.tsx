import { BaseSyntheticEvent, LegacyRef } from 'react';
import { bindActionCreators } from 'redux';
import { uploadPresentationFromJson } from '../../../redux/action-creators/editorActionCreators';
import { UploadFileInput } from '../UploadFileInput/UploadFileInput';
import { useDispatch } from 'react-redux';

type UploadPresentationInputProps = {
    inputRef: LegacyRef<HTMLInputElement> | null;
};

function UploadPresentationInput(props: UploadPresentationInputProps) {
    const dispatch = useDispatch();
    const dispatchUploadPresentationFromJSONAction = bindActionCreators(uploadPresentationFromJson, dispatch);

    const uploadPresentationFromJsonFunction = (e: BaseSyntheticEvent) => {
        const reader = new FileReader();

        reader.onload = function () {
            if (typeof reader.result === 'string') {
                dispatchUploadPresentationFromJSONAction(reader.result);
            }
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