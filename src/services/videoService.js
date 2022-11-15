import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://hlqaxurxsasgauqbgdmw.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscWF4dXJ4c2FzZ2F1cWJnZG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMjE4NjksImV4cCI6MTk4Mzc5Nzg2OX0.cdhuWGFAFTQG_-qi_8h0oGguDE-LGQYljGgPNv2b0uY";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export const videoService = () => {
  return {
    getAllVideos() {
      return supabase.from("video").select("*").order("id");
    },
    insertVideo(video) {
      return supabase.from("video").insert(video);
    },
    newChannel(channel) {
      return supabase.channel(channel);
    },
  };
};
