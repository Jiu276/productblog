import { CheckCircle, XCircle } from 'lucide-react'

interface ProsAndConsProps {
  pros: string[]
  cons: string[]
}

export default function ProsAndCons({ pros, cons }: ProsAndConsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Pros
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-green-700">{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-red-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
          <XCircle className="w-5 h-5 mr-2" />
          Cons
        </h3>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start">
              <XCircle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-red-700">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}