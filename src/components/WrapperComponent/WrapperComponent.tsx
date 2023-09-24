import React from "react";
import { WrapperComponentProps } from "./WrapperComponentProps";
import CenterLoading from "../CenterLoading/CenterLoading";
import Unauthorized from "../Unauthorized/Unauthorized";

const WrapperComponent: React.FC<WrapperComponentProps> = ({
  loading,
  error,
  component,
}) => {
  const renderComponent = () => {
    if (error) {
      if ((error as any).originalStatus === 401) {
        return <Unauthorized />;
      }
      throw new Error();
    }

    return component;
  };

  return loading ? <CenterLoading /> : renderComponent();
};

export default WrapperComponent;
