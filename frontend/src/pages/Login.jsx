import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/users/login`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (res.data) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-1/3 mx-auto mt-32 bg-gray-50 p-4 rounded-xl shadow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold mb-4">Login Form</h1>

        <form
          onSubmit={(e) => handleSubmit(e)}
          action=""
          className="w-full mt-10 flex flex-col gap-10 items-center"
        >
          <TextField
            className="w-10/12"
            label="Name"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
          <TextField
            className="w-10/12"
            label="Email"
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            className="w-10/12"
            type="password"
            label="Password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />

          <Button variant="contained" type="submit" size="large">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
