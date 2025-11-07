import { Form } from "@/components/ui/form";
import TextInput from "@/components/common/form-input/TextInput";
import { Button } from "@/components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import type { SignUpPayload } from "../../model";
import { toast } from "react-toastify";
import { usePostCheckNIK } from "../../controller";
import { useEffect, useState } from "react";
import { CheckNIK } from "./SignUpCheckNIK";
import { usePostUploadFile } from "@/layouts/constroller";
import { FormUploadFile } from "./FormUploadFile";

interface SignUpFormProps {
	form: UseFormReturn<SignUpPayload>;
	loading: boolean;
	onSubmit: () => Promise<void>;
}

export function SignUpForm({ form, loading, onSubmit }: SignUpFormProps) {
	const [message, setMessage] = useState<string>();
	const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);

	const { handleSave, loading: loadingCheck } = usePostCheckNIK({
		form: form,
		setMessage: setMessage,
	});

	useEffect(() => {
		const nik = form.getValues("nik");
		if (nik?.length === 16) {
			handleSave().then(() => {
				// Update status duplikat dari message
				setIsDuplicate(message?.includes("SUDAH DIGUNAKAN!") ?? false);
			});
		} else {
			setMessage(undefined);
			setIsDuplicate(null);
		}
	}, [form.watch("nik")]);

	const isNIKAvailable = message?.includes("Belum Digunakan");

	const { loading: loadingUpload, onSubmitUploadFile } = usePostUploadFile();

	const disabled = loading || loadingCheck || loadingUpload;

	const handleScanKTP = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await onSubmitUploadFile({ form, fields: "scan_ktp", file });
	};

	const handleScanKK = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await onSubmitUploadFile({ form, fields: "scan_kk", file });
	};

	const handleSelfieKTP = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await onSubmitUploadFile({ form, fields: "selfie_ktp", file });
	};

	return (
		<>
			{/* // Check NIK UI */}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full flex flex-col gap-4"
				>
					<CheckNIK
						disabled={disabled}
						form={form}
						isDuplicate={isDuplicate}
						message={message}
					/>

					{isNIKAvailable && (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<TextInput
									form={form}
									name="nama_warga"
									label="Nama Lengkap"
									placeholder="Nama Lengkap"
									className="w-full"
									isDisabled={disabled}
									isRequired
								/>
								<TextInput
									form={form}
									name="nik"
									label="NIK"
									placeholder="Nomor Induk Kependudukan"
									className="w-full"
									isDisabled={disabled}
									isRequired
									isNumber
								/>
								<TextInput
									form={form}
									name="no_kk"
									label="No. KK"
									placeholder="Nomor Kartu Keluarga"
									className="w-full"
									isDisabled={disabled}
									isRequired
									isNumber
								/>
								<TextInput
									form={form}
									name="email"
									label="Email"
									placeholder="Email"
									className="w-full"
									isDisabled={disabled}
									isRequired
								/>

								<TextInput
									form={form}
									name="tempat_lahir"
									label="Tempat Lahir"
									placeholder="Tempat Lahir"
									className="w-full"
									isDisabled={disabled}
									isRequired
								/>

								<TextInput
									form={form}
									name="tanggal_lahir"
									label="Tanggal Lahir"
									className="w-full"
									isDisabled={disabled}
									isRequired
									type="date"
								/>

								<TextInput
									form={form}
									name="no_telp"
									label="No. Handphone"
									placeholder="No. Handphone"
									className="w-full"
									isDisabled={disabled}
									isRequired
									isNumber
								/>

								<TextInput
									form={form}
									name="konfirmasi_no_telp"
									label="Ketik Ulang No. Handphone"
									placeholder="No. Handphone"
									className="w-full"
									isDisabled={disabled}
									isRequired
									isNumber
								/>
							</div>

							<FormUploadFile
								disabled={disabled}
								fields="scan_ktp"
								form={form}
								handleUpload={handleScanKTP}
								label="Scan KTP"
								key={"scan-ktp"}
							/>

							<FormUploadFile
								disabled={disabled}
								fields="scan_kk"
								form={form}
								handleUpload={handleScanKK}
								label="Scan KK"
								key={"scan-kk"}
							/>

							<FormUploadFile
								disabled={disabled}
								fields="selfie_ktp"
								form={form}
								handleUpload={handleSelfieKTP}
								label="Selfie KTP"
								key={"selfie-ktp"}
							/>
						</>
					)}

					<Button
						type="submit"
						disabled={disabled || !isNIKAvailable}
						className="w-full bg-[#272CCD] text-white hover:bg-[#272CCD]/80"
						onClick={async () => {
							const isValid = await form.trigger();
							if (!isValid) {
								const invalidFields = Object.entries(form.formState.errors).map(
									([field, error]) => ({
										field,
										error: error?.message,
									})
								);
								return toast.error(invalidFields?.[0]?.error?.toString());
							}
						}}
					>
						Daftar Akun
					</Button>
				</form>
			</Form>
		</>
	);
}
