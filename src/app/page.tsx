export default function Home() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-[#F4F5F0] px-6">
            <main className="flex w-full max-w-md flex-col items-center gap-6 text-center">
                <div
                    aria-hidden
                    className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[22%] shadow-lg"
                    style={{
                        background:
                            'linear-gradient(90deg, #008C45 0%, #008C45 33.33%, #F4F5F0 33.33%, #F4F5F0 66.66%, #CD212A 66.66%)',
                    }}
                >
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#0F2A3A] text-[#E8C547]">
                        <span className="text-lg font-bold leading-none tracking-wide">
                            IT
                        </span>
                        <span className="text-[10px] font-semibold leading-none text-white">
                            2026
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-[#0F2A3A]">
                        Italy 2026
                    </h1>
                    <p className="text-base leading-relaxed text-[#0F2A3A]/80">
                        Trip companion app — content coming soon.
                    </p>
                </div>
                <p className="text-sm text-[#0F2A3A]/55">
                    On iPhone: Share → Add to Home Screen for the full app icon.
                </p>
            </main>
        </div>
    )
}
