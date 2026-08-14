In **Auth.js** (formerly NextAuth.js), **callbacks** let you intercept and customize authentication behavior at different stages of the sign-in/session lifecycle.

The main callbacks are:

```ts
callbacks: {
  signIn() {},
  redirect() {},
  jwt() {},
  session() {},
}
```

Here's what each one does and when it runs.

---

# 1. `signIn` Callback

**Purpose:** Control whether a user is allowed to sign in.

Runs **after authentication succeeds with the provider** but **before the user is logged in**.

```ts
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    return true;
  }
}
```

## Parameters

```ts
{
  ;(user, account, profile, email, credentials)
}
```

### Example

Allow only company emails:

```ts
async signIn({ user }) {
  return user.email?.endsWith("@myCompany.com");
}
```

### Return Values

→ Allow sign in.

```ts
return true
```

→ Reject sign in.

```ts
return false
```

→ Redirect user.

```ts
return "/unauthorized"
```

---

## Common Uses

### Restrict email domains

```ts
async signIn({ user }) {
  return user.email?.endsWith("@company.com");
}
```

### Block suspended users

```ts
async signIn({ user }) {
  const dbUser = await getUser(user.email);

  return !dbUser.suspended;
}
```

### Perform some function before signIn

- like merge guest cart to user user cart

```ts
async signIn({ user }) {
      const userId = user.id as string
      const sessionCartId = (await cookies()).get("sessionCartId")
        ?.value as string

      // if guestUser have cart merge cart
      await mergeCartsAction(userId, sessionCartId)
      return true
    },
```

---

# 2. `redirect` Callback

**Purpose:** Control where users are redirected.

Runs whenever Auth.js performs a redirect.

```ts
callbacks: {
  async redirect({ url, baseUrl }) {
    return baseUrl;
  }
}
```

## Parameters

```ts
{
  ;(url, baseUrl)
}
```

### Example

```ts
async redirect({ url, baseUrl }) {
  if (url.startsWith("/")) {
    return `${baseUrl}${url}`;
  }

  if (new URL(url).origin === baseUrl) {
    return url;
  }

  return baseUrl;
}
```

This is close to Auth.js's default behavior.

---

## Common Uses

### Always go to dashboard

```ts
async redirect() {
  return "/dashboard";
}
```

### Prevent redirects to external sites

```ts
async redirect({ url, baseUrl }) {
  if (url.startsWith(baseUrl)) {
    return url;
  }

  return baseUrl;
}
```

---

# 3. `jwt` Callback

**Purpose:** Customize the JWT token.

This is the **most important callback** when using:

```ts
session: {
  strategy: "jwt"
}
```

Runs:

1. On sign in
2. Whenever a session is accessed
3. Whenever the JWT is refreshed

```ts
callbacks: {
  async jwt({ token, user, account }) {
    return token;
  }
}
```

## Parameters

```ts
{
  ;(token, user, account, profile, trigger, session)
}
```

---

## First Login

When a user signs in:

```ts
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
  }

  return token;
}
```

### Before

```json
{
  "name": "John"
}
```

### After

```json
{
  "name": "John",
  "id": "123"
}
```

The token now permanently contains the user ID.

---

## Subsequent Requests

After login:

```ts
async jwt({ token, user }) {
  console.log(user); // undefined
}
```

Why?

Because the user already authenticated.

Auth.js loads the existing token and passes:

```ts
{
  token
}
```

only.

So typically:

```ts
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
    token.role = user.role;
  }

  return token;
}
```

The `if (user)` block runs only during sign in.

---

## Common Uses

### Store User ID

```ts
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
  }

  return token;
}
```

### Store Role

```ts
async jwt({ token, user }) {
  if (user) {
    token.role = user.role;
  }

  return token;
}
```

### Store Access Token

```ts
async jwt({ token, account }) {
  if (account) {
    token.accessToken = account.access_token;
  }

  return token;
}
```

### Store Refresh Token

```ts
async jwt({ token, account }) {
  if (account) {
    token.refreshToken = account.refresh_token;
  }

  return token;
}
```

---

# 4. `session` Callback

**Purpose:** Control what is exposed to the client session.

Runs whenever:

```ts
auth()
useSession()
getServerSession()
```

is called.

```ts
callbacks: {
  async session({ session, token }) {
    return session;
  }
}
```

---

## Parameters

JWT Strategy

```ts
{
  ;(session, token)
}
```

Database Strategy

```ts
{
  ;(session, user)
}
```

---

## Why It Exists

Data stored in the JWT is **not automatically exposed** to the client.

For example:

