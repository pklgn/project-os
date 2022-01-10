import { UploadFileInput } from '../UploadFileInput/UploadFileInput';
import { BaseSyntheticEvent, LegacyRef, useContext } from 'react';
import { bindActionCreators } from 'redux';
import { addPicture, PictureData } from '../../../redux/action-creators/pictureActionCreators';
import { keepModelAction } from '../../../redux/action-creators/editorActionCreators';
import { useDispatch } from 'react-redux';
import { LocaleContext } from '../../../App';

type UploadPictureInputProps = {
    inputRef: LegacyRef<HTMLInputElement> | null;
};

function UploadPictureInput(props: UploadPictureInputProps) {
    const localeContext = useContext(LocaleContext);
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
                    alert(localeContext.locale.localization['error_cannot_load_an_image']);
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
