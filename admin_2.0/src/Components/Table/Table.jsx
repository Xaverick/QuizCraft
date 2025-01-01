import { useState } from "react";
import styles from "./Table.module.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../Pagination/Pagination";
import no_profile_pic from "../../assests/Userpage/Nopicture.png";
import verfiedBadge from "../../assests/badges/verified.png";
import premiumBadge from "../../assests/badges/premium.png";


const Table = ({ searchQuery, data, setData}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const apiUrl = import.meta.env.VITE_API_URL;
  const filteredData = data.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onToggleVerification = (id, currentStatus) => {
    confirmAlert({
      title: "Confirm",
      message:
        "Are you sure you want to change the verification status of this user And Give This user a verification Badge?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const newStatus = !currentStatus;
            setData((prevData) =>
              prevData.map((user) =>
                user._id === id
                  ? { ...user, verificationBadge: newStatus }
                  : user
              )
            );

            try {
              const response = await fetch(`${apiUrl}/admin/givebadge/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              });

              if (!response.ok) {
                throw new Error("Failed to update user verification status");
              }

              const updatedUser = await response.json();

              setData((prevData) =>
                prevData.map((user) =>
                  user._id === id
                    ? {
                        ...user,
                        verificationBadge: updatedUser.verificationBadge,
                      }
                    : user
                )
              );
            } catch (error) {
              console.error("Error updating user verification status:", error);
              setData((prevData) =>
                prevData.map((user) =>
                  user._id === id
                    ? { ...user, verificationBadge: currentStatus }
                    : user
                )
              );
              alert(
                "An error occurred while updating the verification status. Please try again."
              );
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const givePremiumBadge = (id, currentStatus) => {
    confirmAlert({
      title: "Confirm",
      message:
        "Are you sure you want to change the premium badge status of this user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const newStatus = !currentStatus;
            setData((prevData) =>
              prevData.map((user) =>
                user._id === id ? { ...user, premiumBadge: newStatus } : user
              )
            );

            try {
              const response = await fetch(
                `${apiUrl}/admin/premiumbadge/${id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                }
              );

              if (!response.ok) {
                throw new Error("Failed to update user premium badge status");
              }

              const updatedUser = await response.json();
              console.log("updatedUser->", updatedUser.premiumBadge);
              setData((prevData) =>
                prevData.map((user) =>
                  user._id === id
                    ? {
                        ...user,
                        premiumBadge: updatedUser.premiumBadge,
                      }
                    : user
                )
              );
            } catch (error) {
              console.error("Error updating user premium badge status:", error);
              setData((prevData) =>
                prevData.map((user) =>
                  user._id === id
                    ? { ...user, premiumBadge: currentStatus }
                    : user
                )
              );
              alert(
                "An error occurred while updating the premium badge status. Please try again."
              );
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={`${styles.tableHeaderItem} ${styles.id}`}>User</div>
          <div className={`${styles.tableHeaderItem} ${styles.name}`}>
            Contact
          </div>
          <div className={`${styles.tableHeaderItem} ${styles.occupation}`}>
            Occupation
          </div>
          <div className={`${styles.tableHeaderItem} ${styles.isVerified}`}>
            Verified Badge
          </div>
          <div className={`${styles.tableHeaderItem} ${styles.action}`}>
            Action
          </div>
        </div>

        {paginatedData.map((user, index) => (
          <div className={styles.tableRow} key={`${user._id}-${index}`}>
            <div className={`${styles.tableRowItem} ${styles.name}`}>
              <div className={styles.userImg}>
                {user?.picture ? (
                  <img src={user?.picture} alt="N/A" />
                ) : (
                  <img src={no_profile_pic} />
                )}
              </div>
              <div>
                <div>{user.name} </div>
                <div className={styles.username}>@{user.username} </div>
              </div>
            </div>
            <div className={`${styles.tableRowItem} ${styles.email}`}>
              <div>{user.email}</div>
              <div>
                {user?.phoneNumber && user.phoneNumber !== "undefined"
                  ? user.phoneNumber
                  : "N/A"}
              </div>
            </div>
            <div className={`${styles.tableRowItem} ${styles.occupation} `}>
              {user.occupation ? user.occupation : "N/A"}
            </div>
            <div className={`${styles.tableRowItem} ${styles.isVerified}`}>
              <button
                className={styles.button}
                onClick={() => onToggleVerification(user._id)}
              >
                <img src={verfiedBadge} className={user.verificationBadge ? `${styles.verifiedimg}` : `${styles.unverifiedimg}`}/> 
              </button>
              <button
                className={styles.button}
                onClick={() => givePremiumBadge(user._id, user.premiumBadge)}
              >
                <img src={premiumBadge}className={user.premiumBadge ? `${styles.verifiedimg}` : `${styles.unverifiedimg}`}/>
              </button>
            </div>
            <div className={`${styles.tableRowItem} ${styles.deletBtn}`}>
              <button
                className={styles.delete}
                onClick={() => onToggleVerification(user._id)}
              >
                <RiDeleteBin6Line
                  color="#FFFFFF"
                  fontSize={20}
                  style={{ background: "transparent" }}
                />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Pagination
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Table;
