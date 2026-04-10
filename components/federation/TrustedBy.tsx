export default function TrustedBy() {
    return (
        <section className="relative w-full bg-[#1C1411] text-[#C9A84C] py-8 overflow-hidden">
            {/* SVG Crosshatch Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                 style={{
                     backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0l20 20M20 0L0 20\' stroke=\'%23C9A84C\' stroke-width=\'1\' fill=\'none\'/%3E%3C/svg%3E")',
                     backgroundSize: '20px'
                 }}>
            </div>

            <div className="relative z-10 w-full overflow-hidden flex whitespace-nowrap">
                <div className="animate-marquee flex items-center font-['Cormorant_SC',serif] text-2xl md:text-[28px] tracking-widest font-bold">
                    <span className="mx-6 md:mx-10 whitespace-nowrap">IIT DELHI</span>
                    <span className="text-[#8B6914] text-xl">◆</span>
                    <span className="mx-6 md:mx-10 whitespace-nowrap">TATA MEMORIAL</span>
                    <span className="text-[#8B6914] text-xl">◆</span>
                    <span className="mx-6 md:mx-10 whitespace-nowrap">UNIV OF MADRAS</span>
                    <span className="text-[#8B6914] text-xl">◆</span>
                    <span className="mx-6 md:mx-10 whitespace-nowrap">ACTREC</span>
                    <span className="text-[#8B6914] text-xl">◆</span>
                    
                    {/* Duplicate for seamless looping */}
                    <span className="mx-6 md:mx-10 whitespace-nowrap">IIT DELHI</span>
                    <span className="text-[#8B6914] text-xl">◆</span>
                    <span className="mx-6 md:mx-10 whitespace-nowrap">TATA MEMORIAL</span>
                    <span className="text-[#8B6914] text-xl">◆</span>
                    <span className="mx-6 md:mx-10 whitespace-nowrap">UNIV OF MADRAS</span>
                    <span className="text-[#8B6914] text-xl">◆</span>
                    <span className="mx-6 md:mx-10 whitespace-nowrap">ACTREC</span>
                    <span className="text-[#8B6914] text-xl hidden md:inline">◆</span>
                </div>
            </div>
        </section>
    );
}
