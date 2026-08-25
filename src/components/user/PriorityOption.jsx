import { CheckCircle } from "lucide-react";

const PRIORITY_THEME = {
  low: { border: "border-green-200 bg-green-50", icon: "text-green-600" },
  medium: { border: "border-yellow-200 bg-yellow-50", icon: "text-yellow-600" },
  high: { border: "border-red-200 bg-red-50", icon: "text-red-600" },
};

export const PriorityOption = ({ value, title, description, selected, onSelect }) => {
  const theme = PRIORITY_THEME[value];

  return (
    <label
      className={`relative flex cursor-pointer rounded-lg border ${
        selected ? theme.border : "border-gray-200"
      }`}
    >
      <input
        type="radio"
        name="priority"
        value={value}
        checked={selected}
        onChange={() => onSelect(value)}
        className="sr-only"
      />
      <div className="flex w-full items-center justify-between p-4">
        <div className="flex items-center">
          <div className="text-sm">
            <p className="font-medium text-gray-900">{title}</p>
            <p className="text-gray-500">{description}</p>
          </div>
        </div>
        {selected && (
          <div className={`shrink-0 ${theme.icon}`}>
            <CheckCircle className="w-6 h-6" />
          </div>
        )}
      </div>
    </label>
  );
};
