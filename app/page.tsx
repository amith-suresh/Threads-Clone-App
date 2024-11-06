import Link from 'next/link';


export default function Home() {
  return <> 
  <div className="absolute top-4 right-4">

   <Link href="/login">
                <button className="bg-black text-white rounded-full py-2 px-4 hover:bg-gray-800 transition duration-300">
                    Login
                </button>
            </Link>
</div>
<div>
    
</div>
</>;
}
