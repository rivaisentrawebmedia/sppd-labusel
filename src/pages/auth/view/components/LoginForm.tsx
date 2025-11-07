import { Form } from "@/components/ui/form";
import TextInput from "@/components/common/form-input/TextInput";
import { Button } from "@/components/ui/button";
import { RememberMeSection } from "./RememberMeSection";
import type { UseFormReturn } from "react-hook-form";
import type { LoginPayload } from "../../model";

interface LoginFormProps {
	form: UseFormReturn<LoginPayload>;
	handleSave: (data: any) => void;
	num1: number | undefined;
	num2: number | undefined;
	isRemember: boolean;
	handleCheckedIsRemember: (checked: boolean) => void;
	loading: boolean;
}

export function LoginForm({
	form,
	handleSave,
	num1,
	num2,
	isRemember,
	handleCheckedIsRemember,
	loading,
}: LoginFormProps) {
	const disabled = loading;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSave)}
				className="w-full flex flex-col gap-4"
			>
				<TextInput
					form={form}
					name="nik"
					label="NIK"
					placeholder="Masukkan NIK anda"
					className="w-full"
					isDisabled={disabled}
					isRequired
				/>
				<TextInput
					form={form}
					name="no_telp"
					label="No. Handphone"
					placeholder="Masukkan No. Handphone Anda"
					className="w-full"
					isDisabled={disabled}
					isRequired
					isNumber
				/>
				<TextInput
					form={form}
					name="captcha"
					label={`Berapa hasil dari ${num1} + ${num2}`}
					placeholder="Masukkan jawaban"
					className="w-full"
					isDisabled={disabled}
					isRequired
					isNumber
				/>

				<RememberMeSection
					isRemember={isRemember}
					onToggle={handleCheckedIsRemember}
					disabled={disabled}
				/>

				<Button
					type="submit"
					disabled={disabled}
					className="w-full bg-[#272CCD] text-white hover:bg-[#272CCD]/80"
				>
					Login
				</Button>
			</form>
		</Form>
	);
}
