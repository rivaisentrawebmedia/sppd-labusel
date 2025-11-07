import { useMobile } from "@/utils/useMobile";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type BreadcrumbItem = {
	label: string | any;
	to?: string; // opsional; jika tidak ada berarti item terakhir (aktif)
};

type BreadcrumbsProps = {
	items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	const { isMobile } = useMobile();
	return (
		<div className="flex items-center gap-2 w-full flex-wrap">
			{items.map((item, index) => {
				const isLast = index === items.length - 1;

				return (
					<div
						key={index}
						className="flex items-center gap-2 text-xs lg:text-base whitespace-nowrap"
					>
						{item.to && !isLast ? (
							<Link
								to={item.to}
								className="hover:!text-primary text-[#9C9C9C] transition-colors duration-300"
							>
								{item.label}
							</Link>
						) : (
							<button
								type="button"
								disabled
								className="text-primary font-medium disabled:cursor-not-allowed"
							>
								{isMobile ? item?.label?.slice(0, 18) : item.label}
							</button>
						)}

						{!isLast && <ChevronRight size={16} />}
					</div>
				);
			})}
		</div>
	);
}
