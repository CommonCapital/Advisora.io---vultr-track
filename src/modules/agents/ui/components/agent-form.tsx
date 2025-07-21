"use client"
import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AgentFormProps {
    onSuccess? : () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
}

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: AgentFormProps) => {
   const trpc = useTRPC();
   const queryClient = useQueryClient();
  const router = useRouter();
   const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
        onSuccess: async() => {
               await queryClient.invalidateQueries(
                trpc.agents.getMany.queryOptions({}),

            );
             await queryClient.invalidateQueries(
                trpc.premium.getFreeUsage.queryOptions(),

            );
           
            onSuccess?.();
        },
        onError: (error) => {
            toast.error(error.message);

            if (error.data?.code === "FORBIDDEN") {
                router.push('/upgrade')
            }
        },
    }),
   );

   const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
        onSuccess: async() => {
               await queryClient.invalidateQueries(
                trpc.agents.getMany.queryOptions({}),

            );
            if (initialValues?.id) {
                   await queryClient.invalidateQueries(
                    trpc.agents.getOne.queryOptions({ id: initialValues.id}),
                );
            }
            onSuccess?.();
        },
        onError: (error) => {
            toast.error(error.message)
        },
    }),
   );

   const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
        name: initialValues?.name ?? "",
        instructions: initialValues?.instructions ?? "",
    },
   });

   const isEdit = !!initialValues?.id;
   const isPending = createAgent.isPending || updateAgent.isPending;

   const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
        updateAgent.mutate({...values, id: initialValues?.id})
    } else {
        createAgent.mutate(values);
    }
   };

   return (
    <Form {...form}>
      <form className="space-y-4"  onSubmit={form.handleSubmit(onSubmit)}>
        
         <GeneratedAvatar seed={form.watch("name")} variant="botttsNeutral" className="border size-16" />
         <FormField 
          name="name" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>
                    Name
                </FormLabel>
                <FormControl>
                    <Input {...field} placeholder="e.g. Nursan (Finance consultant)"/>
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
         />
         <FormField 
          name="instructions" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>
                    Training data
                </FormLabel>
                <FormControl>
                    <Textarea className="h-48 overflow-y-scroll resize-none" {...field} placeholder="e.g. You are an intelligent finance consultant, specifically in the field of cost optimization, market prediction, and accounting. Quickly analyse a news about current market trend and provide insights to consult me on the best course of action. Data for training: ( If you are consulting firm, then you are allowed to share specific methodology, strategies, knowledge base of industry, interaction style, framework, and data to train your agent to align with your companies policy, style, and expertise)."/>
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
          />
          <div className="flex justify-between gap-x-2">
            {onCancel && (
                <Button variant={'ghost'} disabled={isPending} type="button" onClick={() => onCancel()}>
                    Cancel
                </Button>
            )}
            <Button disabled={isPending} type="submit">
              {isEdit ? "Update" : "Generate"}
            </Button>
          </div>
      </form>
      
    </Form>
   );
};