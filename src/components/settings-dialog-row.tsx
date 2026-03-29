type Props = {
	label: string;
	children: React.ReactNode;
};

export default function SettingsRow({ label, children }: Props) {
	return (
		<div className="grid gap-3 rounded-xl border border-border bg-input/15 px-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center dark:bg-input/20">
			<div className="space-y-1">
				<p className="text-xs">{label}</p>
			</div>

			<div className="sm:justify-self-end">{children}</div>
		</div>
	);
}
