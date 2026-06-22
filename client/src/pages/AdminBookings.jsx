import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import { fetchGamingBookings, updateGamingBookingStatus, deleteGamingBooking } from "../services/resources";

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed"];

const statusColor = {
  pending: "text-itouch-orange",
  confirmed: "text-itouch-green",
  cancelled: "text-red-400",
  completed: "text-itouch-blue",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchGamingBookings().then(({ data }) => setBookings(data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateGamingBookingStatus(id, status);
      toast.success("Status updated");
      load();
    } catch (err) {
      toast.error("Could not update status");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;
    await deleteGamingBooking(id);
    toast.success("Booking deleted");
    load();
  };

  return (
    <div>
      <AdminHeader title="PS5 Gaming Bookings" />
      <div className="p-6">
        <AdminTable
          columns={[
            { key: "customerName", label: "Name" },
            { key: "phone", label: "Phone" },
            { key: "gameType", label: "Game Type" },
            { key: "preferredDate", label: "Date" },
            { key: "preferredTime", label: "Time" },
            { key: "numberOfPlayers", label: "Players" },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row._id, e.target.value)}
                  className={`rounded-lg border border-white/10 bg-itouch-bg px-2 py-1 text-xs font-semibold ${statusColor[row.status]}`}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              ),
            },
          ]}
          rows={bookings}
          loading={loading}
          actions={(row) => (
            <button onClick={() => handleDelete(row._id)} className="rounded-lg bg-white/5 p-2 hover:text-red-400"><Trash2 size={16} /></button>
          )}
        />
      </div>
    </div>
  );
};

export default AdminBookings;
