import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number | null;
};

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .order("created_at")
      .then(({ data }) => {
        setServices(data ?? []);
        setLoading(false);
      });
  }, []);

  return { services, loading };
}
