"use client";

import {
  DescriptionInput,
  ImageUrlInput,
  TextInput,
} from "@/components/ui/InputFields";
import { Button, Card } from "antd";

const POSITION_FIELDS = [
  { key: "width", label: "Width", placeholder: "e.g. 10rem" },
  { key: "height", label: "Height", placeholder: "e.g. 10rem" },
  { key: "top", label: "Top", placeholder: "e.g. 10rem" },
  { key: "left", label: "Left", placeholder: "e.g. 10rem" },
  { key: "bottom", label: "Bottom", placeholder: "e.g. 10rem" },
  { key: "right", label: "Right", placeholder: "e.g. 10rem" },
];

export function createEmptyFeatureImage() {
  return {
    url: "",
    alt: "",
    width: "",
    height: "",
    top: "",
    left: "",
    bottom: "",
    right: "",
  };
}

export function createEmptyFeature() {
  return {
    icon: "",
    tag: "",
    title: "",
    description: "",
    points: ["", ""],
    btnText: "",
    centerImage: "",
    imageAlt: "",
    imageWidth: "",
    imageHeight: "",
    imageTop: "",
    imageLeft: "",
    imageBottom: "",
    imageRight: "",
    otherImages: [createEmptyFeatureImage()],
    backgroundCol: "",
    tagCol: "",
  };
}

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

