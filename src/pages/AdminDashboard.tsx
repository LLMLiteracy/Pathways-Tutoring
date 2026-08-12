import { useEffect, useState } from "react";
import { useSeo } from "../lib/useSeo";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";
import type { BookingStatus } from "../data/mockData";

type Booking = {
  id: string;
  student_name: string;
  email: string;
  subject: string;
  preferred_date: string;
  preferred_time: string | null;
  status: BookingStatus;
};

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-neutral-200 text-neutral-600",
};

export function AdminDashboard() {
  useSeo("Admin Dashboard", "Pathways Tutoring admin dashboard.");
  const { signOut } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("id, student_name, email, subject, preferred_date, preferred_time, status")
      .order("preferred_date", { ascending: false });
    setBookings(data ?? []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: BookingStatus) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) {
      // revert on failure and reload from source of truth
      loadBookings();
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Bookings</h1>
          <p className="mt-1 text-sm text-navy-700/70">All session requests, newest first.</p>
        </div>
        <button
          onClick={() => signOut()}
          className="rounded-full border border-navy-100 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50"
        >
          Sign out
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-navy-700/60">Loading bookings…</p>
      ) : bookings.length === 0 ? (
        <p className="mt-8 text-sm text-navy-700/60">No bookings yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-navy-100">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-900">
              <tr>
                <th className="px-5 py-3 font-semibold">Student</th>
                <th className="px-5 py-3 font-semibold">Subject</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Time</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-navy-900">{b.student_name}</p>
                    <p className="text-xs text-navy-700/60">{b.email}</p>
                  </td>
                  <td className="px-5 py-4 text-navy-700/90">{b.subject}</td>
                  <td className="px-5 py-4 text-navy-700/90">{b.preferred_date}</td>
                  <td className="px-5 py-4 text-navy-700/90">{b.preferred_time ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(b.id, "confirmed")}
                        className="rounded-md px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, "completed")}
                        className="rounded-md px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-50"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, "cancelled")}
                        className="rounded-md px-2 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
