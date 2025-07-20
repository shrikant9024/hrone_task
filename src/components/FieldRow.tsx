import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Trash } from "lucide-react";

export type FieldRowProps = {
  nestPath: string;
  remove: () => void;
};

const FieldRow = ({ nestPath, remove }: FieldRowProps) => {
  const { control, register, setValue, watch } = useFormContext();

  const typePath = `${nestPath}.type`;
  const type = watch(typePath);

  const { fields, append, remove: removeNested } = useFieldArray({
    control,
    name: `${nestPath}.children` as const,
  });

  return (
    <div className="space-y-2 ml-4">
      <div className="flex items-center gap-2">
        <Input
          className="w-[140px]"
          placeholder="Field name"
          {...register(`${nestPath}.key`)}
        />

        <Controller
          control={control}
          name={typePath}
          defaultValue={undefined}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
                if (val !== "nested") {
                  setValue(`${nestPath}.children`, []);
                }
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Field Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__placeholder__" disabled>
                  -- Select Type --
                </SelectItem>
                <SelectItem value="string">string</SelectItem>
                <SelectItem value="number">number</SelectItem>
                <SelectItem value="nested">nested</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          control={control}
          name={`${nestPath}.required`}
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />

       <Button
  variant="ghost"
  type="button"
  onClick={remove}
  className="flex items-center justify-center mt-2 py-2"
>
  <Trash className="text-red-500" />
</Button>
      </div>

      {type === "nested" && (
        <div className="ml-6 border-l pl-4 border-gray-300 space-y-2">
          {fields.map((f, i) => (
            <FieldRow
              key={f.id}
              nestPath={`${nestPath}.children.${i}`}
              remove={() => removeNested(i)}
            />
          ))}

          <Button
            type="button"
            size="sm"
            onClick={() =>
              append({
                id: uuidv4(),
                key: "",
                type: undefined, 
                required: false,
                children: [],
              })
            }
          >
            + Add nested field
          </Button>
        </div>
      )}
    </div>
  );
};

export default FieldRow;