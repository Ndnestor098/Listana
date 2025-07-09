<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Listana') }}</title>

        {{-- Open Graph para redes sociales --}}
        <meta property="og:title" content="Listana - Organiza tus compras" />
        <meta
            property="og:description"
            content="Crea y comparte listas de compras con otros usuarios. Gestiona tus productos de forma simple y rápida con Listana."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://listana.ndnestor.com" />
        <meta
            property="og:image"
            content="https://listana.ndnestor.com/assets/images/share-cover.webp"
        />
        <meta property="og:site_name" content="Listana" />

         {{-- Twitter Card (opcional)  --}}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Listana - Organiza tus compras" />
        <meta
            name="twitter:description"
            content="Gestiona y comparte listas de compras con facilidad. Solo con Listana."
        />
        <meta
            name="twitter:image"
            content="https://listana.ndnestor.com/assets/images/share-cover.webp"
        />

        {{-- Font --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        {{-- Favicon --}}
        <link rel="icon" type="image/png" href="/assets/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Listana" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