```ts
async jwt({ token, user }) {
  if (user) {
    token.role = user.role;
  }

  return token;
}
```

The role exists inside the token.

But:

```ts
const session = await auth()
```

won't contain it.

You must copy it:

```ts
async session({ session, token }) {
  session.user.role = token.role;

  return session;
}
```

---

## Typical Flow

### JWT Callback

```ts
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
    token.role = user.role;
  }

  return token;
}
```

Token becomes:

```json
{
  "sub": "123",
  "id": "123",
  "role": "admin"
}
```

---

### Session Callback

```ts
async session({ session, token }) {
  session.user.id = token.id;
  session.user.role = token.role;

  return session;
}
```

Client receives:

```json
{
  "user": {
    "id": "123",
    "role": "admin",
    "name": "John"
  }
}
```

---

# Full Example

```ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async signIn({ user }) {
      return user.email?.endsWith("@company.com")
    },

    async redirect({ url, baseUrl }) {
      return baseUrl
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }

      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },

    async session({ session, token }) {
      session.user.id = token.id
      session.accessToken = token.accessToken

      return session
    },
  },
})
```

---

# Mental Model

Think of the callbacks as a pipeline:

```text
User signs in
      │
      ▼
signIn()
      │
      ▼
jwt()
      │
      ▼
JWT stored
      │
      ▼
session()
      │
      ▼
Session sent to client
```

And for later requests:

```text
Request session
      │
      ▼
jwt()
      │
      ▼
session()
      │
      ▼
Client receives session
```

A practical rule:

- **`signIn`** → "Can this user log in?"
- **`redirect`** → "Where should they go?"
- **`jwt`** → "What should be stored in the token?"
- **`session`** → "What token data should be exposed to the client?"

The **`authorized` callback** is different from the others because it's used in **Auth.js middleware** to protect routes.

You'll usually see it inside the `auth` configuration used by middleware:

```ts
import NextAuth from "next-auth"

export const { auth } = NextAuth({
  callbacks: {
    authorized({ auth, request }) {
      return !!auth
    },
  },
})
```

---

# 5. `authorized` Callback

## What `authorized` Does

**Purpose:** Decide whether a request is allowed to access a route.

It runs **before the requested page/API route is served**.

Think of it as:

```text
Incoming request
       │
       ▼
authorized()
       │
       ├── true  → continue
       │
       └── false → block/redirect
```

---

## Parameters

```ts
authorized({ auth, request })
```

### `auth`

The authenticated session information.

If the user is not logged in:

```ts
auth === null
```

If logged in:

```ts
{
  user: {
    name: "John",
    email: "john@example.com"
  }
}
```

---

### `request`

The incoming request object.

```ts
const pathname = request.nextUrl.pathname
```

Useful for role-based routing or protecting specific paths.

---

## Simplest Example

Require login everywhere middleware runs:

```ts
callbacks: {
  authorized({ auth }) {
    return !!auth;
  }
}
```

Meaning:

```text
Logged in?     ✓ Allow
Not logged in? ✗ Deny
```

---

#3 Protect Specific Routes

```ts
callbacks: {
  authorized({ auth, request }) {
    const isAdminRoute =
      request.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute) {
      return !!auth;
    }

    return true;
  }
}
```

Result:

```text
/admin      → login required
/profile    → public
/about      → public
```

---

## Role-Based Authorization

Suppose your JWT/session contains:

```ts
{
  user: {
    role: "admin"
  }
}
```

Then:

```ts
callbacks: {
  authorized({ auth, request }) {
    const isAdminRoute =
      request.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute) {
      return auth?.user?.role === "admin";
    }

    return true;
  }
}
```

Result:

```text
Admin user    → /admin allowed
Regular user  → /admin denied
Guest         → /admin denied
```

---

## Redirect Instead of Boolean

You can return a response:

```ts
import { NextResponse } from "next/server";

callbacks: {
  authorized({ auth }) {
    if (!auth) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    return true;
  }
}
```

This gives you full control over what happens when access is denied.

---

## How It Relates to Other Callbacks

A common point of confusion:

| Callback     | Purpose                                |
| ------------ | -------------------------------------- |
| `signIn`     | Should this user be allowed to log in? |
| `jwt`        | What data goes into the token?         |
| `session`    | What data goes to the client session?  |
| `redirect`   | Where should the user be sent?         |
| `authorized` | Can this request access this route?    |

---

## Typical Flow

```text
User logs in
     │
     ▼
signIn()
     │
     ▼
jwt()
     │
     ▼
session()
     │
     ▼
User visits /admin
     │
     ▼
authorized()
     │
     ├─ true  → page loads
     └─ false → blocked/redirected
```

