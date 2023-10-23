"use client";

// https://ui.shadcn.com/docs/components/form

import { useEffect, useState } from "react";
import { UniformRichText } from "@uniformdev/canvas-next-rsc";
// import { useUser } from "@auth0/nextjs-auth0/client";

import { setCookie, getCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/utils";

import { EligibilityFormProps } from "@/components/uniform/user/EligibilityForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
  // console.log(activeStep);
  const {
    register,
    control,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm();

  // TODO: set this cookie when user logs in
  setCookie("userRole", "member");
  const userRole = getCookie("userRole");

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

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data:", data);
    console.log("errors:", errors);
  }

  const handleButtonClick = () => {
    activeStep < 3 && setActiveStep(activeStep + 1);
  };

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
    <>
      <Card className="m-auto my-12 max-w-lg">
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
                  control={control}
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
                            error={errors.firstName?.message}
                            success={
                              getValues("firstName") &&
                              !getFieldState("firstName").invalid
                            }
                            autoComplete="firstName"
                            {...field}
                            {...register("Developer", { required: true })}
                          />

                          {/* icons */}
                          {errors.firstName?.message && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                              <XCircleIcon className="h-6 w-6 text-danger" />
                            </div>
                          )}
                          {getValues("firstName") &&
                            !getFieldState("firstName").invalid && (
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
                  control={control}
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
                            error={errors.lastName?.message}
                            success={
                              getValues("lastName") &&
                              !getFieldState("lastName").invalid
                            }
                            autoComplete="lastName"
                            {...field}
                          />
                          {errors.lastName?.message && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                              <XCircleIcon className="h-6 w-6 text-danger" />
                            </div>
                          )}
                          {getValues("lastName") &&
                            !getFieldState("lastName").invalid && (
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
                    control={control}
                    name="birthMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="MM"
                              error={errors.birthMonth?.message}
                              success={
                                getValues("birthMonth") &&
                                !getFieldState("birthMonth").invalid
                              }
                              autoComplete="birthMonth"
                              {...field}
                            />

                            {/* icons */}
                            {errors.birthMonth?.message && (
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                <XCircleIcon className="h-6 w-6 text-danger" />
                              </div>
                            )}
                            {getValues("birthMonth") &&
                              !getFieldState("birthMonth").invalid && (
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
                    control={control}
                    name="birthDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="DD"
                              error={errors.birthDay?.message}
                              success={
                                getValues("birthDay") &&
                                !getFieldState("birthDay").invalid
                              }
                              autoComplete="birthDay"
                              {...field}
                            />

                            {/* icons */}
                            {errors.birthDay?.message && (
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                <XCircleIcon className="h-6 w-6 text-danger" />
                              </div>
                            )}
                            {getValues("birthDay") &&
                              !getFieldState("birthDay").invalid && (
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
                    control={control}
                    name="birthYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="YYYY"
                              error={errors.birthYear?.message}
                              success={
                                getValues("birthYear") &&
                                !getFieldState("birthYear").invalid
                              }
                              autoComplete="birthYear"
                              {...field}
                            />

                            {/* icons */}
                            {errors.birthYear?.message && (
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                <XCircleIcon className="h-6 w-6 text-danger" />
                              </div>
                            )}
                            {getValues("birthYear") &&
                              !getFieldState("birthYear").invalid && (
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
                  control={control}
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
                            error={errors.zip?.message}
                            success={
                              getValues("zip") && !getFieldState("zip").invalid
                            }
                            autoComplete="zip"
                            {...field}
                          />

                          {/* icons */}
                          {errors.zip?.message && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                              <XCircleIcon className="h-6 w-6 text-danger" />
                            </div>
                          )}
                          {getValues("zip") &&
                            !getFieldState("zip").invalid && (
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
                  control={control}
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
                            error={errors.email?.message}
                            success={
                              getValues("email") &&
                              !getFieldState("email").invalid
                            }
                            autoComplete="email"
                            {...field}
                          />

                          {/* icons */}
                          {errors.email?.message && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                              <XCircleIcon className="h-6 w-6 text-danger" />
                            </div>
                          )}
                          {getValues("email") &&
                            !getFieldState("email").invalid && (
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
                  control={control}
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
                onClick={handleButtonClick}
              >
                {activeStep === 3 ? "Check Eligibility" : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      <DevTool control={control} />

      {userRole === "member" && (
        <Dialog defaultOpen>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="mb-12">
              <DialogTitle>Do you already have an account?</DialogTitle>
              <DialogDescription>
                You might have logged in on this device before. Do you want to
                log in instead of checking eligibility?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondaryWhite" size="lg" asChild>
                <a href="/api/auth/login">Log In</a>
              </Button>
              <DialogClose asChild>
                <Button variant="primary" size="lg">
                  Continue
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
