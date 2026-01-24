<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{-- <meta name="csrf-token" content="{{ csrf_token() }}"> --}}

    <title inertia>{{ $settings->site_name ?? 'Danish' }}</title>

    <link rel="icon" type="image/png" href="{{ asset($logoSetting?->favicon ?? '') }}">

    @viteReactRefresh
    @routes
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>
