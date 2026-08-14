"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "../ui/table"
import { formatPrice } from "@/utils/utils"
import DeleteAlert from "./DeleteAlert"
import { Product } from "@/generated/prisma/client"
import SuperJSON from "superjson"

function ProductsContainerAdmin({ productsStr }: { productsStr: string }) {
  const products = SuperJSON.parse<Product[]>(productsStr)

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow className="[&_th]:text-muted-foreground">
          <TableHead>ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead>CATEGORY</TableHead>
          <TableHead>STOCK</TableHead>
          <TableHead>RATING</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          const { name, price, category, stock, rating, slug, id } = product
          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{formatPrice(Number(price))}</TableCell>
              <TableCell>{category}</TableCell>
              <TableCell>{stock}</TableCell>
              <TableCell>{Number(rating)}</TableCell>
              <TableCell className="flex gap-3">
                <Button
                  variant="outline"
                  className="dark:bg-transparent"
                  asChild
                >
                  <Link href={`/admin/products/${slug}`}>Edit</Link>
                </Button>
                {/* <DeleteProduct id={id} /> */}
                <DeleteAlert id={id} path="products" />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default ProductsContainerAdmin
