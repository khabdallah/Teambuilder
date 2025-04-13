// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jnjeuvqycruhzzohtxsf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuamV1dnF5Y3J1aHp6b2h0eHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Njg5MzYsImV4cCI6MjA2MDE0NDkzNn0.QMq6b2ErtPvjjUCPVBPahYKGYxlBYMYZ_S_YyaZ1yaw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
