"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "./ui/field";

const formSchema = z.object({
  title: z.string().trim().min(1, "Digite algo para pesquisar"),
});

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const router = useRouter();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?title=${data.title}`);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex items-center gap-3"
    >
      <FieldGroup className="">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                {...field}
                placeholder="Procure por uma barbearia"
                autoComplete="off"
                className="rounded-full border border-gray-300"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        variant={"default"}
        size={"icon"}
        className="rounded-full"
        type="submit"
      >
        <SearchIcon />
      </Button>
    </form>
  );
};

export default Search;
