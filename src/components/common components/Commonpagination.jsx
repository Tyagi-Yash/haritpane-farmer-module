import ReactPaginate from "react-paginate";

export const Commonpagination = ({
  ActivePage = 1,
  TotalItemsCount = 0,
  ItemsCountPerPage = 10,
  pageRangeDisplayed = 3,
  Onchange = () => {},
}) => {
  const safeItemsCount = Number(ItemsCountPerPage) || 1;
  const total = Number(TotalItemsCount) || 0;
  const pageCount = Math.max(1, Math.ceil(total / safeItemsCount));
  const safeActivePage = Math.min(Math.max(Number(ActivePage) || 1, 1), pageCount);

  return (
    <div className="pagination-wrapper">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        pageCount={pageCount}
        forcePage={safeActivePage - 1}
        onPageChange={(selected) => Onchange(selected.selected + 1)}
        containerClassName="pagination"
        activeClassName="active"
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={2}
      />
    </div>
  );
};
