import { CheckCircle } from "lucide-react";
import { PRIORITY_THEME } from "../../ticketConstants";

export const PriorityOption = ({ value, title, description, selected, onSelect }) => {
  const theme = PRIORITY_THEME[value];
  const Icon = theme.Icon;

  return (
    <label
      className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200 ${
        selected
          ? `${theme.border} shadow-sm`
          : `border-gray-100 bg-white ${theme.hover} hover:shadow-sm`
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

      <div className="flex min-h-27.5 flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-3">

          {/* Icon */}
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              selected ? theme.iconBg : "bg-gray-100"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${
                selected ? theme.icon : "text-gray-400"
              }`}
            />
          </div>

          {/* Check */}
          {selected && (
            <CheckCircle
              className={`h-5 w-5 shrink-0 ${theme.icon}`}
            />
          )}
        </div>

        <div className="mt-4">
          <p
            className={`text-sm font-semibold ${
              selected ? "text-gray-900" : "text-gray-800"
            }`}
          >
            {title}
          </p>

          <p className="mt-0.5 text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </label>
  );
};
