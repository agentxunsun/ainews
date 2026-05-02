import { SignalDashboard } from "@/components/signal-dashboard";
import { signals } from "@/data/signals";

export default function Home() {
  return <SignalDashboard initialSignals={signals} />;
}
