import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import FieldRow from "@/components/FieldRow";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import { JsonPreview } from "./components/JsonPreview";
import type { FormValues } from "@/types/Field";

export default function App() {
  const methods = useForm<FormValues>({
    defaultValues: { fields: [] },
  });

  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "fields" });

  const onSubmit = (data: FormValues) => {
    console.log("Final JSON Schema:", data.fields);
  };

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-2 gap-4 p-6 max-h-screen overflow-hidden">
        {/* left pane */}
        <div className="flex flex-col max-h-screen overflow-auto pr-4">
          <h2 className="text-xl font-bold mb-4">JSON Schema Builder</h2>

          {fields.map((field, index) => (
            <FieldRow
              key={field.id}
              nestPath={`fields.${index}`}
              remove={() => remove(index)}
            />
          ))}

          <div className="mt-4 flex flex-col w-1/3 gap-2">
            <Button
            className="bg-blue-800 hover:bg-blue-700 cursor-pointer"
              type="button"
              onClick={() =>
                append({
                  id: uuid(),
                  key: "",
                  type: undefined,
                  required: false,
                  children: [],
                })
              }
            >
              Add Field
            </Button>

            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Submit 
            </Button>
          </div>
        </div>


                {/* right pane */}
        <div className="h-[90vh] overflow-auto">
          <h2 className="text-xl font-bold mb-4">JSON Preview</h2>
          <JsonPreview />
        </div>
      </div>
    </FormProvider>
  );
}