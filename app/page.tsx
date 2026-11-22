import LandingHeader from "@/components/header/landing-header";

export default async function Home() {
  return (
    <div className="@container/viewport min-h-dvh h-dvh relative">
      <LandingHeader />
    </div>
  );
}
