/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "~/components/ui/form";
import { toast } from "sonner";
import { useBoundStore } from "~/store";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Category } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";

interface errorValue {
    code: string;
    message: string;
}

const TraceForm = (): React.ReactNode => {

    const {
        createTraceAttempt,
        createTraceError,
        action,
        error,
    } = useBoundStore();

    const { data: userData } = useSession();

    const createTrace = api.trace.createTrace.useMutation({
        onMutate: () => {
            createTraceAttempt(true);
        },
        onSuccess: () => {
            form.reset();
            createTraceAttempt(false);
            createTraceError("");
            toast.success('Trace created successfully!');
        },
        onError: (error) => {
            const errorMesage = JSON.parse(error.message) as errorValue[];
            toast.error(errorMesage[0]?.message);
            createTraceAttempt(false);
        },
    });

    const FormSchema = z.object({
        meal: z.string().min(2, {
            message: "Meal must be at least 2 characters.",
        }),
        category: z.nativeEnum(Category),
        kcal: z.string().min(1, {
            message: "Kcal must be at least 0.",
        })
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            meal: "",
            // category: Category.Other,
            kcal: "",
        },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        createTrace.mutate({
            ...data,
            userId: userData?.user?.id ?? "",
        });
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <FormField
                    control={form.control}
                    name="meal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between items-center">
                                Meal
                                <FormMessage />
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Fried rice" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                What did you eat/drink?
                            </FormDescription> */}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between items-center">
                                Category
                                <FormMessage />
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                            // defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.values(Category).map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="kcal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between items-center">
                                Calories
                                <FormMessage />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="1000"
                                    pattern="\d*"
                                    {...field}
                                />
                            </FormControl>
                            {/* <FormDescription>
                                How much calories does your meal have?
                            </FormDescription> */}
                        </FormItem>
                    )}
                />
                <div className="flex gap-4">
                    <Button
                        disabled={action.createTrace}
                        className='w-full'
                        type="submit"
                    >
                        {
                            action.createTrace &&
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        }
                        {action.createTrace ? "Creating..." : "Create"}
                    </Button>
                    <Button
                        className='w-full'
                        type="button"
                        onClick={() => form.reset()}
                    >Clear</Button>
                </div>
            </form>
        </Form>
    );
};

const CreateTraceDrawer = () => {
    const {
        isCreateTraceDrawerOpen,
        setIsCreateTraceDrawerOpen
    } = useBoundStore();

    return (
        <Drawer open={isCreateTraceDrawerOpen} onClose={() => setIsCreateTraceDrawerOpen(false)}>
            <DrawerContent className="px-6 pb-6">
                <TraceForm />
            </DrawerContent>
        </Drawer>
    )
}

export default CreateTraceDrawer;
