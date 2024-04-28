"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { createBrowserClient } from '@supabase/ssr'

const OAuthForm = () => {

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )


    const loginwithgithub = () => {
        supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${(window.location as Location).origin}/auth-server-action/callback`
            }
        })
    }
    return (
        <Button onClick={loginwithgithub} className='w-full'>Login with GitHub</Button>
    )
}

export default OAuthForm