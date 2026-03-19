import TablePagination from "react-js-pagination";

export default function Pagination(props: any) {
  const { type, setPage, userTotal, rowsPerPage, activePage, handleRowsPerPage, handlePageChange } = props;

  const totalPages = Math.ceil(userTotal / rowsPerPage);

  const handlePage = (pageNumber: any) => {
    setPage(pageNumber);
    if (handlePageChange) handlePageChange(pageNumber)
  };

   const startEntry = (activePage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(activePage * rowsPerPage, userTotal);


  return (
    <>
      {userTotal > 0 && (
        <div className=" row gx-0 custom-pagination m-0 w-100 p-3 align-items-center">
          <div className="d-flex align-items-center w-50">
            <p style={{ marginBottom: "0px", color: "#1f1f1f", fontSize: "15px", fontWeight: '500' }}>Row Per Page:</p>
            <select
              className="form-select mx-2 pageOption"
              value={rowsPerPage}
              onChange={(e) => handleRowsPerPage(Number(e.target.value))}
              style={{ width: '80px' }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={userTotal}>All</option>
            </select>
          </div>

          {type === "server" && userTotal > 0 && (
            <div className="col pagination d-flex gap-2 justify-content-end align-items-center">
              <p style={{ marginBottom: 0, fontSize: "15px", fontWeight: 500 }}>
              Showing {startEntry} – {endEntry} of {userTotal} entries
            </p>
              <TablePagination
                activePage={activePage}
                itemsCountPerPage={rowsPerPage}
                totalItemsCount={userTotal}
                pageRangeDisplayed={3}
                onChange={(page) => handlePage(page)}
                itemClass="page-item"
              />
            </div>
          )}

          {type === "client" && userTotal > 0 && (
            <>
              <div
                className='col pagination d-flex gap-2 justify-content-end align-items-center'
              >
                <p
                  style={{
                    marginBottom: "0px",
                    color: "1F1F1F",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Showing {activePage} out of {totalPages} pages
                </p>
                <div>
                  <TablePagination
                    activePage={activePage}
                    itemsCountPerPage={rowsPerPage}
                    totalItemsCount={userTotal}
                    pageRangeDisplayed={3}
                    onChange={handlePage}
                    itemClass="page-item"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
