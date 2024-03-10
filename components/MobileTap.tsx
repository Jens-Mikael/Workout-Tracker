"use client";
import { motion } from "framer-motion";
import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { isMobile } from "react-device-detect";

interface IProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
}

const MobileTap = ({ children, ...props }: IProps): ReactElement<any, any> => {
  if (isMobile)
    return (
      <motion.button whileTap={{ opacity: 0.8 }} {...props}>
        {children}
      </motion.button>
    );
  else return <button {...props}>{children}</button>;
};

export default MobileTap;
