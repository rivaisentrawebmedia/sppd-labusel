import { Button } from "@/components/ui/button";
import { Save, Trash, X } from "lucide-react";

interface Props {
	onCancel?: () => void;
	onSave?: () => void;
	onDelete?: () => void;
	labelCancel?: string;
	labelSave?: string;
	position?: "end" | "start";
}
const ButtonSaveForm = ({
	onCancel,
	labelCancel,
	labelSave,
	onDelete,
	onSave,
	position = "end",
}: Props) => {
	return (
		<div className={`flex gap-4 ${position == "end" ? "justify-end" : ""}`}>
			{onCancel && (
				<Button
					variant={"outline"}
					onClick={(e) => {
						e.preventDefault();
						onCancel();
					}}
					className="text-primary bg-white border-primary border"
				>
					<X />
					{labelCancel ?? "Batal"}
				</Button>
			)}
			{onSave && (
				<Button
					type="submit"
					className="!bg-primary hover:bg-primary/90 text-white"
				>
					<Save />
					{labelSave ?? "Simpan"}
				</Button>
			)}
			{onDelete && (
				<Button
					onClick={onDelete}
					className="!bg-red-500 hover:bg-red-500/90 text-white"
				>
					<Trash />
					Hapus
				</Button>
			)}
		</div>
	);
};

export default ButtonSaveForm;
