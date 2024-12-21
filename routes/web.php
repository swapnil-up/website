<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('HomePage');
});

Route::get('/about', function () {
    return inertia('AboutPage');
});
Route::get('/articles', function () {
    return inertia('AllArticlesPage');
});
Route::get('/articles/{slug}', function ($slug) {
    $articlesDir = resource_path('articles');
    $articlePath = $articlesDir . '/' . $slug . '.md';

    if (file_exists($articlePath)) {
        $content = file_get_contents($articlePath);
        return inertia('ArticlePage', ['content' => $content]);
    }

    return inertia('NotFound');
});
Route::get('/contact', function () {
    return inertia('ContactPage');
});
Route::get('/NowPage', function () {
    return inertia('NowPage');
});
Route::get('/TagsPage', function () {
    return inertia('TagsPage');
});
Route::fallback(function () {
    return inertia('NotFound');
});
