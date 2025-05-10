import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://qehdylpssbqwhaiwvzcp.supabase.co";
const supabase_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaGR5bHBzc2Jxd2hhaXd2emNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgzNzc1MDcsImV4cCI6MjAxMzk1MzUwN30.XvXZx-RKOJE-05vkQm4Q0qFAJeaQtrA_fGgR92osyyA";
export const supabase = createClient(supabase_url, supabase_key);
