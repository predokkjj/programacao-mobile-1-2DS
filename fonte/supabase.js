import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oejnmfxcxqgpvhjdvnmt.supabase.co'; // a sua URL do Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lam5tZnhjeHFncHZoamR2bm10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MTc4MDgsImV4cCI6MjEwNzk5MzgwOH0.W4tIIKblHAsmnR533Sg4CEMwtmWpqzrbmzbZ3kNDGW0'; // a sua chave anon

export const supabase = createClient(supabaseUrl, supabaseAnonKey);