import { Button } from "@/components/ui/button"
import { useState } from "react"

import FieldRow from "./FieldRow"
import { v4 as uuidv4 } from "uuid"

const SchemaBuilder = () => {
  const [fields, setFields] = useState<Field[]>([])

  const addField = () => {
    setFields(prev => [
      ...prev,
      {
        id: uuidv4(),
        key: "",
        type: "string"
      }
    ])
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <FieldRow
          key={field.id}
          field={field}
          onUpdate={(updated) => {
            setFields((prev) =>
              prev.map(f => f.id === field.id ? updated : f)
            )
          }}
          onDelete={() => {
            setFields(prev => prev.filter(f => f.id !== field.id))
          }}
        />
      ))}

      <Button onClick={addField}>+ Add Field</Button>
    </div>
  )
}

export default SchemaBuilder