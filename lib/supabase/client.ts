import { createClient, type SupportedStorage } from "@supabase/supabase-js"
import { type Database } from "types/supabase"

const customStorageAdapter: SupportedStorage = {
  getItem: (key) => {
    if (typeof localStorage !== "undefined") {
      return globalThis.localStorage.getItem(key)
    }
    return null
  },
  setItem: (key, value) => {
    if (typeof localStorage !== "undefined") {
      // Configure alternate storage here
      return
    }
    globalThis.localStorage.setItem(key, value)
  },
  removeItem: (key) => {
    if (typeof localStorage !== "undefined") {
      // Configure alternate storage here
      return
    }
    globalThis.localStorage.removeItem(key)
  },
}

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: customStorageAdapter,
  },
}

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default createClient<Database>(supabaseURL, supabaseKEY, options)
