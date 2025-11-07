import type { UseFormReturn } from "react-hook-form";
import type { ProfilPayload } from "../../model";
import TextInput from "@/components/common/form-input/TextInput";
import TextAreaInput from "@/components/common/form-input/TextAreaInput";

export function FormAlamat({
	disabled,
	form,
}: {
	form: UseFormReturn<ProfilPayload>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="flex flex-col w-full md:w-1/2 gap-3">
				<TextInput
					form={form}
					name="no_telp"
					isDisabled={disabled}
					label="No. Telepon"
					placeholder="No. Telepon"
					type="text"
					isNumber
					isRequired
					isRow
				/>
				<TextInput
					form={form}
					name="email"
					isDisabled={disabled}
					label="Email"
					placeholder="Email"
					type="text"
					isRequired
					isRow
				/>
				<TextAreaInput
					form={form}
					name="alamat"
					isDisabled={disabled}
					label="Alamat Lengkap"
					placeholder="Alamat Lengkap"
					isRow
					isRequired
				/>
			</div>
		</>
	);
}
