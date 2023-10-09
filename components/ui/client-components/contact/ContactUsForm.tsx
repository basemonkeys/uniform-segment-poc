"use client";

import { useEffect, useState } from "react";

import Script from "next/script";

import { ContactUsFormProps } from "@/components/canvas/contact/ContactUsForm";

import { v4 as uuidv4 } from "uuid";

export function ContactUsForm({
  heading,
  text,
  portalId,
  formId,
}: ContactUsFormProps) {
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  useEffect(() => {
    if (!uuid) {
      return;
    }
    // https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
    function init() {
      (window as any).hbspt.forms.create({
        region: "na1",
        portalId,
        formId,
        target: "#hubspot-form-" + uuid,
        submitButtonClass: "button",
        onFormReady: function (el: HTMLElement) {
          let section = el as HTMLElement | null;
          while (section && !section.classList.contains("hubspot-form")) {
            section = section.parentElement;
          }
          if (!section) {
            return;
          }
        },
      });
    }
    // Wait for window.hbspt to be available
    const interval = setInterval(() => {
      if ("hbspt" in window) {
        clearInterval(interval);
        init();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [formId, portalId, uuid]);

  return (
    <>
      <Script src="//js.hsforms.net/forms/embed/v2.js" />
      <div className="hubspot-form container m-auto my-12">
        <h1 className="mb-2">{heading}</h1>
        <p className="mb-12">{text}</p>
        <div id={`hubspot-form-${uuid}`} />
      </div>
    </>
  );
}
