import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../config/firebase-config";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetData } from "../hooks/useGetData";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";
const Manager = () => {
  const navigate = useNavigate();
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const { name, profilePhoto } = useGetUserInfo();
  const { addpassdata } = useAddTransaction();
  const { data } = useGetData();
  const { deletedata } = useDeleteTransaction();

  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const showPassword = (params) => {
    if (ref.current.src.includes("icons/eyecross.jpg")) {
      passwordRef.current.type = "password";
      ref.current.src = "icons/eye.jpg";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.jpg";
    }
  };
  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      addpassdata({
        site: form.site,
        username: form.username,
        pwd: form.password,
      });
      setForm({ site: "", username: "", password: "" });
      toast("Password Saved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast("Password Not Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete ?");
    if (c) {
      deletedata(id);
      toast("Password Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const edit = (id) => {
    let c = window.confirm("Do you really want to Edit ?");
    if (c) {
      let thatThing = data.find((d) => d.id === id);

      if (thatThing) {
        setForm({
          site: thatThing.site,
          username: thatThing.username,
          password: thatThing.pwd,
        });
        deletedata(id);
      } else {
        console.log("Item not found");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    toast("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className="bg-slate-50 mycontainer">
        {profilePhoto && (
          <div className="profile">
            <img
              src={profilePhoto}
              alt=""
              className="profile-photo"
              style={{ float: "inline-start", borderRadius: "50%" }}
            />
          </div>
        )}

        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
          className="text-green-700 text-lg text-center"
        >
          {name}'s Password Manager
        </div>
        <button
          style={{
            backgroundColor: "black",
            color: "whitesmoke",
            padding: "5px",
            borderRadius: "10%",
            fontSize: "15px",
            fontWeight: "bold",
          }}
          className="sign-out-btn"
          onClick={signUserOut}
        >
          Sign Out
        </button>
        <div className="gap-8 flex flex-col p-4 text-black items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-400 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-400 w-full p-4 py-1"
              type="text"
              name="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-400 w-full p-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  width={36}
                  className="p-1"
                  src="icons/eye.jpg"
                  alt="asdf"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-2">Your Passwords</h2>
          {data.length === 0 && <div>No Passwords to show</div>}
          {data.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {data.map((d) => {
                  const { site, id, username, pwd } = d;

                  return (
                    <tr key={id}>
                      <td className=" border border-white py-2 text-center ">
                        <div className="flex items-center justify-center">
                          <a href={site} target="_blank">
                            {site}
                          </a>
                          <div
                            onClick={() => {
                              copyText(site);
                            }}
                            className=" lordiconcopy cursor-pointer size-7"
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" border border-white py-2 text-center ">
                        <div className="flex items-center justify-center">
                          <span>{username} </span>
                          <div
                            onClick={() => {
                              copyText(username);
                            }}
                            className=" lordiconcopy cursor-pointer size-7"
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white py-2 text-center ">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(pwd.length)} </span>
                          <div
                            onClick={() => {
                              copyText(pwd);
                            }}
                            className=" lordiconcopy cursor-pointer size-7"
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="border border-white py-2 text-center ">
                        <span
                          className="cursor-pointer mx-3"
                          onClick={() => {
                            edit(id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/xfyxpoer.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-3"
                          onClick={() => {
                            deletePassword(id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
