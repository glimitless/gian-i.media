import LandingHeader from "@/components/header/landing-header";

export default async function Home() {
  return (
    <div className="@container/viewport min-h-dvh h-dvh w-full relative">
      <LandingHeader />
    </div>
  );
}
