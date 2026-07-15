"use client";

import { useState } from "react";
import { Button } from "antd";
import FaqSection, { createEmptyFaq } from "@/components/forms/FaqSection";
import FeaturesForm, {
  createEmptyFeature,
} from "@/components/forms/FeaturesForm";
import IndustryHeroSection, {
  createEmptyOtherImage,
} from "@/components/forms/IndustryHeroSection";
import MetaData from "@/components/forms/MetaData";
import OtherImpFeatures, {
  createEmptyOtherImpFeature,
} from "@/components/forms/OtherImpFeatures";
import OutletTypes, {
  createEmptyOutletType,
} from "@/components/forms/OutletTypes";
import PageDetails from "@/components/forms/PageDetails";
import PageHeader from "@/components/ui/PageHeader";

const INITIAL_VALUES = {
  pageName: "",
  location: "",
  route: "",
  title: "",
  description: "",
  canonical: "",
  alternate: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogUrl: "",
  titlePrimary: "",
  titleSecondary: "",
  heroDescription: "",
  centerImage: "",
  imageWidth: "",
  imageHeight: "",
  imageTop: "",
  imageLeft: "",
  imageBottom: "",
  imageRight: "",
  otherImages: [createEmptyOtherImage(), createEmptyOtherImage()],
  features: [createEmptyFeature()],
  otherImpFeatures: [
    createEmptyOtherImpFeature(),
    createEmptyOtherImpFeature(),
  ],
  outletTypes: [createEmptyOutletType(), createEmptyOutletType()],
  faqs: [createEmptyFaq(), createEmptyFaq()],
};

const STEP_COPY = {
  1: "Step 1 of 5 — Page details and meta data",
  2: "Step 2 of 5 — Hero section",
  3: "Step 3 of 5 — Features",
  4: "Step 4 of 5 — Other features and outlet types",
  5: "Step 5 of 5 — FAQs",
};

export default function IndustryPagesCreate() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [step, setStep] = useState(1);

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Create Industry Page"
        description={STEP_COPY[step]}
        buttons={[
          { label: "Back", href: "/industry-pages/list", variant: "secondary" },
        ]}
      />

      <div className="flex flex-col gap-6 rounded-xl dark:border-zinc-800 dark:bg-zinc-950">
        {step === 1 ? (
          <>
            <PageDetails
              values={values}
              onChange={handleChange}
              title="Page details"
            />
            <MetaData
              values={values}
              onChange={handleChange}
              title="Meta data"
            />
            <div className="flex justify-end">
              <Button type="primary" onClick={() => setStep(2)}>
                Next
              </Button>
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <IndustryHeroSection
              values={values}
              onChange={handleChange}
              title="Hero section"
            />
            <div className="flex justify-between">
              <Button onClick={() => setStep(1)}>Previous</Button>
              <Button type="primary" onClick={() => setStep(3)}>
                Next
              </Button>
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <FeaturesForm
              features={values.features}
              onChange={(features) => handleChange("features", features)}
              title="Features"
            />
            <div className="flex justify-between">
              <Button onClick={() => setStep(2)}>Previous</Button>
              <Button type="primary" onClick={() => setStep(4)}>
                Next
              </Button>
            </div>
          </>
        ) : null}

        {step === 4 ? (
          <>
            <OtherImpFeatures
              items={values.otherImpFeatures}
              onChange={(otherImpFeatures) =>
                handleChange("otherImpFeatures", otherImpFeatures)
              }
              title="Other important features"
            />
            <OutletTypes
              items={values.outletTypes}
              onChange={(outletTypes) =>
                handleChange("outletTypes", outletTypes)
              }
              title="Outlet types"
            />
            <div className="flex justify-between">
              <Button onClick={() => setStep(3)}>Previous</Button>
              <Button type="primary" onClick={() => setStep(5)}>
                Next
              </Button>
            </div>
          </>
        ) : null}

        {step === 5 ? (
          <>
            <FaqSection
              items={values.faqs}
              onChange={(faqs) => handleChange("faqs", faqs)}
              title="FAQs"
            />
            <div className="flex justify-between">
              <Button onClick={() => setStep(4)}>Previous</Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
