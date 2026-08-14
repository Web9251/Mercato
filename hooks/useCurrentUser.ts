import { authClient } from "@/lib/auth-client"

export const useCurrentUser = async () => {
  const session = await authClient.getSession()
  return session.data?.user
}
