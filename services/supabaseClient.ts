import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pfqfyswhkmvajzpmnbiy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcWZ5c3doa212YWp6cG1uYml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjMzMDEsImV4cCI6MjA4MDc5OTMwMX0.qUi17ramHIxYpVbT3jaUKBMANTzoczBuyidXLVKCREc';

export const supabase = createClient(supabaseUrl, supabaseKey);