import { useTranslation } from "react-i18next";
import { Commonpagination } from "../../common components/Commonpagination";

const ComplaintTable = ({
  complaints,
  currentPage,
  formatDate,
  onViewDetails,
  pagination,
  setCurrentPage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="complaint-list-container">
      <div className="complaint-table-wrap">
        <table className="complaint-table">
          <thead>
            <tr>
              <th>{t("complaint.sno")}</th>
              <th>{t("complaint.complaint")}</th>
              <th>{t("complaint.status")}</th>
              <th>{t("complaint.date")}</th>
              <th>{t("complaint.action")}</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((item, index) => (
              <tr key={item._id}>
                <td>{(currentPage - 1) * 10 + index + 1}</td>
                <td>
                  <div className="complaint-table__title-cell clamp-2" title={item.complain}>
                    {item.complain}
                  </div>
                </td>
                <td>
                  <span className={`complaint-status complaint-status--${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <button
                    className="complaint-action-btn"
                    onClick={() => onViewDetails(item._id)}
                  >
                    {t("complaint.viewDetails")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination.pages > 1 && (
        <div className="complaint-pagination">
          <Commonpagination
            ActivePage={currentPage}
            TotalItemsCount={pagination.total}
            ItemsCountPerPage={pagination.limit}
            Onchange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ComplaintTable;
