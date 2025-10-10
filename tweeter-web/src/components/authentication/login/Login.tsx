import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useUserInfoActions } from "../../userInfo/UserInfoContexts";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import AuthenticationFields from "../AuthenticationFields";
import { useMessageActions } from "../../toaster/messagehooks";
import {
  LoginPresenter,
  LoginView,
} from "../../../model.presenter/LoginPresenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUserInfo } = useUserInfoActions();
  const { displayErrorMessage } = useMessageActions();

  const listener: LoginView = {
    setIsLoading: setIsLoading,
    displayErrorMessage: displayErrorMessage,
    updateUserInfo: updateUserInfo,
    originalUrl: props.originalUrl,
  };

  const presenterRef = useRef<LoginPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new LoginPresenter(listener);
  }

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.key == "Enter" &&
      !presenterRef.current!.checkSubmitButtonStatus(alias, password)
    ) {
      presenterRef.current!.doLogin(alias, password, rememberMe);
    }
  };

  const inputFieldFactory = () => {
    return (
      <AuthenticationFields
        onKeyDown={loginOnEnter}
        setAlias={setAlias}
        setPassword={setPassword}
      ></AuthenticationFields>
    );
  };

  const switchAuthenticationMethodFactory = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldFactory={inputFieldFactory}
      switchAuthenticationMethodFactory={switchAuthenticationMethodFactory}
      setRememberMe={setRememberMe}
      submitButtonDisabled={() =>
        presenterRef.current!.checkSubmitButtonStatus(alias, password)
      }
      isLoading={isLoading}
      submit={() => presenterRef.current!.doLogin(alias, password, rememberMe)}
    />
  );
};

export default Login;
