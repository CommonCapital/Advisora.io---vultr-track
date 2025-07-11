
"use client";
import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/ui/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = () => {
const trpc = useTRPC();
const router = useRouter();
const [filters, setFilters] = useMeetingsFilters();
const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
}));
    return (
<div className="flex-1 pb-4 px-4 md:px-4 flex flex-col gap-y-4">
    <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/meetings/${row.id}`)}/>
    <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({page})}/>
    {data.items.length === 0 && (
              <EmptyState
               title="Generate your first consulting Agent" 
            description="
            Welcome to Advisora.io! 
            Call your first meeting to get started. 
            You might add specific trained Agent. Each Agent will follow your specific requirments and data from your training data.
            You can generate business advisor, legal expert, sales manager, finance consultant, and etc.
            After generating your Agent, you would be able to interact with him during the call."
            
            />)}
</div>
    )
}

export default MeetingsView