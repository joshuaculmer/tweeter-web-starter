import { OverlayTrigger, OverlayTriggerProps, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ToastActionsContext } from "../toaster/ToastContexts";
import { ToastType } from "../toaster/Toast";
import { IconName } from "@fortawesome/fontawesome-common-types";

interface Props {
  iconName: IconName;
}

const OAuth = (props: Props) => {
  const { displayToast } = useContext(ToastActionsContext);

  const displayInfoMessageWithDarkBackground = (message: string): void => {
    displayToast(
      ToastType.Info,
      message,
      3000,
      undefined,
      "text-white bg-primary"
    );
  };

  const formatTooltip = (input: string) => {
    switch (input) {
      case "google":
        return "Google";
      case "facebook":
        return "Facebook";
      case "twitter":
        return "Twitter";
      case "linkedin":
        return "LinkedIn";
      case "github":
        return "GitHub";
    }
  };

  return (
    <button
      type="button"
      className="btn btn-link btn-floating mx-1"
      onClick={() =>
        displayInfoMessageWithDarkBackground(
          `${props.iconName} registration is not implemented.`
        )
      }
    >
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id={`${props.iconName}Tooltip`}>
            {formatTooltip(props.iconName)}
          </Tooltip>
        }
      >
        <FontAwesomeIcon icon={["fab", props.iconName]} />
      </OverlayTrigger>
    </button>
  );
};

export default OAuth;
