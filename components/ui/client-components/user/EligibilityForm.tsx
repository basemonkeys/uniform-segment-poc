"use client";

// https://ui.shadcn.com/docs/components/form

import { useState } from "react";
import Link from "next/link";
import { UniformRichText } from "@uniformdev/canvas-next-rsc";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/utils";

import { EligibilityFormProps } from "@/components/uniform/user/EligibilityForm";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  StepperTabs,
  StepperTabsList,
  StepperTabsTrigger,
  StepperTabsContent,
} from "@/components/ui/stepper-tabs";
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
  XCircleIcon,
  CheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/20/solid";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
  birthMonth: z.string().min(2, { message: "Please enter a 1-2 digit month" }),
  birthDay: z.string().min(2, { message: "Please enter a 1-2 digit day" }),
  birthYear: z.string().min(4, {
    message: "Please enter a 4 digit year. Must be over 14 years of age",
  }),
  zip: z.string().min(5, { message: "Please enter a valid zip code" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  signUp: z.boolean(),
});

const FormRequired = () => {
  return <span className="text-danger">*</span>;
};

export function EligibilityForm({ title, component }: EligibilityFormProps) {
  const [activeStep, setActiveStep] = useState(0);

  console.log(activeStep);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthMonth: "",
      birthDay: "",
      birthYear: "",
      zip: "",
      email: "",
      signUp: false,
      // keepMeSignedIn: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values:", values);
    console.log("errors:", form.formState.errors);
  }

  const tabs = [
    {
      number: "1",
      title: "Name",
    },
    {
      number: "2",
      title: "Birthday",
    },
    {
      number: "3",
      title: "Location",
    },
    {
      number: "4",
      title: "Contact",
    },
  ];

  // TODO: consider removing stepperTabs since the tabs are not clickable

  return (
    <Card className="m-auto my-12 max-w-xl">
      <CardHeader className="mb-12">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <UniformRichText
            parameterId="text"
            component={component}
          ></UniformRichText>
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Stepper Tabs */}
          <StepperTabs defaultValue="Name" className="m-auto w-full">
            <div className="mb-6 space-y-2">
              <StepperTabsList>
                {tabs.map((tab: any, index: any) => {
                  return (
                    <StepperTabsTrigger
                      // disabled
                      key={index}
                      value={tab.title}
                      aria-selected={activeStep === index}
                      data-state={activeStep === index && "active"}
                      className="data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-sm"
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full border border-default ",
                          activeStep === index &&
                            "group-data-[state=active]:border-0 group-data-[state=active]:bg-primary group-data-[state=active]:text-white",
                        )}
                      >
                        {tab.number}
                      </span>
                      <span>{tab.title}</span>
                    </StepperTabsTrigger>
                  );
                })}
              </StepperTabsList>

              <div className="flex items-center justify-end">
                <span className="mr-2 pt-1 text-sm text-danger">*</span>{" "}
                <span>= required</span>
              </div>
            </div>

            {/* Name */}
            <StepperTabsContent
              forceMount
              value="Name"
              className="space-y-6"
              data-state={activeStep === 0 ? "active" : "inactive"}
              hidden={activeStep != 0}
            >
              {/* first name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <FormRequired />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          //   placeholder="First Name"
                          error={form.formState.errors.firstName?.message}
                          success={
                            form.getValues("firstName") &&
                            !form.getFieldState("firstName").invalid
                          }
                          autoComplete="firstName"
                          {...field}
                        />

                        {/* icons */}
                        {form.formState.errors.firstName?.message && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                            <XCircleIcon className="h-6 w-6 text-danger" />
                          </div>
                        )}
                        {form.getValues("firstName") &&
                          !form.getFieldState("firstName").invalid && (
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

              {/* last name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>
                        Last Name <FormRequired />
                      </FormLabel>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          //   placeholder="Last Name"
                          error={form.formState.errors.lastName?.message}
                          success={
                            form.getValues("lastName") &&
                            !form.getFieldState("lastName").invalid
                          }
                          autoComplete="lastName"
                          {...field}
                        />
                        {form.formState.errors.lastName?.message && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                            <XCircleIcon className="h-6 w-6 text-danger" />
                          </div>
                        )}
                        {form.getValues("lastName") &&
                          !form.getFieldState("lastName").invalid && (
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
            </StepperTabsContent>

            {/* Birthday */}
            <StepperTabsContent
              forceMount
              value="Birthday"
              className="space-y-2"
              data-state={activeStep === 1 ? "active" : "inactive"}
              hidden={activeStep != 1}
            >
              <FormLabel>
                Date of Birth <FormRequired />
              </FormLabel>
              <div className="flex gap-2">
                {/* birth month */}
                <FormField
                  control={form.control}
                  name="birthMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="MM"
                            error={form.formState.errors.birthMonth?.message}
                            success={
                              form.getValues("birthMonth") &&
                              !form.getFieldState("birthMonth").invalid
                            }
                            autoComplete="birthMonth"
                            {...field}
                          />

                          {/* icons */}
                          {form.formState.errors.birthMonth?.message && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                              <XCircleIcon className="h-6 w-6 text-danger" />
                            </div>
                          )}
                          {form.getValues("birthMonth") &&
                            !form.getFieldState("birthMonth").invalid && (
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

                {/* birth day */}
                <FormField
                  control={form.control}
                  name="birthDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="DD"
                            error={form.formState.errors.birthDay?.message}
                            success={
                              form.getValues("birthDay") &&
                              !form.getFieldState("birthDay").invalid
                            }
                            autoComplete="birthDay"
                            {...field}
                          />

                          {/* icons */}
                          {form.formState.errors.birthDay?.message && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                              <XCircleIcon className="h-6 w-6 text-danger" />
                            </div>
                          )}
                          {form.getValues("birthDay") &&
                            !form.getFieldState("birthDay").invalid && (
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

                {/* birth year */}
                <FormField
                  control={form.control}
                  name="birthYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="YYYY"
                            error={form.formState.errors.birthYear?.message}
                            success={
                              form.getValues("birthYear") &&
                              !form.getFieldState("birthYear").invalid
                            }
                            autoComplete="birthYear"
                            {...field}
                          />

                          {/* icons */}
                          {form.formState.errors.birthYear?.message && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                              <XCircleIcon className="h-6 w-6 text-danger" />
                            </div>
                          )}
                          {form.getValues("birthYear") &&
                            !form.getFieldState("birthYear").invalid && (
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
              </div>
            </StepperTabsContent>

            {/* Location */}
            <StepperTabsContent
              forceMount
              value="Location"
              data-state={activeStep === 2 ? "active" : "inactive"}
              hidden={activeStep != 2}
            >
              {/* zip code */}
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Zip <FormRequired />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          error={form.formState.errors.zip?.message}
                          success={
                            form.getValues("zip") &&
                            !form.getFieldState("zip").invalid
                          }
                          autoComplete="zip"
                          {...field}
                        />

                        {/* icons */}
                        {form.formState.errors.zip?.message && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                            <XCircleIcon className="h-6 w-6 text-danger" />
                          </div>
                        )}
                        {form.getValues("zip") &&
                          !form.getFieldState("zip").invalid && (
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
            </StepperTabsContent>

            {/* Contact */}
            <StepperTabsContent
              forceMount
              value="Contact"
              className="space-y-6"
              data-state={activeStep === 3 ? "active" : "inactive"}
              hidden={activeStep != 3}
            >
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <FormRequired />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="youremail@address.com"
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

              {/* keep me signed in */}
              <FormField
                control={form.control}
                name="signUp"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pl-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Sign up for our newsletter</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </StepperTabsContent>
          </StepperTabs>

          <div className="flex gap-4">
            {activeStep > 0 && (
              <Button
                variant="secondaryWhite"
                size="xl"
                className="w-full"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                <div className="flex items-center space-x-2">
                  <ArrowLeftIcon className="h-6 w-6" />
                  <span>Back</span>
                </div>
              </Button>
            )}
            <Button
              type={activeStep === 3 ? "submit" : "button"}
              variant="primary"
              size="xl"
              className="w-full"
              onClick={
                activeStep === 3
                  ? (e) => e.preventDefault
                  : () => setActiveStep(activeStep + 1)
              }
            >
              {activeStep === 3 ? "Check Eligibility" : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
