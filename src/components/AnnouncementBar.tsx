export default function AnnouncementBar() {
  const items = [
    "Free domestic order",
    "Book a virtual appointment",
    "Customizable order",
    "Free returns within 7 days",
  ];
  return (
    <div className="w-full border-b border-black/10 bg-[#2b211b] text-[13px] text-[#f5efe9]">
      <div className="marquee-container">
        <div className="marquee-track px-4 py-2">
          {[...items, ...items].map((text, idx) => (
            <span key={idx} className="mx-6">{text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}


