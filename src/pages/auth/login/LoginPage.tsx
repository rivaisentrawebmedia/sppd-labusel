import { Form } from "@/components/ui/form";
import TextInput from "@/components/common/form-input/TextInput";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePostLogin } from "./controller";

export default function LoginPage() {
	const {
		form,
		handleSave,
		handleCheckedIsRemember,
		isRemember,
		num1,
		num2,
		loading,
	} = usePostLogin();
	const disabled = loading;

	return (
		<>
			<div className="flex flex-col gap-4 md:gap-6 rounded-xl bg-white p-4 md:p-6">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSave)}
						className="w-full flex flex-col gap-4"
					>
						<TextInput
							form={form}
							name="email"
							label="Email"
							placeholder="Masukkan email"
							className="w-full"
							inputClassName="w-full"
							isDisabled={disabled}
							isRequired
						/>
						<div>
							<TextInput
								form={form}
								name="password"
								label="Password"
								type="password"
								placeholder="Masukkan password"
								className="w-full"
								isDisabled={disabled}
								isRequired
							/>
						</div>
						<TextInput
							form={form}
							name="captcha"
							label={`Berapa hasil dari ${num1}+${num2}`}
							placeholder="Masukkan jawaban"
							className="w-full"
							inputClassName="w-full"
							isDisabled={disabled}
							isRequired
						/>
						<div className="flex gap-4 items-center justify-between">
							<div className="flex items-start gap-3">
								<input
									type="checkbox"
									checked={isRemember}
									onChange={(e) => {
										console.log(e);
										handleCheckedIsRemember(e.target.checked);
									}}
									className=" accent-green-600"
									id="toggle"
									disabled={disabled}
								/>
								<Label htmlFor="toggle">Ingat Saya</Label>
							</div>
							<Link
								to={"/forget-password/email"}
								className="text-[#2769CD] underline"
							>
								Lupa Password?
							</Link>
						</div>
						<Button
							type="submit"
							disabled={disabled}
							className="w-full !bg-[#145BC5] hover:!bg-[#145BC5]/90"
						>
							Login
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
}
