import React, { ReactNode } from "react";
import Bar from "./Bar";

interface ProgressBarProps {
  title?: string;
  children?: ReactNode;
  value: number;
  backClass?: string;
  className?: string;
  titleClass?: string;
  striped?: boolean;
  animate?: boolean;
  showValue?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  title,
  children,
  value,
  backClass = "rounded-[999px]",
  className = "bg-slate-900 dark:bg-slate-900",
  titleClass = "text-base font-normal",
  striped,
  animate,
  showValue,
}) => {
  return (
    <div className="relative">
      {title && (
        <span
          className={`block text-slate-500   tracking-[0.01em] mb-2 ${titleClass}`}
        >
          {title}
        </span>
      )}
      {!children && (
        <div
          className={`w-full  overflow-hidden bg-opacity-10 progress  ${backClass}`}
        >
          <Bar
            value={value}
            className={className}
            striped={striped || false}
            animate={animate || false}
            showValue={showValue || false}
          />
        </div>
      )}
      {children && (
        <div
          className={`w-full  overflow-hidden bg-opacity-10 flex progress  ${backClass}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;