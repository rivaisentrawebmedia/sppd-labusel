import RadioInput from "@/components/common/form-input/RadioInput";
import type { UseFormReturn } from "react-hook-form";

export function FormWargaDesa({
	disabled,
	form,
}: {
	form: UseFormReturn<any>;
	disabled: boolean;
}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4  border shadow  bg-white rounded-md p-4">
			<RadioInput
				data={[
					{
						label: "Warga Desa",
						value: true,
					},
					{
						label: "Pendatang",
						value: false,
					},
				]}
				form={form}
				name="is_warga_desa"
				isDisabled={disabled}
				isRequired
				isRow
				label="Warga Desa"
			/>
		</div>
	);
}
