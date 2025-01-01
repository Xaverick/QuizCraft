import { useEffect, useState } from "react";

// styles
import styles from "./Users.module.css";

// components
import Navbar from "../../Components/Navbar/Navbar";
import Table from "../../Components/Table/Table";

// icons
import { IoIosSearch } from "react-icons/io";
import DropDown from "../../Components/DropDown/DropDown";
import { useSelector } from "react-redux";

const Users = () => {
  // search query
  const [searchQuery, setSearchQuery] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useSelector((state) => state.user);
  const adminId = user;
  const [data, setData] = useState([]);

  // ratings
  const ratings = ["High to Low", "Low to High"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/admin/${adminId}/registered-users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const result = await response.json();
        console.log("result->", result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [apiUrl, adminId]);

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (rating) => {
    setSelectedRating(rating);

    if (rating === "High to Low") {
      setData(data.sort((a, b) => b.rating - a.rating));
    } else if (rating === "Low to High") {
      setData(data.sort((a, b) => a.rating - b.rating));
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.title}>Users</div>
        <div className={styles.totalUser}>Total User : {data.length}</div>

        {/* Search and filter's */}

        <div className={styles.searchBarAndFilter}>
          {/* search bar */}
          <div className={styles.searchBarandBtn}>
            <div className={styles.searchContainer}>
              <IoIosSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Enter the username search..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={handleSearchQuery}
              />
            </div>
            {/* <div className={styles.searchBtn}>Search</div> */}
          </div>
          <div className={styles.filterContainer}>
            {/* Rating dropdown */}
            <DropDown
              dropDownType="Rating"
              openClose={isOpen}
              options={ratings}
              selectedOptions={selectedRating}
              handleClick={handleCategoryClick}
              toggleDropdown={toggleDropdown}
              width="100px"
              dropdownMenuWidth="130px"
            />
          </div>
        </div>

        <Table searchQuery={searchQuery} data={data} setData={setData} />
      </div>
    </div>
  );
};

export default Users;
