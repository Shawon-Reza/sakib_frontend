"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MousePointer2 } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Avatar {
  image: string;
  avatarClassName: string;
  cursorClassName: string;
  className?: string;
  delay?: number;
}

const BookADemo2Avatar = ({
  image,
  avatarClassName,
  cursorClassName,
  className,
  delay,
}: Avatar) => {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        animate={{
          x: [0, 10, 10, 0, 0],
          y: [0, 0, -10, -10, 0],
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          delay: delay ?? 0,
        }}
        className={cn(
          "relative size-10 rounded-full border-2 p-px",
          avatarClassName,
        )}
      >
        <MousePointer2
          className={cn(
            "absolute right-full bottom-full shrink-0 translate-x-2/5 translate-y-2/5 delay-0!",
            cursorClassName,
          )}
          size={18}
        />
        <img
          src={image}
          alt="avatar"
          className="size-full rounded-full object-cover"
        />
      </motion.div>
    </div>
  );
};

interface Description {
  text: string;
  hyperlink: string;
  url: string;
}

interface Header {
  heading: string;
  description: Description;
  avatars: Avatar[];
}

const BookADemo2Header = ({ heading, description, avatars }: Header) => {
  return (
    <div className="relative flex w-full max-w-2xl flex-col items-center gap-4 text-center">
      <h3 className="text-4xl font-semibold sm:text-5xl md:text-6xl">
        {heading}
      </h3>

      <p className="font-medium text-muted-foreground sm:text-lg md:text-xl">
        <span>{description.text.split(description.hyperlink)[0]}</span>
        <span className="text-foreground">
          <a href={description.url} className="underline">
            {description.hyperlink}
          </a>
        </span>
        <span>{description.text.split(description.hyperlink)[1]}</span>
      </p>

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <BookADemo2Avatar
          className="absolute bottom-full left-full"
          {...avatars[0]}
        />
        <BookADemo2Avatar
          className="absolute top-full right-full"
          delay={1}
          {...avatars[1]}
        />
      </div>
    </div>
  );
};

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FormGroup = ({ children, className }: FormGroupProps) => {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
};

const BookADemo2ContactForm = () => {
  return (
    <div className="border-b p-8 lg:border-r lg:border-b-0">
      <form className="grid grid-cols-2 gap-x-3 gap-y-6">
        <FormGroup className="col-span-2 sm:col-span-1">
          <Label>First Name</Label>
          <Input type="text" placeholder="Md. Shawon" />
        </FormGroup>
        <FormGroup className="col-span-2 sm:col-span-1">
          <Label>Last Name</Label>
          <Input type="text" placeholder="Reza" />
        </FormGroup>
        <FormGroup className="col-span-2">
          <Label>Phone Number</Label>
          <Input type="tel" placeholder="+8801XXXXXXXXX" />
        </FormGroup>
        <FormGroup className="col-span-2 sm:col-span-1">
          <Label>Product Category</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hardware-tools">Hardware Tools</SelectItem>
              <SelectItem value="paints-polish">Paints and Polish</SelectItem>
              <SelectItem value="plumbing">Plumbing Items</SelectItem>
              <SelectItem value="electrical">Electrical Supplies</SelectItem>
              <SelectItem value="construction">Construction Materials</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup className="col-span-2 sm:col-span-1">
          <Label>Customer Type</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail Customer</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
              <SelectItem value="builder">Builder</SelectItem>
              <SelectItem value="shop-owner">Shop Owner</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>
        <FormGroup className="col-span-2">
          <Label>Order Details</Label>
          <Textarea
            placeholder="Tell us what items you need, quantity, preferred brand, and delivery location"
            className="min-h-32"
          />
        </FormGroup>
        <Button type="submit" className="col-span-2" size="lg">
          Send Inquiry <ArrowRight />
        </Button>
      </form>
    </div>
  );
};

interface Author {
  name: string;
  designation: string;
  profilePicture: string;
}

interface Quote {
  fullQuote: string;
  highlightedWords: string[];
}

