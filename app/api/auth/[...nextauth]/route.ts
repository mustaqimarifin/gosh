import NextAuth from "next-auth";
import { authOptions } from "server10/auth";

// Add back once NextAuth v5 is released
// export const runtime = 'edge';

const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
