"use client";

import {
  DescriptionInput,
  ImageUrlInput,
  TextInput,
} from "@/components/ui/InputFields";
import { Card } from "antd";

export default function MetaData({
  values = {},
  onChange,
  errors = {},
  disabled = false,
  title = "" || "Meta data",
}) {
  function handleChange(event) {
    const { name, value } = event.target;
    onChange?.(name, value);
  }

  return (
    <>

      <Card>
      <h3 className="mb-2 text-[1.2rem] font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
     <div className="grid gap-y-0 gap-x-4 sm:grid-cols">
      <div className="sm:col-span-2">
        <TextInput
          name="title"
          label="Title"
          value={values.title ?? ""}
          onChange={handleChange}
          placeholder="Enter meta title"
          disabled={disabled}
          errorMessage={errors.title}
        />
      </div>

      <div className="sm:col-span-2">
        <DescriptionInput
          name="description"
          label="Description"
          value={values.description ?? ""}
          onChange={handleChange}
          placeholder="Enter meta description"
          disabled={disabled}
          errorMessage={errors.description}
          rows={3}
        />
      </div>

      <TextInput
        name="canonical"
        label="Canonical"
        value={values.canonical ?? ""}
        onChange={handleChange}
        placeholder="Enter canonical URL"
        type="url"
        disabled={disabled}
        errorMessage={errors.canonical}
      />

      <TextInput
        name="alternate"
        label="Alternate"
        value={values.alternate ?? ""}
        onChange={handleChange}
        placeholder="Enter alternate URL"
        type="url"
        disabled={disabled}
        errorMessage={errors.alternate}
      />

      <div className="sm:col-span-2">
        <TextInput
          name="ogTitle"
          label="OG title"
          value={values.ogTitle ?? ""}
          onChange={handleChange}
          placeholder="Enter OG title"
          disabled={disabled}
          errorMessage={errors.ogTitle}
        />
      </div>

      <div className="sm:col-span-2">
        <DescriptionInput
          name="ogDescription"
          label="OG description"
          value={values.ogDescription ?? ""}
          onChange={handleChange}
          placeholder="Enter OG description"
          disabled={disabled}
          errorMessage={errors.ogDescription}
          rows={3}
        />
      </div>

      <ImageUrlInput
        name="ogImage"
        label="OG image"
        value={values.ogImage ?? ""}
        onChange={handleChange}
        placeholder="Enter OG image URL"
        disabled={disabled}
        errorMessage={errors.ogImage}
      />

      <TextInput
        name="ogUrl"
        label="OG URL"
        value={values.ogUrl ?? ""}
        onChange={handleChange}
        placeholder="Enter OG URL"
        type="url"
        disabled={disabled}
       errorMessage={errors.ogUrl}
        />
      </div>
    </Card>
    </>
  );
}
