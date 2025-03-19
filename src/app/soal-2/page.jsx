"use client";
import db from "@/lib/db";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Notif = ({ message = "" }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-8">
      <div
        className={`${
          message.includes("SUKSES") ? "bg-green-600" : "bg-red-500"
        } text-white p-2 rounded-lg`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

const LoginForm = ({ setIslogin, setMessage }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRecap, setIsRecap] = useState(null);

  function onChange(value) {
    console.log("Captcha value:", value);
    if (value.length > 1) {
      setIsRecap(true);
    }
  }
  const handleSubmit = async () => {
    if (!isRecap) {
      setIsRecap(false);
      setTimeout(() => {
        setIsRecap(null);
      }, 3000);
      return;
    }

    const data = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
    console.log(result);
    if (result.message.includes("SUKSES")) {
      localStorage.setItem("isLogin", true);
      setIslogin(true);
    } else {
      localStorage.setItem("isLogin", false);
    }
    setMessage(result.message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  return (
    <div className="flex flex-col gap-4 h-screen w-full justify-center items-center">
      {isRecap === false && <Notif message="Please input reCAPTCHA" />}
      <div>
        <h1>Form Login</h1>
      </div>
      <div className="flex flex-col gap-3 px-3 py-4  border rounded-lg">
        <div className="flex gap-4 justify-between">
          <label htmlFor="name">Nama</label>
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-2"
          />
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={onChange}
          size="small"
        />
        <div className="flex gap-4 justify-between">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-2"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="border cursor-pointer hover:bg-black/10 active:bg-black/20 active:border-gray-400 active:border-[3px] rounded-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const TableSection = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [error, setError] = useState({});

  const fetchData = async () => {
    const result = await fetch(`/api/user`, {
      method: "GET",
    });
    const res = await result.json();
    const data = res.data[0];
    setData(data);
  };

  const handleAdd = async () => {
    if (!name) {
      setError((prev) => ({ ...prev, name: "Nama harus diisi" }));
      return;
    }
    if (name.length > 128) {
      setError((prev) => ({ ...prev, name: "Nama maksimal 128 karakter" }));
      return;
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: "Password harus diisi" }));
      return;
    }

    if (password.length > 5 && password.length < 8) {
      setError((prev) => ({ ...prev, password: "Password 5 - 8 karakter" }));
      return;
    }
    const result = await fetch(`/api/user/add`, {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    console.log(res);
    fetchData();
    setName("");
    setPassword("");
    setIsUpdate(false);
  };

  const handleUpdate = async () => {
    const result = await fetch(`/api/user/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    console.log(res.data[0]);
    fetchData();
    setIsUpdate(false);
  };

  const handleDelete = async (id) => {
    const result = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
    const res = await result.json();
    console.log(res);
    fetchData();
  };

  const updateToggle = async (data) => {
    console.log("🚀 ~ handleUpdate ~ data:", data);
    setName(data.Username);
    setPassword("");
    setIsUpdate(true);
    setId(data.Id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-10 h-screen w-full justify-center items-center">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <h1>Form Tambah User</h1>
        <div className="flex flex-col gap-3 px-3 py-4  border rounded-lg">
          <div className="flex gap-4 justify-between">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-2"
            />
          </div>
          {error.name && <p className="text-red-500">{error.name}</p>}
          <div className="flex gap-4 justify-between">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-2"
            />
          </div>
          {error.password && <p className="text-red-500">{error.password}</p>}
          <button
            onClick={() => {
              isUpdate ? handleUpdate() : handleAdd();
            }}
            className="border cursor-pointer hover:bg-black/10 active:bg-black/20 active:border-gray-400 active:border-[3px] rounded-full"
          >
            {isUpdate ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <h1>Form Tambah User</h1>
        <table className="w-3/5">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th>No</th>
              <th>Username</th>
              <th>Password</th>
              <th>CTime</th>
              <th>Fungsi</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((item, index) => (
              <tr key={item.Id}>
                <td className="">{index + 1}</td>
                <td className="">{item.Username}</td>
                <td className="text-center">*****</td>
                <td className="">{new Date(item.CreateTime).toDateString()}</td>
                <td className="flex gap-4 justify-center h-10">
                  <button
                    className="cursor-pointer text-blue-500"
                    onClick={() => {
                      updateToggle(item);
                    }}
                  >
                    Update
                  </button>{" "}
                  <button
                    className="cursor-pointer text-red-500"
                    onClick={() => {
                      handleDelete(item.Id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Soal2Page() {
  const [isLogin, setIslogin] = useState(localStorage.getItem("isLogin"));
  const [message, setMessage] = useState(null);
  return (
    <div>
      {message && <Notif message={message} />}
      {isLogin ? (
        <TableSection />
      ) : (
        <LoginForm setIslogin={setIslogin} setMessage={setMessage} />
      )}
    </div>
  );
}
