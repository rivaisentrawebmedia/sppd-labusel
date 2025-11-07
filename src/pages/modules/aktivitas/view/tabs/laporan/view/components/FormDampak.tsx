import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { LaporanPayload } from "../../model";
import TextInput from "@/components/common/form-input/TextInput";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

export function FormDampak({
	disabled,
	form,
}: {
	form: UseFormReturn<LaporanPayload>;
	disabled: boolean;
}) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "dampak" as never,
	});

	return (
		<>
			<div className="grid grid-cols-[12rem_1fr] flex-row gap-5">
				<p className="text-neutral font-normal  text-sm">
					Dampak <span className={"text-red-500"}>*</span>
				</p>
				<div className="flex flex-col gap-2">
					{fields.map((field, index) => (
						<div key={field.id} className="flex items-center w-full gap-2">
							<TextInput
								form={form}
								name={`dampak.${index}`}
								inputClassName="placeholder:text-[#888]/50"
								placeholder="Cth: Menghambat transportasi warga desa."
								isDisabled={disabled}
								className="flex-1"
							/>
							<button
								type="button"
								disabled={disabled}
								onClick={() => remove(index)}
								className="flex items-center justify-center p-2 rounded-sm text-white bg-red-700"
							>
								<FaTrashAlt />
							</button>
						</div>
					))}
					<button
						type="button"
						disabled={disabled}
						onClick={() => {
							append("");
						}}
						className="flex items-center justify-center w-fit py-1.5 px-4 rounded-full text-sm gap-2 border border-primary text-primary hover:bg-primary hover:text-white duration-300 transition-colors"
					>
						<FaPlus />
						Tambah Dampak
					</button>
				</div>
			</div>
		</>
	);
}
