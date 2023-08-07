import Image from 'next/image'
import  appLogo  from '../../images/DALL·E 2023-07-30 20.26.08 - _24_ in a linux aesthetic.jpg'
import timeLogo from '../../images/time-logo.jpeg'
import learningLogo from '../../images/learning.jpeg'
import mindLogo from '../../images/mind.jpeg'
import wantToLogo from '../../images/wantTo.jpeg'

export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div >
      <a href="/api/auth/login" className="font-mono fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        login
      </a>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
        
          </a>
        </div>
      </div>
      <h2 className="font-mono text-2xl"> enhance your calendar with the thoughts you were never able to bring to life!</h2>
      <div style={{display: 'flex'}}>
      <Image
          className="relative drop-shadow-[0_0_0.3rem_#00000070] dark:drop-shadow-[0_0_0.3rem_#ffffff70] mix-blend"
          src={wantToLogo}
          alt="Next.js Logo"
          width={350}
          height={350}
          priority
        />
        <Image
          className="relative drop-shadow-[0_0_0.3rem_#00000070] dark:drop-shadow-[0_0_0.3rem_#ffffff70] mix-blend"
          src={mindLogo}
          alt="Next.js Logo"
          width={350}
          height={350}
          priority
        />
        <Image
          className="relative drop-shadow-[0_0_0.3rem_#00000070] dark:drop-shadow-[0_0_0.3rem_#ffffff70] mix-blend"
          src={appLogo}
          alt="Next.js Logo"
          width={350}
          height={350}
          priority
        />
        <Image
          className="relative drop-shadow-[0_0_0.3rem_#00000070] dark:drop-shadow-[0_0_0.3rem_#ffffff70] mix-blend"
          src={timeLogo}
          alt="Next.js Logo"
          width={350}
          height={350}
          priority
        />
        <Image
          className="relative drop-shadow-[0_0_0.3rem_#00000070] dark:drop-shadow-[0_0_0.3rem_#ffffff70] mix-blend"
          src={learningLogo}
          alt="Next.js Logo"
          width={350}
          height={350}
          priority
        />
      </div>

      <div>
        <a
          href="/calendar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="font-mono fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            sync calendar {' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`font-mono  text-sm opacity-50`}>
            access your personal calendar, and integrate events
          </p>
        </a>

      


       
      </div>
    </main>
  )
}
