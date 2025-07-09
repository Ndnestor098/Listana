<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Listana</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f9fafb;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            color: #374151;
        }

        .error-container {
            max-width: 28rem;
            width: 100%;
            text-align: center;
        }

        .error-icon {
            width: 6rem;
            height: 6rem;
            background-color: #fef2f2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
        }

        .error-icon svg {
            width: 3rem;
            height: 3rem;
            color: #ef4444;
        }

        .error-title {
            font-size: 1.875rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 1rem;
        }

        .error-description {
            color: #4b5563;
            line-height: 1.625;
            margin-bottom: 0.5rem;
        }

        .error-subtitle {
            color: #6b7280;
            font-size: 0.875rem;
            margin-bottom: 2rem;
        }

        .button-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            transition: all 0.2s;
            cursor: pointer;
            border: none;
            font-size: 1rem;
        }

        .btn-primary {
            background-color: #10b981;
            color: white;
        }

        .btn-primary:hover {
            background-color: #059669;
        }

        .btn-secondary {
            background-color: white;
            color: #374151;
            border: 1px solid #d1d5db;
        }

        .btn-secondary:hover {
            background-color: #f9fafb;
        }

        .help-section {
            background-color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            margin-bottom: 2rem;
        }

        .help-title {
            font-size: 0.875rem;
            color: #4b5563;
            margin-bottom: 0.5rem;
        }

        .help-list {
            list-style: none;
            font-size: 0.875rem;
            color: #6b7280;
        }

        .help-list li {
            margin-bottom: 0.25rem;
        }

        .footer {
            font-size: 0.75rem;
            color: #9ca3af;
        }

        .icon {
            width: 1.25rem;
            height: 1.25rem;
            fill: currentColor;
        }

        @media (min-width: 640px) {
            .button-container {
                flex-direction: row;
            }
        }
    </style>
</head>
<body>
    <div class="error-container">
        <!-- Error Icon -->
        <div class="error-icon">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="m12 17 .01 0"/>
            </svg>
        </div>

        <!-- Error Message -->
        <div>
            <h1 class="error-title">¡Oops! Algo salió mal: Error 404</h1>
            <p class="error-description">
                Ha ocurrido un error inesperado. No te preocupes, esto puede suceder ocasionalmente.
            </p>
            <p class="error-subtitle">
                Puedes intentar recargar la página o volver al inicio.
            </p>
        </div>

        <!-- Action Buttons -->
        <div class="button-container">
            <button onclick="goHome()" class="btn btn-primary">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                Volver al Inicio
            </button>
            
            <button onclick="refreshPage()" class="btn btn-secondary">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                </svg>
                Recargar Página
            </button>
        </div>

        <!-- Additional Help -->
        <div class="help-section">
            <p class="help-title">Si el problema persiste, puedes:</p>
            <ul class="help-list">
                <li>• Limpiar la caché del navegador</li>
                <li>• Desactivar extensiones temporalmente</li>
                <li>• Intentar en modo incógnito</li>
            </ul>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>© 2025 Listana. Todos los derechos reservados.</p>
        </div>
    </div>

    <script>
        function goHome() {
            window.location.href = '/dashboard';
        }

        function refreshPage() {
            window.location.reload();
        }
    </script>
</body>
</html>