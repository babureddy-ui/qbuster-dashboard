"use client";

import { DescriptionInput, TextInput } from "@/components/ui/InputFields";
import { Button, Card } from "antd";

export function createEmptyFaq() {
  return {
    question: "",
    answer: "",
  };
}

export default function FaqSection({
  items,
  onChange,
  errors = [],
  disabled = false,
  title = "FAQs",
}) {
  const list = Array.isArray(items)
    ? items
    : [createEmptyFaq(), createEmptyFaq()];

  function updateItems(nextItems) {
    onChange?.(nextItems);
  }

  function handleItemChange(index, field, value) {
    updateItems(
      list.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function handleAdd() {
    updateItems([...list, createEmptyFaq()]);
  }

  function handleRemove(index) {
    if (list.length <= 1) return;
    updateItems(list.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[1.2rem] font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <Button type="primary" onClick={handleAdd} disabled={disabled}>
          Add
        </Button>
      </div>

      <Card>
        <div className="flex flex-col gap-6">
          {list.map((item, index) => (
            <div
              key={index}
              className={
                index < list.length - 1
                  ? "border-b border-zinc-200 pb-6 dark:border-zinc-800"
                  : undefined
              }
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  FAQ {index + 1}
                </p>
                <Button
                  danger
                  size="small"
                  onClick={() => handleRemove(index)}
                  disabled={disabled || list.length <= 1}
                >
                  Remove
                </Button>
              </div>

              <div className="grid gap-x-4 gap-y-0 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <TextInput
                    name={`faqs.${index}.question`}
                    label="Question"
                    value={item.question ?? ""}
                    onChange={(event) =>
                      handleItemChange(index, "question", event.target.value)
                    }
                    placeholder="Enter question"
                    disabled={disabled}
                    errorMessage={errors[index]?.question}
                  />
                </div>

                <div className="sm:col-span-2">
                  <DescriptionInput
                    name={`faqs.${index}.answer`}
                    label="Answer"
                    value={item.answer ?? ""}
                    onChange={(event) =>
                      handleItemChange(index, "answer", event.target.value)
                    }
                    placeholder="Enter answer"
                    disabled={disabled}
                    errorMessage={errors[index]?.answer}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
