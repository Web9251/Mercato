import Container from "@/components/global/Container"
import Footer from "@/components/global/Footer"
import CarouselHome from "@/components/home/Carousel"
import Featured from "@/components/home/Featured"
import SpecialOffer from "@/components/home/SpecialOffer"
import TrustBar from "@/components/home/Trustbar"
import Navbar from "@/components/navbar/Navbar"
import { getFeaturedProducts } from "@/actions/productActions"

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <section>
      <Navbar />
      <Container>
        <CarouselHome />
        <Featured products={featuredProducts} />
        <SpecialOffer />
        <TrustBar />
      </Container>
      <Footer />
    </section>
  )
}
