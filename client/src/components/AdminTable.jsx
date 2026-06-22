import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";

/**
 * columns: [{ key, label, render?(row) }]
 * actions: (row) => ReactNode
 */
const AdminTable = ({ columns, rows, loading, actions, emptyTitle = "No records found" }) => {
  if (loading) return <LoadingSpinner />;
  if (!rows || rows.length === 0) return <EmptyState title={emptyTitle} />;

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-itouch-surface-2 text-itouch-white/60">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-itouch-surface">
          {rows.map((row) => (
            <tr key={row._id} className="hover:bg-white/5">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {actions && <td className="px-4 py-3">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
