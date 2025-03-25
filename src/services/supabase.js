/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vfukefcaybufdwmlvunf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmdWtlZmNheWJ1ZmR3bWx2dW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTIzNzAsImV4cCI6MjA1MDg2ODM3MH0.m0A-C9MdMGqZSrDp7r_wrVbOQoI9CokEiyf4g7ejbdM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
