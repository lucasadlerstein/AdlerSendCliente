import React from 'react';
import Head from 'next/head';
import Header from './Header';

const Layout = ({children}) => {
    return ( 
        <>
            <Head>
                <meta charset="UTF-8" />
                <title>Adlersend - ¡Enviá lo que quieras!</title>
                <meta name="description" content="Enviá lo que quieras, con limites y con seguridad." />
                <meta name="keywords" content="adlersend, adlerstein, adler, send, lucas" />
                <meta name="robots" content="index, follow" />
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-172907715-1"></script>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-172907715-1" />
                <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-172907715-1'); `, }} />
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