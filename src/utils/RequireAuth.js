import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { userRoute } from "./APIRoutes"
import Topbar from "../components/mains/Topbar"
import { Box } from "@mui/material"
import Navbar from "../components/mains/Navbar"
import { colors } from "./theme"
import Loading from "../components/mains/Loading"

const RequireAuth = ({ allowedRoles }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    if (!accessToken) {
      navigate('/login')
    }

    async function fetchData() {

      try {
        setLoading(true)
        const { data } = await axios.get(`${userRoute}/me`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        setUser(data.payload)

        setLoading(false)

      } catch (err) {
        setLoading(false)
        setError(true)
      }

    }
    fetchData();
    // eslint-disable-next-line
  }, [])

  let render;

  if (!loading) {
    if (!error) {

      if (allowedRoles.includes(user.role)) {
        render = (
          <div className="app" style={{ backgroundColor: colors.bgColor }}>
            <div className="content">
              <Topbar me={user} />
              <Box mx="30px" sx={{ minHeight: "90vh" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Navbar me={user} />
                </Box>
                <Outlet />
              </Box>
            </div>
          </div>
        );
      } else {
        if (user.role === "SUPERADMIN") {
          return navigate('/users')
        }
        return navigate('/login')
      }

    } else {
      return navigate("/login");
    }
  }

  return loading ? <Loading open={!loading && loading === undefined ? false : true} /> : render;
}

export default RequireAuth;