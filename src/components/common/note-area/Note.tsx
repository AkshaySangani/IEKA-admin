import React from "react";
import "./Note.css";

type NoteVariant =
  | "info"
  | "success"
  | "warning"
  | "danger";

interface NoteProps {
  message: string;
  variant?: NoteVariant;
  className?: string;
}

const Note = ({
  message,
  variant = "info",
  className = "",
}: NoteProps) => {
  return (
    <div
      className={`notearea ${variant} ${className}`}
    >
      <div className="note">
        {message}
      </div>
    </div>
  );
};

export default Note;