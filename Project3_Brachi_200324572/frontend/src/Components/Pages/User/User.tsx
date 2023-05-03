import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import "./User.css";

function User(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="User">
      <Button type="large" color="primary" onClick={() => navigate("/api/login")}>Login</Button>
    </div>
  );
}

export default User;  