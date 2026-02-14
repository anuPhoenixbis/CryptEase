'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from "../public/assets/logo.svg"
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

function Headers() {
    const pathname = usePathname()
  return (
    <header>
        <div className="main-container inner">
            <Link href='/'>
                <Image src={logo} alt="Crypt Ease Logo" width={132} height={40} />
            </Link>
            <nav>
                <Link href='/' className={cn('nav-link',{
                    "isActive" : pathname==="/",
                    "isHome" : true
                })}>Home</Link>
                <p>Search Modal</p>
                <Link href='/coins' className={cn('nav-link',{
                    "isActive" : pathname==="/coins"
                })}>All coins</Link>
            </nav>
        </div>
    </header>
  )
}

export default Headers