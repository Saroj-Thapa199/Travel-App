import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon, Trash } from "lucide-react";
import { useState } from "react";
import { useFormContext, useFieldArray, UseFormReturn } from "react-hook-form";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MotorableRouteType } from "@/lib/RouteValidation";
import { Alert, AlertTitle } from "@/components/ui/alert";

type WarningsInputProps = {
  form: UseFormReturn<Omit<MotorableRouteType, "_id">>;
};

const WarningsInput = ({ form }: WarningsInputProps) => {
  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "warnings",
  });

  const [inputValue, setInputValue] = useState("");

  const warnings = form.getValues("warnings");

  const handleAdd = () => {
    if (inputValue.trim()) {
      append(inputValue.trim());
      setInputValue("");
    }
  };

  const handleRemove = async (index: number) => {
    remove(index);
    // const updatedCheckpoints = getValues("warnings");
    // if (updatedCheckpoints && updatedCheckpoints.length == 0) {
    //   form.setValue("warnings", undefined);
    // }
  };

  return (
    <FormItem>
      <FormLabel>Warnings(M) (optional)</FormLabel>
      <div className="flex gap-2">
        <Input
          placeholder="Add a warning..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button type="button" onClick={handleAdd}>
          Add
        </Button>
      </div>

      {warnings && warnings.length > 0 && (
        <div className="mt-2 space-y-2">
          {fields.map((field, index) => (
            <Alert key={index} className="py-1.5">
              <AlertTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircleIcon className="size-5" />
                  <span>{getValues(`warnings.${index}`)}</span>
                </div>
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => handleRemove(index)}
                  className="group"
                >
                  <Trash className="group-hover:text-destructive size-4" />
                </Button>
              </AlertTitle>
            </Alert>
          ))}
        </div>
      )}

      <FormMessage />
    </FormItem>
  );
};

export default WarningsInput;
