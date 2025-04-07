import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://sgnuaigjccveuhmikhwy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbnVhaWdqY2N2ZXVobWlraHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NjU3OTUsImV4cCI6MjA1ODQ0MTc5NX0.cwsYPunbuQ2SBgiqXejoX3BoSU5AEw9LRfPlWmQy3q4";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase credentials are missing!");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



