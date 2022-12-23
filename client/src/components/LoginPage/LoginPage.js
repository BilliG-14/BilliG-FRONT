import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
//firebase v9부터는 아래와 같이 작성해야 함.
import auth from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
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
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>이메일을 입력해주십시오.</span>}

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
        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" disabled={loading} />
        <Link to="/register" style={{ color: "gray", textDecoration: "none" }}>
          아직 아이디가 없다면...
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
