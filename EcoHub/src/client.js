import {createClient} from "@supabase/supabase-js"

const URL = "https://rcnshneadfvzybtnzcgz.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbnNobmVhZGZ2enlidG56Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDU2MjIsImV4cCI6MjA2MDgyMTYyMn0.OddYPaHy7PlZS8ij6HzBr3c7U1p7xLd7IzLUnnA3ReI"

export const supabase = createClient(URL, API_KEY)