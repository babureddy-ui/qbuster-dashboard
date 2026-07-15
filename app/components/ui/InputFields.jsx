"use client";

import { Input, Select } from "antd";

const { Option } = Select;

export const TextInput = (props) => {
  return (
    <div
      className="input-field-div"
      style={{ marginBottom: props.label ? undefined : 0, ...props?.style }}
    >
      {props.label ? (
        <label
          htmlFor={props?.name}
          className="text-ellipsis"
          style={props.labelStyle}
          title={props.label}
        >
          {props.label}
          {props?.required && <span className="req-sign">*</span>}
        </label>
      ) : null}
      <Input
        disabled={props?.disabled}
        size={props?.size}
        name={props.name}
        type={props.type || "text"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => {
          props.onChange(e);
        }}
        className={
          props.label ? "input-field" : "input-field input-field--flush"
        }
        style={{ ...props?.inputStyle }}
      />
      {props?.errorMessage && (
        <p className="error-message">{props?.errorMessage}</p>
      )}
    </div>
  );
};

export const DescriptionInput = (props) => {
  return (
    <div className="input-field-div" style={{ ...props?.style }}>
      <label
        htmlFor={props?.name}
        className="text-ellipsis"
        style={props.labelStyle}
        title={props.label}
      >
        {props.label}
        {props?.required && <span className="req-sign">*</span>}
      </label>
      <Input.TextArea
        name={props?.name}
        rows={props?.rows}
        size={props?.size}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => {
          props.onChange(e);
        }}
        style={{ ...props?.inputStyle }}
        className="input-field"
      />
      {props?.errorMessage && (
        <p className="error-message">{props?.errorMessage}</p>
      )}
    </div>
  );
};

export const SelectInput = (props) => {
  const selectValue =
    props?.value === "" || props?.value === null ? undefined : props?.value;
  const options = Array.isArray(props?.options) ? props.options : [];

  return (
    <div className="input-field-div" style={{ ...props?.style }}>
      <label
        htmlFor={props?.name}
        className="text-ellipsis"
        style={props.labelStyle}
        title={props.label}
      >
        {props?.label}
        {props?.required && <span className="req-sign">*</span>}
      </label>
      <Select
        allowClear
        loading={props?.loading}
        size={props?.size}
        showSearch
        placeholder={props?.placeholder}
        value={selectValue}
        defaultValue={props?.defaultValue}
        disabled={props?.disabled}
        className="input-field"
        filterOption={(inputValue, option) => {
          const label =
            typeof option?.children === "string"
              ? option.children.toLowerCase()
              : "";
          return (
            label.includes(inputValue.toLowerCase()) ||
            option?.key?.toLowerCase().includes(inputValue.toLowerCase())
          );
        }}
        onSearch={props?.onSearch}
        notFoundContent={props?.notFoundContent}
        onChange={(e, option) => {
          props.onChange?.(
            {
              target: {
                name: props.name,
                value: e ?? "",
              },
            },
            option
          );
        }}
        style={{ width: "100%", ...props?.inputStyle }}
      >
        {options.map((ele) => {
          return (
            <Option key={ele?.label + ele?.value} value={ele?.value}>
              {ele?.label}
            </Option>
          );
        })}
      </Select>
      {props?.errorMessage && (
        <p className="error-message">{props?.errorMessage}</p>
      )}
    </div>
  );
};

export const ImageUrlInput = (props) => {
  const hasValidPreview =
    props?.showPreview !== false &&
    typeof props?.value === "string" &&
    props.value.trim().length > 0;

  return (
    <div className="input-field-div" style={{ ...props?.style }}>
      <label
        htmlFor={props?.name}
        className="text-ellipsis"
        style={props.labelStyle}
        title={props.label}
      >
        {props.label}
        {props?.required && <span className="req-sign">*</span>}
      </label>
      <Input
        disabled={props?.disabled}
        size={props?.size}
        name={props.name}
        type="url"
        value={props.value}
        placeholder={props.placeholder || "https://example.com/image.jpg"}
        onChange={(e) => {
          props.onChange(e);
        }}
        className="input-field"
        style={{ ...props?.inputStyle }}
      />
      {props?.errorMessage && (
        <p className="error-message">{props?.errorMessage}</p>
      )}
      {hasValidPreview ? (
        <div className="image-url-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={props.value}
            alt={props.label ? `${props.label} preview` : "Image preview"}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
