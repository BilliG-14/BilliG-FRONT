import React, { useRef } from "react";
import { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../firebase";
import { signOut, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref as strRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { setPhotoURL } from "../../../redux/actions/user_action";
import { getDatabase, ref, update } from "firebase/database";

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogut = () => {
    signOut(auth);
  };
  const inputOpenImageRef = useRef();
  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const metadata = { contentType: file.type };

    //스토리지에 파일 저장하기 v9, 이미지가 계속 추가되는게 아니라 1개에 계속 덮어씌워짐.
    try {
      const storage = getStorage();
      const storageRef = strRef(storage, `user_image/${user.uid}`);
      let uploadTaskSnapshot = await uploadBytesResumable(
        storageRef,
        file,
        metadata
      );
      //스토리지에 올린 이미지 파일의 url 가져오기
      await getDownloadURL(uploadTaskSnapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        updateProfile(user, {
          photoURL: downloadURL,
        });

        //스토리지에 업로드한 파일로 프로필 업데이트 하기
        dispatch(setPhotoURL(downloadURL));

        //데이터베이스 유저 이미지 수정
        update(ref(getDatabase(), `users/${user.uid}`), {
          image: downloadURL,
        });
      });
    } catch (error) {}
  };
  return (
    <div>
      <h3 style={{ color: "white" }}>
        <IoIosChatboxes />
        Chat App
      </h3>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Image
          src={user && user.photoURL}
          style={{ width: "30px", height: "30px", marginTop: "3px" }}
          roundedCircle
        />

        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{ background: "transparent", border: "0px" }}
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogut}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {/* display:none이라 안보이므로 아래에 옮겨둠 */}
      <input
        type="file"
        accept="image/jpeg, image/png"
        ref={inputOpenImageRef}
        style={{ display: "none" }}
        onChange={handleUploadImage}
      />
    </div>
  );
}

export default UserPanel;
