import React, { ChangeEvent } from "react";
import Radio from "@/components/ui/Radio";
import useFooterType from "@/hooks/useFooterType";

const FooType: React.FC = () => {
  const [footerType, setFooterType] = useFooterType();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFooterType(e.target.value);
  };
  const fotypes = [
    {
      label: "Sticky",
      value: "sticky",
    },
    {
      label: "Static",
      value: "static",
    },
    {
      label: "Hidden",
      value: "hidden",
    },
  ];

  return (
    <div>
      <h4 className="text-slate-600 text-base dark:text-slate-300 mb-2 font-normal">
        Footer Type
      </h4>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
        {fotypes?.map((item, index) => (
          <Radio
            id="radio-id-3"
            key={index}
            label={item.label}
            name="navbarType"
            value={item.value}
            checked={footerType === item.value}
            onChange={handleChange}
            className="h-4 w-4"
          />
        ))}
      </div>
    </div>
  );
};

export default FooType;