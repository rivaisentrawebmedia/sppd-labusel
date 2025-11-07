import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface RememberMeSectionProps {
	isRemember: boolean;
	onToggle: (checked: boolean) => void;
	disabled?: boolean;
}

export function RememberMeSection({
	isRemember,
	onToggle,
	disabled,
}: RememberMeSectionProps) {
	return (
		<div className="flex gap-4 items-center justify-between">
			<div className="flex items-start gap-3">
				<input
					type="checkbox"
					checked={isRemember}
					onChange={(e) => onToggle(e.target.checked)}
					className="accent-[#3C870E] text-white w-4 h-4 cursor-pointer"
					id="toggle"
					disabled={disabled}
				/>
				<Label htmlFor="toggle">Ingat Saya</Label>
			</div>
			<Link to="/forget-password" className="text-[#2769CD] italic underline">
				Lupa Nomor Handphone?
			</Link>
		</div>
	);
}
