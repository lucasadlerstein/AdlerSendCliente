import React from 'react';
import Head from 'next/head';
import Header from './Header';

const Layout = ({children}) => {
    return ( 
        <>
            <Head>
                <title>Adlersend - ¡Enviá lo que quieras!</title>
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
            </Head>
            <div className="bg-black min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-10">
                        {children}
                    </main>
                </div>
            </div>

        </>
     );
}
 
export default Layout;