// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aiqndnjverpvuigsbslh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcW5kbmp2ZXJwdnVpZ3Nic2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyMTAwNTAsImV4cCI6MjA2MDc4NjA1MH0.G9BWC7M7sumhVQHWhG6_QyPDMJ6X4xp6grIyu5uOESs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);