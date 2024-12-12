import { getAllProducts } from "../actions/sessionController"


export default async function Page() {
  const data = await getAllProducts()
  return (
    <>
      <h1 className="text-2xl">Startseite</h1>
      {data.map(product => <li key={product.product_id}>{product.product_name} <strong>Warenkorb</strong></li>)}
    </>)
}