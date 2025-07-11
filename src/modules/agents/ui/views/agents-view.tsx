"use client";
import ErrorPage from "@/components/ErrorPage";
import LoadingPage from "@/components/LoadingPage";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/ui/empty-state";
import { useAgentsFilters } from "@/modules/hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";


export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
      ...filters
    }));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable data={data.items} columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
        />
        <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({page})}
        />
        {data.items.length === 0 && (
          <EmptyState
           title="Generate your first consulting Agent" 
        description="
        Welcome to Advisora.io! 
        Generate your first consulting Agent to get started. 
        Each Agent will follow your specific requirments from your training data.
        You can generate business advisor, legal expert, sales manager, finance consultant, and etc.
        After generating your Agent, you would be able to interact with him during the call."
        
        />)}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingPage
   
    />
  )
};
export const AgentsViewError = () => {
  return (
    <ErrorPage />
  )
}