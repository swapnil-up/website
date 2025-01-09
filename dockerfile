FROM php:8.1-apache

# Install required extensions and libraries
RUN apt-get update && apt-get install -y \
    libssl-dev \
    unzip \
    git \
    libonig-dev \
    curl

# Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# Set the working directory
WORKDIR /var/www/html

# Copy all project files
COPY . .

# Install Composer
COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

# Install Laravel dependencies
RUN composer install --optimize-autoloader --no-dev

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Cache the config and routes
RUN php artisan config:cache
RUN php artisan route:cache

# Expose port 80
EXPOSE 80
