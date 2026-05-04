import TextBox from "../ui/TextBox";

export default function PostInput({ label, error, ...props }) {
  return (
    <TextBox 
      label={label} 
      error={error?.message || error}
      {...props}
    />
  );
}