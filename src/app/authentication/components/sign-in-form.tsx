"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const fromSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

type FormValues = z.infer<typeof fromSchema>;

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      email: "",
      password: "", 
    },
  });

  async function onSubmit(values: FormValues) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_NOT_FOUND") {
            toast.error("Email não encontrado");
            return form.setError("email", {
              message: "Email não encontrado",
            });
          }
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("Email ou senha inválidos");
            form.setError("password", {
              message: "Email ou senha inválidos",
            });
            return form.setError("email", {
              message: "Email ou senha inválidos",
            });
          }
        },
      },
    });
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Faca login para continuar</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="digite seu email"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="digite sua senha"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">entrar</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignInForm;
