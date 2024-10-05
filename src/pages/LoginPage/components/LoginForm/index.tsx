import SubmitButton from "../../../../components/elements/Buttons/SubmitButton";
import ControlledInput from "../../../../components/elements/ControlledComponents/ControlledInput";
import useLoginForm from "./useLoginForm";

export default function LoginForm() {
  const { handleLogin, handleSubmit, control, isSubmitting } = useLoginForm();
  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="form">
        <ControlledInput name="email" label="Email" control={control} />
        <ControlledInput name="password" label="Password" control={control} type="password" />
        <SubmitButton text="Login" isSubmitting={isSubmitting} />
      </form>
    </>
  );
}
