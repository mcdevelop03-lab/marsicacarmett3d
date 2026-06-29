import Navbar from '@/components/Navbar'
import GT3CanvasClient from '@/components/GT3CanvasClient'
import EventSection from '@/components/EventSection'
import TicketingSection from '@/components/TicketingSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <GT3CanvasClient />
      <EventSection />
      <TicketingSection />
      <Footer />
    </main>
  )
}
