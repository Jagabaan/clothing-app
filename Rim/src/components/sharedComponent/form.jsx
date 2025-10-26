import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";

function SharedForm({ controls, formData, setFormData, onSubmit, buttonText }) {
  function renderByComponentType(controlItem) {
    let element = null;
    const value = formData?.[controlItem.name] || "";

    switch (controlItem.componentType) {
      case "input":
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            className="h-11 text-base px-3 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
            value={value}
            name={controlItem.name}
          >
            <SelectTrigger className="w-full h-11 text-base px-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
              <SelectValue placeholder={controlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            className="min-h-[90px] text-base px-3 py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            className="h-11 text-base px-3 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit();
      }}
      className="flex flex-col h-full"
    >
      <div className="flex-1 overflow-auto space-y-4 pr-2">
        {controls?.map((item) => (
          <div className="grid w-full gap-1.5" key={item.name}>
            <Label className="text-base font-medium text-gray-800">
              {item.label}
            </Label>
            {renderByComponentType(item)}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
        >
          {buttonText || "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default SharedForm;