---

## Real-World Example

```ts
import NextAuth from "next-auth"

export const { handlers, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },

    session({ session, token }) {
      session.user.role = token.role
      return session
    },

    authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

      if (isAdminRoute) {
        return auth?.user?.role === "admin"
      }

      return true
    },
  },
})
```

In this setup:

1. `jwt()` stores the role.
2. `session()` exposes the role.
3. `authorized()` checks the role before allowing access to `/admin`.

So **`authorized()` is middleware-level route protection**, while **`signIn()` is login-time permission checking**. That's the key distinction.

In Auth.js, the **`authorize()` function** belongs specifically to the **Credentials provider**. It is often confused with the **`authorized()` callback**, but they serve completely different purposes.

---

# Credentials `authorize()` function

In Auth.js, the authorize() function belongs specifically to the Credentials provider. It is often confused with the authorized() callback, but they serve completely different purposes.

## Where `authorize()` Lives

```ts
import Credentials from "next-auth/providers/credentials"

providers: [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },

    async authorize(credentials) {
      // verify user here
    },
  }),
]
```

It is defined **inside the Credentials provider**, not inside `callbacks`.

---

## Purpose of `authorize()`

Its job is:

> Given the credentials submitted by the user, determine whether they are valid and return the corresponding user.

Think of it as:

```text
Login form submitted
       │
       ▼
authorize(credentials)
       │
       ├─ return user object
       │      ↓
       │   Login succeeds
       │
       └─ return null
              ↓
          Login fails
```

---

## Parameters

```ts
async authorize(credentials)
```

For a login form:

```ts
credentials = {
  email: "john@example.com",
  password: "secret123",
}
```

The exact shape depends on the fields you define in `credentials`.

Example:

```ts
Credentials({
  credentials: {
    email: {},
    password: {},
  },
})
```

produces:

```ts
credentials.email
credentials.password
```

---

## Successful Login

Suppose you check a database:

```ts
async authorize(credentials) {
  const user = await db.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (!user) {
    return null;
  }

  const valid = await bcrypt.compare(
    credentials.password,
    user.passwordHash
  );

  if (!valid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
```

Returning a user object means:

```text
Credentials valid
        ↓
User authenticated
        ↓
jwt() callback runs
        ↓
session() callback runs
```

---

## Failed Login

```ts
async authorize(credentials) {
  return null;
}
```

or

```ts
if (!validPassword) {
  return null
}
```

Result:

```text
Credentials invalid
        ↓
Sign-in rejected
```

No session is created.

---

## What Happens to the Returned User?

If you return:

```ts
return {
  id: "123",
  role: "admin",
  email: "john@example.com",
}
```

then during the first login:

```ts
jwt({ token, user })
```

receives:

```ts
user = {
  id: "123",
  role: "admin",
  email: "john@example.com",
}
```

You can then store those values in the token:

```ts
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
    token.role = user.role;
  }

  return token;
}
```

---

## Complete Flow

```text
User submits email/password
          │
          ▼
authorize(credentials)
          │
          ├─ return user
          │       │
          │       ▼
          │    signIn()
          │       ▼
          │     jwt()
          │       ▼
          │   session()
          │
          └─ return null
                  │
                  ▼
             Login fails
```

---

## `authorize()` vs `authorized()`

These names are very similar but do different things:

| Function       | Runs When                | Purpose                           |
| -------------- | ------------------------ | --------------------------------- |
| `authorize()`  | User submits credentials | Verify username/password          |
| `authorized()` | User accesses a route    | Decide if route access is allowed |

### Example

```ts
authorize()
```

asks:

> "Is this email/password correct?"

---

```ts
authorized()
```

asks:

> "Now that we know who you are, can you access this page?"

---

## Real Example

```ts
Credentials({
  credentials: {
    email: {},
    password: {},
  },

  async authorize(credentials) {
    const user = await db.user.findUnique({
      where: {
        email: credentials.email,
      },
    })

    if (!user) {
      return null
    }

    const validPassword = await bcrypt.compare(
      credentials.password,
      user.passwordHash
    )

    if (!validPassword) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    }
  },
})
```

A useful mental model:

- **`authorize()`** → _"Who are you?"_ (authentication)
- **`signIn()`** → _"Should we allow this account to sign in?"_
- **`authorized()`** → _"Can you access this route?"_ (authorization)
- **`jwt()`** → _"What should be stored in the token?"_
- **`session()`** → _"What should the client see?"_
