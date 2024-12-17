import Link from "next/link";
import ProductCarousel from "../components/Startpage/ProductCarousel";



export default async function Page() {
  return (
    <>
      <ProductCarousel></ProductCarousel>
      <h1 className="text-3xl font-black text-center m-10">
        Willkommen beim Shishapoint Bad Wildungen
      </h1>
      <div className="flex">
        <Link href="/products" className="btn btn-primary mx-auto">Schau dir unsere Produkte an</Link>
      </div>
    </>
  )
}