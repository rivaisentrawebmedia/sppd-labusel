import type { UseFormReturn } from "react-hook-form";
import type { ProfilPayload } from "../../model";
import SelectInput from "@/components/common/select/SelectBaseForm";

export function FormStatusKependudukan({
	disabled,
	form,
}: {
	form: UseFormReturn<ProfilPayload>;
	disabled: boolean;
}) {
	return (
		<>
			<div className="flex flex-col gap-3 w-full md:w-1/2">
				<SelectInput
					name="is_kepala_keluarga"
					isDisabled={disabled}
					label="Kepala Keluarga"
					placeholder="Pilih Opsi"
					isRequired
					isRow
					form={form}
					data={["Ya", "Tidak"]?.map((item) => {
						return {
							label: item,
							value: item,
						};
					})}
				/>
			</div>
		</>
	);
}
