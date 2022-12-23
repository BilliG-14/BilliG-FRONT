import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
//firebase v9부터는 아래와 같이 작성해야 함.
import auth from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import md5 from "md5";
import { getDatabase, ref, set } from "firebase/database";
function RegisterPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch("password");

  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      //firebase v9부터는 아래와 같이 작성해야 함.
      let createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // v9
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: `http:gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`, // 유니크한 이미지값 삽입
      });
      //Firebase 데이터베이스에 저장해주기
      //firebase v9부터는 아래와 같이 작성해야 함.
      const db = getDatabase();
      await set(ref(db, "users/" + createdUser.user.uid), {
        //firebase db의 users 테이블에서 테이블 row부분에 uid를 이용해서 name, image 컬럼 데이터 삽입
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });

      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>이메일을 입력해주십시오.</span>}
        <label>Name</label>
        <input
          name="name"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === "required" && (
          <span>이름을 입력해주십시오.</span>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <span>이름은 10글자 이하로 입력해주십시오.</span>
        )}

        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>비밀번호를 입력해주십시오.</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span>비밀번호는 최소 6자리 이상이여야 합니다.</span>
        )}

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <span>비밀번호를 입력해주십시오.</span>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <span>비밀번호가 일치하지 않습니다.</span>
          )}
        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" disabled={loading} />
        <Link to="/login" style={{ color: "gray", textDecoration: "none" }}>
          이미 아이디가 있다면...
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
