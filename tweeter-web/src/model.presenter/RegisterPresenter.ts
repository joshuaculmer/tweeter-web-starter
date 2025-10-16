import { User, AuthToken } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";
import { Buffer } from "buffer";
import { useUserInfoActions } from "./UserInfoContexts";
import { useNavigate } from "react-router-dom";
import { Presenter, View } from "./Presenter";

export interface RegisterView extends View {
  setIsLoading: (value: boolean) => void;
  setImageUrl: (value: string) => void;
  setImageBytes: (value: Uint8Array) => void;
  setImageFileExtension: (value: string) => void;
}

export class RegisterPresenter extends Presenter<RegisterView> {
  private useUserInfoActions = useUserInfoActions();
  private navigate = useNavigate();

  public constructor(view: RegisterView) {
    super(view);
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {
    // TODO replace service call with presenter
    return new AuthService().register(
      firstName,
      lastName,
      alias,
      password,
      userImageBytes,
      imageFileExtension
    );
  }

  public handleImageFile(file: File | undefined) {
    if (file) {
      this._view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this._view.setImageBytes(bytes);
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this._view.setImageFileExtension(fileExtension);
      }
    } else {
      this._view.setImageUrl("");
      this._view.setImageBytes(new Uint8Array());
    }
  }

  public getFileExtension = (file: File): string | undefined => {
    return file.name.split(".").pop();
  };

  public async doRegister(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageBytes: Uint8Array,
    imageFileExtension: string,
    rememberMe: boolean
  ): Promise<void> {
    await this.doFailureReportingOperations(async () => {
      this._view.setIsLoading(true);

      const [user, authToken] = await this.register(
        firstName,
        lastName,
        alias,
        password,
        imageBytes,
        imageFileExtension
      );

      this.useUserInfoActions.updateUserInfo(user, user, authToken, rememberMe);
      this.navigate(`/feed/${user.alias}`);
    }, "register user");

    this._view.setIsLoading(false);
  }

  public checkSubmitButtonStatus(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageUrl: string,
    imageFileExtension: string
  ): boolean {
    return (
      !firstName ||
      !lastName ||
      !alias ||
      !password ||
      !imageUrl ||
      !imageFileExtension
    );
  }
}
