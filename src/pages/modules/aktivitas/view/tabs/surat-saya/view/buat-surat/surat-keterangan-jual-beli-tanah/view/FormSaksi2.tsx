import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import { FaPlus, FaTrash } from "react-icons/fa";

export function FormSaksi2({
	form,
	isLoading,
}: {
	form: UseFormReturn<SuratPayload>;
	isLoading: boolean;
}) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "daftar_saksi_2" as never,
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-0 border border-[#E3E3E3]">
				<div className="flex w-full gap-0 bg-[#F5F5FF]">
					<p className="px-3 w-[4rem] py-1.5 text-center">No</p>
					<p className="w-full px-3 py-1.5">NIK</p>
					<p className="w-full px-3 py-1.5">
						Nama Lengkap<span className="text-red-500">*</span>
					</p>
				</div>
				<div className="flex fle  x-col gap-0 bg-white">
					{fields?.length > 0 ? (
						fields.map((field, index) => {
							return (
								<div className="flex w-full items-center gap-0" key={field.id}>
									<p className="px-3 w-[4rem] py-1.5 text-center">
										{index + 1}
									</p>
									<div className="flex w-full px-3 py-1.5">
										<TextInput
											form={form}
											name={`daftar_saksi_2.${index}.nik`}
											placeholder="Masukkan NIK"
											isDisabled={isLoading}
											className="w-full"
											isNumber
										/>
									</div>
									<div className="flex w-full gap-4 items-center justify-center px-3 py-1.5">
										<TextInput
											form={form}
											name={`daftar_saksi_2.${index}.nama`}
											placeholder="Masukkan Nama"
											isDisabled={isLoading}
											className="w-full"
										/>
										<div className="flex h-fit items-center justify-center">
											<button
												type="button"
												disabled={fields?.length <= 1}
												onClick={() => {
													remove(index);
												}}
												className="bg-[#CD2738] h-[2rem] w-[2rem] rounded items-center justify-center flex  text-white disabled:bg-[#CD2738]/50"
											>
												<FaTrash />
											</button>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<p className="p-4 text-center italic text-[#888]">Belum ada data</p>
					)}
				</div>
			</div>
			<div className="flex items-center justify-end gap-4">
				<button
					type="button"
					className="flex items-center gap-4 rounded-full bg-primary px-3 py-1.5 text-white transition-colors duration-300 hover:bg-primary/80"
					onClick={() => {
						append({
							nik: "",
							nama: "",
						});
					}}
				>
					<FaPlus />
					<p>Saksi 2</p>
				</button>
			</div>
		</div>
	);
}
