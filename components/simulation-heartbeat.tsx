"use client";

import { useEffect } from "react";
import { SIMULATION_INTERVAL_MS } from "@/lib/constants";

export function SimulationHeartbeat() {
  useEffect(() => {
    const tick = async () => {
      await fetch("/api/simulation/tick", { method: "POST" }).catch(() => null);
    };

    void tick();

    const timer = window.setInterval(() => {
      void tick();
    }, SIMULATION_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return null;
}
