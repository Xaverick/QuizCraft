import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../slices/userSlice";

import { CgLogOut } from "react-icons/cg";
// styles
import styles from "./Navbar.module.css";

// images
import geekClashLogo from "../../assests/Navbar/GeekClashLogo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Logout clicked");

    // Perform logout operations
    dispatch(clearUser());
    localStorage.clear();

    // Navigate after logout
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/">
          <div>
            <img
              src={geekClashLogo}
              className={styles.logo}
              height="59"
              width="204"
            ></img>
          </div>
          {/* <div>Geek Clash</div> */}
        </Link>
      </div>
      <div className={styles.right}>
        <Link to="/users">Users</Link>
        <Link to="/referrals"> Referrals</Link>
        <Link to="/create-reward">Rewards</Link>
        <Link to="/create-challenge">Create Challenge</Link>
        <div className={styles.logout} onClick={handleLogout}>
          <CgLogOut fontSize={22} />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;
