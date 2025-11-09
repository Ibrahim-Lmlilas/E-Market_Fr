import type { HTMLAttributes, ReactNode } from "react";

export type ErrorMessageProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: ReactNode;
};

const ErrorMessage = ({
  title = "Une erreur est survenue",
  description,
  className,
  children,
  ...props
}: ErrorMessageProps) => {
  return (
    <div
      role="alert"
      className={[
        "rounded-lg border border-red-200 bg-red-50 p-4 text-red-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <h2 className="text-sm font-semibold">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-red-600">{description}</p>
      )}
      {children && <div className="mt-3 text-sm">{children}</div>}
    </div>
  );
};

export default ErrorMessage;

