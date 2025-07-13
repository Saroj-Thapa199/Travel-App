import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Trash } from "lucide-react";
import { useState } from "react";
import { useFormContext, useFieldArray, UseFormReturn } from "react-hook-form";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TrekRouteType } from "@/lib/RouteValidation";
import { Alert, AlertTitle } from "@/components/ui/alert";

type SafetyTipsInputProps = {
  form: UseFormReturn<Omit<TrekRouteType, "_id">>;
};

const SafetyTipsInput = ({ form }: SafetyTipsInputProps) => {
  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "safetyTips",
  });

  const [inputValue, setInputValue] = useState("");

  const safetyTips = form.getValues("safetyTips");

  const handleAdd = () => {
    if (inputValue.trim()) {
      append(inputValue.trim());
      setInputValue("");
    }
  };

  const handleRemove = async (index: number) => {
    remove(index);
    const updatedCheckpoints = getValues("safetyTips");
    if (updatedCheckpoints && updatedCheckpoints.length == 0) {
      form.setValue("safetyTips", undefined);
    }
  };

  return (
    <FormItem>
      <FormLabel>Safety Tips(M) (optional)</FormLabel>
      <div className="flex gap-2">
        <Input
          placeholder="Add safety tips..."
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

      {safetyTips && safetyTips.length > 0 && (
        <div className="mt-2 space-y-2">
          {fields.map((field, index) => (
            <Alert key={index} className="py-1.5">
              <AlertTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5" />
                  <span>{getValues(`safetyTips.${index}`)}</span>
                </div>
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => handleRemove(index)}
                >
                  <Trash className="text-destructive size-4" />
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

export default SafetyTipsInput;