function FeatureItem({
  feature,
  index,
  errors = {},
  disabled,
  canRemove,
  onChange,
  onRemove,
}) {
  const points = Array.isArray(feature.points) ? feature.points : ["", ""];
  const otherImages = Array.isArray(feature.otherImages)
    ? feature.otherImages
    : [createEmptyFeatureImage()];

  function handleChange(event) {
    const { name, value } = event.target;
    onChange({ ...feature, [name]: value });
  }

  function updatePoints(nextPoints) {
    onChange({ ...feature, points: nextPoints });
  }

  function handlePointChange(pointIndex, value) {
    updatePoints(points.map((point, i) => (i === pointIndex ? value : point)));
  }

  function handleAddPoint() {
    updatePoints([...points, ""]);
  }

  function handleRemovePoint(pointIndex) {
    if (points.length <= 1) return;
    updatePoints(points.filter((_, i) => i !== pointIndex));
  }

  function updateOtherImages(nextImages) {
    onChange({ ...feature, otherImages: nextImages });
  }

  function handleOtherImageFieldChange(imageIndex, field, value) {
    updateOtherImages(
      otherImages.map((image, i) =>
        i === imageIndex ? { ...image, [field]: value } : image
      )
    );
  }

  function handleAddOtherImage() {
    updateOtherImages([...otherImages, createEmptyFeatureImage()]);
  }

  function handleRemoveOtherImage(imageIndex) {
    if (otherImages.length <= 1) return;
    updateOtherImages(otherImages.filter((_, i) => i !== imageIndex));
  }

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-[1.2rem] font-semibold text-zinc-900 dark:text-zinc-50">
          Feature {index + 1}
        </h3>
        <Button danger onClick={onRemove} disabled={disabled || !canRemove}>
          Remove
        </Button>
      </div>

      <div className="grid gap-x-4 gap-y-0 sm:grid-cols-2">
        <TextInput
          name="icon"
          label="Icon"
          value={feature.icon ?? ""}
          onChange={handleChange}
          placeholder="Enter icon URL or name"
          disabled={disabled}
          errorMessage={errors.icon}
        />

        <TextInput
          name="tag"
          label="Tag"
          value={feature.tag ?? ""}
          onChange={handleChange}
          placeholder="Enter tag"
          disabled={disabled}
          errorMessage={errors.tag}
        />

        <div className="sm:col-span-2">
          <TextInput
            name="title"
            label="Title"
            value={feature.title ?? ""}
            onChange={handleChange}
            placeholder="Enter feature title"
            disabled={disabled}
            errorMessage={errors.title}
          />
        </div>

        <div className="sm:col-span-2">
          <DescriptionInput
            name="description"
            label="Description"
            value={feature.description ?? ""}
            onChange={handleChange}
            placeholder="Enter feature description"
            disabled={disabled}
            errorMessage={errors.description}
            rows={3}
          />
        </div>

        <div className="sm:col-span-2 grid grid-cols-1 gap-x-4 gap-y-0 sm:grid-cols-3">
          <TextInput
            name="btnText"
            label="Button text"
            value={feature.btnText ?? ""}
            onChange={handleChange}
            placeholder="Enter button text"
            disabled={disabled}
            errorMessage={errors.btnText}
          />

          <TextInput
            name="backgroundCol"
            label="Background color"
            value={feature.backgroundCol ?? ""}
            onChange={handleChange}
            placeholder="#ffffff"
            disabled={disabled}
            errorMessage={errors.backgroundCol}
          />

          <TextInput
            name="tagCol"
            label="Tag color"
            value={feature.tagCol ?? ""}
            onChange={handleChange}
            placeholder="#2a6ab4"
            disabled={disabled}
            errorMessage={errors.tagCol}
          />
        </div>

        <div className="sm:col-span-2 mt-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h4 className="text-[1.1rem] font-semibold text-zinc-900 dark:text-zinc-50">
              Points
            </h4>
            <Button type="primary" onClick={handleAddPoint} disabled={disabled}>
              Add
            </Button>
          </div>

          <div className="mb-4 flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            {points.map((point, pointIndex) => (
              <div key={pointIndex} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <TextInput
                    name={`points.${pointIndex}`}
                    value={point ?? ""}
                    onChange={(event) =>
                      handlePointChange(pointIndex, event.target.value)
                    }
                    placeholder={`Enter point ${pointIndex + 1}`}
                    disabled={disabled}
                    errorMessage={errors.points?.[pointIndex]}
                    style={{ marginBottom: 0 }}
                  />
                </div>
                <Button
                  danger
                  className="h-10 shrink-0"
                  onClick={() => handleRemovePoint(pointIndex)}
                  disabled={disabled || points.length <= 1}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <ImageUrlInput
            name="centerImage"
            label="Center image"
            value={feature.centerImage ?? ""}
            onChange={handleChange}
            placeholder="Enter center image URL"
            disabled={disabled}
            errorMessage={errors.centerImage}
          />
        </div>

        <div className="sm:col-span-2">
          <TextInput
            name="imageAlt"
            label="Center image alt text"
            value={feature.imageAlt ?? ""}
            onChange={handleChange}
            placeholder="Enter alt text"
            disabled={disabled}
            errorMessage={errors.imageAlt}
          />
        </div>

        <CenterImagePositionFields
          values={feature}
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

          {otherImages.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="mb-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Image {imageIndex + 1}
                </p>
                <Button
                  danger
                  onClick={() => handleRemoveOtherImage(imageIndex)}
                  disabled={disabled || otherImages.length <= 1}
                >
                  Remove
                </Button>
              </div>

              <div className="grid gap-x-4 gap-y-0 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <ImageUrlInput
                    name={`otherImages.${imageIndex}.url`}
                    label="Image URL"
                    value={image.url ?? ""}
                    onChange={(event) =>
                      handleOtherImageFieldChange(
                        imageIndex,
                        "url",
                        event.target.value
                      )
                    }
                    placeholder={`Enter image ${imageIndex + 1} URL`}
                    disabled={disabled}
                    errorMessage={errors.otherImages?.[imageIndex]?.url}
                  />
                </div>

                <div className="sm:col-span-2">
                  <TextInput
                    name={`otherImages.${imageIndex}.alt`}
                    label="Alt text"
                    value={image.alt ?? ""}
                    onChange={(event) =>
                      handleOtherImageFieldChange(
                        imageIndex,
                        "alt",
                        event.target.value
                      )
                    }
                    placeholder="Enter alt text"
                    disabled={disabled}
                    errorMessage={errors.otherImages?.[imageIndex]?.alt}
                  />
                </div>

                <OtherImagePositionFields
                  image={image}
                  index={imageIndex}
                  errors={errors.otherImages?.[imageIndex] || {}}
                  disabled={disabled}
                  onFieldChange={(field, value) =>
                    handleOtherImageFieldChange(imageIndex, field, value)
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

export default function FeaturesForm({
  features,
  onChange,
  errors = [],
  disabled = false,
  title = "Features",
}) {
  const featureList = Array.isArray(features)
    ? features
    : [createEmptyFeature()];

  function updateFeatures(nextFeatures) {
    onChange?.(nextFeatures);
  }

  function handleFeatureChange(index, nextFeature) {
    updateFeatures(
      featureList.map((feature, i) => (i === index ? nextFeature : feature))
    );
  }

  function handleAddFeature() {
    updateFeatures([...featureList, createEmptyFeature()]);
  }

  function handleRemoveFeature(index) {
    if (featureList.length <= 1) return;
    updateFeatures(featureList.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-6">
      {featureList.map((feature, index) => (
        <FeatureItem
          key={index}
          feature={feature}
          index={index}
          errors={errors[index] || {}}
          disabled={disabled}
          canRemove={featureList.length > 1}
          onChange={(nextFeature) => handleFeatureChange(index, nextFeature)}
          onRemove={() => handleRemoveFeature(index)}
        />
      ))}

      <div className="flex justify-end">
        <Button type="primary" onClick={handleAddFeature} disabled={disabled}>
          Add feature
        </Button>
      </div>
    </div>
  );
}
