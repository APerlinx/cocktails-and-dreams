import { CircleSmall } from 'lucide-react'

export default function HomeCard() {
  return (
    <div dir="rtl" className="cursor-default mb-12">
      <div className="text-center text-white ">
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 ">
            <CircleSmall className="h-4 w-4" />
            <span>בר אקטיבי</span>
          </div>
          <div className="flex items-center gap-2 ">
            <CircleSmall className="h-4 w-4" />
            <span>סדנאות קוקטילים</span>
          </div>
          <div className="flex items-center gap-2 ">
            <CircleSmall className="h-4 w-4" />
            <span>תפריט קוקטלים מותאם</span>
          </div>
          <div className="flex items-center gap-2 ">
            <CircleSmall className="h-4 w-4" />
            <span>אירועים פרטיים</span>
          </div>
          <div className="flex items-center gap-2 ">
            <CircleSmall className="h-4 w-4" />
            <span>אירועים עסקיים</span>
          </div>
        </div>
      </div>
    </div>
  )
}
