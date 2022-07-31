import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SignoutOidc() {
  const router = useRouter();

  useEffect(() => {
    async function signoutAsync() {

      //alert("need to remove items from local storage");
      router.push('/');
    }
    signoutAsync()
  })

  return (
    <div>
      Redirecting...
    </div>
  )
}