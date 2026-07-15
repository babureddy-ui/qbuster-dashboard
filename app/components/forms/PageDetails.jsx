"use client";

import { SelectInput, TextInput } from "@/components/ui/InputFields";
import { Card } from "antd";

const LOCATION_OPTIONS = [
    { value: "IND", label: "IND" },
    { value: "UAE", label: "UAE" },
];

export default function PageDetails({
    values = {},
    onChange,
    errors = {},
    disabled = false,
    title = "" || "Page details",
}) {
    function handleChange(event) {
        const { name, value } = event.target;
        onChange?.(name, value);
    }

    return (
        <>
        <Card>
            <h3 className="mb-2 text-[1.2rem] font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
            <div className="grid gap-x-4 gap-y-0 sm:grid-cols-2">
                <TextInput
                    name="pageName"
                    label="Page name"
                    value={values.pageName ?? ""}
                    onChange={handleChange}
                    placeholder="Enter page name"
                    disabled={disabled}
                    errorMessage={errors.pageName}
                />

                <SelectInput
                    name="location"
                    label="Location"
                    value={values.location ?? ""}
                    onChange={handleChange}
                    options={LOCATION_OPTIONS}
                    placeholder="Select location"
                    disabled={disabled}
                    errorMessage={errors.location}
                />

                <div className="sm:col-span-2">
                    <TextInput
                        name="route"
                        label="Route"
                        value={values.route ?? ""}
                        onChange={handleChange}
                        placeholder="/industry/example"
                        disabled={disabled}
                        errorMessage={errors.route}
                    />
                </div>
            </div>
            </Card>
                
        </>
    );
}
