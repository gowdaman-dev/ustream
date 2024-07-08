"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { createRoomAction } from "./actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(1).max(50),
  githubRepo: z.string().min(1).max(50),
  language: z.string().min(1).max(50),
});
export function CreateRoomForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      language: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      createRoomAction(values).then(() => {
        router.push("/");
      });
    });
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="jack marcob"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="dec..." {...field} />
                </FormControl>
                <FormDescription>
                  Please descride what you are be coding on.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubRepo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Repo</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="http://github.com/username/repo....."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please put a link to the project you are working on.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Programming language</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="js/ts/python....."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  List the primary programming language you are working with
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