interface Testimonial {
  companyLogo: string;
  quote: Quote;
  author: Author;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const BookADemo2Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="relative flex h-full p-8">
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <Button
          size="sm"
          onClick={() =>
            setActiveTestimonial(
              (activeTestimonial + testimonials.length - 1) %
              testimonials.length,
            )
          }
        >
          <ArrowLeft />
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setActiveTestimonial((activeTestimonial + 1) % testimonials.length)
          }
        >
          <ArrowRight />
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {testimonials.map((testimonial, index) => {
          if (index !== activeTestimonial) return null;

          return (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              key={`testimonial-${index}`}
              className="flex h-full flex-col justify-between gap-12"
            >
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.companyLogo}
                  alt={`${testimonial.author.name} company logo`}
                  className="h-6 w-auto object-contain md:h-8 dark:invert"
                />
              </div>

              <div className="space-y-6">
                <blockquote className="leading-snug text-muted-foreground sm:text-lg lg:max-w-md">
                  &quot;
                  {testimonial.quote.fullQuote
                    .split(" ")
                    .map((word, wordIndex) => {
                      const isHighlighted =
                        testimonial.quote.highlightedWords.some((highlighted) =>
                          word
                            .toLowerCase()
                            .includes(highlighted.toLowerCase()),
                        );
                      return (
                        <span
                          key={wordIndex}
                          className={
                            isHighlighted ? "font-medium text-foreground" : ""
                          }
                        >
                          {word}{" "}
                        </span>
                      );
                    })}
                  &quot;
                </blockquote>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.author.profilePicture}
                    alt={testimonial.author.name}
                    className="size-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium">
                      {testimonial.author.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.author.designation}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

interface Footer {
  heading: string;
  logos: string[];
}


interface BookADemo2Props {
  className?: string;
  header?: Header;
  testimonials?: Testimonial[];
  footer?: Footer;
}

const BookADemo2 = ({
  header = {
    heading: "Request Hardware and Polish Supplies",
    description: {
      text: "Send your product requirement to Modina Enterprise And Leaker Center. For urgent orders, call us directly and get quick support from our team.",
      hyperlink: "call us directly",
      url: "tel:+8801700000000",
    },
    avatars: [
      {
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/christian-buehner-DItYlc26zVI-unsplash 1.jpg",
        avatarClassName: "border-orange-500",
        cursorClassName: "text-orange-500 fill-orange-500",
      },
      {
        image:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/christian-buehner-DItYlc26zVI-unsplash 1.jpg",
        avatarClassName: "border-blue-500",
        cursorClassName: "text-blue-500 fill-blue-500",
      },
    ],
  },
  testimonials = [
    {
      companyLogo:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      quote: {
        fullQuote:
          "Great quality hardware items and genuine polish materials. Their pricing is fair and service is very professional.",
        highlightedWords: [
          "quality",
          "genuine",
          "fair",
          "professional",
        ],
      },
      author: {
        name: "Rafiqul Islam",
        designation: "Contractor",
        profilePicture:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/alexander-hipp-iEEBWgY_6lA-unsplash.jpg",
      },
    },
    {
      companyLogo:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
      quote: {
        fullQuote:
          "I always get the exact paint and polish products I need. Delivery is fast and the team is very responsive.",
        highlightedWords: ["exact", "fast", "responsive"],
      },
      author: {
        name: "Mehedi Hasan",
        designation: "Retail Customer",
        profilePicture:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/christian-buehner-DItYlc26zVI-unsplash 1.jpg",
      },
    },
    {
      companyLogo:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
      quote: {
        fullQuote:
          "They helped us source all construction essentials in one place. Very dependable supplier for ongoing projects.",
        highlightedWords: ["construction", "one place", "dependable"],
      },
      author: {
        name: "Tanvir Ahmed",
        designation: "Site Supervisor",
        profilePicture:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/good-faces-xmSWVeGEnJw-unsplash.jpg",
      },
    },
    {
      companyLogo:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
      quote: {
        fullQuote:
          "Whenever I need tools urgently, this shop delivers on time. Product quality and support are always consistent.",
        highlightedWords: ["urgently", "on time", "consistent"],
      },
      author: {
        name: "Jannat Ara",
        designation: "Workshop Owner",
        profilePicture:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg",
      },
    },
    {
      companyLogo:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
      quote: {
        fullQuote:
          "Best place for polish and finishing supplies. They keep stock updated and guide us to the right products.",
        highlightedWords: ["Best", "stock", "right products"],
      },
      author: {
        name: "Sabbir Hossain",
        designation: "Interior Finishing Contractor",
        profilePicture:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/michael-dam-mEZ3PoFGs_k-unsplash.jpg",
      },
    },
    {
      companyLogo:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
      quote: {
        fullQuote:
          "Reliable service, helpful staff, and genuine materials make this our first choice for hardware and polish needs.",
        highlightedWords: ["Reliable", "helpful", "genuine"],
      },
      author: {
        name: "Nazmul Karim",
        designation: "Builder",
        profilePicture:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/portraits/nima-motaghian-nejad-_omdf_EgRUo-unsplash.jpg",
      },
    },
  ],
  footer = {
    heading: "Trusted by homeowners, contractors, and local businesses",
    logos: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-8.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-9.svg",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-10.svg",
    ],
  },
  className,
}: BookADemo2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-12 lg:gap-24">
          <BookADemo2Header {...header} />
          <div className="grid max-w-6xl grid-cols-1 rounded-lg border lg:grid-cols-2">
            <BookADemo2ContactForm />
            <BookADemo2Testimonials testimonials={testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { BookADemo2 };
