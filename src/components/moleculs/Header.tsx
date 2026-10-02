interface HeaderProps {
    title?: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <div className="text-center space-y-10 py-5">
            <div>
                <p className="uppercase text-lg font-semibold text-yellow-500">{subtitle}</p>
                <h4 className="text-4xl font-bold text-white">{title}</h4>
            </div>
            <hr className="border-gray-700" />
        </div>
    );
}