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
  search: z.string().trim().min(1, "Digite algo para pesquisar"),
});

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const router = useRouter();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex items-center gap-3"
    >
      <FieldGroup className="">
        <Controller
          name="search"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <Input
                {...field}
                placeholder="Faça sua busca"
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
