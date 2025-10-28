import Crane from '@/components/illustrations/Crane'
import RiverGlow from '@/components/illustrations/RiverGlow'
import { museo, mulish } from '@/lib/fonts'

export default function Hero() {
  return (
    <section className="relative grid place-items-center text-center min-h-[calc(100vh-56px)] px-4 bg-color-red mt-4 overflow-visible">
      <div>
        <div className="absolute top-[13%] right-20 bg-red">
          <div className="relative w-[clamp(520px,48vw,1100px)] aspect-[600/760]">
            <RiverGlow className="absolute top-[10%] left-[65%] -translate-x-1/2 w-full h-auto z-1" />
            <img
              src="/bg/Temple-Trans.png"
              alt="Temple"
              className="absolute top-[-3%] left-[85%] -translate-x-1/2 z-10 w-[49%] max-w-full z-1 opacity-85"
            />
          </div>

        </div>

        <div className='relative z-10'>
          <h1
            className={`${museo.className} text-5xl md:text-[5.2rem] font-normal tracking-normal relative inline-block text-gray-800`}
          >
            Th
            <span className="relative inline-block">
              a
              <span className="absolute -top-19 left-[47%] -translate-x-1/2 pointer-events-none">
                <Crane />
              </span>
            </span>
            o Phuong
          </h1>

          <p className={`${mulish.className} pt-10 text-[1.1rem] text-black/70 font-light text-gray-500 `}>
            <span className="typing">
              <span className="typing-text">Designing systems that <span className='text-[1.2rem] font-normal'>think</span>—and <span className='text-[1.2rem] font-normal'>feel</span>.</span>
              <span className="caret" aria-hidden="true" />
            </span>
          </p>
        </div>
      </div >

    </section >
  );
}
