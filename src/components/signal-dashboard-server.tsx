import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signals } from "@/data/signals";
import { SignalDashboard } from "./signal-dashboard";

export async function SignalDashboardServer() {
  const session = await getServerSession(authOptions);

  return <SignalDashboard initialSignals={signals} isAuthenticated={Boolean(session?.user)} />;
}
