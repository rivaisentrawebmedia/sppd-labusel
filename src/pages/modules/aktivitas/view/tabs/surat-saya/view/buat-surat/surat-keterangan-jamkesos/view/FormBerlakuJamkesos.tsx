import type { UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";

export function FormBerlakuJamkesos({
	disabled,
	form,
}: {
	disabled: boolean;
	form: UseFormReturn<SuratPayload>;
}) {
	return (
		<>
			<div className="flex flex-col gap-4 border shadow  bg-white rounded-md p-4">
				<p className="font-light uppercase underline underline-offset-4 text-primary">
					Informasi JAMKESOS
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<TextInput
						form={form}
						name="berlaku_dari"
						isDisabled={disabled}
						isRow
						isRequired
						label="Berlaku Dari"
						type="date"
					/>
					<TextInput
						form={form}
						name="berlaku_sampai"
						isDisabled={disabled}
						isRow
						label="Berlaku Sampai"
						isRequired
						type="date"
					/>

					<TextInput
						form={form}
						name="no_kartu"
						label="Nomor Kartu"
						placeholder="Masukkan nomor kartu"
						isDisabled={disabled}
						isRequired
						isRow
					/>
				</div>
			</div>
		</>
	);
}
