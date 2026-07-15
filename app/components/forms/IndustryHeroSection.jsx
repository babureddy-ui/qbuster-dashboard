"use client";

import {
  DescriptionInput,
  ImageUrlInput,
  TextInput,
} from "@/components/ui/InputFields";
import { Button, Card } from "antd";

export function createEmptyOtherImage() {
  return {
    url: "",
    width: "",
    height: "",
    top: "",
    left: "",
    bottom: "",
    right: "",
  };
}

const POSITION_FIELDS = [
  { key: "width", label: "Width", placeholder: "e.g.10rem" },
  { key: "height", label: "Height", placeholder: "e.g.10rem" },
  { key: "top", label: "Top", placeholder: "e.g. 10rem" },
  { key: "left", label: "Left", placeholder: "e.g. 10rem" },
  { key: "bottom", label: "Bottom", placeholder: "e.g. 10rem" },
  { key: "right", label: "Right", placeholder: "e.g. 10000rem" },
];

function CenterImagePositionFields({ values, errors, disabled, onChange }) {
  return (
    <div className="sm:col-span-2 grid grid-cols-2 gap-x-4 gap-y-0 sm:grid-cols-6">
      {POSITION_FIELDS.map((field) => {
        const name = `image${field.key.charAt(0).toUpperCase()}${field.key.slice(1)}`;
        return (
          <TextInput
            key={name}
            name={name}
            label={field.label}
            value={values[name] ?? ""}
            onChange={onChange}
            placeholder={field.placeholder}
            disabled={disabled}
            errorMessage={errors[name]}
          />
        );
      })}
    </div>
  );
}

function OtherImagePositionFields({
  image,
  index,
  errors = {},
  disabled,
  onFieldChange,
}) {
  return (
    <div className="sm:col-span-2 grid grid-cols-2 gap-x-4 gap-y-0 sm:grid-cols-6">
      {POSITION_FIELDS.map((field) => (
        <TextInput
          key={field.key}
          name={`otherImages.${index}.${field.key}`}
          label={field.label}
          value={image[field.key] ?? ""}
          onChange={(event) => onFieldChange(field.key, event.target.value)}
          placeholder={field.placeholder}
          disabled={disabled}
          errorMessage={errors[field.key]}
        />
      ))}
    </div>
  );
}

export default function IndustryHeroSection({
  values = {},
  onChange,
  errors = {},
  disabled = false,
  title = "Hero section",
}) {
  const otherImages = Array.isArray(values.otherImages)
    ? values.otherImages
    : [createEmptyOtherImage(), createEmptyOtherImage()];

  function handleChange(event) {
    const { name, value } = event.target;
    onChange?.(name, value);
  }

  function updateOtherImages(nextImages) {
    onChange?.("otherImages", nextImages);
  }

  function handleOtherImageFieldChange(index, field, value) {
    const nextImages = otherImages.map((image, i) =>
      i === index ? { ...image, [field]: value } : image
    );
    updateOtherImages(nextImages);
  }

  function handleAddOtherImage() {
    updateOtherImages([...otherImages, createEmptyOtherImage()]);
  }

  function handleRemoveOtherImage(index) {
    if (otherImages.length <= 1) return;
    updateOtherImages(otherImages.filter((_, i) => i !== index));
  }

  return (
    <Card>
      <h3 className="mb-2 text-[1.2rem] font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <div className="grid gap-x-4 gap-y-0 sm:grid-cols-2">
        <TextInput
          name="titlePrimary"
          label="Title primary"
          value={values.titlePrimary ?? ""}
          onChange={handleChange}
          placeholder="Enter primary title"
          disabled={disabled}
          errorMessage={errors.titlePrimary}
        />

        <TextInput
          name="titleSecondary"
          label="Title secondary"
          value={values.titleSecondary ?? ""}
          onChange={handleChange}
          placeholder="Enter secondary title"
          disabled={disabled}
          errorMessage={errors.titleSecondary}
        />

        <div className="sm:col-span-2">
          <DescriptionInput
            name="heroDescription"
            label="Description"
            value={values.heroDescription ?? ""}
            onChange={handleChange}
            placeholder="Enter hero description"
            disabled={disabled}
            errorMessage={errors.heroDescription}
            rows={3}
          />
        </div>

        <div className="sm:col-span-2">
          <ImageUrlInput
            name="centerImage"
            label="Center image"
            value={values.centerImage ?? ""}
            onChange={handleChange}
            placeholder="Enter center image URL"
            disabled={disabled}
            errorMessage={errors.centerImage}
          />
        </div>

        <CenterImagePositionFields
          values={values}
          errors={errors}
          disabled={disabled}
          onChange={handleChange}
        />

        <div className="sm:col-span-2 mt-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h4 className="text-[1.1rem] font-semibold text-zinc-900 dark:text-zinc-50">
              Other Images
            </h4>
            <Button
              type="primary"
              onClick={handleAddOtherImage}
              disabled={disabled}
            >
              Add
            </Button>
          </div>

          {otherImages.map((image, index) => (
            <div
              key={index}
              className="mb-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Image {index + 1}
                </p>
                <Button
                  danger
                  onClick={() => handleRemoveOtherImage(index)}
                  disabled={disabled || otherImages.length <= 1}
                >
                  Remove
                </Button>
              </div>

              <div className="grid gap-x-4 gap-y-0 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <ImageUrlInput
                    name={`otherImages.${index}.url`}
                    label="Image URL"
                    value={image.url ?? ""}
                    onChange={(event) =>
                      handleOtherImageFieldChange(
                        index,
                        "url",
                        event.target.value
                      )
                    }
                    placeholder={`Enter image ${index + 1} URL`}
                    disabled={disabled}
                    errorMessage={errors.otherImages?.[index]?.url}
                  />
                </div>

                <OtherImagePositionFields
                  image={image}
                  index={index}
                  errors={errors.otherImages?.[index] || {}}
                  disabled={disabled}
                  onFieldChange={(field, value) =>
                    handleOtherImageFieldChange(index, field, value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
