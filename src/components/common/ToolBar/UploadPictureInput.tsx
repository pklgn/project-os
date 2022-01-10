import { UploadFileInput } from '../UploadFileInput/UploadFileInput';
import { BaseSyntheticEvent, LegacyRef } from 'react';
import { bindActionCreators } from 'redux';
import { addPicture } from '../../../redux/action-creators/pictureActionCreators';
import { keepModelAction } from '../../../redux/action-creators/editorActionCreators';
import { useDispatch } from 'react-redux';

type UploadPictureInputProps = {
    inputRef: LegacyRef<HTMLInputElement> | null;
};

function UploadPictureInput(props: UploadPictureInputProps) {
    const dispatch = useDispatch();
    const dispatchAddPictureAction = bindActionCreators(addPicture, dispatch);
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const addPictureButtonFunction = (event: BaseSyntheticEvent) => {
        const reader = new FileReader();
        const image = new Image();
        reader.onload = function () {
            image.onload = function () {
                dispatchAddPictureAction({
                    src: URL.createObjectURL(event.target.files[0]),
                    alt: '',
                    width: image.width,
                    height: image.height,
                });
                dispatchKeepModelAction();
            };
            image.src = URL.createObjectURL(event.target.files[0]);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <UploadFileInput inputRef={props.inputRef} onChange={addPictureButtonFunction} extensions={['.png', '.jpeg']} />
    );
}

export { UploadPictureInput };
