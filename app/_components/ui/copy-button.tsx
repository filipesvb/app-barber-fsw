"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { CopyIcon, CheckIcon } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // falha silenciosa — não bloqueia a UI
      console.error("Falha ao copiar", e);
    }
  };

  return (
    <Button
      variant={copied ? "secondary" : "outline"}
      size="sm"
      onClick={handleCopy}
    >
      {copied ? (
        <CheckIcon className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
      <span>{copied ? "Copiado" : "Copiar"}</span>
    </Button>
  );
}
