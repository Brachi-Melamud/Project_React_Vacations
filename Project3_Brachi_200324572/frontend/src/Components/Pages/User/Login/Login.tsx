import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import User from "../../../../model/user";
import userActions from "../../../../Util/userActions";
import "./Login.css";

function Login(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [userInput, setUserInput] = useState<User>();

  const { register, handleSubmit } = useForm<User>();

  const navigate = useNavigate();
  const params = useParams();
  const userId = +(params.id || "");

  async function send(value: User) {
    try {
      let count: number = 0;
      users.map((user) => {
        console.log("users", users);

        if (
          user.user_name === value.user_name.replace(/\s+/g, "") &&
          user.password === value.password.replace(/\s+/g, "")
        ) {
          navigate("/api/user/vacations", {
            state: {
              user: user,
            },
          });
        } else if (
          value.user_name.replace(/\s+/g, "") === "admin" &&
          value.password.replace(/\s+/g, "") === "12345678"
        ) {
          navigate("/api/admin/vacations");
        } else if (value.user_name === "" || value.password === "") {
          throw Swal.fire("fill Out the Fields ✍️");
        } else {
          count++;
        }
      });
      if (count === users.length) {
        alert("username or password are incorrect");
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  async function getOneUser(userId: number) {
    let userInputValue = await userActions.getOneUser(userId);
    setUserInput(userInputValue);
    console.log(userInput);
  }

  useEffect(() => {
    if (userId > 0) {
      getOneUser(userId);
    }
    userActions
      .getAllUsers()
      .then((users) => setUsers(users))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="Login">
      <Box
        onSubmit={handleSubmit(send)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          {...register("user_name")}
          id="outlined-basic"
          label="User Name"
          variant="outlined"
        />

        <TextField
          id="outlined-basic"
          {...register("password")}
          label="Password"
          variant="outlined"
        />

        <Button type="submit" variant="contained" color="primary">login</Button>
        <NavLink to={"/api/addUser"}    color="primary" > Register </NavLink>
      </Box>
    </div>
  );
}

export default Login;
