import {createClient} from "@supabase/supabase-js"

const URL = "https://hhsfscmwtnrkxkpkchdz.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhoc2ZzY213dG5ya3hrcGtjaGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0OTc2OTksImV4cCI6MjA2MDA3MzY5OX0.Tq_37cK1xIuMcbidiJFnbHncnlSRU2JgZGCME4m7QK0"

export const supabase = createClient(URL, API_KEY)