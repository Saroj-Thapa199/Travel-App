import { ProfileData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProfileData = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId, "profile"],
    queryFn: async () => {
      const { data } = await axios.get<ProfileData>("/api/profile");
      return data;
    },
    enabled: !!userId,
  });
}

export default useProfileData