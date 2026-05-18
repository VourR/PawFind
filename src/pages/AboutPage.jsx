import { MessageCircleHeart, HelpCircle, Users, Mail, Phone, FileText, ClipboardCheck, PhoneCall, HandHeart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function AboutPage() {
  const faqItems = [
    {
      question: 'Bagaimana tata cara adopsi di PawFind?',
      answer: 'Lihat bagian Alur Adopsi di atas. Prosesnya ringkas dan dirancang supaya jelas dari awal sampai sesi pertemuan.'
    },
    {
      question: 'Berapa lama review pengajuan adopsi?',
      answer:
        'Waktu review berbeda tiap shelter, namun tim kami berupaya melakukan peninjauan secepat mungkin agar adopter mendapat kepastian.'
    },
    {
      question: 'Apakah saya bisa mengajukan lebih dari satu hewan?',
      answer:
        'Bisa. Anda dapat mengajukan beberapa pengajuan adopsi, kemudian menunggu hasil review dari masing-masing shelter.'
    },
    {
      question: 'Bagaimana jika pengajuan saya belum dipilih?',
      answer:
        'Anda tetap bisa mencoba pengajuan lain. Kami akan membantu mencocokkan profil Anda dengan hewan yang paling sesuai.'
    }
  ];

  const teamMembers = [
    {
      name: 'Citra Marta Fatmala',
      role: 'Koordinator Adopsi',
      bio: 'Memastikan proses review adopter berjalan adil dan transparan.'
    },
    {
      name: 'Galileo Athari Muhammad',
      role: 'Koordinator Kemitraan Shelter',
      bio: 'Membangun kolaborasi dengan shelter untuk menjaga kualitas layanan adopsi.'
    },
    {
      name: 'Ifada Adillarisca Kusuma',
      role: 'Dukungan Komunitas',
      bio: 'Mendampingi adopter dari tahap pengajuan hingga proses pertemuan dengan hewan.'
    },
    {
      name: 'Rajwa Vourza Tsaqifa',
      role: 'Dukungan Komunitas',
      bio: 'Mendampingi adopter dari tahap pengajuan hingga proses pertemuan dengan hewan.'
    }
  ];

  const containerRef = useRef(null);
  const scrollCards = (direction) => {
    if (!containerRef.current) return;
    const distance = containerRef.current.clientWidth || 320; // scroll by visible width
    containerRef.current.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  const adoptionFlow = [
    {
      icon: FileText,
      title: 'Lengkapi Profil Diri'
    },
    {
      icon: ClipboardCheck,
      title: 'Tim Meninjau Kecocokan'
    },
    {
      icon: PhoneCall,
      title: 'Konfirmasi Lewat Kontak'
    },
    {
      icon: HandHeart,
      title: 'Bertemu dengan Hewan Kesayangan'
    }
  ];

  return (
    <div className="min-h-screen mt-3 md:mt-4 bg-gradient-to-br from-teal-50 via-white to-cyan-50 pb-20 md:pb-8">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <MessageCircleHeart size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Kontak Kami</h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto">
              Tim PawFind siap membantu pertanyaan adopsi Anda lewat Pertanyaan Umum dan dukungan tim kami.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-16">
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Alur Adopsi
          </h2>

          <div className="bg-white rounded-2xl border border-[#6cb1c9]/25 shadow-lg p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-3 items-stretch">
              {adoptionFlow.map((step) => {
                const IconComponent = step.icon;

                return (
                  <div key={step.title} className="relative">
                    <div className="h-full rounded-xl bg-gradient-to-br from-[#f0f0f0] to-[#d8eef5] border border-[#6cb1c9]/30 p-5">
                      <div className="w-20 h-20 rounded-full bg-[#6cb1c9] text-white flex items-center justify-center mb-4 mx-auto shadow-lg shadow-[#6cb1c9]/30">
                        <IconComponent size={40} />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-800 text-center">{step.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
            <HelpCircle className="text-teal-600" size={34} />
            Pertanyaan Umum
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqItems.map((item) => (
              <div key={item.question} className="bg-white rounded-xl p-6 shadow-md border border-teal-50">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.question}</h3>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center flex items-center justify-center gap-3">
            <Users className="text-teal-600" size={34} />
            Tim Kami
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollCards(-1)}
              aria-label="Scroll left"
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronLeft />
            </button>

            <div ref={containerRef} className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory touch-pan-x">
              {teamMembers.map((member) => (
                <div key={member.name} className="w-[260px] md:w-1/3 flex-shrink-0 snap-start bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center mb-4 text-xl">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mt-1">{member.role}</p>
                  <p className="text-gray-600 mt-3">{member.bio}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollCards(1)}
              aria-label="Scroll right"
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronRight />
            </button>
          </div>
        </section>

        <section className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-10 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <MessageCircleHeart className="mt-1" />
              <div>
                <p className="font-bold">Jam Layanan</p>
                <p className="text-teal-100">Senin - Jumat, 08:00 - 17:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1" />
              <div>
                <p className="font-bold">Email</p>
                <p className="text-teal-100">hello@pawfind.id</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1" />
              <div>
                <p className="font-bold">WhatsApp</p>
                <p className="text-teal-100">+62 812-0000-2026</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
