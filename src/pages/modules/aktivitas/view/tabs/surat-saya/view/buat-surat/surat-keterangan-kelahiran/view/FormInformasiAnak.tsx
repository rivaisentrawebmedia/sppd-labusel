import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import RadioInput from "@/components/common/form-input/RadioInput";

export function FormInformasiAnak({
	disabled,
	form,
}: {
	disabled: boolean;
	form: UseFormReturn<SuratPayload>;
}) {
	return (
		<>
			<div className="flex flex-col gap-4  border shadow  bg-white rounded-md p-4	">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi Anak
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<TextInput
						form={form}
						name="anak_ke"
						label="Anak ke"
						placeholder="Masukkan anak ke"
						isDisabled={disabled}
						isRequired
						isRow
						isNumber
					/>
					<TextInput
						form={form}
						name="jam_lahir"
						label="Jam Lahir"
						isDisabled={disabled}
						isRequired
						isRow
						type="time"
					/>
					<RadioInput
						form={form}
						name="jenis_kelamin"
						isDisabled={disabled}
						isRequired
						isRow
						label="Jenis Kelamin"
						data={[
							{ label: "Laki-laki", value: "L" },
							{ label: "Perempuan", value: "P" },
						]}
					/>
				</div>
			</div>
		</>
	);
}
