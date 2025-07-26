import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import api from "@/axios/api";
import { setUser } from "@/redux/action";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await api.get("/user", { withCredentials: true });
        dispatch(setUser({ username: data.data.username }));
      } catch (error) {
        console.log("Token inválido");
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, [dispatch]);

  if (loading) return <Loader text="Verificando session..." />;

  if (!user.username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
