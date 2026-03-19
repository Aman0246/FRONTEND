"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { login, signUpAdmin } from "../store/adminSlice";
import Input from "../extra/Input";
// import Logo from "../assets/images/ShortieLogo.png";
import LogoBg from "../assets/images/loginPageBg.png";
// import LoginImg from "../assets/images/loginimage2.png";
import Image from "next/image";
import { useAppDispatch } from "@/store/store";
import Button from "../extra/Button";
import { projectName } from "@/util/config";
import { useRouter } from "next/router";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface RootState {
  admin: {
    isAuth: boolean;
    admin: Object;
  };
}

export default function Registration() {
  const dispatch = useAppDispatch();
  const { isAuth, admin } = useSelector((state: RootState) => state.admin);
  const router = useRouter();

  useEffect(() => { }, [isAuth, admin]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);


  const [error, setError] = useState({
    email: "",
    password: "",
    code: "",
    newPassword: "",
  });

  const handleSubmit = () => {
    if (loading) return; // Prevent multiple clicks

    // Validate input
    if (!email || !password || !code || !newPassword || newPassword !== password) {
      let error: any = {};
      if (!email) error.email = "Email is required!";
      if (!password) error.password = "Password is required!";
      if (!code) error.code = "Purchase code is required!";
      if (!newPassword) error.newPassword = "Confirm password is required!";
      if (newPassword !== password)
        error.newPassword = "Doesn't match password to confirm password!";
      return setError({ ...error });
    }

    setLoading(true); // Disable button immediately

    const payload = { email, password, newPassword, code };

    dispatch(signUpAdmin(payload))
      .unwrap() // ✅ convert thunk to a promise
      .then((res: any) => {
        // Signup successful
        console.log("Signup success", res);
        // Keep button disabled after success
      })
      .catch((err: any) => {
        // Signup failed
        console.error("Signup failed", err);
        setLoading(false); // ✅ re-enable button
        // Optionally show error message
        if (err?.message) {
          alert(err.message);
        }
      });
  };

  const [type, setType] = useState("text");
  const hideShow = () => {
    type === "password" ? setType("text") : setType("password");
  };

  return (
    <>

      <div className=" d-flex " style={{ height: "100vh" }}>
        <div className=" d-md-block d-none  w-100">
          <img src="/images/loginimage2.png" alt="Login" className=" w-100 h-100" />
        </div>
        <div className=" w-100">
          <div className="align-items-center d-flex h-100 justify-content-center w-100">
            <div className="w-50">
              <div>
                <img
                  src="/images/ShortieLogo.png"
                  alt="Logo"
                  className="mb-2"
                  height={75}
                  width={75}
                />
              </div>
              <h2 className="fw-semibold">Sign Up to your account</h2>
              <p className="text-secondary">
                Let's connect, chat, and spark real connections. Enter your
                credentials to continue your journey on {projectName}.
              </p>
              <Input
                label={`Email`}
                placeholder={"Enter Email"}
                id={`loginEmail`}
                type={`email`}
                value={email}
                errorMessage={error.email && error.email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      email: `Email Is Required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      email: "",
                    });
                  }
                }}
              />
              <div className="custom-input">
                <label>Password</label>
                <div className="input-group">
                  <input
                    type={type}
                    value={password}

                    className="form-control border border-end-0 password-input"
                    placeholder="Enter Password"
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          password: `Password Is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          password: "",
                        });
                      }
                    }}
                  />
                  <span
                    className="input-group-text border border-start-0"
                    id="basic-addon2"
                  >
                    {type === "password" ? (
                      <IconEye
                        onClick={hideShow}
                        className="text-secondary cursor-pointer"
                      />
                    ) : (
                      <IconEyeOff
                        onClick={hideShow}
                        className="text-secondary cursor-pointer"
                      />
                    )}
                  </span>
                </div>
                <p className="errorMessage">
                  {error.password && error.password}
                </p>
              </div>
              <div className="custom-input">
                <label>Confirm Password</label>
                <div className="input-group">
                  <input
                    type={type}
                    value={newPassword}
                    className="form-control border border-end-0 password-input"
                    placeholder="Enter Confirm Password"
                    onChange={(e: any) => {
                      setNewPassword(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          newPassword: `Confirm Password Is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          newPassword: "",
                        });
                      }
                    }}
                  />
                  <span
                    className="input-group-text border border-start-0"
                    id="basic-addon2"
                  >
                    {type === "password" ? (
                      <IconEye
                        onClick={hideShow}
                        className="text-secondary cursor-pointer"
                      />
                    ) : (
                      <IconEyeOff
                        onClick={hideShow}
                        className="text-secondary cursor-pointer"
                      />
                    )}
                  </span>
                </div>
                <p className="errorMessage">
                  {error.newPassword && error.newPassword}
                </p>
              </div>

              <Input
                label={`Purachse Code`}
                id={`loginpurachse Code`}
                type={`text`}
                placeholder={"Enter purachse code"}
                value={code}
                errorMessage={error.code && error.code}
                onChange={(e: any) => {
                  setCode(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      code: `code Is Required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      code: "",
                    });
                  }
                }}
              />
              <div className="d-flex flex-column justify-content-center w-100 gap-3 mt-4">
                <Button
                  btnName={"Sign Up"}
                  newClass={"login-btn login w-100 py-2 fw-medium"}
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? "#ccc" : "#FE0952", // gray when disabled
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1, // optional fade effect
                    transition: "all 0.3s ease", // smooth transition
                  }}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
