"use client";

import { useState } from "react";

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

type NewCustomerForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  reffer: string;
  shopType: string;
};

type CreateCustomerModalProps = {
  open: boolean;
  onClose: () => void;
};

const defaultForm: NewCustomerForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  reffer: "",
  shopType: "",
};

export function CreateCustomerModal({ open, onClose }: CreateCustomerModalProps) {
  const [showValidationWarning, setShowValidationWarning] = useState(false);
  const [form, setForm] = useState<NewCustomerForm>(defaultForm);

  const inputClassName = "bg-white text-slate-900 placeholder:text-slate-400";
  const isFormValid =
    form.name.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    form.shopType.trim().length > 0;

  const closeModal = () => {
    setShowValidationWarning(false);
    setForm(defaultForm);
    onClose();
  };

  const updateField = <K extends keyof NewCustomerForm>(key: K, value: NewCustomerForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (showValidationWarning) {
      setShowValidationWarning(false);
    }
  };

  const handleConfirm = () => {
    if (!isFormValid) {
      setShowValidationWarning(true);
      return;
    }

    console.log("New customer form payload:", form);
    closeModal();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
        onClick={closeModal}
      />

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">Create Customer</h2>
          <p className="mt-1 text-sm text-slate-600">
            Fill in customer details. Confirm will only log data to console.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label className="text-slate-700" htmlFor="customer-name">
              Name *
            </Label>
            <Input
              id="customer-name"
              placeholder="Enter customer name"
              className={inputClassName}
              value={form.name}
              required
              onChange={(event) => updateField("name", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700" htmlFor="customer-email">
              Email
            </Label>
            <Input
              id="customer-email"
              type="email"
              placeholder="name@example.com"
              className={inputClassName}
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700" htmlFor="customer-phone">
              Phone *
            </Label>
            <Input
              id="customer-phone"
              placeholder="+8801XXXXXXXXX"
              className={inputClassName}
              value={form.phone}
              required
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label className="text-slate-700" htmlFor="customer-address">
              Address
            </Label>
            <Input
              id="customer-address"
              placeholder="Enter address"
              className={inputClassName}
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700" htmlFor="customer-reffer">
              Reffer
            </Label>
            <Input
              id="customer-reffer"
              placeholder="Reference person or source"
              className={inputClassName}
              value={form.reffer}
              onChange={(event) => updateField("reffer", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700">Shop Type *</Label>
            <Select value={form.shopType} onValueChange={(value) => updateField("shopType", value)}>
              <SelectTrigger className="w-full bg-white text-slate-900">
                <SelectValue placeholder="Select shop type" />
              </SelectTrigger>
              <SelectContent className="z-80 bg-white text-slate-900">
                <SelectItem className="text-slate-900 focus:text-slate-900" value="Retail">
                  Retail
                </SelectItem>
                <SelectItem className="text-slate-900 focus:text-slate-900" value="Wholesale">
                  Wholesale
                </SelectItem>
                <SelectItem className="text-slate-900 focus:text-slate-900" value="Distributor">
                  Distributor
                </SelectItem>
                <SelectItem className="text-slate-900 focus:text-slate-900" value="Online">
                  Online
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          {showValidationWarning ? (
            <p className="mr-auto text-sm text-rose-600">
              Please fill Name, Phone, and Shop Type.
            </p>
          ) : null}
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="button" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
