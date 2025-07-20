export type FieldType = "string" | "number" | "boolean" | "nested" | undefined;
export interface Field {
  id: string;
  key: string;
  type: FieldType;
  required: boolean;
  children?: Field[];
}

export interface FieldRowProps {
  name: string;
  remove?: () => void;
}

export interface FormValues {
  fields: Field[];
}