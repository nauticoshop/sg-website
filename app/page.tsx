import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/services-grid";

export default function Home() {
  return (
    <>
      <Nav variant="dark" />
      <Hero />
      <ServicesGrid />
    </>
  );
}
