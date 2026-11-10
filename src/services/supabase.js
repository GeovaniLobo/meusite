// src/services/supabase.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://atdblvmhhmplwchllllg.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_erd4H4BlcrUCpr5hAbT5jA_x37b84KS'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)