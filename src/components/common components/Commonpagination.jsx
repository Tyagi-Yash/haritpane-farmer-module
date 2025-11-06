import ReactPaginate from "react-paginate";

export const Commonpagination = ({
  ActivePage,
  TotalItemsCount,
  ItemsCountPerPage,
  pageRangeDisplayed,
  Onchange,
}) => {
  const pageCount = Math.ceil(TotalItemsCount / ItemsCountPerPage);

  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        pageCount={pageCount}
        forcePage={ActivePage - 1}
        onPageChange={(selected) => Onchange(selected.selected + 1)}
        containerClassName="pagination"
        activeClassName="active"
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={2}
      />
    </div>
  );
};
