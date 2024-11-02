import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileProps, profileSchema } from "../../Profile.constants";
import { useForm } from "react-hook-form";

const useProfileForm = () => {                                                                                                        
    const method = useForm<ProfileProps>({
      resolver: yupResolver(profileSchema),
      defaultValues: {
      },
    });
    const { handleSubmit, reset } = method;
  
    return {
      handleSubmit,
      method,
      reset
    };
  };
  
  export default useProfileForm;