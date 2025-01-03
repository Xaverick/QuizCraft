import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div style={styles.paginationContainer}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.arrowButton}
      >
        &#10094;
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          style={{
            ...styles.pageButton,
            ...(currentPage === page ? styles.activePageButton : {}),
          }}
        >
          {String(page).padStart(2, "0")}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={styles.arrowButton}
      >
        &#10095;
      </button>
    </div>
  );
};

const styles = {
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    margin: "40px 0",
  },
  arrowButton: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "18px",
    color: "#009688",
    padding: "10px 20px",
  },
  pageButton: {
    width: "30px",
    height: "30px",
    border: "1px solid #009688",
    borderRadius: "5px",
    backgroundColor: "#fff",
    color: "#333",
    fontSize: "16px",
    cursor: "pointer",
  },
  activePageButton: {
    backgroundColor: "#f5f5f5",
  },
};

export default Pagination;
