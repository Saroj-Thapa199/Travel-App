"use client";

import { useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DestinationType } from "@/lib/validation";

const categoriesOptions: {
  label: string;
  value: DestinationType["categories"][number];
}[] = [
  { label: "Mountain", value: "Mountain" },
  { label: "Hill Station", value: "Hill Station" },
  { label: "City", value: "City" },
  { label: "Village", value: "Village" },
  { label: "Pilgrimage", value: "Pilgrimage" },
  { label: "Adventure", value: "Adventure" },
  { label: "Wildlife", value: "Wildlife" },
  { label: "Cultural Heritage", value: "Cultural Heritage" },
  { label: "Natural Attraction", value: "Natural Attraction" },
];

type CategoriesSelectProps = {
  onChange: (categories: DestinationType["categories"]) => void;
  categories: DestinationType["categories"];
};

const CategoriesSelect = ({
  categories = [],
  onChange,
}: CategoriesSelectProps) => {
  const [open, setOpen] = useState(false);
  //   const [categories, setCategories] = useState<DestinationType["categories"]>(
  //     [],
  //   );
  //   console.log(categories);

  const handleOnSelect = (category: {
    label: string;
    value: DestinationType["categories"][number];
  }) => {
    const alreadySelected = categories.includes(category.value);

    if (!alreadySelected && categories.length >= 3) return;

    let newCategories: DestinationType["categories"];

    if (alreadySelected) {
      newCategories = categories.filter(
        (prevValue) => prevValue !== category.value,
      );
    } else {
      newCategories = [...categories, category.value];
    }
    onChange(newCategories);
    if (newCategories.length >= 3) setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {categories.length > 0
            ? `${categories.length} selected`
            : "Select category..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categoriesOptions.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={() => handleOnSelect(category)}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      categories.includes(category.value)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {/* <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoriesSelect;
