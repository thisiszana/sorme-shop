import { p2e } from "@/utils/fun";

export default function Forms({
  label,
  name,
  form,
  setForm,
  textarea = false,
  className,
}) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: p2e(value) });
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-400">
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={form[name] || ""}
          id={name}
          onChange={changeHandler}
          rows={5}
          className={className}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={form[name] || ""}
          onChange={changeHandler}
          id={name}
          className={className}
        />
      )}
    </div>
  );
}
