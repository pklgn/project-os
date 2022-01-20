import { UploadFileInput } from '../UploadFileInput/UploadFileInput';
import { BaseSyntheticEvent, LegacyRef } from 'react';
import { bindActionCreators } from 'redux';
import {
    addPicture,
    PictureData,
} from '../../../app_model/redux_model/actions_model/action_creators/picture_action_creators';
import { keepModelAction } from '../../../app_model/redux_model/actions_model/action_creators/editor_action_creators';
import { useDispatch } from 'react-redux';

type UploadPictureInputProps = {
    inputRef: LegacyRef<HTMLInputElement> | null;
};

function UploadPictureInput(props: UploadPictureInputProps) {
    const dispatch = useDispatch();
    const dispatchAddPictureAction = bindActionCreators(addPicture, dispatch);
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const addPictureButtonFunction = (event: BaseSyntheticEvent) => {
        let payload: PictureData;
        const file = event.target.files[0];
        const reader = new FileReader();
        const image = new Image();
        reader.onload = async function () {
            image.onload = await function () {
                if (typeof reader.result === 'string') {
                    payload = {
                        src: reader.result,
                        alt: '',
                        width: image.width,
                        height: image.height,
                    };
                    dispatchAddPictureAction(payload);
                    dispatchKeepModelAction();
                } else {
                    alert('Cannot save an image');
                }
            };
            image.src = URL.createObjectURL(file);
        };
        reader.readAsDataURL(file);
    };

    return (
        <UploadFileInput inputRef={props.inputRef} onChange={addPictureButtonFunction} extensions={['.png', '.jpeg']} />
    );
}

export { UploadPictureInput };
