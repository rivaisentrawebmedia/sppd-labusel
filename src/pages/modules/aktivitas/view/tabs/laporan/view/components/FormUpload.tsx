import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { LaporanPayload } from "../../model";
import { FaPencilAlt, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import { usePostUploadFile } from "@/layouts/constroller";
import clsx from "clsx";
import { Image } from "@/components/common/image/getImage";

export function FormUpload({
	disabled,
	form,
}: {
	form: UseFormReturn<LaporanPayload>;
	disabled: boolean;
}) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "photo_bukti" as never,
	});

	const { loading: loadingUpload, onSubmitUploadFile } = usePostUploadFile();
	const loading = disabled || loadingUpload;

	const handleUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const file = e.target.files?.[0];
		if (!file) return;
		await onSubmitUploadFile({ form, fields: `photo_bukti.${index}`, file });
	};

	return (
		<div className="flex flex-col col-span-1 md:col-span-2 gap-3">
			<p className="text-neutral font-normal text-sm">
				Foto Bukti <span className={"text-red-500"}>*</span>
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
				{fields.map((field, index) => (
					<div
						key={field.id}
						className="group relative flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
					>
						<label
							className={clsx(
								"cursor-pointer flex flex-col items-center justify-center gap-2 h-40 rounded-lg border border-dashed border-primary/20 bg-gradient-to-b from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-50 transition-all duration-200"
							)}
						>
							{form.watch(`photo_bukti.${index}`) !== "" ? (
								<>
									<Image
										alt={`Foto Bukti ${index + 1}`}
										src={form.watch(`photo_bukti.${index}`) || ""}
										classNameImage="w-full h-40 rounded-md object-cover"
										classNamePlaceHolder="bg-gray-100"
									/>
									<div className="absolute bottom-2 right-2 flex items-center gap-1 text-indigo-600 bg-white/90 px-2 py-1 rounded-md text-xs shadow-sm hover:bg-white">
										<FaPencilAlt size={10} />
										<span>Edit</span>
									</div>
								</>
							) : (
								<div className="flex flex-col items-center justify-center text-gray-400">
									<FaUpload size={30} className="mb-1" />
									<p className="text-sm font-medium">Unggah Foto</p>
								</div>
							)}
							<input
								type="file"
								accept="image/*,.pdf"
								className="hidden"
								onChange={(e) => handleUpload(e, index)}
								disabled={loading}
							/>
						</label>

						<button
							type="button"
							disabled={loading}
							className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white opacity-80 hover:opacity-100 transition"
							onClick={() => remove(index)}
						>
							<FaTrash size={12} />
						</button>
					</div>
				))}

				<button
					type="button"
					disabled={loading}
					onClick={() => append("")}
					className="flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition-all duration-200"
				>
					<FaPlus size={24} />
					<p className="text-sm mt-1 font-medium">Tambah Foto</p>
				</button>
			</div>
		</div>
	);
}
