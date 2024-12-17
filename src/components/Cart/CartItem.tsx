import { formatter } from "@/src/lib/formats";

export default async function CartItem({ product }) {
    return (
        <>
            <tr>
                <td>
                    {product?.product_name}
                </td>
                <td>
                    {product?.product_description}
                </td>
                <td>
                    {formatter.format(product?.product_price / 100)}
                </td>
                <td>
                    {product?.product_qty}
                </td>
                <th>
                    {formatter.format((product?.product_price * product?.product_qty) / 100)}
                </th>
                <th>
                    <button className="btn btn-error btn-xs">Löschen</button>
                </th>
            </tr>
        </>
    )
}