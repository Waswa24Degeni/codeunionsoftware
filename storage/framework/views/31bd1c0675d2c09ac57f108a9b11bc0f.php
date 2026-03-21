<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>" class="h-full">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>" />

    <title inertia><?php echo e(config('app.name', 'CodeUnion')); ?></title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    <?php echo app('Tighten\Ziggy\BladeRouteGenerator')->generate(); ?>
    <?php echo app('Illuminate\Foundation\Vite')->reactRefresh(); ?>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.jsx']); ?>
    <?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->head; } ?>

    <style>
        html,
        body {
            min-height: 100%;
            margin: 0;
            background: #021B1C;
        }

        #initial-page-loader {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(2, 27, 28, 0.92);
            backdrop-filter: blur(6px);
        }

        .initial-loader-shell {
            position: relative;
            width: 96px;
            height: 96px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .initial-loader-ring,
        .initial-loader-arc {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
        }

        .initial-loader-arc {
            animation: initial-loader-spin 900ms linear infinite;
        }

        .initial-loader-logo {
            position: relative;
            z-index: 1;
            width: 48px;
            height: 48px;
            object-fit: contain;
            user-select: none;
        }

        @keyframes initial-loader-spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
    </style>
</head>
<body class="h-full font-sans antialiased bg-[#021B1C] text-white" style="background:#021B1C;color:#FFFFFF;">
    <div id="initial-page-loader" aria-hidden="true">
        <div class="initial-loader-shell">
            <svg class="initial-loader-ring" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="48" cy="48" r="43" stroke="#1a4445" stroke-width="5" />
            </svg>
            <svg class="initial-loader-arc" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="48" cy="48" r="43" stroke="#FF7A18" stroke-width="5" stroke-linecap="round" stroke-dasharray="270" stroke-dashoffset="202" />
            </svg>
            <img src="/images/logo.png" alt="Loading" class="initial-loader-logo" draggable="false" />
        </div>
    </div>
    <?php if (!isset($__inertiaSsrDispatched)) { $__inertiaSsrDispatched = true; $__inertiaSsrResponse = app(\Inertia\Ssr\Gateway::class)->dispatch($page); }  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->body; } elseif (config('inertia.use_script_element_for_initial_page')) { ?><script data-page="app" type="application/json"><?php echo json_encode($page); ?></script><div id="app"></div><?php } else { ?><div id="app" data-page="<?php echo e(json_encode($page)); ?>"></div><?php } ?>
</body>
</html>
<?php /**PATH /app/resources/views/app.blade.php ENDPATH**/ ?>