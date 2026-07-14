"use client";

import { useIndustryPages } from "@/api/actions/industryPages";
import DataTable from "@/components/ui/DataTable";
import { usePageError } from "@/components/ui/PageError";

const columns = [
  {
    title: "Page name",
    dataIndex: "page_name",
    key: "page_name",
    render: (value) => value || "—",
  },
  {
    title: "Route",
    dataIndex: "route",
    key: "route",
    render: (value) => value || "—",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    render: (value) => value || "—",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <button
        type="button"
        onClick={() => {
          console.log("Edit industry page", record);
        }}
        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-qb-blue transition hover:border-qb-blue hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
      >
        Edit
      </button>
    ),
  },
];

export default function IndustryPagesPage() {
  const { data: pages = [], error, isLoading } = useIndustryPages();
  usePageError(error, "Failed to load industry pages");

  return (
    <DataTable
      columns={columns}
      data={pages}
      loading={isLoading}
      emptyMessage="No industry pages found."
      rowKey={(page) => `${page.page_id}-${page.location}-${page.route}`}
    />
  );
}
