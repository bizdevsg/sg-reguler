import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Nomor WhatsApp dalam format internasional (tanpa +, tanpa 0 di depan).
const WHATSAPP_NUMBER = "6287841013855";

export default function LiveChat() {
    return (
        <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live Chat WhatsApp"
            className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition-colors hover:bg-green-600"
        >
            <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
            <span className="hidden sm:inline text-sm font-semibold">Live Chat</span>
        </a>
    );
}