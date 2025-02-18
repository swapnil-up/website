<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell
 */

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Check If The Application Is In Maintenance Mode
|--------------------------------------------------------------------------
|
| If the application is in maintenance mode, we will return a response
| indicating that maintenance is currently happening so that all users
| will see the same message. Otherwise, we will boot the application.
|
*/

if (file_exists(__DIR__ . '/../storage/framework/maintenance.php')) {
    require __DIR__ . '/../storage/framework/maintenance.php';
}

/*
|--------------------------------------------------------------------------
| Prepare The Application
|--------------------------------------------------------------------------
|
| We need to prepare the application for serving by bootstrapping the
| framework and getting the router ready for incoming requests. The
| $app variable will be used to make the application instance.
|
*/

$app = require_once __DIR__ . '/../bootstrap/app.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application set up, we can handle the incoming request
| using the HTTP kernel. Then, we will send the response back to the
| browser, allowing the user's request to be fulfilled.
|
*/

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
