import React, { useRef } from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotoURL } from '../../../redux/actions/user_action';
import { getDatabase, ref, child, update } from 'firebase/database';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import {
  getStorage,
  ref as strRef,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const inputOpenImageRef = useRef();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const auth = getAuth();
    const user = auth.currentUser;

    const metadata = { contentType: file.type };
    const storage = getStorage();

    /**스토리지에 파일 저장하기 v9, 이미지가 계속 추가되는게 아니라 1개에 계속 덮어씌워짐.*/
    try {
      /**스토리지에 파일 저장하기 */
      let uploadTask = uploadBytesResumable(
        strRef(storage, `user_image/${user.uid}`),
        file,
        metadata,
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;
            default:
              break;
          }
        },
        () => {
          /**스토리지에 올린 이미지 파일의 url 가져오기 */
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            /** 프로필 이미지 수정 */
            updateProfile(user, {
              photoURL: downloadURL,
            });

            /**스토리지에 업로드한 파일로 프로필 업데이트 하기 */
            dispatch(setPhotoURL(downloadURL));

            /**데이터베이스 유저 이미지 수정 */
            update(ref(getDatabase(), `users/${user.uid}`), {
              image: downloadURL,
            });
          });
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Logo */}
      <h3 className="text-white">
        <IoIosChatboxes /> Chat App
      </h3>

      <div className="flex m-4">
        <Image
          src={user && user.photoURL}
          className="w-30 h-30 mt-3"
          roundedCircle
        />

        <Dropdown>
          <Dropdown.Toggle
            className="bg-transparent border-0"
            id="dropdown-basic"
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/** display:none이라 안보이므로 아래에 옮겨둠 */}
      <input
        onChange={handleUploadImage}
        accept="image/jpeg, image/png"
        className="hidden"
        ref={inputOpenImageRef}
        type="file"
      />
    </div>
  );
}

export default UserPanel;
