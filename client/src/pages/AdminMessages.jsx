import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import AdminTable from "../components/AdminTable";
import { fetchContactMessages, deleteContactMessage } from "../services/resources";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchContactMessages().then(({ data }) => setMessages(data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    await deleteContactMessage(id);
    toast.success("Message deleted");
    load();
  };

  return (
    <div>
      <AdminHeader title="Contact Messages" />
      <div className="p-6">
        <AdminTable
          columns={[
            { key: "name", label: "Name" },
            { key: "phone", label: "Phone" },
            { key: "email", label: "Email" },
            { key: "message", label: "Message" },
            { key: "createdAt", label: "Received", render: (row) => new Date(row.createdAt).toLocaleString() },
          ]}
          rows={messages}
          loading={loading}
          actions={(row) => (
            <button onClick={() => handleDelete(row._id)} className="rounded-lg bg-white/5 p-2 hover:text-red-400"><Trash2 size={16} /></button>
          )}
        />
      </div>
    </div>
  );
};

export default AdminMessages;
