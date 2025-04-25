interface InputProps {
  placeholder: string;
  ref: React.Ref<HTMLInputElement>;
}

export function Input({ placeholder, ref }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={ref}
        placeholder={placeholder}
        type="text"
        className="px-2 py-2  border rounded my-2 w-full focus-visible:outline-blue-500"
      />
    </div>
  );
}
