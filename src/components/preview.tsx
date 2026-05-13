"use client";

import React, { useState } from "react";
import { SimpleDialog } from "./SimpleDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Preview = () => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    alert(`Submitted name: ${name}`);
  };

  const dialogContent = (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="col-span-3"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      {/* Basic Dialog */}
      <SimpleDialog
        trigger={<Button variant="outline">Basic Dialog</Button>}
        title="Edit Profile"
        onSubmit={handleSubmit}
      >
        {dialogContent}
      </SimpleDialog>

      {/* Dialog with custom text */}
      <SimpleDialog
        trigger={<Button variant="secondary">Custom Submit</Button>}
        title="Settings"
        onSubmit={handleSubmit}
        submitText="Save Changes"
        cancelText="Discard"
      >
        {dialogContent}
      </SimpleDialog>

      {/* Dialog without cancel button */}
      <SimpleDialog
        trigger={<Button variant="destructive">No Cancel</Button>}
        title="Delete Item"
        onSubmit={handleSubmit}
        showCancel={false}
        submitText="Delete"
      >
        <p>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
      </SimpleDialog>

      <p className="w-full text-center text-sm text-muted-foreground mt-4">
        Desktop-only dialog component. For responsive behavior, use
        ResponsiveDialog instead.
      </p>
    </div>
  );
};

export default Preview;
