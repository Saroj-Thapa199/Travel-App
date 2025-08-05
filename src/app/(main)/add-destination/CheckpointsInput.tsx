import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import { useFormContext, useFieldArray, UseFormReturn } from "react-hook-form";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { DestinationFormType } from "@/lib/types";

type CheckpointsInputProps = {
  form: UseFormReturn<DestinationFormType>;
};

const CheckpointsInput = ({ form }: CheckpointsInputProps) => {
  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "destinationRoute.trek.checkpoints",
  });

  const [inputValue, setInputValue] = useState("");

  const checkpoints = form.getValues("destinationRoute.trek.checkpoints");

  const handleAdd = () => {
    if (inputValue.trim()) {
      append(inputValue.trim());
      setInputValue("");
    }
  };

  const handleRemove = async (index: number) => {
    remove(index);
    const updatedCheckpoints = getValues("destinationRoute.trek.checkpoints");
    if (updatedCheckpoints && updatedCheckpoints.length == 0) {
      form.setValue("destinationRoute.trek.checkpoints", undefined);
    }
  };

  return (
    <FormItem>
      <FormLabel>Checkpoints</FormLabel>
      <div className="flex gap-2">
        <Input
          placeholder="Add a checkpoint..."
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

      {checkpoints && checkpoints.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 border p-2">
          {fields.map((field, index) => (
            <Badge
              key={field.id}
              variant={"outline"}
              onClick={() => handleRemove(index)}
              className="group cursor-pointer"
            >
              {getValues(`destinationRoute.trek.checkpoints.${index}`)}
              <X className="group-hover:text-destructive size-4" />
            </Badge>
          ))}
        </div>
      )}

      <FormMessage />
    </FormItem>
  );
};

export default CheckpointsInput;
