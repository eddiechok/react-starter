import axios from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import useEnhancedMutationOptions from "../../hooks/useEnhancedMutationOptions";
import { checkResponse, encrypt } from "../../shared/functions";

export type LoginParams = {
  username: string;
  password: string;
  lang_code: string;
  login_type: string;
};

type LoginResponse = {
  access_token: string;
};

const postLogin = (params: LoginParams) => {
  return axios
    .post("/member/login", {
      ...params,
      password: encrypt(params.password),
    })
    .then<LoginResponse>(checkResponse);
};

const usePostLogin = (options?: UseMutationOptions<LoginResponse, Error, LoginParams>) => {
  const enhancedOptions = useEnhancedMutationOptions(options);
  const mutation = useMutation(postLogin, enhancedOptions);

  return mutation;
};

export default usePostLogin;
