import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type { SuratPayload } from "../model";
import TextInput from "@/components/common/form-input/TextInput";
import { FaPlus, FaTrash } from "react-icons/fa";
import RadioInput from "@/components/common/form-input/RadioInput";

export function FormInformasiAnggotaKK({
	form,
	isLoading,
}: {
	form: UseFormReturn<SuratPayload>;
	isLoading: boolean;
}) {
	const { control } = form;
	const { fields, append, remove } = useFieldArray({
		control,
		name: "anggota_keluarga" as never,
	});

	return (
		<div className="flex flex-col gap-6">
			{fields?.length > 0 ? (
				fields.map((field, index) => (
					<div
						key={field.id}
						className="relative flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
					>
						{/* Nomor urut */}
						<div className="absolute -top-3 left-4 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-white shadow-sm">
							Anggota #{index + 1}
						</div>

						{/* Grid form input */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<TextInput
								form={form}
								name={`anggota_keluarga.${index}.nik`}
								placeholder="Masukkan NIK"
								label="NIK"
								isDisabled={isLoading}
								isNumber
							/>
							<TextInput
								form={form}
								name={`anggota_keluarga.${index}.nama`}
								placeholder="Masukkan Nama Lengkap"
								label="Nama Lengkap"
								isDisabled={isLoading}
							/>

							<RadioInput
								form={form}
								name={`anggota_keluarga.${index}.jenis_kelamin`}
								label="Jenis Kelamin"
								isRow
								isRequired
								isDisabled={isLoading}
								data={[
									{ label: "Laki-laki", value: "L" },
									{ label: "Perempuan", value: "P" },
								]}
							/>

							<TextInput
								form={form}
								name={`anggota_keluarga.${index}.hubungan`}
								placeholder="Masukkan Hubungan Keluarga"
								label="Hubungan"
								isDisabled={isLoading}
							/>

							<TextInput
								form={form}
								name={`anggota_keluarga.${index}.tempat_lahir`}
								placeholder="Masukkan Tempat Lahir"
								label="Tempat Lahir"
								isDisabled={isLoading}
							/>

							<TextInput
								form={form}
								name={`anggota_keluarga.${index}.tanggal_lahir`}
								label="Tanggal Lahir"
								type="date"
								isDisabled={isLoading}
							/>

							<TextInput
								form={form}
								name={`anggota_keluarga.${index}.no_kk`}
								placeholder="Masukkan No KK"
								label="Nomor KK"
								isDisabled={isLoading}
								isNumber
							/>

							<TextInput
								form={form}
								name={`anggota_keluarga.${index}.keterangan`}
								placeholder="Masukkan Keterangan (opsional)"
								label="Keterangan"
								isDisabled={isLoading}
							/>
						</div>

						{/* Tombol Hapus */}
						<div className="flex justify-end">
							<button
								type="button"
								disabled={fields?.length <= 1}
								onClick={() => remove(index)}
								className="flex items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm text-white shadow-sm transition hover:bg-red-600 disabled:bg-red-400"
							>
								<FaTrash size={12} />
								Hapus Anggota
							</button>
						</div>
					</div>
				))
			) : (
				<p className="p-4 text-center  border shadow  bg-white rounded-md italic text-gray-500">
					Belum ada data anggota keluarga
				</p>
			)}

			{/* Tombol Tambah */}
			<div className="flex justify-end">
				<button
					type="button"
					className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white shadow-sm transition hover:bg-primary/80"
					onClick={() => {
						append({
							nik: "",
							nama: "",
							jenis_kelamin: "",
							hubungan: "",
							tempat_lahir: "",
							tanggal_lahir: "",
							no_kk: "",
							keterangan: "",
						});
					}}
				>
					<FaPlus size={12} />
					Tambah Anggota Keluarga
				</button>
			</div>
		</div>
	);
}
