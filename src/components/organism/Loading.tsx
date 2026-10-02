export default function LoadingPage() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="loader border-4 border-t-4 border-gray-200 border-t-red-600 rounded-full w-12 h-12 animate-spin"></div>

            <style jsx>{`
        .loader {
          border-top-color: #f87171; /* merah */
        }
      `}</style>
        </div>
    );
}
