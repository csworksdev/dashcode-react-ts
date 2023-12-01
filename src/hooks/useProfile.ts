import { useSelector, useDispatch } from "react-redux";
import { handleProfile } from "@/redux/profile";

type PayloadTypes = { payload: any; type: "profile/handleProfile"; }

const useProfile = (): [ProfileResponseType, (val: ProfileResponseType | null) => void] => {
  const dispatch = useDispatch();
  const Profile: ProfileResponseType = useSelector((state: any) => state.profile.profile);
  
  const setProfile = (val: ProfileResponseType | null): PayloadTypes => dispatch(handleProfile(val));

  return [Profile, setProfile];
};

export default useProfile;