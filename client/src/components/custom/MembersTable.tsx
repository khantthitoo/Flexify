"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelection,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Badge, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "path";
import { useMembersTable } from "@/contexts/MembersTableContext";
import { useRouter, useSearchParams } from "next/navigation";

// const data: Member[] = [
//     {
//         name: "Khant Thit Oo",
//         ph_number: "09884178787",
//         profile_image: null,
//         end_date: null,
//         status: "active",
//         days_left: 3,
//         joined_at: "hello",
//     },
//     {
//         name: "Khant Thit Oo",
//         ph_number: "09884178787",
//         profile_image: null,
//         end_date: null,
//         status: "active",
//         days_left: 3,
//         joined_at: "hello",
//     },
//     {
//         name: "Khant Thit Oo",
//         ph_number: "09884178787",
//         profile_image: null,
//         end_date: null,
//         status: "active",
//         days_left: 3,
//         joined_at: "hello",
//     },
// ];

export type Member = {
    id: string;
    name: string;
    ph_number: string;
    profile_image: string | null;
    end_date: string | null;
    status: string;
    days_left: number;
    joined_at: string;
};

export const columns: ColumnDef<Member>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name: string = row.getValue("name");
            const profile_image = row.original.profile_image;
            const id = row.original.id;

            return (
                <div className="flex items-center gap-3">
                    {profile_image ? (
                        <img
                            src={profile_image}
                            alt="Profile"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-semibold text-xs uppercase">
                            {name[0]}
                        </div>
                    )}
                    <a href={`/members/${id}`}>{name}</a>
                </div>
            );
        },
    },
    {
        accessorKey: "ph_number",
        header: "Phone Number",
        cell: ({ row }) => {
            const ph_number = row.getValue("ph_number");
            return ph_number;
        },
    },
    {
        accessorKey: "joined_at",
        header: "Joined Date",
        cell: ({ row }) => {
            const date = row.getValue("joined_at");
            return date;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return status;
        },
    },
    {
        accessorKey: "end_date",
        header: "End Date",
        cell: ({ row }) => {
            const date = row.getValue("end_date");
            return date;
        },
    },
    {
        accessorKey: "days_left",
        header: "Days Left",
        cell: ({ row }) => {
            const days = row.getValue("days_left") as number;
            return (
                <span className={days < 5 ? "text-red-500 font-semibold" : ""}>
                    {days}
                </span>
            );
        },
    },
    {
        accessorKey: "subscription",
        header: "Subscription",
        cell: ({ row }) => {
            const { setCurrentBuyingMember } = useMembersTable();
            return (
                <Button
                    className="cursor-pointer"
                    onClick={() => setCurrentBuyingMember(row.original.id)}
                >
                    Buy
                </Button>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const member = row.original;
            const { setAddMemberModalAction } = useMembersTable();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(member.ph_number)
                            }
                        >
                            Copy Phone
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setAddMemberModalAction(row.original.id)}>Edit Member</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function MembersTable({ data }: { data: Member[] }) {
    const searchParams = useSearchParams();
    const {
        setAddMemberModalAction,
        setPage,
        canNext,
        canPrevious,
        fetchMembers,
    } = useMembersTable();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [query, setQuery] = React.useState<string>(searchParams.get('search') ?? "");
    const router = useRouter();

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("search", query);
        router.push(`?${params.toString()}`);
    }, [query]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by name..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="max-w-sm"
                />
                <Button
                    className="ml-auto cursor-pointer"
                    onClick={() => setAddMemberModalAction("add")}
                >
                    Add Member
                </Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((curr) => curr - 1)}
                        disabled={!canPrevious}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((curr) => curr + 1)}
                        disabled={!canNext}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
