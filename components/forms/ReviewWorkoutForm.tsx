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
import { Rating } from "react-simple-star-rating";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

import SelectOption from "../SelectOption";
import { beginWorkoutAction } from "@/server/actions";
import { Textarea } from "../ui/textarea";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFinishReviewingWorkout } from "@/lib/hooks/mutate";
import { useGetTrackWorkout } from "@/lib/hooks/get";
import { useToast } from "../ui/use-toast";
import { ImSpinner8 } from "react-icons/im";

const FormSchema = z.object({
  rating: z.number({
    required_error: "Please tell us how your workout went.",
  }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

interface IBeginWorkout {
  defaultVal?: string;
  isPending?: boolean;
}

export default function ReviewWorkout({ defaultVal }: IBeginWorkout) {
  const [isMounted, setIsMounted] = useState(false);
  const { mutateAsync: finishReview, isPending } = useFinishReviewingWorkout();
  const { data: currentWorkout } = useGetTrackWorkout();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function onSubmit(data: FormValues) {
    try {
      await finishReview({
        workoutId: currentWorkout?.id as string,
        data,
      });
      toast({
        title: "Workout reviewed",
        description: "Hope you had a good time :)",

      });
    } catch (error) {}
  }

  return (
    <div className="flex min-h-screen flex-col gap-7 p-5">
      <Link
        href="/"
        className="w-fit rounded-full p-2 transition-all hover:bg-black/5"
      >
        <IoArrowBackOutline size={24} />
      </Link>
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-xl  flex-col gap-7">
          <div className="w-full text-3xl font-semibold">
            How did your workout go? 📝
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Rating</FormLabel>
                    <FormControl>
                      <div>
                        <Rating
                          onClick={field.onChange}
                        
                          transition
                          fillIcon={
                            <IoIosStar
                              size={48}
                              className="rating-star"
                              visibility={isMounted ? "visible" : "hidden"}
                            />
                          }
                          emptyIcon={
                            <IoIosStarOutline
                              size={48}
                              className="rating-star"
                            />
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Review</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write down how your workout went and how you felt"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This info is only visible to you
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                className="w-32 self-end"
                type="submit"
              >
                {isPending ? (
                  <ImSpinner8 className="animate-spin" />
                ) : (
                  "Finish Workout"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
