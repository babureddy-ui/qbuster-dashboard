"use client";

import { Table } from "antd";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found.",
  rowKey = "id",
  pagination = false,
  ...rest
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={rowKey}
        pagination={pagination}
        locale={{ emptyText: loading ? " " : emptyMessage }}
        scroll={data.length ? { x: true } : undefined}
        sticky
        {...rest}
      />
    </div>
  );
}
