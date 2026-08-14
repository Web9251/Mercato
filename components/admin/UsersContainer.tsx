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
import { Badge } from "../ui/badge"
import { User } from "@/generated/prisma/client"
import DeleteAlert from "./DeleteAlert"

function UsersContainer({ users }: { users: User[] }) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow className="[&_th]:text-muted-foreground">
          <TableHead>ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>ROLE</TableHead>
          <TableHead>ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const { name, email, role, id } = user
          const roleVariant = role === "user" ? "secondary" : "default"

          return (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>
                <Badge variant={roleVariant}>{role}</Badge>
              </TableCell>
              <TableCell className="flex gap-3">
                <Button
                  variant="outline"
                  className="dark:bg-transparent"
                  asChild
                >
                  <Link href={`/admin/users/${id}`}>Edit</Link>
                </Button>
                <DeleteAlert path="users" id={id} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default UsersContainer
