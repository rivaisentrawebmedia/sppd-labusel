import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { usePostProfil } from "../controller";
import { LoadingMona } from "@/components/ui/loading";
import {
	FormAlamat,
	FormInformasi,
	FormStatusSosial,
	FormUploadPhoto,
	ProfilAlamat,
	ProfilInformasi,
	ProfilStatusKependudukan,
	ProfilStatusSosial,
} from "./components";
import type { JSX } from "react";
import { IconPushPin } from "@/assets/icons/PushPin";
import { IconHouse } from "@/assets/icons/House";
import { IconGraduationCap } from "@/assets/icons/GraduationCap";
import { IconSpiralNotepad } from "@/assets/icons/SpiralNotepad";
import { FaEdit, FaSave, FaTrashRestore } from "react-icons/fa";
import { Form } from "@/components/ui/form";
import { DialogCustom } from "@/components/common/dialog";
import { toast } from "react-toastify";

export default function ProfilPage() {
	const {
		loading,
		data,
		isEdit,
		form,
		handleSave,
		isShow,
		setIsEdit,
		setIsShow,
	} = usePostProfil();

	const disabled = loading;

	const onSubmit = async () => {
		const isValid = await form.trigger();
		if (isValid) setIsShow(true);
	};

	return (
		<>
			<div className="flex flex-col gap-4">
				<Breadcrumbs
					items={[
						{
							label: "Beranda",
							to: "/modules/dashboard",
						},
						{
							label: "Profil Saya",
							to: "",
						},
					]}
				/>

				<p className="text-2xl font-semibold">Profil Saya</p>

				<div
					className="flex flex-col gap-4 p-4 rounded-md bg-white"
					style={{
						boxShadow: "0px 4px 4px 0px #0000000A",
					}}
				>
					{loading ? (
						<LoadingMona />
					) : isEdit ? (
						<Form {...form}>
							<form
								className="flex flex-col gap-4"
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4">
									<TitleLabel icon={<IconPushPin />} label="Data Pribadi" />
									<div className="flex items-center gap-3 justify-between">
										<button
											type="submit"
											onClick={async () => {
												const isValid = await form.trigger();
												if (!isValid) {
													const invalidFields = Object.entries(
														form.formState.errors
													).map(([field, error]) => ({
														field,
														error: error?.message,
													}));
													return toast.error(
														invalidFields?.[0]?.error?.toString()
													);
												}
											}}
											className="flex items-center justify-center w-full md:w-fit gap-2 cursor-pointer py-1.5 px-4 rounded-md bg-primary hover:bg-primary/80 text-nowrap duration-300 transition-colors text-white"
										>
											<FaSave /> Simpan Perubahan
										</button>
										<button
											type="button"
											onClick={() => {
												setIsEdit(false);
											}}
											className="flex items-center gap-2 justify-center w-full md:w-fit cursor-pointer py-1.5 px-4 rounded-md bg-[#d2000c] hover:bg-[#d2000c]/80 duration-300 transition-colors text-white"
										>
											<FaTrashRestore /> Batal
										</button>
									</div>
								</div>
								<div className="flex flex-col gap-2 md:gap-4 w-full md:flex-row md:items-start">
									<FormUploadPhoto form={form} disabled={disabled} />
									<FormInformasi form={form} disabled={disabled} />
								</div>
								<TitleLabel icon={<IconHouse />} label="Alamat dan Kontak" />
								<FormAlamat form={form} disabled={disabled} />

								<TitleLabel
									icon={<IconGraduationCap />}
									label="Status Sosial dan Pendidikan"
								/>
								<FormStatusSosial form={form} disabled={disabled} />

								{/* <TitleLabel
									icon={<IconSpiralNotepad />}
									label="Status Kependudukan"
								/> */}
								{/* <FormStatusKependudukan form={form} disabled={disabled} /> */}
							</form>
						</Form>
					) : (
						<>
							<div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4">
								<TitleLabel icon={<IconPushPin />} label="Data Pribadi" />
								<button
									type="button"
									onClick={() => {
										setIsEdit(true);
									}}
									className="flex items-center gap-2 justify-center cursor-pointer py-1.5 px-4 rounded-md bg-[#fba617] hover:bg-[#fba617]/80 duration-300 transition-colors text-white"
								>
									<FaEdit /> Edit
								</button>
							</div>
							<ProfilInformasi data={data} />
							<TitleLabel icon={<IconHouse />} label="Alamat dan Kontak" />
							<ProfilAlamat data={data} />
							<TitleLabel
								icon={<IconGraduationCap />}
								label="Status Sosial dan Pendidikan"
							/>
							<ProfilStatusSosial data={data} />
							<TitleLabel
								icon={<IconSpiralNotepad />}
								label="Status Kependudukan"
							/>
							<ProfilStatusKependudukan data={data} />
						</>
					)}
				</div>
			</div>

			<DialogCustom
				open={isShow}
				setOpen={setIsShow}
				title={
					<p className="text-xl font-semibold text-primary">
						Konfirmasi Ubah Akun
					</p>
				}
				description={
					<p className="text-gray-600 text-sm">
						Apakah Anda yakin ingin menyimpan perubahan pada data profile ini?
						Data lama akan diperbarui.
					</p>
				}
				children={
					<div className="flex flex-col gap-4 w-full mt-2">
						<div className="flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={() => setIsShow(false)}
								disabled={disabled}
								className="py-1.5 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
							>
								Batal
							</button>
							<button
								type="button"
								onClick={() => handleSave()}
								disabled={disabled}
								className="py-1.5 px-4 rounded-md bg-primary hover:bg-primary/90 text-white text-sm font-medium transition disabled:opacity-50"
							>
								Simpan Perubahan
							</button>
						</div>
					</div>
				}
			/>
		</>
	);
}

export function TitleLabel({
	icon,
	label,
}: {
	label: string;
	icon: JSX.Element;
}) {
	return (
		<div className="flex items-center w-full gap-4">
			<div className="flex items-center gap-2">
				{icon}
				<p className="text-lg font-medium text-primary">{label}</p>
			</div>
			<hr className="w-full flex-1 border-t border-[#7074F2]" />
		</div>
	);
}
