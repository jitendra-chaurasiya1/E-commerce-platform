'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const OrderPlaced = () => {
  const router = useRouter() // ✅ सही तरीका

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/my-orders') // ✅ अब सही redirect होगा
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5 bg-gray-50'>
      <div className="flex justify-center items-center relative">
        <Image className="absolute p-5" src={assets.checkmark} alt='checkmark' width={80} height={80} />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      <div className="text-center text-2xl font-semibold text-green-600">
        ✅ Order Placed Successfully
      </div>
      <p className="text-gray-500">Redirecting to My Orders in 5 seconds...</p>
    </div>
  )
}

export default OrderPlaced
