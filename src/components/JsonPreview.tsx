import { useFormContext } from "react-hook-form";
import type { Field } from "@/types/Field";

const getDefaultValue = (type: string | undefined) => {
  switch (type) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return "";
  }
};

const buildJson = (fields: Field[]): Record<string, any> => {
  return fields.reduce((acc, field) => {
    if (!field.key) return acc;

    if (field.type === "nested" && field.children) {
      acc[field.key] = buildJson(field.children);
    } else {
      acc[field.key] = getDefaultValue(field.type);
    }

    return acc;
  }, {} as Record<string, any>);
};

export const JsonPreview = () => {
  const { watch } = useFormContext();
  const allValues = watch(); 
  const schema = allValues.fields || [];

  return (
    <pre className="text-sm bg-gray-100 p-4 rounded-md h-[500px] overflow-auto whitespace-pre-wrap">
      {JSON.stringify(buildJson(schema), null, 2)}
    </pre>
  );
};