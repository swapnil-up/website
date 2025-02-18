<?php

use Illuminate\Support\Facades\Route;

Route::get('/build', function () {
    return inertia('HomePage');
});

Route::get('/build/about', function () {
    return inertia('AboutPage');
});

Route::get('/build/articles', function () {
    return inertia('AllArticlesPage');
});

Route::get('/build/articles/{slug}', function ($slug) {
    $articlesDir = resource_path('articles');
    $articlePath = $articlesDir . '/' . $slug . '.md';

    if (file_exists($articlePath)) {
        $content = file_get_contents($articlePath);
        return inertia('ArticlePage', ['content' => $content]);
    }

    return inertia('NotFound');
});

Route::get('/build/contact', function () {
    return inertia('ContactPage');
});

Route::get('/build/NowPage', function () {
    return inertia('NowPage');
});

Route::get('/build/TagsPage', function () {
    return inertia('TagsPage');
});

Route::fallback(function () {
    return inertia('NotFound');
});
