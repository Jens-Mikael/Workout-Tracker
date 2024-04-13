"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Control, Controller, useForm, FieldValues } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import SelectOption from "../SelectOption";
import { beginWorkoutAction } from "@/server/actions";

const FormSchema = z.object({
  workoutType: z.string({
    required_error: "Please select the type workout your gonna do.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

interface IBeginWorkout {
  defaultVal?: string;
  isPending?: boolean;
}

export default function BeginWorkout({ defaultVal }: IBeginWorkout) {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workoutType: defaultVal,
    },
  });

  async function onSubmit(data: FormValues) {
    await beginWorkoutAction(data.workoutType);
    return;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="workoutType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Type</FormLabel>
              <FormControl>
                <SelectOption field={field} selectType="workout" />
              </FormControl>
              <FormDescription>You cannot change this later </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isLoading}>
          Begin Workout
        </Button>
      </form>
    </Form>
  );
}
