import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  if (user.role !== "admin") {
    return navigate("/dashboard");
  }
  return user;
}
