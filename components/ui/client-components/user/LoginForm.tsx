"use client";

// https://ui.shadcn.com/docs/components/form

import { useState } from "react";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { LoginFormProps } from "@/components/canvas/user/LoginForm";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";

import { cn } from "@/utils";

const formSchema = z.object({
  email: z
    .string()
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {
      message: "Please enter a valid email address.",
    })
    .email()
    .min(1),
  password: z
    .string()
    // contains at least 8 characters and at most 20 characters.
    // contains at least one upper case alphabet.
    // contains at least one lower case alphabet.
    // contains at least one digit.
    // contains at least one special character which includes !@#$%&*()-+=^.
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/, {
      message: "Please enter a valid password.",
    })
    .min(1),
  keepMeSignedIn: z.boolean(),
});

export function LoginForm({ heading, text }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      keepMeSignedIn: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values:", values);
    console.log("errors:", form.formState.errors);
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="m-auto my-12 w-1/2">
      <h3 className="mb-6 text-center uppercase">{heading}</h3>
      <Card className="px-24">
        <p className="mb-2 text-center text-sm">{text}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        error={form.formState.errors.email?.message}
                        success={
                          form.getValues("email") &&
                          !form.getFieldState("email").invalid
                        }
                        autoComplete="email"
                        {...field}
                      />

                      {/* icons */}
                      {form.formState.errors.email?.message && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                          <XCircleIcon className="h-6 w-6 text-danger" />
                        </div>
                      )}
                      {form.getValues("email") &&
                        !form.getFieldState("email").invalid && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                            <CheckIcon className="h-6 w-6 text-success" />
                          </div>
                        )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="#" className="text-sm">
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        error={form.formState.errors.password?.message}
                        success={
                          form.getValues("password") &&
                          !form.getFieldState("password").invalid
                        }
                        autoComplete="current-password"
                        {...field}
                      />
                      <div
                        className={cn(
                          "absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400",
                          form.formState.errors.password?.message && "right-8",
                          form.getValues("password") &&
                            !form.getFieldState("password").invalid &&
                            "right-8",
                        )}
                      >
                        {showPassword ? (
                          <EyeIcon
                            className="h-4 w-4"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <EyeSlashIcon
                            className="h-4 w-4"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                      {form.formState.errors.password?.message && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                          <XCircleIcon className="h-6 w-6 text-danger" />
                        </div>
                      )}
                      {form.getValues("password") &&
                        !form.getFieldState("password").invalid && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                            <CheckIcon className="h-6 w-6 text-success" />
                          </div>
                        )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* keep me signed in */}
            <FormField
              control={form.control}
              name="keepMeSignedIn"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pl-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Keep me signed in</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="primary"
              size="xl"
              className="w-full"
            >
              Log In
            </Button>

            <div className="flex flex-col items-center space-y-4">
              <p className="space-x-2">
                <span>Having trouble logging in?</span>
                <Link href="#">Click here.</Link>
              </p>

              <p className="space-x-2">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <span>Don't have an online account?</span>
                <Link href="#">Create one!</Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
