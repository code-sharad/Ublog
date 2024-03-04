import { SignupInput } from "@sharad31/common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SignupInput>({
    username: "",
    password: "",
    email: "",
  });

  async function sendRequest(user: any) {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/${type === "signin" ? "signin" : "signup"}`,
        {email:user.email,password:user.password}
      );

      const jwt = response.data;
      localStorage.setItem("token", jwt.jwt);
      navigate("/blogs");
    } catch (err) {
      console.log(err);
      alert("user already exists");
    }
  }

  function handleSubmit(e: ChangeEvent) {
    e.preventDefault();
    console.log(user);
    sendRequest(user);
    setUser({ username: "", email: "", password: "" });
  }
  return (
    <div className="h-screen w-screen lg:w-auto md:w-auto  text-black flex flex-wrap gap-10 flex-col justify-center items-center">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold ">
          {type === "signup" ? "Create an account" : "Log into Account"}
        </h2>
        <p className="text-gray-500">
          {type === "signin" ? "Already have an account?" : "Log into account"}{" "}
          <Link
            to={type === "signin" ? "/signup" : "/signin"}
            className="underline"
          >
            {type === "signin" ? "Signup" : "Signin"}
          </Link>
        </p>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col min-w-96 justify-center px-6"
      >
        {type === "signup" ? (
          <>
            <label className="font-bold py-2" htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
              id="username"
              className="bg-white  border-2 border-slate-200 rounded-md p-1"
              type="text"
              maxLength={16}
              value={user.username}
              placeholder="Enter your username"
            />
          </>
        ) : null}
        <br />
        <label className="font-bold py-2" htmlFor="email">
          Email
        </label>
        <input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          id="email"
          className="bg-white  border-2 border-slate-200 rounded-md p-1"
          type="email"
          maxLength={46}
          value={user.email}
          placeholder="m@exmaple.com"
        />
        <br />
        <label className="font-bold py-2" htmlFor="password">
          Password
        </label>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          id="password"
          className="bg-white  border-2 border-slate-200 rounded-md p-1"
          type="password"
          maxLength={26}
          value={user.password}
          placeholder=""
        />
        <button type="submit" className="text-white bg-black my-9">
          {type ? "Sign in" : "Sign up"}
        </button>
      </form>
    </div>
  );
};
export default Auth;
