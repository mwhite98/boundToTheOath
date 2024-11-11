import HomeView from '@/app/homeView'
import oaths from '@/app/api/oath/oaths.json'

export default function Home() {
  const numOaths = Object.keys(oaths).length
  return <HomeView numOaths={numOaths} oaths={oaths} />
}
