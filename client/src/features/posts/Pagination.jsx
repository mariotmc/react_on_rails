import PropTypes from "prop-types";

function Pagination({ totalPosts, postsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const getVisiblePageNumbers = () => {
    if (totalPages === 0) {
      return ["No posts found"];
    }

    if (totalPages === 1) {
      console.log("totalPages === 1");
      return [1];
    }

    if (currentPage === 1 && totalPages > 1) {
      console.log("currentPage === 1");
      return [1, "...", totalPages];
    }

    if (currentPage === totalPages) {
      console.log("currentPage === totalPages");
      return [1, "...", currentPage];
    }

    return [1, "...", currentPage, "...", totalPages];
  };
  const createRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>

      {getVisiblePageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button key={page} onClick={() => onPageChange(page)} disabled={currentPage === page}>
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} style={{ margin: "0 5px" }}>
            {page}
          </span>
        )
      )}

      <button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0}>
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
