import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="sticky top-4 h-fit bg-white/90 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-transparent">
        <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
          Filters
        </h2>
      </div>

      <div className="p-5 space-y-6">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                {keyItem}
              </h3>

              <div className="grid gap-3 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id || option.label}
                    className="flex items-center gap-3 text-gray-700 font-medium cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="border-gray-300 data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500 transition-all duration-300 hover:border-indigo-400"
                    />
                    <span className="capitalize">{option.label}</span>
                  </Label>
                ))}
              </div>
            </div>

            <Separator className="my-4 bg-gray-100" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
